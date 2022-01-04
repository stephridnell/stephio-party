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

  // Player Events
  gameSocket.on('playerJoinGame', playerJoinGame)
  gameSocket.on('updateTeamInfo', updateTeamInfo)
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


  // If the game exists
  if (game) {
    // Look up the room ID
    const room = io.sockets.adapter.rooms.get(roomCode)
    let eventString = 'playerJoinedRoom'

    if (room == undefined) {
      if (!userIsHost) {
        return this.emit('error', { message: 'Host is disconnected.' } )
      }
      eventString = 'hostJoinedRoom'
    }

    // if the user is not the host and user is not in the game AND there are fewer than max allowed teams
    if (!userIsHost) {
      if (game.teams >= MAX_PLAYERS) {
        return io.to(this.id).emit('error', { message: 'Game is full.' } )
      } else if (!game.teams?.some(team => team.userId === userId)) {
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
  console.log(data)

  const team = game?.teams?.id(data.teamId)
  if (team) {
    team.set({ ...team, ...data })
    game.save()
    io.sockets.in(game.roomCode).emit('gameDataUpdated', { game })
  } else {
    io.to(this.id).emit('error', { message: 'Team not found.' } )
  }
}
