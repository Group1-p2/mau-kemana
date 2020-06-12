const router = require('express').Router()
const thirdPartyAPIRoutes = require('./thirdPartyAPIRoutes.js')

router.use('/third-apis', thirdPartyAPIRoutes)

module.exports = router