<template>
  <div class="minigame-roulette">
    <div class="event-overlay white p-60" v-if="randomMinigame">
      <img :src="s3BucketUrl + randomMinigame.imageName" :alt="randomMinigame.name">
      <h2 class=" mt-34 text-bold text-5rem">{{ randomMinigame.name }}</h2>
      <div class="mt-34 text-3rem text-center" style="max-width:1200px">{{ randomMinigame.rules }}</div>
      <button class="text-bold text-4rem mt-44" @click="$emit('done')">
        Done
      </button>
      <button class="text-bold text-3rem mt-44 danger" @click="pickMinigame">
        Re-spin
      </button>
    </div>
    <div class="wrapper" ref="wrapper">
      <div id="minigame-roulette" class="window">
        <ul class="list">
          <li v-for="minigame in minigames" :key="minigame._id">
            <img :src="s3BucketUrl + minigame.imageName" :alt="minigame.name">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MinigameRoulette',
  props: {
    minigames: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    s3BucketUrl () {
      return process.env.VUE_APP_S3_BUCKET
    },
    max () {
      return this.minigames.length - 1
    }
  },
  data () {
    return {
      randomMinigame: null,
      min: 0
    }
  },
  mounted () {
    this.pickMinigame()
  },
  methods: {
    pickMinigame () {
      this.randomMinigame = null
      let minigameIndex = Math.floor(Math.random() * (this.max - this.min + 1) + this.min)

      this.$refs.wrapper.style.right = '0px'
      this.$refs.wrapper.animate({
        right: '14060px'
      }, 5000)
      setTimeout(() => {
        this.randomMinigame = this.minigames[minigameIndex]
        this.$refs.wrapper.style.right = '14060px'
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
img {
  border-radius: 39px;
}
.minigame-roulette {
  width: 100%;
  .event-overlay {
    z-index: 9;
  }
}
li {
    list-style: none;
    display: inline-block;
    margin: 10px;
}

.window {
    overflow: hidden;
    position: relative;
    width: 25000000px;
    right: 0px;
}

.wrapper {
    position: relative;
    width: 1420px;
    max-width: 100%;
    margin-left: -80px;
}

.list {
    position: relative;
    display: inline-block;
}


</style>