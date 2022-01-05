<template>
  <div class="host-game-view view">
    <div class="container p-30">
      <team-card
        v-for="(team, index) in currentTeams"
        :team="team"
        :index="index"
        :key="index">
      </team-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HostGameView',
  components: {
    TeamCard: () => import('./TeamCard.vue')
  },
  computed: {
    ...mapGetters({
      currentTeams: 'currentTeams'
    })
  }
}
</script>

<style>

</style>