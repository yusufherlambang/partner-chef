const Model = require("../models/model");


class Controller {
    static landingPage(req, res) {
    res.render('landingPage')
    }

    static getChefs(req, res) {
        Model.getChefs((err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                let obj = {
                    data: data
                }
                res.render('showChefs', obj)
            }
        })
    }

    static getChefDetailDuration (req, res) {
        Model.getChefDetailDuration((err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                let obj = {
                    data: data
                }
                res.render('showChefsDetailDuration', obj)
            }
        })
    }   

    static getRecipes (req, res) {
        let keySearch = req.query.search
        Model.getRecipes(keySearch, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                let obj = {
                    data: data
                }
                res.render('showRecipes', obj)
            }
        })
    }   

    static addFormRecipes(req, res)  {
        let errors = req.query.errors
        Model.getChefs((err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.render('addForm', {data, err: errors})
            }
        })
    }

    static addNewRecipes(req, res) {
        let {name, duration, category, notes, imageUrl, ChefId, createdDate} = req.body
        Model.addNewRecipes(name, duration, category, notes, imageUrl, ChefId, createdDate, (err, data) => {
            if (err) {
                console.log(err);
                res.redirect(`/recipes/add?errors=${err}`)
            } else {
                res.redirect(`/recipes`)
            }
        })
    }

    static getRecipeDetailById (req, res) {
        let id = req.params.id
        Model.getRecipeDetailById(id, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                let obj = {
                    data: data
                }
                res.render('showRecipeDetailById', obj)
            }
        })
    }   

    static editFormRecipe(req, res)  {
        let id = req.params.id
        let errors = req.query.errors
         Model.getRecipeDetailById(id, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.render('editForm', {data, err: errors})
            }
        })
    }

    static editRecipe(req, res) {
        let id = req.params.id
        let {name, duration, category, notes, imageUrl, ChefId, createdDate} = req.body
        Model.editRecipe(id, name, duration, category, notes, imageUrl, ChefId, createdDate, (err, data) => {
            if (err) {
                console.log(err);
                res.redirect(`/recipes/${id}/edit?errors=${err}`)
            } else {
                res.redirect(`/recipes`)
            }
        })
    }

    static deleteRecipe(req, res) {
       let id = req.params.id
        Model.deleteRecipe(id, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.redirect('/recipes')
            }
        })
    }

    static voteRecipe (req, res) {
      let {id} = req.params;
      Model.voteRecipe(id, (err, data)=> {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.redirect(`/recipes/${id}`)
            }
      })
   }
}

module.exports = Controller