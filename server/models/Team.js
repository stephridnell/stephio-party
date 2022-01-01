const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Player = require('./Player')

const schema = new Schema({
  teamName: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: ''
  },
  teamCaptain: {
    type: String,
    default: ''
  },
  players: [Player],
  avatar: {
    type: String
  },
  stars: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 0
  },
  greenSpaces: {
    type: Number,
    default: 0
  },
  maxCoins: {
    type: Number,
    default: 0
  },
  miniGameCoins: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

module.exports = schema