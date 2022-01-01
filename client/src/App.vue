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
  },
  computed: {
    ...mapGetters({
      gameId: 'gameId'
    })
  },
  watch: {
    gameId () {
      console.log(this.gameId)
      this.$router.replace('/' + this.gameId).catch(err => {})
    }
  },
  methods: {
    checkRouteForGameId () {
      if (this.$route.params.gameId) {
        this.$store.commit('SET_GAME_ID', this.$route.params.gameId)
        this.$socket.emit('playerJoinGame', this.gameId)
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
    checkLocalStorageForHostInfo () {
      const isHostCookie = window.localStorage.setItem('sphost')
      if (isHostCookie && isHostCookie === 'true') {
        
      }
    }
  },
  beforeUnmount () {
    this.$socket.disconnect()
  }
}
</script>