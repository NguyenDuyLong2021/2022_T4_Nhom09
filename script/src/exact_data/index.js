const fs = require("fs");
const slby = require("./scraping-league-by-years");
const sm = require("./scraping-main");
const connection = require("./connection/index");
let restart = true;
//name colums in file csv
const header =
  "HomeTeam,AwayTeam,TimeStart,ScoreForWinner,ScoreForLoser,Referee,Venue,Attendance,Round,Status\r\n";
// simple query
connection
  .instance()
  .query("SELECT * FROM configration", async (err, results, fields) => {
    console.log(results);
  });

//write name columns to file
// fs.writeFile("result-football.csv", header, "utf8", () => {});
//method below will scraping link of league all years (from 1990 to now)
// fs.readFile("result-football.csv", (err, data) => {
//   if (data.length == 0) {
//     // write name columns to file
//     fs.writeFile("result-football.csv", header, "utf8", () => {});
//   }
// });
// if (restart) {
//   restart = false;
//   //get pause position previous
//   const data = fs.readFileSync("pause.txt", "utf-8");
//   //method below will scraping link of league all years (from 1990 to now)
//   slby.scrapingLeagueByYears().then((listLink) => {
//     const linkPause = `/football/england/premier-league-${
//       data.split("\r\n")[0]
//     }/`;
//     console.log("=>", linkPause);
//     //check if list link contain link be pause previous
//     if (listLink.includes(linkPause)) {  
//       //start with index pause before
//       sm.scrapingMain(listLink, listLink.indexOf(linkPause));
//     } else {
//       //no containt link
//       //start index with 0
//       // const startIndex = 0;
//       // sm.scrapingMain(listLink, startIndex);
//     }
//   });
// } else {
//   //start index with 0
//   const startIndex = 0;
//   sm.scrapingMain(listLink, startIndex);
// }
// var state = "";
//  connection.openConnection().then((res) => {
//   console.log("=>",res);
// });
// const test = async () => {
//   await connection.instance().connect((err) => {
//     if (err) throw err;
//     console.log("connected=>");
//     return connection.instance().state
//   });
// };
// test().then((res) => {
//   console.log(res);
// });
