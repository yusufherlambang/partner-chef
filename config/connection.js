const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'partnerChefGthb',
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
})

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

module.exports = pool