const ftp = require("basic-ftp");
const connection = require("../connection/index");
const queryString = require("../../sql/query_string");
require("dotenv").config({ path: "../../.env" });

const uploadFileToFtpServer = async (host, user, password, path, name_file) => {
  const client = new ftp.Client();
  try {
    console.log(`Preparing upload file to ${host}`);
    await client.access({
      host,
      user,
      password,
    });
    await client.uploadFrom(`${path}/${name_file}`, `/${name_file}`).then(()=>{
        connection.instance.execute(queryString.updateStatusSrapinglog(process.env.EXTRACT_START, name_file))
    });
  } catch (error) {
    connection.instance.execute(queryString.updateStatusSrapinglog(process.env.EXTRACT_FAIL, name_file))
  }
};
exports.uploadFileToFtpServer = uploadFileToFtpServer;
// /results