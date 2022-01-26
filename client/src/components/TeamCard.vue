<template>
  <div class="card-wrapper mb-26">
    <div class="card" :class="{ 'greyscale': (team && !connectedUsers.includes(team.userId)) || (!teamsTurn && gameStarted && allPlayersRolled) }" :style="'background:linear-gradient(180deg, var(--player' + index + ') 0%, var(--player' + index + 'darker) 100%);box-shadow: 0 12px 0px 0px var(--player' + index + 'darkest)'">
      <div class="card-body" :class="{ 'p-20': !minimised }" v-if="team">
        <div class="d-flex ai-center" v-if="!minimised">
          <img class="avatar" :class="{ 'mr-12': team.players && team.players[0] }" :src="team.avatar" :style="'background:var(--player' + index + 'darkest);'" />
          <img v-if="team.players && team.players[0]" class="avatar" :src="team.players[0].avatar" :style="'background:var(--player' + index + 'darkest);'" />
        </div>

        <div class="d-flex ai-center text-24 text-bold text-caps mt-12" v-if="!minimised">
          {{ team.teamCaptain || '?' }}
          <div v-if="team.players && team.players[0]">
            &nbsp;&amp; {{ team.players[0].name }}
          </div>
        </div>

        <div v-if="gameStarted" :class="{ minimised }">
          <div class="d-flex ai-center jc-sb text-bold white m-12" :class="minimised ? 'text-20' : 'text-40'">
            <img class="team-asset mr-12" :src="require('@/assets/img/coin.png')" id="coin"> x {{ team.coins }}
            <div v-if="isHost" class="ml-20">
              <button @click="addMinusCoin(1)" class="round text-36 text-bold add mr-10">+</button>
              <button @click="addMinusCoin(-1)" class="round text-36 text-bold minus">-</button>
            </div>
          </div>
          <div class="d-flex ai-center jc-sb text-bold white m-12" :class="minimised ? 'text-20' : 'text-40'">
            <img class="team-asset mr-12" :src="require('@/assets/img/star.png')" id="star"> x {{ team.stars }}
            <div v-if="isHost">
              <button @click="addMinusStar(1)" class="round text-36 text-bold add mr-10">+</button>
              <button @click="addMinusStar(-1)" class="round text-36 text-bold minus">-</button>
            </div>
          </div>
        </div>

        <slot></slot>
      </div>
      <div class="p-20 card-body text-16 text-bold text-caps" v-else>
        Waiting for players...
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TeamCard',
  props: {
    team: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    minimised: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      connectedUsers: 'connectedUsers',
      gameStarted: 'gameStarted',
      allPlayersRolled: 'allPlayersRolled',
      currentTurnPlayerId: 'currentTurnPlayerId',
      isHost: 'isHost'
    }),
    teamsTurn () {
      return this.currentTurnPlayerId === this.team?.userId
    }
  },
  methods: {
    addMinusCoin (coins = 1) {
      if (this.team.coins === 0 && coins === -1) {
        return false
      }
      this.$store.commit('UPDATE_COINS', { coins, userId: this.team.userId })
      this.$socket.emit('playerSetCoins', {
        teamId: this.team._id,
        coins: this.team.coins
      })
    },
    addMinusStar (stars) {
      if (this.team.stars === 0 && stars === -1) {
        return false
      }
      this.$store.commit('UPDATE_STARS', { stars, userId: this.team.userId })
      this.$socket.emit('playerSetStars', {
        teamId: this.team._id,
        stars: this.team.stars
      })
    }
  }
}
</script>

<style lang="scss">
.team-asset {
  width: 60px;
  height: auto;
}
.minimised {
  display: flex;
  align-items: center;
  .team-asset {
    width: 30px;
  }
}
</style>