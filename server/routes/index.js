const router = require("express").Router()
const thirdPartyAPIRoutes = require('./thirdPartyAPIRoutes.js')
const userRouter = require("./user")

router.use("/", userRouter)
router.use('/third-apis', thirdPartyAPIRoutes)

module.exports = router