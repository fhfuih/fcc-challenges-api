const router = require('express-promise-router')()
const { create, get, list } = require('./shortUrl.controller')

router.post('/new', create)
router.get('/:id', get)
router.get('/', list)

module.exports = router
