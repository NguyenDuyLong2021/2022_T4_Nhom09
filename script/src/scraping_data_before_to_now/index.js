const fs = require("fs");
const slby = require("./scraping-league-by-years");
const sm = require("./scraping-main");
//name colums in file csv
const header = `IDMatch,LeagueName,HomeTeam,AwayTeam,TimeStart,Date,Gwinner,GLoser,Referee,Venue,Attendance,Round,Status\r\n`;
fs.writeFile(`D:/js/scraping/ver-01/results/all.csv`, header, (err) => {
  console.log("create file success!");
});
slby.scrapingLeagueByYears().then((listLink) => {
  //start index with 0
  const startIndex = 0;
  sm.scrapingMain(listLink, startIndex);
});
