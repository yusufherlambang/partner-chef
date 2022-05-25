const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.getChefs)

router.get('/detail', Controller.getChefDetailDuration)

module.exports = router