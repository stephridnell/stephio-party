<template>
  <div class="host-view">
    PLAYER

    <new-team-info>
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
