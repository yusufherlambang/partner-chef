const pool = require("../config/connection")
const {Chef, ChefDetailDuration, Recipe, RecipeDetail} = require('./class')

class Model {
    static getChefs(callback) {
        let queryGetChefs = `SELECT * FROM "Chefs";`

        pool.query(queryGetChefs, (err, result) => {
            if (err) {
                callback(err)
            } else {
                let data = result.rows.map( el => {
                    let {id, fullName, birthDate, gender, city } = el
                    return new Chef(id, fullName, birthDate, gender, city)
                })
                callback(null, data)
            }   
        })
    }

    static getChefDetailDuration(callback) {
        let queryGetChefDetailDuration = `SELECT DISTINCT(c."fullName"),
            c."birthDate",
            c.gender,
            c.city,
            CAST(avg(r.duration)AS float ) AS "averageDuration" ,
            min(r.duration) AS "minDuration",
            max(r.duration) AS "maxDuration"
            FROM "Recipes" r 
	            JOIN "Chefs" c ON c.id = r."ChefId" 
	            GROUP BY c."fullName", c."birthDate", c.gender, c.city
	            ORDER BY c."fullName" ASC;`

        pool.query(queryGetChefDetailDuration, (err, result) => {
            if (err) {
                callback(err)
            } else {
                let data = result.rows.map( el => {
                    let {id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration} = el
                    return new ChefDetailDuration(id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration)
                })
                callback(null, data)
            }   
        })
    }

    static getRecipes(keySearch, callback) {
        let queryGetRecipes = `
            SELECT id, name, duration, category, "totalVote"  FROM "Recipes" r
            ORDER BY "totalVote" DESC;`

        if (keySearch) {
            queryGetRecipes = `
            SELECT id, name, duration, category, "totalVote"  FROM "Recipes" r
            WHERE name ILIKE '%${keySearch}%'
            ORDER BY "totalVote" DESC;`
        }
        
        pool.query(queryGetRecipes, (err, result) => {
            if (err) {
                callback(err)
            } else {
                let data = result.rows.map( el => {
                    let {id, name, duration, category, totalVote} = el
                    return new Recipe(id, name, duration, category, totalVote)
                })
                callback(null, data)
            }   
        })
    }

    static addNewRecipes(name, duration, category, notes, imageUrl, ChefId, createdDate, callback){
        let errors = Model.validation(name, duration, category, notes, imageUrl, ChefId, createdDate)

        if (!errors.length) {
            let queryGetChefName = `
                INSERT INTO "Recipes" (name, duration, category, "createdDate", notes, "imageUrl", "totalVote", "ChefId")
                VALUES ('${name}', '${duration}', '${category}', '${createdDate}', '${notes}', '${imageUrl}', 0, '${ChefId}');`
    
            pool.query(queryGetChefName, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null)
                }   
            })            
        } else {
           callback(errors) 
        }
    }

    static getRecipeDetailById(id, callback) {
        let queryGetRecipeDetailById = `
            SELECT r.*, c."fullName" AS "chefName" 
            FROM "Recipes" r
	            JOIN "Chefs" c ON c.id = r."ChefId" 
                WHERE r.id = ${id};`

        pool.query(queryGetRecipeDetailById, (err, result) => {
            if (err) {
                callback(err)
            } else {
                let data = result.rows.map( el => {
                    let {id, name, duration, category, totalVote, createdDate, notes, imageUrl, ChefId, chefName} = el
                    return new RecipeDetail(id, name, duration, category, totalVote, createdDate, notes, imageUrl, ChefId, chefName)
                })
                callback(null, data)
            }   
        })
    }

    static editRecipe(id, name, duration, category, notes, imageUrl, ChefId, createdDate, callback){
        let errors = Model.validation(name, duration, category, notes, imageUrl, ChefId, createdDate)
        
        if (!errors.length) {
            let queryEditRecipe = `
                UPDATE "Recipes"
                    SET name = '${name}', duration  = '${duration}', category = '${category}', "createdDate" = '${createdDate}',
                    notes = '${notes}', "imageUrl" = '${imageUrl}', "ChefId" = '${ChefId}'
                    WHERE id = ${id};`
    
            pool.query(queryEditRecipe, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null)
                }   
            })           
        } else {
            callback(errors)
        }
    }

    static deleteRecipe(id, callback) {
        let queryDelete = `
            DELETE FROM "Recipes"
                WHERE id = ${id};`

        pool.query(queryDelete, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }   
        })
    }

    static voteRecipe(id, callback){
        let queryVoteRecipe = `
            UPDATE "Recipes" 
                SET "totalVote" = "totalVote" + 1
                WHERE id = ${id};`

        pool.query(queryVoteRecipe, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }   
        })
    }

    static validation(name, duration, category, notes, imageUrl, ChefId, createdDate) {
        let errors = []
        if (!name) {
            errors.push(`Name is required`)
        } else if (name.length > 100) {
            errors.push(`Recipe name maximun 100 character`)
        }
        if (!duration) {
            errors.push(`duration is required`)
        } else if (duration < 1) {
            errors.push(`duration minimum 1 minute`)
        }
        if (!category) {
            errors.push(`category is required`) 
        } 
        if (!notes) {
            errors.push(`notes is required`)
        } else if (notes.split(' ').length < 10 ) {
            errors.push(`Minimum words in notes is 10`)
        }
        if (!imageUrl) {
            errors.push(`imageUrl is required`)
        } else if (imageUrl.length > 50) {
            errors.push(`imageUrl maximun 50 character`)
        }
        if (!ChefId) {
            errors.push(`ChefId is required`)
        }
        if (!createdDate) {
            errors.push(`createdDate is required`)
        } else if (new Date(createdDate) > new Date()) {
            errors.push(`maximum createdDate is today`)
        }

        return errors
    }

}

module.exports = Model