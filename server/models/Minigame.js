const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  rules: {
    type: String
  },
  imageName: {
    type: String
  },
  modes: {
    type: Array
  },
  coins: {
    type: Number
  },
  setPrize: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const model = mongoose.model('Minigame', schema)

module.exports = model