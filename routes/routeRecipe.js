const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.getRecipes)


router.get('/add', Controller.addFormRecipes)
router.post('/add', Controller.addNewRecipes )

router.get('/:id', Controller.getRecipeDetailById)

router.get('/:id/edit', Controller.editFormRecipe)
router.post('/:id/edit', Controller.editRecipe)

router.get('/:id/delete', Controller.deleteRecipe)

router.get('/:id/vote', Controller.voteRecipe)

module.exports = router