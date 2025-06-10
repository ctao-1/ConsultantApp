const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'consult', // ← 注意是 database 而不是 dbname， dbname，pg 库会默认连到 postgres 数据库
  password: '123456',
  port: 5432
})

module.exports = pool

