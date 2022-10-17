const ftp = require("basic-ftp");

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
        console.log("Uploaded to ftp server");
    });
  } catch (error) {
    console.log("whats error: ", error);
  }
};
exports.uploadFileToFtpServer = uploadFileToFtpServer;
// /results