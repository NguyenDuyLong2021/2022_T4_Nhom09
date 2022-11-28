const queryString = require("../../sql/query_string");
const updateStatus = async (connection, rows, status) => {
  for (let index = 0; index < rows.length; index++) {
    await connection.instance.execute(
      queryString.updateStatusSrapinglog(
        status,
        rows[index].file_name
      )
    );
  }
};
exports.updateStatus = updateStatus;
