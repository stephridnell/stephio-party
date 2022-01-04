<template>
  <div id="game-wrapper">
    <div class="d-flex jc-center fd-col ai-center h-100" v-if="errorMessage">
      <div class="card no-stretch p-20 mb-40">
        {{ errorMessage }}
      </div>

      <router-link to="/" custom v-slot="{ navigate }">
        <button @click="goBack(navigate, $event)" @keypress.enter="goBack(navigate, $event)" role="link" class="d-flex ai-centerjc-sb text-30 text-bold">
          Back
        </button>
      </router-link>
    </div>

    <template v-else>
      <div v-if="!isHostConnected && gameId">
        Host is disconnected - please wait or refresh page.
      </div>
      <host-view v-if="isHost"></host-view>
      <player-view v-else-if="gameId"></player-view>
      <div class="d-flex jc-center fd-col ai-center h-100" v-else-if="!joinGame">
        <button class="d-flex ai-centerjc-sb text-30 text-bold mb-30" @click="newGame">
          New game
        </button>
        <button class="d-flex ai-centerjc-sb text-30 text-bold" @click="joinGame = true">
          Join game
        </button>
      </div>
      <div class="d-flex jc-center fd-col ai-center h-100" v-else>
        <input class="mb-30" v-model="gameCode" placeholder="Enter game code" />
        <div class="d-flex">
          <button class="d-flex ai-centerjc-sb text-30 text-bold mr-24" @click="joinGame = false">
            Back
          </button>
          <button class="d-flex ai-centerjc-sb text-30 text-bold" @click="redirectToGame">
            Join
          </button>
        </div>
      </div>
    </template>
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
  data () {
    return {
      joinGame: false,
      gameCode: ''
    }
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
    goBack (navigate, event) {
      this.resetError()
      this.$store.commit('SET_GAME_ID', '')
      navigate(event)
    },
    redirectToGame () {
      this.resetError()
      this.$store.commit('SET_GAME_ID', this.gameCode)
      this.$socket.emit('playerJoinGame', this.gameCode)
    },
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

<style lang="scss">
@import '../assets/style/style.scss';
#game-wrapper {
  height: 100%;
}
</style>
