<template>
  <div class="player-view" :class="'player' + playerNumber">
    <div v-if="kicked">
      You have been kicked from the game. Refresh to rejoin.
    </div>
    <new-team-info
      v-else-if="!currentTeam.teamCaptain">
    </new-team-info>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerView',
  components: {
    NewTeamInfo: () => import('./NewTeamInfo')
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam',
      playerNumber: 'playerNumber',
      kicked: 'kicked'
    })
  }
}
</script>

<style lang="scss">
.player-view {
  height: 100%;
}
</style>
