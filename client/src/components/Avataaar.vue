<template>
  <div class="avataaar">
    <img class="new-avatar" :src="imgUrl" />
    <button @click="randomise" class="d-flex ai-center jc-sb white text-16 text-bold mt-12">
      <v-icon class="mr-6" name="random" />
      Randomise
    </button>
  </div>
</template>

<script>
import accessoriesTypes from './avataaarTypes/accessories'
import clotheColours from './avataaarTypes/clothe-colours'
import clothesType from './avataaarTypes/clothes'
import eyebrowTypes from './avataaarTypes/eyebrows'
import eyeTypes from './avataaarTypes/eyes'
import facialHairTypes from './avataaarTypes/facial-hair'
import graphicShirtTypes from './avataaarTypes/graphic-shirt'
import hairColours from './avataaarTypes/hair-colours'
import mouthTypes from './avataaarTypes/mouth'
import skinColours from './avataaarTypes/skin-colours'
import topTypes from './avataaarTypes/top'

export default {
  name: 'Avataaar',
  data () {
    return {
      accessoriesTypeValue: 'Blank',
      avatarStyle: 'Circle',
      baseUrl: 'https://avataaars.io/',
      clotheColorValue: 'Blank',
      clotheTypeValue: 'Blank',
      eyebrowTypeValue: 'Blank',
      eyeTypeValue: 'Blank',
      facialHairTypeValue: 'Blank',
      graphicTypeValue: 'Blank',
      hairColorValue: 'Blank',
      mouthTypeValue: 'Blank',
      skinColorValue: 'Blank',
      topTypeValue: 'Blank'
    }
  },
  mounted () {
    this.randomise()
  },
  methods: {
    randomise () {
      this.accessoriesTypeValue = this.getRandomChoice(accessoriesTypes)
      this.clotheColorValue = this.getRandomChoice(clotheColours)
      this.clotheTypeValue = this.getRandomChoice(clothesType)
      this.eyebrowTypeValue = this.getRandomChoice(eyebrowTypes)
      this.eyeTypeValue = this.getRandomChoice(eyeTypes)
      this.facialHairTypeValue = this.getRandomChoice(facialHairTypes)
      this.graphicTypeValue = this.getRandomChoice(graphicShirtTypes)
      this.hairColorValue = this.getRandomChoice(hairColours)
      this.mouthTypeValue = this.getRandomChoice(mouthTypes)
      this.skinColorValue = this.getRandomChoice(skinColours)
      this.topTypeValue = this.getRandomChoice(topTypes)

      this.$emit('randomised', this.imgUrl)
    },
    getRandomChoice (items) {
      const itemsLength = items.length
      return items[Math.floor(Math.random() * itemsLength)]
    }
  },
  computed: {
    imgUrl () {
      return [`${this.baseUrl}?`,
        `topType=${this.topTypeValue}&`,
        `accessoriesType=${this.accessoriesTypeValue}&`,
        `hairColor=${this.hairColorValue}&`,
        `facialHairType=${this.facialHairTypeValue}&`,
        `clotheType=${this.clotheTypeValue}&`,
        `clotheColor=${this.clotheColorValue}&`,
        `graphicType=${this.graphicTypeValue}&`,
        `eyeType=${this.eyeTypeValue}&`,
        `eyebrowType=${this.eyebrowTypeValue}&`,
        `mouthType=${this.mouthTypeValue}&`,
        `skinColor=${this.skinColorValue}&`
      ].join('')
    }
  }
}
</script>

<style>
.new-avatar {
  width: 200px;
  height: 200px;
}
.avataaar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>