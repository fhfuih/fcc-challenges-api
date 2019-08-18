const router = require('express-promise-router')()
const { whoAmI } = require('./whoAmI.controller')

router.get('/', whoAmI)

module.exports = router
