<template>
  <div id="app">
    <host-view v-if="isHost"></host-view>
    <player-view v-else-if="gameId"></player-view>
    <div v-else>
      <button @click="newGame">
        New game
      </button>
      {{ errorMessage }}
      Game code: {{ gameId }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameWrapper',
  components: {
    HostView: () => import('@/components/HostView.vue'),
    PlayerView: () => import('@/components/PlayerView.vue')
  },
  computed: {
    ...mapGetters({
      gameId: 'gameId',
      isHost: 'isHost',
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