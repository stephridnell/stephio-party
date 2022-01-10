<template>
  <div class="spaces">
    <div v-if="selected">
      <img :src="require('@/assets/img/spaces/' + selected + '.png')">
      <div>
        <button class="white text-36 text-caps text-bold mt-12 mr-12" @click="selected = ''">
          Back
        </button>
        <button class="white text-36 text-caps text-bold mt-12" @click="confirmSpace">
          Confirm
        </button>
      </div>
    </div>

    <template v-else>
      <div v-for="space in spaces" :key="space">
        <img class="space" :src="require('@/assets/img/spaces/' + space + '.png')" @click="selected = space">
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Spaces',
  data () {
    return {
      spaces: [ 'blue', 'red', 'green', 'bowser', 'star', 'boo', 'minigame', 'chance' ],
      selected: ''
    }
  },
  methods: {
    confirmSpace () {
      this.$emit('select', this.selected)
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
  .space {
    margin: 0 10px;
    cursor: pointer;
  }
  .unselected {
    opacity: 0.2;
  }
}
</style>