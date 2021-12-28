<template>
  <div id="app">
    <button @click="newGame">
      New game
    </button>
    {{ errorMessage }}
    Game code: {{ gameId }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      gameId: 'gameId',
      errorMessage: 'errorMessage'
    })
  },
  watch: {
    gameId () {
      this.$router.replace('/' + this.gameId).catch(err => {})
    }
  },
  mounted () {
    if (this.$route.params.gameId) {
      this.$store.commit('SET_GAME_ID', this.$route.params.gameId)
      this.$socket.emit('playerJoinGame', this.gameId)
    }
  },
  methods: {
    newGame () {
      this.resetError()
      this.$socket.emit('hostCreateNewGame')
    },
    resetError () {
      this.$store.commit('SET_ERROR', '')
    }
  }
}
</script>