<template>
  <div class="rolling white text-bold text-60">
    {{ number }}
  </div>
</template>

<script>
export default {
  name: 'Rolling',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      number: 1
    }
  },
  methods: {
    randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },
  mounted () {
    const updateCount = () => {
      if (!this.value) {
        this.number = this.randomIntFromInterval(1, 6)
        setTimeout(updateCount, 50)
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