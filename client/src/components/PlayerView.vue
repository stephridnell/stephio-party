<template>
  <div class="player-view" :class="'player' + playerNumber">
    <div v-if="kicked">
      You have been kicked from the game. Refresh to rejoin.
    </div>

    <new-team-info
      v-else-if="!currentTeam.teamCaptain">
    </new-team-info>

    <div class="d-flex fd-col jc-center" v-else>
      <team-card
        class="mtb-20 mlr-10"
        :team="currentTeam"
        :minimised="minimised"
        :index="playerNumber">
      </team-card>
      <div class="text-center" v-if="!gameStarted">
        Waiting for host to start game
      </div>
      <div v-else>
        <div v-if="!currentTeam.initialRoll">
          <dice @roll="initialRoll"></dice>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerView',
  components: {
    NewTeamInfo: () => import('./NewTeamInfo'),
    TeamCard: () => import('./TeamCard.vue'),
    Dice: () => import('./Dice.vue')
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam',
      playerNumber: 'playerNumber',
      kicked: 'kicked',
      gameStarted: 'gameStarted'
    }),

    minimised () {
      if (this.gameStarted && !this.currentTeam.initialRoll) {
        return true
      }
      return false
    }
  },
  methods: {
    initialRoll (value) {
      this.$socket.emit('playerInitialRoll', {
        teamId: this.currentTeam._id,
        roll: value
      })
    }
  }
}
</script>

<style lang="scss">
.player-view {
  height: 100%;
}
</style>
