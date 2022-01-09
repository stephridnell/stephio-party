<template>
  <div class="turn">
    Your turn
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Turn',
  computed: {
    ...mapGetters({
      currentTurnDetails: 'currentTurnDetails',
      currentTeam: 'currentTeam',
      gameId: 'gameId'
    })
  },
  mounted () {
    if (!this.currentTurnDetails) {
      this.$socket.emit('playerNewTurn', { gameId: this.gameId, teamId: this.currentTeam._id })
    }
  }
}
</script>

<style lang="scss">

</style>
