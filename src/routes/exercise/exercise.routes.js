const router = require('express-promise-router')()
const { create: createUser, get: getUser, list: listUser } = require('./user.controller')
const { create: createExercise, list: listExercise } = require('./exercise.controller')

router.get('/log', listExercise)
router.post('/new', createExercise)

router.get('/user/:username', getUser)
router.get('/user', listUser)
router.post('/user/new', createUser)

module.exports = router
