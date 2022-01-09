<template>
  <div class="turn">
    <dice @roll="storeRoll" :value="currentTurnDetails.roll" :class="{ small: currentTurnDetails.roll }"></dice>
    <div v-if="currentTurnDetails.roll">
      Move {{ currentTurnDetails.roll }} {{ currentTurnDetails.roll === 1 ? 'space' : 'spaces' }}
    </div>
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
  components: {
    Dice: () => import('./Dice.vue')
  },
  mounted () {
    if (!this.currentTurnDetails) {
      this.$socket.emit('playerNewTurn', { gameId: this.gameId, teamId: this.currentTeam._id })
    }
  },
  methods: {
    storeRoll (value) {
      this.$socket.emit('playerTurnRoll', {
        teamId: this.currentTeam._id,
        turnId: this.currentTurnDetails._id,
        roll: value
      })
    }
  }
}
</script>

<style lang="scss">

</style>
