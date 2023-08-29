const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements:true
});

dbConnection.connect((err) => {
  if (err) {
    console.log(`X ${err.message}`);
  } else {
    console.log(`✓ Mysql Connected...`);
  }
});

module.exports = dbConnection;