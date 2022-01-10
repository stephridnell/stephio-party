<template>
  <div class="spaces">
    <div v-for="space in spaces" :key="space">
      <img :src="require('@/assets/img/spaces/' + space + '.png')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spaces',
  data () {
    return {
      spaces: [
        'blue', 'red', 'green', 'bowser', 'star', 'boo', 'minigame', 'chance'
      ]
    }
  }
}
</script>

<style lang="scss">
.spaces {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>