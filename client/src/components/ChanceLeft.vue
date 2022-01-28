<template>
  <div class="rolling white text-bold text-60">
    <img class="chance-avatar" :src="currentTeams[number].avatar" :style="'background:var(--player' + number + 'darkest);'" /><br>
    <button class="blue-button mt-1 text-bold text-24 button-small" @click="stopSpin" v-if="value === null">
      Stop
    </button>
    <span v-else>
      {{ currentTeams[number].teamCaptain }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChanceLeft',
  data () {
    return {
      number: 1,
      value: null
    }
  },
  computed: {
    ...mapGetters({
      currentTeams: 'currentTeams'
    })
  },
  methods: {
    randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    stopSpin () {
      this.value = this.number
      this.$emit('stopped', currentTeams[number])
    }
  },
  mounted () {
    const updateCount = () => {
      if (this.value === null) {
        this.number = this.randomIntFromInterval(0, 3)
        setTimeout(updateCount, 100)
      } else {
        this.number = this.value
      }
    }
    updateCount()
  }
}
</script>

<style>

</style>