import { io } from 'socket.io-client'

class SocketioService {
  socket
  store

  constructor (store) {
    this.store = store
  }

  setupSocketConnection () {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, { query: 'userId=' + this.store.getters.currentUserId })
    this.bindEvents()
  }

  bindEvents () {
    this.socket.on('connected', data => this.onConnected(this, data))
    this.socket.on('userConnected', data => {
      console.log('userConnected', data)
    })
    this.socket.on('userDisconnected', data => {
      console.log('userDisconnected', data)
    })
    this.socket.on('hostJoinedRoom', data => this.onHostJoinedRoom(this, data))
    this.socket.on('playerJoinedRoom', data => this.onPlayerJoinedRoom(this, data))
    this.socket.on('error', data => this.onError(this, data))
  }

  onConnected ({ store }, data) {
    store.commit('SET_SOCKET_ID', data.socketId)
    store.commit('SOCKET_CONNECT')
  }

  onHostJoinedRoom ({ store }, data) {
    store.commit('SET_GAME_ID', data.gameId)
    store.commit('SET_SOCKET_ID', data.socketId)
    store.commit('IS_HOST', data.gameId)
  }

  onPlayerJoinedRoom ({ store }, data) {
    console.log(data)
  }

  emit (event, body = {}) {
    this.socket.emit(event, body)
  }

  onError ({ store }, data) {
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
