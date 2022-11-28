const connection = require("../connection/index");
const queryString = require("../../sql/query_string");
const us = require("../utils/updateStatusLog");
const lt = require("./loadDateDim");
const ld = require("./loadDateDim");
const lte = require("./loadTeamDim");
const lv = require("./loadVenueDim");
const ll = require("./loadLeagueDim");
const lr = require("./loadRoundDim");
const ls = require("./loadStatusDim");
const lre = require("./loadReferenceDim");
const lrs = require("./loadResultFootball");
(async () => {
  //open connection
  await connection.open();
  const result = await connection.getStatus(process.env.STAGGING_SUCCESS);
  const [rows, fiedls] = await connection.instance.query(
    queryString.getListNameFile(process.env.STAGGING_SUCCESS)
  );
  if (result.id > -1) {
    try {
      connection.instance.query("SET FOREIGN_KEY_CHECKS = 0; ");
      await connection.instance.beginTransaction();
      ld.loadDateDim(connection);
      lt.loadDateDim(connection);
      lte.loadTeamDim(connection);
      lv.loadVenueDim(connection);
      ll.loadLeagueDim(connection);
      lr.loadRoundDim(connection);
      ls.loadStatusDim(connection);
      lre.loadReferenceDim(connection);
      lrs.loadResultFootball(connection);
      console.log("finish");
      await connection.instance.commit();
      console.log("có rq ngoaid đây không");
      us.updateStatus(connection, rows, process.env.DW_SUCCESS);
      connection.instance.query(queryString.truncates);
      connection.instance.query("SET FOREIGN_KEY_CHECKS = 0; ");
    } catch (error) {
      await connection.instance.rollback();
      us.updateStatus(connection, rows, process.env.DW_FAIL);
    }
  }
  
})();
