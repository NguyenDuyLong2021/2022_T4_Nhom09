const connection = require("../connection/index");
require("dotenv").config({ path: "../../.env" });
const instance = connection.connection;
const stringQuery = require("../../sql/query_string");
const { copyFile } = require("./copyFile");
const fs = require("fs");
const loadToStagging = async () => {
  //delete all record in stagging
  await connection.instance
    .execute(stringQuery.getListNameFile(process.env.EXTRACT_START))
    .then(([rows, fiels]) =>
     rows.forEach(async(item) => {
     await connection.instance.execute(stringQuery.loadRecordToStagging(item.file_name))
  }));
  
  //copy files need load to stagging database
  // rows.forEach((item) => {
  //   fs.copyFile(
  //     `${process.env.PATH_STORE}${item.file_name}`,
  //     `${process.env.PATH_DES_LOAD}${item.file_name}`,
  //     (err) => {
  //       if (err) throw err;
  //       const [rs, fs] = async () =>
  //         await connection.instance.execute(
  //           stringQuery.loadRecordToStagging(item.file_name)
  //         );
  //     }
  //   );
  //   //load file into snapshot database
  //   // ,
  //   //   (err, result, fields) => {
  //   //     // if (err)
  //   //     // throw connection.instance.execute(
  //   //     //   queryString.updateStatusSrapinglog(
  //   //     //     process.env.STAGGING_FAIL,
  //   //     //     item.file_name
  //   //     //   )
  //   //     // );
  //   //     // connection.instance.execute(
  //   //     //   queryString.updateStatusSrapinglog(
  //   //     //     process.env.STAGGING_READY,
  //   //     //     item.file_name
  //   //     //   )
  //   //     // );
  //   //   }
  // });
  //   instance.execute(stringQuery.deleteRecords, (err, results, fields) => {
  //     if (err) throw err;
  //     console.log("Refresh finish");
  //   });
  // get file to load to stagging
  // instance.query(stringQuery.loadLogFile, (err, results, fields) => {
  //   if (err) throw err;
  //   results.forEach((item, index) => {
  //     if (index == results.length - 1) {
  //       instance.execute(stringQuery.loadRecordToDatabase(), (err, result, fields)=>{
  //         if(err) throw err
  //         console.log("load to database success");
  //       })
  //     }
  //   });
  // });
};
exports.loadToStagging = loadToStagging;
