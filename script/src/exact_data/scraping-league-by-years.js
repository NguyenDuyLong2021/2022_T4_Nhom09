const puppeteer = require("puppeteer");
const scrapingLeagueByYears = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.flashscore.com/football/england/premier-league/archive/"
  );
  /*
    this function below used to scraping link to league all years
  */
  const listLinkLeagueByYears = await page.evaluate(() => {
    let linkLeagueByYears = [];
    const leagueByYears = document.getElementsByClassName("archive__row");
    for (let index = 0; index < leagueByYears.length; index++) {
      linkLeagueByYears.push(
        leagueByYears[index]
          .querySelector(".archive__season a")
          .getAttribute("href")
      );
    }
    return linkLeagueByYears;
  });
  page.close();
  browser.close();
  return listLinkLeagueByYears;
};
exports.scrapingLeagueByYears = scrapingLeagueByYears;
