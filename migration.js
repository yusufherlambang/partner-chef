const pool = require('./config/connection')

let chefQuery = `CREATE TABLE IF NOT EXISTS "Chefs" (
    id SERIAL PRIMARY KEY,
	"fullName" varchar(120) NOT NULL,
    "birthDate" date  NOT NULL,
	gender varchar(6) NOT NULL,
    city varchar(20)  NOT NULL 
);`

let recipeQuery = `CREATE TABLE IF NOT EXISTS "Recipes" (
	id SERIAL PRIMARY KEY,
	name varchar(100),
	duration int,
	category varchar(10),
	"createdDate" date,
	notes text,
	"imageUrl" varchar(50),
	"totalVote" int,
	"ChefId" int NOT NULL,
	CONSTRAINT "ChefId"
		FOREIGN KEY ("ChefId") REFERENCES "Chefs" (id)
);`

pool.query(chefQuery, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        pool.query(recipeQuery, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Table created successfully`);
            }
        })
    }
})