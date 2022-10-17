const mysql = require("mysql2");
// let connection = null;
// const instance = () => {
//   if (connection === null) {
//     connection = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       database: "dw_result_football",
//       password: "1234",
//     });
//     return connection;
//   } else {
//     return connection;
//   }
// };
const instance = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "dw_result_football",
    password: "1234",
  })
  .promise();

exports.instance = instance;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "dw_result_football",
  password: "1234",
})
exports.connection= connection
