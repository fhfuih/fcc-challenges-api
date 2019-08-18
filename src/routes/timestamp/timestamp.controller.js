const { ValidationError } = require('../../errors/errors')

function timestamp (req, res) {
  const { time } = req.params
  const timeSafe = Number(time) || time // if time is timestamp integer, parse it. Otherwise, use string as-is
  const parsed = new Date(timeSafe)
  if (!parsed.getTime()) {
    throw new ValidationError('Invalid Date')
  } else {
    res.json({
      unix: parsed.getTime(),
      utc: parsed.toUTCString()
    })
  }
}

module.exports = { timestamp }
