const { ValidationError, NotFoundError } = require('../errors/errors')
const MongooseValidationError = require('mongoose').Error.ValidationError

function errors (err, req, res, next) {
  console.warn(err)

  if (err instanceof ValidationError || err instanceof MongooseValidationError) {
    res.status(400).json({
      error: {
        message: err.message || 'Validation Error'
      }
    })
  } else if (err instanceof NotFoundError) {
    res.status(404).json({
      error: {
        message: err.message || 'Validation Error'
      }
    })
  } else {
    res.status(500).json({
      error: {
        message: 'Internal Server Error'
      }
    })
  }
}

module.exports = errors
