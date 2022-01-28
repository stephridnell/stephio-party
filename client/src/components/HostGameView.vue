<template>
  <div class="host-game-view view">
    <!-- view of all the team cards -->
    <div class="container p-30">
      <div class="box" v-for="(team, index) in currentTeams" :key="index">
        <team-card
          :team="team"
          :index="index">
        </team-card>
        <rolling v-if="!allPlayersRolled" :value="team.initialRoll"></rolling>
      </div>
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

    <div class="mt-50 text-center">
      <div class="text-bold white text-42">Minigames</div>
      <button class="text-bold text-36 mr-24" @click="triggerMinigame('ffa')">
        FFA
      </button>

      <button class="text-bold text-36 mr-24" @click="triggerMinigame('solo')">
        Single player
      </button>

      <button class="text-bold text-36 mr-24" @click="triggerMinigame('asymmetric')">
        1v3
      </button>

      <button class="text-bold text-36" @click="triggerMinigame('2v2')">
        2v2
      </button>
    </div>

    <div class="mt-50 text-center">
      <button class="text-bold text-36 mr-24 round" @click="shuffleTeamMates">
        ?
      </button>
    </div>

    <div class="event-overlay" v-if="minigameRoulette">
      <minigame-roulette :minigames="minigames.filter(el => el.modes.includes(minigameType))" @done="endMinigame"></minigame-roulette>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HostGameView',
  data () {
    return {
      minigameType: '',
      showGoesFirst: false,
      minigameRoulette: false
    }
  },
  methods: {
    triggerMinigame (type) {
      this.minigameType = type
      this.minigameRoulette = true
    },
    endMinigame () {
      this.minigameType = ''
      this.minigameRoulette = false
    },
    shuffleTeamMates () {
      this.$socket.emit('shuffleTeamMates', { gameId: this.gameId })
    }
  },
  components: {
    TeamCard: () => import('./TeamCard.vue'),
    Rolling: () => import('./Rolling.vue'),
    MinigameRoulette: () => import('./MinigameRoulette.vue')
  },
  computed: {
    ...mapGetters({
      currentTeams: 'currentTeams',
      allPlayersRolled: 'allPlayersRolled',
      gameId: 'gameId',
      turnOrder: 'turnOrder',
      minigames: 'minigames'
    })
  },
  watch: {
    allPlayersRolled () {
      if (this.allPlayersRolled) {
        this.$socket.emit('hostSetTurnOrder', { firstPlayer: this.turnOrder?.[0]?.userId, gameId: this.gameId })
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