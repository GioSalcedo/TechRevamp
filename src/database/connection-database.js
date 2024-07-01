const {createPool} = require("mysql2/promise");

const pool = createPool({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'password',
  database: 'techrevamp'
})

module.exports = pool;