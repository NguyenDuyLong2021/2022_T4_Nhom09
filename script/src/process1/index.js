const fs = require("fs");
const queryString = require("../../sql/query_string");
const connection = require("../connection/index");
const sim = require("../process1/scraping_id_match");
const stringQuery = require("../../sql/query_string");
const dateUtils = require("../utils/date");
require("dotenv").config({ path: "../../.env" });
(async () => {
  //open connection
  await connection.open();
  const isReady = await connection.getStatus(process.env.EXTRACT_READY);
  /*
  if is isReady !=-1 then start schule and isReady is -1 then stop
  */
  if (isReady == -1) {
    //get config data
    const config = await connection.getContentCongig();
    // [
    //   {
    //     source_name: 'www.flashscore.com',
    //     id_source_name: 1,
    //     source_location: 'D:/js/scraping/ver-01/results',
    //     branch: '/football/england/premier-league-2022-2023/results/',
    //     ftp: 'techdak.studio',
    //     id_contact: 2,
    //     user_name: 'dw@techdak.studio',
    //     password: '`1234Qwert'
    //   }
    // ]
    //create name file
    const name_file = `${
      config[0].source_name
    }_result_football.${dateUtils.getDate()}-${
      dateUtils.getMonth() + 1
    }-${dateUtils.getDate()}_scraping-${config[0].ftp.substring(
      6,
      config[0].ftp.length
    )}.csv`;
    //insert new log
    const [rows, fiedls] = await connection.instance.execute(
      stringQuery.insertLog(
        config[0].id_source_name,
        name_file,
        `${dateUtils.getDate()}-${
          dateUtils.getMonth() + 1
        }-${dateUtils.getDate()}`,
        process.env.EXTRACT_READY
      )
    );
    //get ids all math in the round
    sim.scraping_id_match_by_specfific_day(
      // `${dateUtils.getDate()}.${dateUtils.getMonth()}.`,
      "13.11.",
      name_file
    );
  }
})();
