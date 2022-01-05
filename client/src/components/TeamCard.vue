<template>
  <div class="box">
    <div class="card mb-26" :class="{ 'greyscale': team && !connectedUsers.includes(team.userId) }" :style="'background:linear-gradient(180deg, var(--player' + index + ') 0%, var(--player' + index + 'darker) 100%);box-shadow: 0 12px 0px 0px var(--player' + index + 'darkest)'">
      <div class="p-20 card-body" v-if="team">
        <div class="d-flex ai-center">
          <img class="avatar" :class="{ 'mr-12': team.players && team.players[0] }" :src="team.avatar" :style="'background:var(--player' + index + 'darkest);'" />
          <img v-if="team.players && team.players[0]" class="avatar" :src="team.players[0].avatar" :style="'background:var(--player' + index + 'darkest);'" />
        </div>

        <div class="d-flex ai-center text-24 text-bold text-caps mt-12">
          {{ team.teamCaptain || '?' }}
          <div v-if="team.players && team.players[0]">
            &nbsp;&amp; {{ team.players[0].name }}
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
    }
  },
  computed: {
    ...mapGetters({
      connectedUsers: 'connectedUsers'
    })
  }
}
</script>

<style>

</style>