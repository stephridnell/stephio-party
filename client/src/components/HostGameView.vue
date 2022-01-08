<template>
  <div class="host-game-view view">
    <!-- view of all the team cards -->
    <div class="container p-30">
      <div class="box" v-for="(team, index) in currentTeams" :key="index">
        <team-card
          :team="team"
          :index="index">
        </team-card>
        <rolling :value="team.initialRoll"></rolling>
      </div>

      <div class="event-overlay text-bold white text-4rem" v-if="showGoesFirst">
        <div class="event-overlay-content d-flex fd-col jc-center">
          <span class="party-moji text-center text-6rem">
            🥇
          </span>
          <div class="d-flex ai-center text-center">
            {{ turnOrder[0].teamCaptain || '?' }}
            <div v-if="turnOrder[0].players && turnOrder[0].players[0]">
              &nbsp;&amp; {{ turnOrder[0].players[0].name }}
            </div>
          </div>
          <div class="text-center">
            go first
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HostGameView',
  data () {
    return {
      showGoesFirst: false
    }
  },
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
      if (this.allPlayersRolled) {
        this.showGoesFirst = true
        setTimeout(() => {
          this.showGoesFirst = false
        }, 4000)
      }
    }
  }
}
</script>

<style lang="scss">
</style>