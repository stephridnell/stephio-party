<template>
  <div class="turn" @click="tap">
    <dice v-if="!tapped" @roll="storeRoll" :value="currentTurnDetails.roll" :class="{ small: currentTurnDetails.roll }"></dice>
    <div v-if="currentTurnDetails.roll && !tapped">
      Move {{ currentTurnDetails.roll }} {{ currentTurnDetails.roll === 1 ? 'space' : 'spaces' }} then tap to continue
    </div>
    <div v-else-if="tapped">
      <spaces @select="storeSpace"></spaces>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Turn',
  data () {
    return {
      tapped: false
    }
  },
  computed: {
    ...mapGetters({
      currentTurnDetails: 'currentTurnDetails',
      currentTeam: 'currentTeam',
      gameId: 'gameId'
    })
  },
  components: {
    Dice: () => import('./Dice.vue'),
    Spaces: () => import('./Spaces.vue')
  },
  mounted () {
    if (!this.currentTurnDetails) {
      this.$socket.emit('playerNewTurn', { gameId: this.gameId, teamId: this.currentTeam._id })
    }
  },
  methods: {
    tap () {
      this.tapped = this.currentTurnDetails.roll
    },
    storeRoll (value) {
      this.$socket.emit('playerTurnRoll', {
        teamId: this.currentTeam._id,
        turnId: this.currentTurnDetails._id,
        roll: value
      })
    },
    storeSpace (value) {
      this.$socket.emit('playerStoreSpace', {
        teamId: this.currentTeam._id,
        turnId: this.currentTurnDetails._id,
        space: value
      })
    }
  }
}
</script>

<style lang="scss">

</style>
