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
    kicked: false,
    socketId: ''
  },

  mutations: {
    SOCKET_CONNECT (state) {
      state.isConnected = true
    },

    SET_MINIGAMES (state, minigames) {
      state.minigames = minigames
    },

    UPDATE_COINS (state, { coins, userId }) {
      userId = userId || state.currentUser?.id
      let currentTeam = state.game?.teams?.find(el => el.userId === userId)
      if (currentTeam) {
        currentTeam.coins += coins
      }
    },

    UPDATE_STARS (state, { stars, userId }) {
      userId = userId || state.currentUser?.id
      let currentTeam = state.game?.teams?.find(el => el.userId === userId)
      if (currentTeam) {
        currentTeam.stars += stars
      }
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

  actions: {
    NEXT_TURN ({ getters }, socket) {
      let index = getters.turnOrder.findIndex(el => el.userId === getters.currentTurnPlayerId)
      if (index === getters.turnOrder.length - 1) {
        socket.emit('endRound', { gameId: getters.gameId })
      } else {
        // next player in same round
        let nextPlayer = getters.turnOrder[index + 1]
        socket.emit('playerNextTurn', { teamId: nextPlayer._id })
      }
    }
  },

  getters: {
    allPlayersRolled: (_state, getters) => getters.currentTeams.every(el => !!el.initialRoll),
    connectedUsers: state => state.connectedUsers,
    currentTeam: (_state, getters) => getters.currentTeams?.find(el => el.userId === getters.currentUserId) || {},
    currentTeamCoins: (_state, getters) => getters.currentTeam?.coins || 0,
    currentTeams: state => state.game?.teams || [],
    currentTurnDetails: (_state, getters) => getters.turnsArray?.[getters.currentTurnNumber - 1] || null,
    currentTurnNumber: (state, getters) => getters.currentTurnPlayerId ? state.game?.currentTurn : (state.game?.currentTurn - 1),
    currentTurnPlayer: (_state, getters) => getters.currentTeams.find(el => el.userId === getters.currentTurnPlayerId) || {},
    currentTurnPlayerId: state => state.game?.currentTurnPlayer || '',
    currentUser: state => state.currentUser,
    currentUserId: state => state.currentUser?.id || '',
    errorMessage: state => state.errorMessage,
    gameId: state => state.gameId,
    gameStarted: state => !!state.game?.currentTurn,
    isConnected: state => state.isConnected,
    isHost: (state, getters) => state.game.hostId === getters.currentUserId,
    isHostConnected: (state, getters) => getters.connectedUsers.includes(state.game.hostId),
    kicked: state => state.kicked,
    minigames: state => state.minigames,
    playerNumber: (_state, getters) => getters.currentTeams?.findIndex(el => el.userId === getters.currentUserId) ?? 'host',
    playersTurn: (_state, getters) => getters.currentTurnPlayerId === getters.currentUserId,
    socketId: state => state.socketId,
    turnOrder: (_state, getters) => [...getters.currentTeams].sort((a, b) => {
      if (!b.initialRoll) return -1
      return b.initialRoll - a.initialRoll
    }),
    turnsArray: (_state, getters) => getters.currentTeam?.turns || []
  }
})