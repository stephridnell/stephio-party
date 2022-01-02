<template>
  <div class="new-team-info">
    {{ $store.state.game }}
    <avataaar @randomised="avatar = $event"></avataaar>
    <div>
      Your name:
      <input type="text" v-model="teamCaptain">
    </div>
    <button v-if="!addTeamMate" @click="addTeamMate = true">
      Add a team mate
    </button>
    <div v-if="addTeamMate">
      <avataaar @randomised="teamMateAvatar = $event"></avataaar>
      <div>
        Team mate's name:
        <input type="text" v-model="teamMateName">
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <button @click="updateTeamInfo">
      Join
    </button>
  </div>
</template>

<script>
import Avataaar from './Avataaar'
import { mapGetters } from 'vuex'
export default {
  name: 'NewTeamInfo',
  data () {
    return {
      teamCaptain: '',
      teamMateAvatar: '',
      teamMateName: '',
      avatar: '',
      error: '',
      addTeamMate: false
    }
  },
  components: {
    Avataaar
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam',
      currentTeams: 'currentTeams',
      currentUserId: 'currentUserId'
    })
  },
  methods: {
    updateTeamInfo () {
      this.error = ''
      if (!this.teamCaptain) {
        this.error = 'Name is required.'
        return
      }
      if (this.addTeamMate && !this.teamMateName) {
        this.error = 'Team mate name is required.'
        return
      }
      let team = {
        teamCaptain: this.teamCaptain,
        avatar: this.avatar,
        teamId: this.currentTeam._id
      }
      if (this.addTeamMate) {
        team.players = [{
          name: this.teamMateName,
          avatar: this.teamMateAvatar
        }]
      }
      this.$socket.emit('updateTeamInfo', team)
    }
  }
}
</script>

<style lang="scss">

</style>