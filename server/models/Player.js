// dependencies
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  miniGameWins: {
    type: Number
  }
}, {
  timestamps: true
})

const model = mongoose.model('Player', schema)

module.exports = model