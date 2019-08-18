const router = require('express-promise-router')()
const { create, get } = require('./shortUrl.controller')

router.post('/new', create)
router.get('/:id', get)

module.exports = router
