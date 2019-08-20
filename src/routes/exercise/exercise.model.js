const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    validate: Number.isInteger
  },
  date: {
    type: Date,
    required: true
  }
}, {
  capped: 4096,
  collection: 'Exercise'
})

module.exports = mongoose.model('Exercise', exerciseSchema)
