<template>
  <div class="player-view" :class="'player' + playerNumber">
    <div v-if="kicked">
      You have been kicked from the game. Refresh to rejoin.
    </div>
    <new-team-info
      v-else-if="!currentTeam.teamCaptain">
    </new-team-info>
    <div class="d-flex fd-col jc-center" v-else>
      <div class="box mtb-20 mlr-10" style="border-radius:64px;box-shadow: rgb(0 0 0 / 35%) 0px 0px 18px 0px;">
        <div class="card mb-26" :style="'background:linear-gradient(180deg, var(--player' + playerNumber + ') 0%, var(--player' + playerNumber + 'darker) 100%);box-shadow: 0 12px 0px 0px var(--player' + playerNumber + 'darkest)'">
          <div class="p-5 card-body" v-if="currentTeam">
            <div class="d-flex ai-center">
              <img class="avatar" :class="{ 'mr-12': currentTeam.players && currentTeam.players[0] }" :src="currentTeam.avatar" :style="'background:var(--player' + playerNumber + 'darkest);'" />
              <img v-if="currentTeam.players && currentTeam.players[0]" class="avatar" :src="currentTeam.players[0].avatar" :style="'background:var(--player' + playerNumber + 'darkest);'" />
            </div>

            <div class="d-flex ai-center text-24 text-bold text-caps mt-12">
              {{ currentTeam.teamCaptain || '?' }}
              <div v-if="currentTeam.players && currentTeam.players[0]">
                &nbsp;&amp; {{ currentTeam.players[0].name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="!gameStarted">
        Waiting for host to start game
      </div>
      <dice></dice>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerView',
  components: {
    NewTeamInfo: () => import('./NewTeamInfo'),
    Dice: () => import('./Dice')
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam',
      playerNumber: 'playerNumber',
      kicked: 'kicked',
      gameStarted: 'gameStarted'
    })
  }
}
</script>

<style lang="scss">
.player-view {
  height: 100%;
}
</style>
