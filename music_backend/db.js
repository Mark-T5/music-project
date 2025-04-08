const mysql = require("mysql");

const db = mysql.createPool({
  host: "webcourse.cs.nuim.ie", 
  user: "p250128",   
  password: "fi5Uzooh1toosohf",
  database: "cs230_p250128", 
});

module.exports = db;
