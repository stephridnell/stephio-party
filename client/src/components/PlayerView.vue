<template>
  <div class="host-view">
    PLAYER

    <new-team-info
      v-if="!currentTeam.teamName || !currentTeam.teamCaptain">
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
      currentTeam: 'currentTeam'
    })
  }
}
</script>

<style lang="scss">

</style>
