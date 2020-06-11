const router = require('express').Router()
const ThirdPartyController = require('../controllers/ThirdPartyController')

router.get('/getdata/:country', ThirdPartyController.getdata)

module.exports = router