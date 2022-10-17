const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "techdak.studio",
  user: "techdaks_dw",
  password: "`1234Qwert",
  database: "techdaks_dw_db",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});
