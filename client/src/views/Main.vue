<template>
  <div id="app">
    <div v-if="!isHostConnected">
      host is disconnected, plz wait
    </div>
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
      isHostConnected: 'isHostConnected',
      errorMessage: 'errorMessage'
    })
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