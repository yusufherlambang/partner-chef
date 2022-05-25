const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const routeChefs = require('./routeChefs')
const routeRecipe = require('./routeRecipe')

router.get('/', Controller.landingPage)

router.use('/chefs', routeChefs)
router.use('/recipes', routeRecipe)

module.exports = router