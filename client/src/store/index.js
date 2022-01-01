import Vue from 'vue'
import Vuex from 'vuex'
import { isEqual } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectedUsers: [],
    currentUser: { id: '' },
    errorMessage: '',
    game: { hostId: '' },
    gameId: '',
    isConnected: false,
    isHost: false,
    socketId: ''
  },

  mutations: {
    SOCKET_CONNECT (state) {
      state.isConnected = true
    },

    SET_GAME_ID (state, id) {
      state.gameId = id
    },

    SET_GAME (state, game) {
      for (let key of Object.keys(game)) {
        if (!isEqual(state.game[key], game[key])) {
          Vue.set(state.game, key, game[key])
        }
      }
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
    connectedUsers: state => state.connectedUsers,
    currentUser: state => state.currentUser,
    currentUserId: state => state.currentUser?.id || '',
    errorMessage: state => state.errorMessage,
    gameId: state => state.gameId,
    isConnected: state => state.isConnected,
    isHost: (state, getters) => state.game.hostId === getters.currentUserId,
    isHostConnected: (state, getters) => getters.connectedUsers.includes(state.game.hostId),
    socketId: state => state.socketId
  }
})