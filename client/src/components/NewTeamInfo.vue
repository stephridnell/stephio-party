<template>
  <div class="new-team-info">
    <avataaar class="mb-16" @randomised="avatar = $event"></avataaar>
    <input type="text" placeholder="Your name" v-model="teamCaptain">

    <button v-if="!addTeamMate" @click="addTeamMate = true" class="d-flex ai-center jc-sb white text-16 text-bold mt-12">
      <v-icon class="mr-6" name="user-plus" />
      Add a team mate
    </button>

    <div class="mt-30" v-if="addTeamMate">
      <avataaar class="mb-16" @randomised="teamMateAvatar = $event"></avataaar>
      <input type="text" placeholder="Team mate's name" v-model="teamMateName">
    </div>

    <button v-if="addTeamMate" @click="addTeamMate = false" class="danger button-small d-flex ai-center jc-sb white text-12 text-bold mt-12">
      <v-icon class="mr-6" name="user-times" scale="0.8" />
      Remove team mate
    </button>

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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>