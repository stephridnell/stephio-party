const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
})
const game = require('./game')

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>')
})

io.on('connection', (socket) => {
  game.initGame(io, socket)
})


http.listen(3000, () => {
  console.log('listening on *:3000')
})