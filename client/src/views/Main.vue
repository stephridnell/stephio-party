<template>
  <div id="game-wrapper">
    <div v-if="!isHostConnected">
      host is disconnected, plz wait
    </div>
    <host-view v-if="isHost"></host-view>
    <player-view v-else-if="gameId"></player-view>
    <div v-else>
      <button class="d-flex ai-center jc-sb" @click="newGame">
        New game
      </button>
      {{ errorMessage }}
      Game code: {{ gameId }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GameWrapper',
  components: {
    HostView: () => import('@/components/HostView.vue'),
    PlayerView: () => import('@/components/PlayerView.vue')
  },
  computed: {
    ...mapGetters({
      gameId: 'gameId',
      isHost: 'isHost',
      isHostConnected: 'isHostConnected',
      errorMessage: 'errorMessage'
    })
  },
  methods: {
    newGame () {
      this.resetError()
      this.$socket.emit('hostCreateNewGame')
    },
    resetError () {
      this.$store.commit('SET_ERROR', '')
    }
  }
}
</script>

<style lang="scss">
.d-flex {
  display: flex;
}
.ai-center {
  align-items: center;
}
.jc-sb {
  justify-content: space-between;
}
@for $i from 0 through 500 {
  .mt-#{$i} {
    margin-top: #{$i}px !important;
  }
  .mb-#{$i} {
    margin-bottom: #{$i}px !important;
  }
  .mtb-#{$i} {
    margin-bottom: #{$i}px !important;
    margin-top: #{$i}px !important;
  }
  .ml-#{$i} {
    margin-left: #{$i}px !important;
  }
  .mr-#{$i} {
    margin-right: #{$i}px !important;
  }
  .mlr-#{$i} {
    margin-left: #{$i}px !important;
    margin-right: #{$i}px !important;
  }
  .m-#{$i} {
    margin: #{$i}px !important;
  }
  .pt-#{$i} {
    padding-top: #{$i}px !important;
  }
  .pb-#{$i} {
    padding-bottom: #{$i}px !important;
  }
  .ptb-#{$i} {
    padding-bottom: #{$i}px !important;
    padding-top: #{$i}px !important;
  }
  .pl-#{$i} {
    padding-left: #{$i}px !important;
  }
  .pr-#{$i} {
    padding-right: #{$i}px !important;
  }
  .plr-#{$i} {
    padding-left: #{$i}px !important;
    padding-right: #{$i}px !important;
  }
  .p-#{$i} {
    padding: #{$i}px !important;
  }
}
</style>
