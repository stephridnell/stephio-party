<template>
  <div class="blue-space">
    <div>
      <img class="space" :src="require('@/assets/img/spaces/blue.png')">
    </div>
    <img
      v-for="coin in coinCount"
      :key="coin"
      class="coin team-asset mr-12"
      :src="require('@/assets/img/coin.png')">
  </div>
</template>

<script>
export default {
  name: 'Blue',
  data () {
    return {
      coinCount: 3,
      currentCoin: 0
    }
  },
  mounted () {
    const coinEl = document.getElementById('coin').getBoundingClientRect()
    const top = coinEl.top
    const left = coinEl.left
    var x = setInterval(() => {
      const coin = document.getElementsByClassName('coin')[this.currentCoin]
      const coinPosition = coin.getBoundingClientRect()
      const top2 = coinPosition.top
      const left2 = coinPosition.left

      coin.style.transform = `translate3d(${Math.floor(left - left2 - 10)}px, ${Math.floor(top - top2 - 10)}px, 0)`
      this.currentCoin++
      if (this.currentCoin === this.coinCount) {
        clearInterval(x)
      }
    }, 250)
  }
}
</script>

<style>
.coin {
  transition: transform .25s;
}
</style>