<template>
  <div class="dice-wrapper">
    <div class="dice-box" ref="dice" @click="roll()">
      <div class="dice">
        <div class="side one">
          <div class="container">
            <div class="circle"></div>
          </div>
        </div>
        <div class="side two">
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="side three">
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="side four">
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="side five">
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="container">
            <div class="circle"></div>
          </div>
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
        <div class="side six">
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
          <div class="container">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      values: [
        'rotateX(360deg) rotateY(360deg) translate3d(32px, 0px, 0px)', //1
        'rotateX(-270deg) rotateY(190deg) translate3d(-50px, 0px, 0px)', //2
        'rotateX(-90deg) rotateY(20deg) translate3d(0px, 0px, 0px)', //3
        'rotateX(-180deg) rotateY(90deg) translate3d(0px, 0px, 32px)', //4
        'rotateX(0deg) rotateY(450deg) translate3d(0px, 0px, 0px)', //5
        'rotateX(-180deg) rotateY(0deg) translate3d(32px, 0px, 0px)', //6
        'rotateX(360deg) rotateY(-360deg) translate3d(0px,0px,0px)', //1
        'rotateX(450deg) rotateY(436deg) translate3d(0px,0px,0px)', //2
        'rotateX(-450deg) rotateY(-150deg) translate3d(0px,0px,0px)', //3
        'rotateX(360deg) rotateY(-450deg) translate3d(0px,0px,0px)', //4
        'rotateX(540deg) rotateY(630deg) translate3d(0px,0px,0px)', //5
        'rotateX(-540deg) rotateY(720deg) translate3d(0px,0px,0px)' //6
      ],
      currentValue: '',
      rolled: false
    }
  },
  methods: {
    resetRoll () {
      this.rolled = false
    },
    roll () {
      if (this.rolled) {
        return
      }
      do {
        var rotate = this.values[Math.floor(Math.random() * this.values.length)]
      } while (this.currentValue === rotate)
      this.currentValue = rotate
      this.$refs.dice.style.transform = rotate + 'scale3d(0.7,0.7,0.7)'
      let value = (this.values.indexOf(rotate) + 1) % 6
      if (value === 0) value = 6
      this.$emit('roll', value)
      this.rolled = true
    }
  }
}
</script>

<style lang="scss">
.dice-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  min-height: 400px;
}
.dice-box {
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateX(-20deg) rotateY(20deg) translate3d(-50px, -75px, 100px) scale3d(0.7, 0.7, 0.7);
  transition: 3s ease-out;
}
.dice {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
}
.dice .side {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 3px rgba(31, 38, 135, 0.37);
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-direction: column;
  backface-visibility: hidden;
}
.dice .side .container {
  display: flex;
  justify-content: space-around;
}
.dice .side .container .circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.player0 {
  .circle {
    background: var(--player0darker);
  }
}
.player1 {
  .circle {
    background: var(--player1darker);
  }
}
.player2 {
  .circle {
    background: var(--player2darker);
  }
}
.player3 {
  .circle {
    background: var(--player3darker);
  }
}

.dice .side.one {
  transform-origin: center top;
  transform: rotateX(0deg) translate3d(0px, 0px, 100px);
}
.dice .side.two {
  transform-origin: bottom;
  transform: rotateX(270deg) translate3d(0px, 100px, 0px);
}
.dice .side.three {
  transform-origin: top;
  transform: rotateX(90deg) translate3d(0px, -100px, 0px);
}
.dice .side.four {
  transform-origin: right;
  transform: rotateY(90deg) translate3d(100px, 0px, 0px);
}
.dice .side.five {
  transform-origin: left;
  transform: rotateY(-90deg) translate3d(-100px, 0px, 0px);
}
.dice .side.six {
  transform-origin: center center;
  transform: rotateX(-180deg) translate3d(0px, 0px, 100px);
}
.dice .side.one .container .circle {
  width: 70px;
  height: 70px;
}
.dice .side.two .container .circle {
  width: 60px;
  height: 60px;
}
.dice .side.three .container .circle {
  width: 50px;
  height: 50px;
}
.dice .side.three .container {
  transform: rotate(45deg);
}
.dice .side.five .container:first-child {
  transform: translateY(20px);
}
.dice .side.five .container:last-child {
  transform: translateY(-20px);
}
</style>