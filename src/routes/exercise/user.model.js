const mongoose = require('mongoose')
const shortid = require('shortid')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String,
    required: true
  }
}, {
  capped: 4096,
  collection: 'ExerciseUser'
})

module.exports = mongoose.model('ExerciseUser', userSchema)
