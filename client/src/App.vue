<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.checkLocalStorageForPlayerId()
    this.$socket.setupSocketConnection()
    this.checkRouteForGameId()
    this.loadMinigames()
  },
  computed: {
    ...mapGetters({
      gameId: 'gameId'
    })
  },
  watch: {
    gameId () {
      this.$router.replace('/' + this.gameId).catch(err => {})
    }
  },
  methods: {
    checkRouteForGameId () {
      if (this.$route.params.gameId) {
        this.$store.commit('SET_GAME_ID', this.$route.params.gameId)
        this.$socket.emit('playerJoinGame', this.$route.params.gameId)
      }
    },
    checkLocalStorageForPlayerId () {
      const playerId = window.localStorage.getItem('sppid')
      if (playerId && playerId !== 'undefined') {
        this.$store.commit('SET_PLAYER_ID', playerId)
      } else {
        const newPlayerId = ( Math.random() * 100000000 ) | 0
        this.$store.commit('SET_PLAYER_ID', newPlayerId)
        window.localStorage.setItem('sppid', newPlayerId)
      }
    },
    async loadMinigames () {
      let minigames = await fetch(`${process.env.VUE_APP_SERVER_ENDPOINT}/minigames`)
      let json = await minigames.json()
      console.log(json)
    }
  },
  beforeUnmount () {
    this.$socket.disconnect()
  }
}
</script>