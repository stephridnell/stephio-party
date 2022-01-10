<template>
  <div class="blue-space">
    <div>
      <img class="space" :src="require('@/assets/img/spaces/blue.png')">
    </div>
    <div class="d-flex ai-center jc-center text-bold white m-12 text-40" v-if="coinsGiven">
      <img class="team-asset mr-12" :src="require('@/assets/img/coin.png')" id="coin"> + {{ coinCount }}
    </div>
    <img
      v-for="coin in coinCount"
      :key="coin"
      class="coin team-asset mr-12"
      :src="require('@/assets/img/coin.png')">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Blue',
  data () {
    return {
      coinCount: 3,
      currentCoin: 0,
      coinsGiven: false,
      animationTime: 250
    }
  },
  computed: {
    ...mapGetters({
      currentTeamCoins: 'currentTeamCoins',
      currentTeam: 'currentTeam'
    })
  },
  mounted () {
    setTimeout(() => {
      const coinEl = document.getElementById('coin').getBoundingClientRect()
      const top = coinEl.top
      const left = coinEl.left
      var x = setInterval(() => {
        const coin = document.getElementsByClassName('coin')[this.currentCoin]
        const coinPosition = coin.getBoundingClientRect()
        const top2 = coinPosition.top
        const left2 = coinPosition.left

        coin.style.transform = `translate3d(${Math.floor(left - left2 - 20)}px, ${Math.floor(top - top2 - 10)}px, 0)`
        setTimeout(() => {
          this.$store.commit('UPDATE_COINS', { coins: 1 })
        }, this.animationTime)
        this.currentCoin++
        if (this.currentCoin === this.coinCount) {
          clearInterval(x)
          setTimeout(() => {
            this.coinsGiven = true
            this.$socket.emit('playerSetCoins', {
              teamId: this.currentTeam._id,
              coins: this.currentTeamCoins
            })
            const elements = document.getElementsByClassName('coin')
            while (elements.length > 0) {
              elements[0].parentNode.removeChild(elements[0])
            }
          }, this.animationTime)
        }
      }, this.animationTime)
      setTimeout(() => {
        this.$store.dispatch('NEXT_TURN', this.$socket)
      }, 1000)
    }, 1000)
  }
}
</script>

<style>
.coin {
  transition: transform .25s;
}
</style>