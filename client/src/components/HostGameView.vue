<template>
  <div class="host-game-view view">
    <div class="container p-30">
      <div class="box" v-for="(team, index) in currentTeams" :key="index">
        <team-card
          :team="team"
          :index="index">
        </team-card>
        <rolling
          :value="team.initialRoll">
        </rolling>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HostGameView',
  components: {
    TeamCard: () => import('./TeamCard.vue'),
    Rolling: () => import('./Rolling.vue')
  },
  computed: {
    ...mapGetters({
      currentTeams: 'currentTeams',
      allPlayersRolled: 'allPlayersRolled',
      turnOrder: 'turnOrder'
    })
  },
  watch: {
    allPlayersRolled () {
      
    }
  }
}
</script>

<style lang="scss">
</style>