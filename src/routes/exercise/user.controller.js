const User = require('./user.model')
const { ValidationError, NotFoundError } = require('../../errors/errors')

async function create (req, res) {
  const { username } = req.body
  const existed = await User.findOne({ username })
  if (existed) {
    throw new ValidationError(`User with username ${username} is already existed`)
  }

  const doc = new User({ username })
  await doc.save()
  res.json(doc)
}

async function get (req, res) {
  const { username } = req.params
  const doc = await User.findOne({ username })
  if (!doc) {
    throw new NotFoundError(`User with username ${username} is not found`)
  }
  res.json(doc)
}

async function list (req, res) {
  const data = await User.find()
  res.json({ data })
}

module.exports = { create, get, list }
