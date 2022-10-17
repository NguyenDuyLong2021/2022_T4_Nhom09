const fs = require("fs");
const sm = require("./scraping-main");
/*
  function scrapingResutByMatch() used to sraping result by the match with paramaster
  - listID: list id of all math in a year
  - browser: browser passed from function scrapingMain
  - listLink: list of all league all years
  - index: index current link league by year
*/
const scrapingResutByMatch = async (
  listID,
  browser,
  order,
  listLink,
  index
) => {
  //generate a new page 
  let newPage = await browser.newPage();
  //slice string id beacause it is have format g_1_xxxxxx
  const id = listID[order].slice(4);
  console.log(`Scraping to page with id ${id}`);
  try {
    await newPage.goto(
      `https://www.flashscore.com/match/${id}/#/match-summary/match-summary`,
      {
        waitUntil: "networkidle0",
      }
    );
    const result = await newPage.evaluate(
      (order, listID) => {
        let row = "";//new row
        let homeTeam = ""; //name home team
        try {
          homeTeam = document.querySelector(
            ".duelParticipant__home .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get home_team");
        }
        row += `${homeTeam},`;
        let awayTeam = ""; // name away team
        try {
          awayTeam = document.querySelector(
            ".duelParticipant__away .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get away_team");
        }
        row += `${awayTeam},`;
        let timeStart = ""; // time match started
        try {
          timeStart = document.querySelector(
            ".duelParticipant__startTime div"
          ).textContent;
        } catch (error) {
          console.log("error while get time start");
        }
        row += `${timeStart},`;
        let scoreForWinner = ""; // score for winner
        try {
          scoreForWinner = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).firstChild.textContent;
        } catch (error) {
          console.log("error while get score for winner");
        }
        row += `${scoreForWinner},`;
        let scoreFosLoser = ""; // score for loser
        try {
          scoreFosLoser = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).lastChild.textContent;
        } catch (error) {
          console.log("error while get score for loser");
        }
        row += `${scoreFosLoser},`;
        const mathInfo = document.getElementsByClassName("mi__item__val");
        let referee = ""; // referee of the match
        try {
          referee = mathInfo[0].textContent;
        } catch (error) {
          console.log("error while get referee");
        }
        row += `${referee},`;
        let venue = ""; // location of the match
        try {
          venue = mathInfo[1].textContent;
        } catch (error) {
          console.log("error while get venue");
        }
        row += `${venue},`;
        let attendance = ""; //attendances to venue
        try {
          attendance = mathInfo[2].textContent;
        } catch (error) {
          console.log("error while get attendance");
        }
        row += `${attendance},`;
        let round = ""; //name roud 
        try {
          round = document.querySelector(
            ".tournamentHeader__country a"
          ).textContent;
        } catch (error) {
          console.log("error while get round");
        }
        row += `${round},`;
        let status = ""; //status of the match
        try {
          status = document.querySelector(
            ".fixedHeaderDuel__detailStatus"
          ).textContent;
        } catch (error) {
          console.log("error while get status");
        }
        row += `${status}\r\n`;
        /*
          check if all id inside list visited ?
          if its not complete then a object inclues status isContinue: true and data => continue visit
          or if all visited then retuen a object with status isContinue: false and data => next steps 
        */
        if (order + 1 !== listID.length) {
          return {
            isContinue: true,
            data: row,
          };
        } else {
          return {
            isContinue: false,
            data: row,
          };
        }
      },
      order,
      listID
    );
    //write new line into file
    fs.appendFileSync("result-football.csv", result.data);
    /*
      check if isContinue is true then continue scraping result matchs
      and if isContinue is false then close browser, scraping new year
      final: all complete then log string "finish"
    */
    if (result.isContinue) {
      newPage.close();
      scrapingResutByMatch(listID, browser, order + 1, listLink, index);
    } else if (result.isContinue === false && index < listLink.length - 1) {
      browser.close();
      sm.scrapingMain(listLink, index + 1);
    } else {
      console.log("finish all!");
    }
  } catch (error) {
    console.log("what's is error: ", error);
    browser.close();
  }
};
exports.scrapingResutByMatch = scrapingResutByMatch;
