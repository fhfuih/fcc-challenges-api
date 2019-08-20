const Exercise = require('./exercise.model')
const User = require('./user.model')
const getDateQuery = require('./getDateQuery')
const { ValidationError } = require('../../errors/errors')

async function create (req, res) {
  const { userId, description, duration: du, date: da } = req.body
  const duration = parseInt(du, 10)
  const date = new Date(da)
  const user = userId ? await User.findById(userId) : null

  if (Number.isNaN(duration)) {
    throw new ValidationError('Invalid duration (must be an integer)')
  }
  if (date.toString() === 'Invalid Date') {
    throw new ValidationError('Invalid date (must be a date string e.g. 2000-01-01)')
  }
  if (!user) {
    throw new ValidationError('Invalid userId')
  }

  const doc = new Exercise({ userId, description, duration, date })
  await doc.save()
  res.json(doc)
}

async function list (req, res) {
  const { userId, from: f, to: t, limit: l } = req.query
  const from = f ? new Date(f) : undefined
  const to = t ? new Date(t) : undefined
  const limit = l ? parseInt(l, 10) : undefined

  if (!userId) {
    throw new ValidationError('Invalid userId')
  }
  if (from && from.toString() === 'Invalid Date') {
    throw new ValidationError('Invalid from (must be a date string e.g. 2000-01-01)')
  }
  if (to && to.toString() === 'Invalid Date') {
    throw new ValidationError('Invalid to (must be a date string e.g. 2000-01-01)')
  }
  if (Number.isNaN(limit) || limit <= 0) {
    // undefined is not NaN
    throw new ValidationError('Invalid limit (must be a positive integer)')
  }

  const query = {
    userId,
    ...(getDateQuery(from, to) || {})
  }
  const options = {
    sort: { date: 1 },
    ...(limit ? { limit } : {})
  }
  const data = await Exercise.find(query, null, options)
  res.json({ data })
}

module.exports = { create, list }
