const fs = require("fs");
const connection = require("../connection/index");
const queryString = require("../../sql/query_string");
const transfer2stagging = require("./transfer2stagging");

(async () => {
  //open connection
  await connection.open();
  // const [rows, fiedls] = await connection.instance.execute(
  //   "insert into stagging_result_football.date_dim (day, month, year) values (1,1,1)"
  // );
  const result = await connection.getStatus(process.env.EXTRACT_START);
  if (result.id == 1) {
    //  transfer2stagging.loadToStagging()
    const [rows, fiedls] = await connection.instance.query(
      queryString.getListNameFile()
    );
    //load data to snapshot_result table in stagging_result_football
    try {
      await connection.instance.beginTransaction();
      await connection.instance.query(
        queryString.loadRecordToStagging(rows[0].file_name)
      );
      await connection.instance.commit();
    } catch (error) {
      await connection.instance.rollback();
    }
    //transfer data to dim tables
    try {
      await connection.instance.beginTransaction();
      //load date dim
      await connection.instance.query(
        queryString.loadRecordToStagging(rows[0].file_name)
      );
      await connection.instance.commit();
    } catch (error) {
      await connection.instance.rollback();
    }
  }
})();
