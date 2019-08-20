const router = require('express-promise-router')()
const multer = require('multer')
const { getMetadata } = require('./file.controller')

router.use(multer().single('upfile'))
router.post('/', getMetadata)

module.exports = router
