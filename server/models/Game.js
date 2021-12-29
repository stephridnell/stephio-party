const mongoose = require('mongoose')
const { Schema } = require('mongoose')
import Team from './Team'

const schema = new Schema({
  roomCode: {
    type: String,
    required: true
  },
  turns: {
    type: Number,
    default: 10,
    required: true
  },
  currentTurn: {
    type: Number
  },
  currentTurnPlayer: {
    type: String
  },
  includedMinigames: {
    type: Array,
    default: []
  },
  teams: [Team]
}, {
  timestamps: true
})

const model = mongoose.model('Game', schema)

module.exports = model