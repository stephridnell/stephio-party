import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    gameId: '',
    socketId: '',
    errorMessage: ''
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
    }
  },

  getters: {
    gameId: state => state.gameId,
    socketId: state => state.socketId,
    isConnected: state => state.isConnected,
    errorMessage: state => state.errorMessage
  }
})