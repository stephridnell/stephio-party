const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Player = require('./Player')

const schema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  teamCaptain: {
    type: String,
    required: true
  },
  players: [Player],
  avatar: {
    type: String
  },
  stars: {
    type: Number
  },
  coins: {
    type: Number
  },
  greenSpaces: {
    type: Number
  },
  maxCoins: {
    type: Number
  },
  miniGameCoins: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = schema