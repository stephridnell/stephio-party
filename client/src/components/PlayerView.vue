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
        :team="currentTeam"
        :minimised="minimised"
        :index="playerNumber">
      </team-card>
      <div class="text-center" v-if="!gameStarted">
        Waiting for host to start game
      </div>
      <div class="white text-bold text-2rem w-100 text-center text-caps" v-else>
        <!-- before the first turn begins, all players must roll to determine play order -->
        <div v-if="!allPlayersRolled">
          <div>
            <span v-if="!currentTeam.initialRoll">
              Roll to determine play order
            </span>
            <span v-else>
              Waiting for other players...
            </span>
          </div>
          <dice @roll="initialRoll" :value="currentTeam.initialRoll"></dice>
        </div>

        <template v-else>
          <turn v-if="playersTurn"></turn>

          <div v-else>
            <div class="d-flex ai-center jc-center">
              {{ currentTurnPlayer.teamCaptain || '?' }}
              <div v-if="currentTurnPlayer.players && currentTurnPlayer.players[0]">
                &nbsp;&amp; {{ currentTurnPlayer.players[0].name }}
              </div>
              's turn
            </div>
          </div>
        </template>
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
    Dice: () => import('./Dice.vue'),
    Turn: () => import('./Turn.vue')
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam',
      playerNumber: 'playerNumber',
      kicked: 'kicked',
      gameStarted: 'gameStarted',
      playersTurn: 'playersTurn',
      allPlayersRolled: 'allPlayersRolled',
      currentTurnPlayer: 'currentTurnPlayer'
    }),

    minimised () {
      if (this.gameStarted && (!this.allPlayersRolled || this.playersTurn)) {
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
