const fs = require("fs");
const connection = require("../connection/index");
const udd = require("./updateDateDim");
const utd = require("./updateTimeDim");
const uvd = require("./updateVenueDim");
const uted = require("./updateTeamDim");
const usd = require("./updateStatusDim");
const urd = require("./updateRoundDim");
const uld = require("./updateLeagueDim");
const ured = require("./updateReferenceDim");
const tdrf = require("./transferDataResultFact");
const queryString = require("../../sql/query_string");
const us = require("./updateStatusLog");
// const transfer2stagging = require("./transfer2stagging");

(async () => {
  //open connection
  await connection.open();
  // const [rows, fiedls] = await connection.instance.execute(
  //   "insert into stagging_result_football.date_dim (day, month, year) values (1,1,1)"
  // );
  const result = await connection.getStatus(process.env.EXTRACT_START);
  console.log(result);
  if (result.id > 0) {
    //  transfer2stagging.loadToStagging()
    const [rows, fiedls] = await connection.instance.query(
      queryString.getListNameFile()
    );
    try {
      await connection.instance.beginTransaction();
      for (let index = 0; index < rows.length; index++) {
        //load data to snapshot_result table in stagging_result_football
        await connection.instance.query(
          queryString.loadRecordToStagging(rows[index].file_name)
        );
      }
      //query to load data to dim tables
      const arrayQuery = [
        queryString.transferDataDateDim1,
        queryString.transferDataLeagueDim1,
        queryString.transferDataReferenceDim1,
        queryString.transferDataRoundDim1,
        queryString.transferDataStatusDim1,
        queryString.transferDataTeamDim1,
        queryString.transferDataTimeDim1,
        queryString.transferDataVenueDim1,
      ];
      for (let index = 0; index < arrayQuery.length; index++) {
        //excute querys
        await connection.instance.query(arrayQuery[index]);
        // const [rs, fs] = await connection.instance.query(`select id from ${arrayQuery[index].split(" ")[2]}`)
        // console.log(rs);
      }
      await connection.instance.commit();
      console.log("finish");
    } catch (error) {
      console.log(error);
      await connection.instance.rollback();
      //update status logs
      us.updateStatus(connection, rows, process.env.STAGGING_FAIL);
    }
    //update id tables dim
    try {
      await connection.instance.beginTransaction();
      uted.updateTeamDim(connection);
      udd.updateDateDim(connection);
      utd.updateTimeDim(connection);
      uvd.updateVenueDim(connection);
      usd.updateStatusDim(connection);
      urd.updateRoundDim(connection);
      uld.updateLeagueDim(connection);
      await ured.updateReferenceDim(connection);
      tdrf.transfer(connection);
      await connection.instance.commit();
      //update status logs
      us.updateStatus(connection, rows, process.env.STAGGING_SUCCESS);
    } catch (error) {
      console.log(error);
      await connection.instance.rollback();
      us.updateStatus(connection, rows, process.env.STAGGING_FAIL);
    }
  }
})();
