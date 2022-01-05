<template>
  <div class="box">
    <div class="card mb-26" :class="{ 'greyscale': team && !connectedUsers.includes(team.userId) }" :style="'background:linear-gradient(180deg, var(--player' + index + ') 0%, var(--player' + index + 'darker) 100%);box-shadow: 0 12px 0px 0px var(--player' + index + 'darkest)'">
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
            <img class="team-asset mr-12" :src="require('@/assets/img/coin.png')"> x {{ team.coins }}
          </div>
          <div class="d-flex ai-center jc-sb text-bold white m-12" :class="minimised ? 'text-20' : 'text-40'">
            <img class="team-asset mr-12" :src="require('@/assets/img/star.png')"> x {{ team.stars }}
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
      gameStarted: 'gameStarted'
    })
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