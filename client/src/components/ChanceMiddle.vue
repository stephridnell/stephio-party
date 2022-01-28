<template>
  <div class="rolling white text-bold text-60" style="width:300px;">
    {{ options[number] }}<br>
    <button class="blue-button mt-1 text-bold text-24 button-small" @click="stopSpin" v-if="value === null">
      Stop
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChanceLeft',
  data () {
    return {
      number: 1,
      value: null,
      options: [
        '< 10 coins',
        '10 coins >',
        '< 5 coins',
        '5 coins >',
        '< 1 star',
        '1 star >',
        '< 20 coins',
        '20 coins >',
        '< coins >',
        '< stars >',
      ]
    }
  },
  methods: {
    randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    stopSpin () {
      this.value = this.number
      this.$emit('stopped', options[number])
    }
  },
  mounted () {
    const updateCount = () => {
      if (this.value === null) {
        this.number = this.randomIntFromInterval(0, 9)
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