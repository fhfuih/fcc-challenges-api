const router = require('express-promise-router')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const timestamp = require('./timestamp/timestamp.routes')
const whoAmI = require('./whoAmI/whoAmI.routes')
const shortUrl = require('./shortUrl/shortUrl.routes')
const exercise = require('./exercise/exercise.routes')

router.use(cors())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json({ strict: false }))
router.use(mongoSanitize())
router.use('/api/timestamp', timestamp)
router.use('/api/whoami', whoAmI)
router.use('/api/shorturl', shortUrl)
router.use('/api/exercise', exercise)

module.exports = router
