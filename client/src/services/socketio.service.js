import { io } from 'socket.io-client'

class SocketioService {
  socket
  store

  constructor (store) {
    this.store = store
  }

  setupSocketConnection () {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
    this.bindEvents()
  }

  bindEvents () {
    this.socket.on('connected', data => this.onConnected(this, data))
    this.socket.on('newGameCreated', data => this.onNewGameCreated(this, data))
    this.socket.on('playerJoinedRoom', data => this.playerJoinedRoom(this, data))
    this.socket.on('error', data => this.error(this, data))
  }

  onConnected ({ store }, data) {
    store.commit('SET_SOCKET_ID', data.socketId)
    store.commit('SOCKET_CONNECT')
  }

  onNewGameCreated ({ store }, data) {
    store.commit('SET_GAME_ID', data.gameId)
    store.commit('SET_SOCKET_ID', data.socketId)
  }

  playerJoinedRoom ({ store }, data) {
    console.log(data)
  }

  emit (event, body = {}) {
    this.socket.emit(event, body)
  }

  error ({ store }, data) {
    store.commit('SET_ERROR', data.message)
  }

  disconnect () {
    if (this.socket) {
      this.socket.disconnect()
    }
    this.store.commit('SOCKET_DISCONNECT')
  }
}

export default SocketioService
