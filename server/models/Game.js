const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Team = require('./Team')

const schema = new Schema({
  roomCode: {
    type: String,
    required: true
  },
  hostId: {
    type: String,
    required: true
  },
  turns: {
    type: Number,
    default: 20,
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
  completed: {
    type: Boolean,
    default: false
  },
  teams: [Team]
}, {
  timestamps: true
})

const model = mongoose.model('Game', schema)

module.exports = model