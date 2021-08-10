const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

module.exports = connection;
// const mysql = require("mysql");
// const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
// const options = {
//   host: DB_HOST,
//   database: DB_NAME,
//   user: DB_USER,
//   password: DB_PASS,
// };

// const connection = mysql.createConnection(options);

// connection.connect();

// module.exports = connection;
