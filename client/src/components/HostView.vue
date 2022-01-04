<template>
  <div class="host-view">
    <div class="text-center white p-20 text-bold text-caps text-60">
      Steph<span class="strikethrough">Mar</span>io Party
    </div>
    <div class="container p-30">
      <div class="box" v-for="(team, index) in maxTeams" :key="index" style="border-radius:64px;box-shadow: rgb(0 0 0 / 35%) 0px 0px 18px 0px;">
        <div class="card mb-26" :class="{ 'greyscale': currentTeams[index] && !connectedUsers.includes(currentTeams[index].userId) }" :style="'background:linear-gradient(180deg, var(--player' + index + ') 0%, var(--player' + index + 'darker) 100%);box-shadow: 0 12px 0px 0px var(--player' + index + 'darkest)'">
          <div class="p-20 card-body" v-if="currentTeams[index]">
            <div class="d-flex ai-center">
              <img class="avatar" :class="{ 'mr-12': currentTeams[index].players && currentTeams[index].players[0] }" :src="currentTeams[index].avatar" :style="'background:var(--player' + index + 'darkest);'" />
              <img v-if="currentTeams[index].players && currentTeams[index].players[0]" class="avatar" :src="currentTeams[index].players[0].avatar" :style="'background:var(--player' + index + 'darkest);'" />
            </div>

            <div class="d-flex ai-center text-24 text-bold text-caps mt-12">
              {{ currentTeams[index].teamCaptain || '?' }}
              <div v-if="currentTeams[index].players && currentTeams[index].players[0]">
                &nbsp;&amp; {{ currentTeams[index].players[0].name }}
              </div>
            </div>

            <div class="text-bold text-caps" v-if="!connectedUsers.includes(currentTeams[index].userId)">
              Offline
            </div>
          </div>
          <div class="p-20 card-body text-16 text-bold text-caps" v-else>
            Waiting for players...
          </div>
        </div>
      </div>
    </div>
    <div class="text-center white p-20 text-bold text-caps ptb-50">
      Game code
      <div class="text-60">
        {{ gameId }}
      </div>
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
  name: 'HostView',
  computed: {
    ...mapGetters({
      gameId: 'gameId',
      connectedUsers: 'connectedUsers',
      currentTeams: 'currentTeams'
    }),
    ready () {
      return this.maxTeams === this.currentTeams.length
    }
  },
  data () {
    return {
      maxTeams: 4
    }
  },
  methods: {
    startGame () {
      console.log('start')
    }
  }
}
</script>

<style lang="scss">
.host-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.team-box {
  border: 1px solid black;
  padding: 20px;
}
.avatar {
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
</style>
