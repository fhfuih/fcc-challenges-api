const router = require('express-promise-router')()
const { timestamp } = require('./timestamp.controller')

router.get('/:time', timestamp)

module.exports = router
