const { log } = require("console");
const fs = require("fs");
const {
  loadRecordToStagging,
  updateStatusSrapinglog,
} = require("../../sql/query_string");
const pathTo = "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/";
const pathFrom = "D:/js/scraping/ver-01/results/";
const copyFile = (nameFile, instance) => {
  fs.copyFile(`${pathFrom}${nameFile}`, `${pathTo}${nameFile}`, (err) => {
    if (err) throw err;
    console.log(`copy file ${nameFile} success!\nNext step`);
    instance.query(loadRecordToStagging(nameFile), (err, results, field) => {
      if (err) {
        instance.execute(
          updateStatusSrapinglog(2, nameFile),
          (err, results, fields) => {
            console.log("error while load file");
          }
        );
        throw err;
      }
      console.log(`load file ${nameFile} success`);
      instance.execute(
        updateStatusSrapinglog(1, nameFile),
        (err, results, fields) => {
          console.log("update status file sucess");
        }
      );
    });
  });
};
exports.copyFile = copyFile;
