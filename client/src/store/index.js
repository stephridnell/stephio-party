import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorMessage: '',
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

    SET_SOCKET_ID (state, id) {
      state.socketId = id
    },

    SOCKET_DISCONNECT (state) {
      state.isConnected = false
    },

    SET_ERROR (state, message) {
      state.errorMessage = message
    },

    IS_HOST (state) {
      state.isHost = true
    }
  },

  getters: {
    errorMessage: state => state.errorMessage,
    gameId: state => state.gameId,
    isConnected: state => state.isConnected,
    isHost: state => state.isHost,
    socketId: state => state.socketId
  }
})