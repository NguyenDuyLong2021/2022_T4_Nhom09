/*
this modules using to scraping id match by round
with condition is day specific
*/
const puppeteer = require("puppeteer");
const sbm = require("./scraping-by-match");
const scraping_id_match_by_specfific_day = async (
  source_name,
  branch,
  file_name,
  source_location,
  id_source_name,
  ftp,
  user_name,
  password
  //   ...date
) => {
  //   const matchDays = date;
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)"
  );
  await page.goto(`https://${source_name}${branch}`, {
    waitUntil: "networkidle0", // using for single application
  });
  //   const
  const idList = await page.evaluate(() => {
    let idMatchs = [];
    const date = new Date();
    // const day_month = `${date.getDate()}.${
    //   date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    // }.`;
    const day_month = "28.08.";
    let items = document.querySelectorAll(".event__match");
    const time = document.querySelectorAll("div.event__time");
    items.forEach((item, index) => {
      /*
          check is match day
          Data on flashscore: 18.09. 22:30
          ex: day_month = 18.09. and time[index].textContent.split(" ")[0]=18.09. then result is true
          */
      if (time[index].textContent.split(" ")[0] === day_month) {
        idMatchs.push(item.getAttribute("id"));
      }
    });
    return idMatchs;
  });
  page.close();
  /*
    method below to scraping data resul of the match
    with index start is 0
  */
  const order = 0;
  sbm.scrapingResutByMatch(
    idList,
    browser,
    order,
    source_name,
    file_name,
    source_location,
    id_source_name,
    ftp,
    user_name,
    password
  );
};
exports.scraping_id_match_by_specfific_day = scraping_id_match_by_specfific_day;
