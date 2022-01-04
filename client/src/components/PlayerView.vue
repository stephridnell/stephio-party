<template>
  <div class="player-view" :class="'player' + playerNumber">
    <new-team-info
      v-if="!currentTeam.teamCaptain">
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
      playerNumber: 'playerNumber'
    })
  }
}
</script>

<style lang="scss">

</style>
