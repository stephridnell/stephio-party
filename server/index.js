require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const game = require('./game')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const io = require('socket.io')(http, {
  cors: { origins: ['http://localhost:8080'] }
})

let users = {}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

connectDatabase()

io.on('connection', (socket) => {
  game.initGame(io, socket)

  let userId = socket.handshake.query.userId
  
  if (!users[userId]) users[userId] = []
  
  users[userId].push(socket.id)

  io.sockets.emit('userConnected', users)

  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        delete users[userId]
        socket.to(room).emit('userDisconnected', users)
      }
    }
  })
})

http.listen(process.env.PORT, () => {
  console.log('listening on *:' + process.env.PORT)
})

async function connectDatabase () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('db connected\n')
  } catch (err) {
    console.log('error connecting db: ' + err.message + '\n')
  }
}
