<template>
  <div class="host-view">
    <waiting-view v-if="!gameStarted"></waiting-view>
    <host-game-view v-else></host-game-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HostView',
  components: {
    WaitingView: () => import('./WaitingView.vue'),
    HostGameView: () => import('./HostGameView.vue')
  },
  computed: {
    ...mapGetters({
      gameStarted: 'gameStarted',
      currentTurnNumber: 'currentTurnNumber'
    })
  }
}
</script>

<style lang="scss">
.host-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
