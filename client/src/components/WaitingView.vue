<template>
  <div class="waiting-view view">
    <div class="container p-30">
      <team-card
        v-for="(team, index) in maxTeams"
        :team="currentTeams[index]"
        :index="index"
        :key="index">

        <div class="text-bold text-caps" v-if="!connectedUsers.includes(currentTeams[index] && currentTeams[index].userId)">
          Offline
        </div>

        <button @click="kickPlayer(currentTeams[index] && currentTeams[index].userId)" class="danger button-small d-flex ai-center jc-sb white text-12 text-bold mt-12">
          <v-icon class="mr-6" name="ban" />
          Kick
        </button>
      </team-card>
    </div>

    <div class="text-center white p-20 text-bold text-caps pt-50">
      Game code
      <div class="text-60">
        {{ gameId }}
      </div>
    </div>
    <div class="text-center white p-20 text-bold text-caps">
      Turns:
      <select name="turns" v-model="turns">
        <option v-for="n of 7" :key="n" :value="n * 5">
          {{ n * 5 }}
        </option>
      </select>
    </div>
    <div class="text-center">
      <button class="text-40 text-bold" @click="startGame" :disabled="!ready">
        Start
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WaitingView',
  components: {
    TeamCard: () => import('./TeamCard.vue')
  },
  computed: {
    ...mapGetters({
      gameId: 'gameId',
      connectedUsers: 'connectedUsers',
      currentTeams: 'currentTeams',
      gameStarted: 'gameStarted'
    }),
    ready () {
      return this.maxTeams === this.currentTeams.length
    }
  },
  data () {
    return {
      maxTeams: 4,
      turns: 20
    }
  },
  methods: {
    startGame () {
      this.$socket.emit('hostStartGame', { gameId: this.gameId, turns: this.turns })
    },
    kickPlayer (userId) {
      this.$socket.emit('hostKickPlayer', { userId, gameId: this.gameId })
    }
  }
}
</script>
