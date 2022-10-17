const fs = require("fs");
const queryString = require("../../sql/query_string");
const sim = require("./scraping_id_match");
const poolIns = require("../connection/index");
/*
 */
(async () => {
  //name contactor
  const full_name = "Nguyễn Dũy Long";
  const pool = poolIns.instance
  //date current
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const next_year = year + 1;
  /*
  year of the league 
  Ex: 2022-2023
  */
  const year_leagues = `${year}-${next_year}`;
  const stringQuery = queryString.queryGetConfigPE(year_leagues, full_name);
  const promisePool = pool;
  const [rows, fiels] = await promisePool.query(stringQuery);
  console.log(rows);
  // create name file
  const name_file = `${
    rows[0].source_name
  }_result_football.${year}-${month}-${day}_scraping-${rows[0].ftp.substring(
    6,
    rows[0].ftp.length
  )}.csv`;
  const header = `IDMatch,LeagueName,HomeTeam,AwayTeam,TimeStart,Date,Gwinner,GLoser,Referee,Venue,Attendance,Round,Status\r\n`;
  // create a new file and add header in to file csv
  fs.writeFile(`${rows[0].source_location}/${name_file}`, header, (err) => {
    console.log("create file success!");
  });
  /*
  input:
  - source name
  - branch of source name
  - name of file saved to location
  - row id source name
  */
  sim.scraping_id_match_by_specfific_day(
    rows[0].source_name,
    rows[0].branch,
    name_file,
    rows[0].source_location,
    rows[0].id_source_name,
    rows[0].ftp,
    rows[0].user_name,
    rows[0].password
  );
})();
