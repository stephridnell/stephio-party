<template>
  <div class="new-team-info">
    <avataaar @randomised="avatar = $event"></avataaar>
    <div>
      Your name:
      <input type="text" v-model="teamCaptain">
    </div>
    <button>
      Add a team mate
    </button>
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
      avatar: ''
    }
  },
  components: {
    Avataaar
  },
  computed: {
    ...mapGetters({
      currentTeam: 'currentTeam'
    })
  },
  methods: {
    updateTeamInfo () {
      this.$socket.emit('updateTeamInfo', {
        teamCaptain: this.teamCaptain,
        avatar: this.avatar,
        teamId: this.currentTeam._id
      })
    }
  }
}
</script>

<style lang="scss">

</style>