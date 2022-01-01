const Game = require('./models/Game')

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

  // Player Events
  gameSocket.on('playerJoinGame', playerJoinGame)
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
  var roomCode = ( Math.random() * 100000 ) | 0
  roomCode = roomCode.toString()

  // create new game in mongoDB
  const newGame = new Game({ roomCode, hostId: this.handshake.query.userId })

  try {
    await newGame.save()
  } catch (error) {
    this.emit('error', { message: 'Error creating new game. ' + error.message } )
    return
  }

  // Return the Room ID (gameId) and the socket ID (socketId) to the browser client
  this.emit('hostJoinedRoom', {
    gameId: roomCode,
    socketId: this.id
  })

  // Join the Room and wait for the players to join
  this.join(roomCode)
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
 * @param data Contains gameId entered via player's input or url param.
 */
 function playerJoinGame (roomCode) {
  console.log('Player attempting to join game: ' + roomCode )
  const game = Game.findOne({ roomCode, completed: false })

  // If the game exists
  if (game) {
    // Look up the room ID
    const room = io.sockets.adapter.rooms.get(roomCode)

    let event = 'playerJoinedRoom'

    if (room == undefined) {
      event = 'hostJoinedRoom'
    }

    // Join the room
    this.join(roomCode)

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(roomCode).emit(event, {
      socketId: this.id,
      gameId: roomCode
    })
  } else {
    // Otherwise, send an error message back to the player.
    this.emit('error', { message: 'This game does not exist.' } )
  }
}