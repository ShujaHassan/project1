const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // agar password hai toh yahan likho
  database: "dashboard", // apna database ka naam
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    return;
  }
  console.log("✅ MySQL Connected Successfully");
});

module.exports = connection;
