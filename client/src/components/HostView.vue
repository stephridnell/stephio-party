<template>
  <div class="host-view">
    HOST
    <div>
      <h4>Teams</h4>
      <div class="team-box" v-for="(team, index) in currentTeams" :key="team.userId">
        <img class="avatar" :src="team.avatar" :style="'background:var(--player' + index + ');'" />
        {{ team.teamCaptain || '?' }}
        <div v-if="!connectedUsers.includes(team.userId)">
          Offline
        </div>
      </div>
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
}
</style>
