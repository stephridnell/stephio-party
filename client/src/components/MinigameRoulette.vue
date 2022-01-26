<template>
  <div class="minigame-roulette">
    <div v-for="minigame in minigames" :key="minigame._id">
      <img :src="s3BucketUrl + minigame.imageName">
      <div>{{ minigame.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MinigameRoulette',
  computed: {
    ...mapGetters({
      minigames: 'minigames'
    }),
    s3BucketUrl () {
      return process.env.VUE_APP_S3_BUCKET
    }
  }
}
</script>

<style>

</style>