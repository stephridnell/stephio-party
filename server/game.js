const Game = require('./models/Game')
const MAX_PLAYERS = 4

var io
var gameSocket

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function (sio, socket) {
  io = sio
  gameSocket = socket
  gameSocket.emit('connected', { socketId: gameSocket.id })

  // Host Events
  gameSocket.on('hostCreateNewGame', hostCreateNewGame)
  gameSocket.on('hostKickPlayer', hostKickPlayer)
  gameSocket.on('hostStartGame', hostStartGame)
  gameSocket.on('hostSetTurnOrder', hostSetTurnOrder)
  gameSocket.on('shuffleTeamMates', shuffleTeamMates)

  // Player Events
  gameSocket.on('playerJoinGame', playerJoinGame)
  gameSocket.on('updateTeamInfo', updateTeamInfo)
  gameSocket.on('playerInitialRoll', playerInitialRoll)
  gameSocket.on('playerNewTurn', playerNewTurn)
  gameSocket.on('playerTurnRoll', playerTurnRoll)
  gameSocket.on('playerStoreSpace', playerStoreSpace)
  gameSocket.on('playerSetCoins', playerSetCoins)
  gameSocket.on('playerNextTurn', playerNextTurn)
  gameSocket.on('playerSetStars', playerSetStars)
  gameSocket.on('endRound', endRound)
}

/* *******************************
   *                             *
   *         HOST EVENTS         *
   *                             *
   ******************************* */

/**
 * The 'New game' button was clicked and 'hostCreateNewGame' event occurred.
 */
 async function hostCreateNewGame () {
  // Create a unique Socket.IO Room
  var roomCode = (Math.random() * 100000) | 0
  roomCode = roomCode.toString()

  // create new game in mongoDB
  const newGame = new Game({
    roomCode,
    hostId: this.handshake.query.userId
  })

  let game = {}
  try {
    game = await newGame.save()
  } catch (error) {
    this.emit('error', { message: 'Error creating new game. ' + error.message } )
    return
  }

  // Return the Room ID (gameId) and the socket ID (socketId) to the browser client
  this.emit('hostJoinedRoom', {
    gameId: roomCode,
    socketId: this.id,
    game
  })

  // Join the Room and wait for the players to join
  this.join(roomCode)
}

/* Kick button clicked on team - remove the team from the game */
async function hostKickPlayer (data) {
  const game = await Game.findOne({ roomCode: data.gameId }).exec()
  const userId = data.userId

  if (game) {
    game.teams = game.teams.filter(el => el.userId !== userId)
    await game.save()
    io.sockets.in(game.roomCode).emit('playerKicked', { game, userId })
  } else {
    this.emit('error', { message: 'This game does not exist.' } )
  }
}

async function hostStartGame (data) {
  const game = await Game.findOne({ roomCode: data.gameId }).exec()

  if (game) {
    game.turns = data.turns
    game.currentTurn = 1
    await game.save()
    io.sockets.in(game.roomCode).emit('gameStarted', { game })
  } else {
    this.emit('error', { message: 'This game does not exist.' } )
  }
}

async function hostSetTurnOrder (data) {
  const game = await Game.findOne({ roomCode: data.gameId }).exec()

  if (game) {
    game.currentTurnPlayer = data.firstPlayer
    await game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    this.emit('error', { message: 'This game does not exist.' } )
  }
}

async function shuffleTeamMates (data) {
  const game = await Game.findOne({ roomCode: data.gameId }).exec()

  if (game) {
    let teams = game.teams
    let players = teams.map(team => {
      return team.players
    })
  
    teams.forEach(team => {
      let player = players.splice(Math.floor(Math.random()*players.length),1)[0]
      team.set({ ...team, players: player })
    })
    game.set({ ...game, teams })
    await game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    this.emit('error', { message: 'This game does not exist.' } )
  }
}

/* *****************************
   *                           *
   *       PLAYER EVENTS       *
   *                           *
   ***************************** */

/**
 * A player clicked the 'JOIN' button.
 * Attempt to connect them to the game/room that matches
 * the gameId entered by the player.
 * @param roomCode Contains gameId entered via player's input or url param.
 */
 async function playerJoinGame (roomCode) {
  console.log('Player attempting to join game: ' + roomCode )
  const game = await Game.findOne({ roomCode, completed: false }).exec()
  const userId = this.handshake.query.userId
  const userIsHost = game?.hostId === userId
  const userAlreadyInGame = game?.teams.some(el => el.userId === userId)


  // If the game exists
  if (game) {
    // Look up the room ID
    const room = io.sockets.adapter.rooms.get(roomCode)
    let eventString = 'playerJoinedRoom'

    if (room == undefined) {
      if (!userIsHost) {
        return this.emit('error', { message: 'Host is disconnected. Refresh the host device and try to join again.' } )
      }
      eventString = 'hostJoinedRoom'
    }

    // if the user is not the host and user is not in the game AND there are fewer than max allowed teams
    if (!userIsHost) {
      if (game.teams.length >= MAX_PLAYERS && !userAlreadyInGame) {
        return io.to(this.id).emit('error', { message: 'Game is full.' } )
      } else if (!userAlreadyInGame) {
        // add new team for user
        game.teams.push({ userId })
        await game.save()
      }
    }

    // Join the room
    this.join(roomCode)

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(roomCode).emit(eventString, {
      socketId: this.id,
      gameId: roomCode,
      game
    })
  } else {
    // Otherwise, send an error message back to the player.
    this.emit('error', { message: 'Game with code ' + roomCode + ' does not exist.' } )
  }
}

/**
 * A player has entered their team info and clicked join button
 * @param data Contains user input
 */
async function updateTeamInfo (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()

  const team = game?.teams?.id(data.teamId)
  if (team) {
    team.set({ ...team, ...data })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function playerInitialRoll (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const team = game?.teams?.id(data.teamId)

  if (team) {
    team.set({ ...team, initialRoll: data.roll })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function playerNewTurn (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const team = game?.teams?.id(data.teamId)

  if (team) {
    team.turns.push({ roll: 0, space: '' })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function playerTurnRoll (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const turn = game?.teams.id(data.teamId).turns?.id(data.turnId)

  if (turn) {
    turn.set({ ...turn, roll: data.roll })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Turn not found.' } )
  }
}

async function playerStoreSpace (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const turn = game?.teams.id(data.teamId).turns?.id(data.turnId)

  if (turn) {
    let team = 'blue'
    switch (data.space) {
      case 'red':
      case 'bowser':
        team = 'red'
      case 'green':
        team = 'green'
        break
    }
    turn.set({ ...turn, space: data.space, team })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Turn not found.' } )
  }
}

async function playerSetStars (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const team = game?.teams?.id(data.teamId)

  if (team) {
    team.set({ ...team, stars: data.stars })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function playerSetCoins (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const team = game?.teams?.id(data.teamId)
  let maxCoins = team.maxCoins
  if (data.coins > team.maxCoins) {
    maxCoins = data.coins
  }

  if (team) {
    team.set({ ...team, coins: data.coins, maxCoins })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function playerNextTurn (data) {
  const game = await Game.findOne({'teams._id': data.teamId, completed: false }).exec()
  const team = game?.teams?.id(data.teamId)

  if (team) {
    team.turns.push({ roll: 0, space: '' })
    game.currentTurnPlayer = team.userId
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}

async function endRound (data) {
  const game = await Game.findOne({ roomCode: data.gameId }).exec()
  game.currentTurn++
  if (game.currentTurn === game.turns) {
    // game is complete
  }
  game.currentTurnPlayer = ''
  await game.save()
}
