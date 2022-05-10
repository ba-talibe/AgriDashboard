const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool =  mysql.createPool({
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE
})

module.exports = pool.promise()
