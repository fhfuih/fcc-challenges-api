const router = require('express-promise-router')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const timestamp = require('./timestamp/timestamp.routes')
const whoAmI = require('./whoAmI/whoAmI.routes')
const shortUrl = require('./shortUrl/shortUrl.routes')

router.use(cors())
router.use(bodyParser.json({ strict: false }))
router.use(mongoSanitize())
router.use('/api/timestamp', timestamp)
router.use('/api/whoami', whoAmI)
router.use('/api/shorturl', shortUrl)

module.exports = router
