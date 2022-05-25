const pool = require('./config/connection')
const fs = require('fs')

let chefs = fs.readFileSync('./data/chefs.json', 'utf-8')
chefs = JSON.parse(chefs)
.map(chef => {
    let newChefs = `('${chef.fullName}', '${chef.birthDate}', '${chef.gender}', '${chef.city}')`
    return newChefs
})
.join(',\n')

let recipes = fs.readFileSync('./data/recipes.json', 'utf-8')
recipes = JSON.parse(recipes)
.map(rec => {
    let newRecipes = `('${rec.name}', '${rec.duration}', '${rec.category}', '${rec.createdDate}', '${rec.notes}', '${rec.imageUrl}', '${rec.totalVote}', '${rec.ChefId}')`
    return newRecipes
})
.join(',\n')

let queryInsertChefs = `
INSERT INTO "Chefs" ("fullName", "birthDate", gender, city)
VALUES ${chefs};`

let queryInsertRecipes = `
INSERT INTO "Recipes" (name, duration, category, "createdDate", notes, "imageUrl", "totalVote", "ChefId")
VALUES ${recipes};`

pool.query(queryInsertChefs, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`ERROR CHEFS`);
    } else {
        console.log('Insert into Chefs table successfully');
        pool.query(queryInsertRecipes, (err, res) => {
            if (err) {
                console.log(err);
                console.log(`ERROR RECIPES`);
            } else {
                console.log('Insert into Recipes table successfully');
            }
        })
    }
})