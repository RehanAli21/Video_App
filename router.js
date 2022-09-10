const router = require('express').Router()
const userroute = require('./routes/user_route')

router.use('/api/user', userroute)

module.exports = router
