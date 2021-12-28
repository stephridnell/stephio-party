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
   *       HOST EVENTS           *
   *                             *
   ******************************* */

/**
 * The 'New game' button was clicked and 'hostCreateNewGame' event occurred.
 */
 function hostCreateNewGame () {
   console.log('new game', this.id)
  // Create a unique Socket.IO Room
  var thisGameId = ( Math.random() * 100000 ) | 0

  // Return the Room ID (gameId) and the socket ID (socketId) to the browser client
  this.emit('newGameCreated', {
    gameId: thisGameId,
    socketId: this.id
  })

  // Join the Room and wait for the players to join
  this.join(thisGameId.toString())
  console.log(this.rooms)
}

/* *****************************
   *                           *
   *     PLAYER EVENTS         *
   *                           *
   ***************************** */

/**
 * A player clicked the 'JOIN' button.
 * Attempt to connect them to the room that matches
 * the gameId entered by the player.
 * @param data Contains data entered via player's input - gameId.
 */
 function playerJoinGame (gameId) {
  console.log('Player attempting to join game: ' + gameId )

  // A reference to the player's Socket.IO socket object
  var sock = this

  // Look up the room ID
  var room = io.sockets.adapter.rooms.get(gameId)

  // If the room exists...
  if(room != undefined){
    // attach the socket id to the data object.
    let data = {
      socketId: sock.id,
      gameId
    }

    // Join the room
    sock.join(gameId)

    console.log('Player joining game: ' + gameId )

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(gameId).emit('playerJoinedRoom', data)
  } else {
    // Otherwise, send an error message back to the player.
    this.emit('error', { message: 'This room does not exist.' } )
  }
}