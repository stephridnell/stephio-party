<template>
  <div class="new-team-info">
    <avataaar class="mb-12" @randomised="avatar = $event"></avataaar>
    <div>
      Your name:
      <input type="text" v-model="teamCaptain">
    </div>


    <button v-if="!addTeamMate" @click="addTeamMate = true" class="d-flex ai-center jc-sb white text-16 text-bold mt-12">
      <v-icon class="mr-6" name="plus" />
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
    <button class="d-flex ai-center jc-sb white text-32 text-bold mt-40" @click="updateTeamInfo">
      <v-icon class="mr-6" scale="2" name="sign-in-alt" />
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
.new-team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>