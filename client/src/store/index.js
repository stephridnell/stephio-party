import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: ''
    },
    errorMessage: '',
    gameId: '',
    isConnected: false,
    isHost: false,
    socketId: '',
    game: {
      hostId: ''
    },
    connectedUsers: []
  },

  mutations: {
    SOCKET_CONNECT (state) {
      state.isConnected = true
    },

    SET_GAME_ID (state, id) {
      state.gameId = id
    },

    SET_GAME (state, game) {
      state.game = { ...state.game, ...game }
    },

    SET_CONNECTED_USERS (state, connectedUsers) {
      state.connectedUsers = [ ...connectedUsers ]
    },

    SET_SOCKET_ID (state, id) {
      state.socketId = id
    },

    SOCKET_DISCONNECT (state) {
      state.isConnected = false
    },

    SET_ERROR (state, message) {
      state.errorMessage = message
    },

    SET_PLAYER_ID (state, playerId) {
      Vue.set(state.currentUser, 'id', playerId)
    }
  },

  getters: {
    currentUser: state => state.currentUser,
    currentUserId: state => state.currentUser?.id || '',
    errorMessage: state => state.errorMessage,
    gameId: state => state.gameId,
    isConnected: state => state.isConnected,
    isHost: (state, getters) => state.game.hostId === getters.currentUserId,
    socketId: state => state.socketId,
    connectedUsers: state => state.connectedUsers
  }
})