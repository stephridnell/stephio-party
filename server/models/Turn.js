const { Schema } = require('mongoose')

const schema = new Schema({
  roll: { type: Number },
  space: { type: String }
}, {
  timestamps: true
})

module.exports = schema
