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
  image: {
    type: String
  },
  ffa: {
    type: Boolean
  },
  team: {
    type: Boolean
  },
  single: {
    type: Boolean
  },
  dynamicCoinPrize: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const model = mongoose.model('Team', schema)

module.exports = model