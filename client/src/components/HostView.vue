<template>
  <div class="host-view">
    <div class="container">
      <div class="box" v-for="(team, index) in maxTeams" :key="index" style="border-radius:28px;box-shadow: rgb(0 0 0 / 35%) 0px 0px 18px 0px;">
        <div class="card mb-26">
          <div class="p-12" :style="'background:var(--player' + index + ');width: 100%; border-radius: 28px 28px 0 0;'">
            Team {{ index + 1 }}
          </div>
          <div class="p-20" v-if="currentTeams[index]">
            <div class="d-flex ai-center">
              <img class="avatar mr-12" :src="currentTeams[index].avatar" :style="'background:var(--player' + index + ');'" />
              {{ currentTeams[index].teamCaptain || '?' }}
            </div>
            <div class="d-flex ai-center" v-if="currentTeams[index].players && currentTeams[index].players[0]">
              <img class="avatar mr-12" :src="currentTeams[index].players[0].avatar" :style="'background:var(--player' + index + ');'" />
              {{ currentTeams[index].players[0].name }}
            </div>
            <div v-if="!connectedUsers.includes(currentTeams[index].userId)">
              Offline
            </div>
          </div>
          <div class="p-20" v-else>
            Waiting for players...
          </div>
        </div>
      </div>
    </div>
    <div>
      <button>
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
      connectedUsers: 'connectedUsers',
      currentTeams: 'currentTeams'
    })
  },
  data () {
    return {
      maxTeams: 4
    }
  }
}
</script>

<style lang="scss">
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
