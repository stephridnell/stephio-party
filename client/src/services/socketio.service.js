import { io } from 'socket.io-client'

class SocketioService {
  socket
  store

  constructor (store) {
    this.store = store
  }

  setupSocketConnection () {
    this.socket = io(
      process.env.VUE_APP_SERVER_ENDPOINT,
      { query: 'userId=' + this.store.getters.currentUserId }
    )
    this.bindEvents()
  }

  bindEvents () {
    this.socket.on('connected',        data => this.onConnected(this, data))
    this.socket.on('error',            data => this.onError(this, data))
    this.socket.on('gameDataUpdated',  data => this.onGameDataUpdated(this, data))
    this.socket.on('hostJoinedRoom',   data => this.onPlayerJoinedRoom(this, data))
    this.socket.on('playerJoinedRoom', data => this.onPlayerJoinedRoom(this, data))
    this.socket.on('userConnected',    data => this.onUserConnectionChange(this, data))
    this.socket.on('userDisconnected', data => this.onUserConnectionChange(this, data))
    this.socket.on('playerKicked',     data => this.onUserKicked(this, data))
    this.socket.on('gameStarted',      data => this.onGameStarted(this, data))
  }

  onConnected ({ store }, data) {
    store.commit('SET_SOCKET_ID', data.socketId)
    store.commit('SOCKET_CONNECT')
  }

  onGameStarted ({ store }, data) {
    store.commit('SET_GAME', data.game)
  }

  onUserKicked ({ store }, data) {
    let game = data.game
    if (store.getters.currentUserId === data.userId) {
      store.commit('KICKED')
      game = {}
    }
    store.commit('SET_GAME', game)
  }

  onPlayerJoinedRoom ({ store }, data) {
    store.commit('SET_GAME_ID', data.gameId)
    store.commit('SET_SOCKET_ID', data.socketId)
    store.commit('SET_GAME', data.game)
  }

  onUserConnectionChange ({ store }, data) {
    store.commit('SET_CONNECTED_USERS', Object.keys(data))
  }

  onGameDataUpdated ({ store }, data) {
    store.commit('SET_GAME', data.game)
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
