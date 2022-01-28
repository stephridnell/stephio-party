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
      <button class="text-bold text-36 mr-24 round danger" @click="bowser">
        <img :src="require('@/assets/img/bowser.png')" height="25px" width="25px">
      </button>
      <button class="red blue-button text-bold text-36 mr-24 round" @click="chanceTime = true">
        !
      </button>
    </div>

    <div class="mt-50 text-center" v-if="bowserAction">
      <div class="text-32 white">{{ bowserAction }}</div>
      <button class="mt-16 text-bold text-24 button-small" @click="bowserAction = ''">
        Done
      </button>
    </div>

    <div class="mt-50 text-center" v-if="chanceTime">
      <div class="text-32 white">Chance time</div>
      <div class="d-flex jc-center ai-center">
        <chance-left class="mr-24" @stopped="leftChanceSet"></chance-left>
        <chance-middle class="mr-24" @stopped="middleChanceSet"></chance-middle>
        <chance-right @stopped="rightChanceSet"></chance-right>
      </div>
      <button class="mt-16 text-bold text-24 button-small" @click="stopChanceTime">
        Done
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
      minigameRoulette: false,
      bowserOptions: [
        'Bowser\'s revolution',
        'Everybody gives 10 coins to bowser',
        'You give 20 coins to bowser'
      ],
      bowserAction: '',
      chanceTime: false,
      leftChanceTeam: null,
      rightChanceTeam: null
    }
  },
  methods: {
    stopChanceTime () {
      this.leftChanceTeam = null
      this.rightChanceTeam = null
      this.chanceTime = false
    },
    leftChanceSet (team) {
      this.leftChanceTeam = team
    },
    middleChanceSet (team) {
      this.middleChanceTeam = team
    },
    rightChanceSet (team) {
      this.rightChanceTeam = team
    },
    bowser () {
      let bowserIndex = Math.floor(Math.random() * 3)
      this.bowserAction = this.bowserOptions[bowserIndex]
    },
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
    MinigameRoulette: () => import('./MinigameRoulette.vue'),
    ChanceLeft: () => import('./ChanceLeft.vue'),
    ChanceMiddle: () => import('./ChanceMiddle.vue'),
    ChanceRight: () => import('./ChanceRight.vue')
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