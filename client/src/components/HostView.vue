<template>
  <div class="host-view">
    <div class="container p-20">
      <div class="box p-20" v-for="(team, index) in maxTeams" :style="'background:var(--player' + index + ');'" :key="index">
        <div v-if="currentTeams[index]">
          <div>
            <img class="avatar" :src="currentTeams[index].avatar" :style="'background:var(--player' + index + ');'" />
            {{ currentTeams[index].teamCaptain || '?' }}
          </div>
          <div v-if="currentTeams[index].players && currentTeams[index].players[0]">
            <img class="avatar" :src="currentTeams[index].players[0].avatar" :style="'background:var(--player' + index + ');'" />
            {{ currentTeams[index].players[0].name }}
          </div>
          <div v-if="!connectedUsers.includes(currentTeams[index].userId)">
            Offline
          </div>
        </div>
        <div v-else>
          Waiting for players...
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
