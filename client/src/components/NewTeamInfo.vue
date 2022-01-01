<template>
  <div class="new-team-info">
    <div>
      Your name:
      <input type="text" v-model="teamCaptain">
    </div>
    <div>
      Team name:
      <input type="text" v-model="teamName">
    </div>
    <button @click="updateTeamInfo">
      Join
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NewTeamInfo',
  data () {
    return {
      teamCaptain: '',
      teamName: ''
    }
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
        teamName: this.teamName,
        teamId: this.currentTeam._id
      })
    }
  }
}
</script>

<style lang="scss">

</style>