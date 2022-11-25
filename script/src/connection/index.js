const mysql = require("mysql2");
const date = require("../utils/date");
const queryString = require("../../sql/query_string");
require("dotenv").config({path:"../../.env"})
let contentConfig = {};
const instance = mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE1,
    password: process.env.PASSWORD,
  })
  .promise();
const stringQuery = () => {
  return queryString.queryGetConfigPE(
    `${date.getYear()}-${date.getYear() + 1}`,
    process.env.USER_FTP
  );
};
const open = async () => {
  const [rows, fiels] = await instance
    .query(stringQuery())
    .then((r) => (contentConfig = r[0]));
};

const getContentCongig = () => contentConfig;
const getStatus = async (status) => {
  const result = await instance.query(queryString.checkStatus(status));
  const temp = result[0][0];
  return temp === undefined ? -1 : temp;
};
module.exports = {
  getContentCongig,
  open,
  getStatus,
  instance
};
