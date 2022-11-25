/*
this modules using to scraping id match by round
with condition is day specific
*/
const connection = require("../connection/index");
const dateUtils = require("../utils/date");
const puppeteer = require("puppeteer");
const sbm = require("./scraping-by-match");
const scraping_id_match_by_specfific_day = async (
  dayExtract, name_file
) => {
  const config = await connection.getContentCongig();
  //   const matchDays = date;
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)"
  );
  await page.goto(`https://${config[0].source_name}${config[0].branch}`, {
    waitUntil: "networkidle0", // using for single application
  });
  //   const
  const idList = await page.evaluate((dayExtract) => {
    let idMatchs = [];
    // const day_month = `${date.getDate()}.${
    //   date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    // }.`;
    // console.log(dateUtils.getDate());
    // const day_month =`${dateUtils.getDate()}.${dateUtils.getMonth()}.`
    // console.log(day_month);
    
    let items = document.querySelectorAll(".event__match");
    const time = document.querySelectorAll("div.event__time");
    items.forEach((item, index) => {
      /*
          check is match day
          Data on flashscore: 18.09. 22:30
          ex: day_month = 18.09. and time[index].textContent.split(" ")[0]=18.09. then result is true
          */
      if (time[index].textContent.split(" ")[0] === dayExtract) {
        idMatchs.push(item.getAttribute("id"));
      }
    });
    return idMatchs;
  }, dayExtract);
  page.close();
  /*
    method below to scraping data resul of the match
    with index start is 0
  */
  const order = 0;
  let list_result_by_date="IDMatch,LeagueName,HomeTeam,AwayTeam,TimeStart,Date,Gwinner,GLoser,Referee,Venue,Attendance,Round,Status\r\n";
  sbm.scrapingResutByMatch(
    idList,
    browser,
    order,
    name_file,
    list_result_by_date,
    config[0].source_name,
    config[0].branch,
    config[0].ftp,
    config[0].user_name,
    config[0].password,
    config[0].source_location
  );
};
exports.scraping_id_match_by_specfific_day = scraping_id_match_by_specfific_day;
