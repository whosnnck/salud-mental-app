const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nico1234",
  database: "salud_mental",
});

module.exports = pool.promise();
