import Vue from 'vue'
import Vuex from 'vuex'
import { isEqual } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connectedUsers: [],
    currentUser: { id: '' },
    errorMessage: '',
    game: { hostId: '', teams: [], currentTurn: 0 },
    gameId: '',
    isConnected: false,
    isHost: false,
    socketId: '',
    kicked: false
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
    },

    KICKED (state) {
      state.kicked = true
    }
  },

  getters: {
    connectedUsers: state => state.connectedUsers,
    currentTeam: (_state, getters) => getters.currentTeams?.find(el => el.userId === getters.currentUserId) || {},
    currentTeams: state => state.game?.teams || [],
    currentUser: state => state.currentUser,
    currentUserId: state => state.currentUser?.id || '',
    errorMessage: state => state.errorMessage,
    gameId: state => state.gameId,
    isConnected: state => state.isConnected,
    isHost: (state, getters) => state.game.hostId === getters.currentUserId,
    isHostConnected: (state, getters) => getters.connectedUsers.includes(state.game.hostId),
    socketId: state => state.socketId,
    playerNumber: (_state, getters) => getters.currentTeams?.findIndex(el => el.userId === getters.currentUserId) ?? 'host',
    kicked: state => state.kicked,
    gameStarted: state => !!state.game?.currentTurn,
    allPlayersRolled: (_state, getters) => getters.currentTeams.every(el => !!el.initialRoll),
    currentTurnPlayer: state => state.game?.currentTurnPlayer,
    playersTurn: (_state, getters) => getters.currentTurnPlayer === getters.currentUserId,
    turnOrder: (_state, getters) => [...getters.currentTeams].sort((a, b) => {
      if (!b.initialRoll) return -1
      return b.initialRoll - a.initialRoll
    })
  }
})