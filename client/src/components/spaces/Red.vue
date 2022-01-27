<template>
  <div class="red-space">
    <div>
      <img class="space" :src="require('@/assets/img/spaces/red.png')">
    </div>
    <div class="d-flex ai-center jc-center text-bold white m-12 text-40">
      <img class="team-asset mr-12" :src="require('@/assets/img/coin.png')" id="bigcoin"> - {{ currentCoin }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Red',
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
      const coinEl = document.getElementById('coin')
      let coins = Array(3).fill('').map(i => {
        let newCoin = coinEl.cloneNode(true)
        newCoin.style.position = 'absolute'
        newCoin.style.top = '22px'
        newCoin.classList.add('coin')
        coinEl.parentNode.appendChild(newCoin)
        return newCoin
      })

      const coinElPosition = coinEl.getBoundingClientRect()
      const top2 = coinElPosition.top
      const left2 = coinElPosition.left

      const bigCoinEl = document.getElementById('bigcoin').getBoundingClientRect()
      const top = bigCoinEl.top
      const left = bigCoinEl.left

      var x = setInterval(() => {
        const coin = coins[this.currentCoin]

        coin.style.transform = `translate3d(${Math.floor(left - left2 + 11)}px, ${Math.floor(top - top2 + 16)}px, 0)`
        setTimeout(() => {
          this.$store.commit('UPDATE_COINS', { coins: -1 })
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
#bigcoin {
  z-index: 1;
}
</style>
