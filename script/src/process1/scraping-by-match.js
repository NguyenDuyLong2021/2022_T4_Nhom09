const { log } = require("console");
const fs = require("fs");
const stringQuery = require("../../sql/query_string");
const pool = require("../connection/index");
const uftf = require("./upload_file_to_ftp");
require("dotenv").config({ path: "../../.env" });
/*
  function scrapingResutByMatch() used to sraping result by the match with paramaster
  - listID: list id of all match in a year
  - browser: browser passed from function scrapingMain
  - listLink: list of all league all years
  - index: index current link league by year
*/
const scrapingResutByMatch = async (
  listID,
  browser,
  order,
  name_file,
  list_result_by_date,
  source_name,
  branch,
  ftp,
  user_name,
  password
) => {
  const instance = pool.instance;
  const [rows, fiedls] = await instance.query(
    stringQuery.getBranchPEM(process.env.SUB_BRANCH1)
  );
  //generate a new page
  let newPage = await browser.newPage();
  //slice string id beacause it is have format g_1_xxxxxx
  const id = listID[order].slice(4);
  console.log(`Scraping to page with id ${id}`);
  console.log(source_name);
  console.log(branch);
  try {
    await newPage.goto(`https://${source_name}${rows[0].branch}${id}`, {
      waitUntil: "networkidle0",
    });
    const result = await newPage.evaluate(
      (order, listID) => {
        let row = ""; //new row
        let homeTeam = ""; //name home team
        try {
          homeTeam = document.querySelector(
            ".duelParticipant__home .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get home_team");
        }
        let awayTeam = ""; // name away team
        try {
          awayTeam = document.querySelector(
            ".duelParticipant__away .participant__participantNameWrapper .participant__participantName .participant__participantName"
          ).textContent;
        } catch (error) {
          console.log("error while get away_team");
        }
        let date_and_time = ""; // date and time of the match
        try {
          date_and_time = document.querySelector(
            ".duelParticipant__startTime div"
          ).textContent;
        } catch (error) {
          console.log("error while get date time of the match");
        }
        let goalHomeTeam = ""; // goal home team
        try {
          goalHomeTeam = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).firstChild.textContent;
        } catch (error) {
          console.log("error while get goal for winner");
        }
        let goalAwayTeam = ""; // goal away team
        try {
          goalAwayTeam = document.querySelector(
            ".detailScore__matchInfo .detailScore__wrapper"
          ).lastChild.textContent;
        } catch (error) {
          console.log("error while get score for loser");
        }
        const mathInfo = document.getElementsByClassName("mi__item__val");
        let referee = ""; // referee of the match
        try {
          referee = mathInfo[0].textContent;
        } catch (error) {
          console.log("error while get referee");
        }
        let venue = ""; // location of the match
        try {
          venue = mathInfo[1].textContent;
        } catch (error) {
          console.log("error while get venue");
        }
        let attendance = ""; //attendances to venue
        try {
          attendance = mathInfo[2].textContent;
        } catch (error) {
          console.log("error while get attendance");
        }
        let nameleague_and_round = ""; //name league and roud
        try {
          nameleague_and_round = document.querySelector(
            ".tournamentHeader__country a"
          ).textContent;
        } catch (error) {
          console.log("error while get name league and round");
        }
        let status = ""; //status of the match
        try {
          status = document.querySelector(
            ".fixedHeaderDuel__detailStatus"
          ).textContent;
        } catch (error) {
          console.log("error while get status");
        }
        const dateTime = date_and_time.split(" ");
        console.log(dateTime[0]);
        row += `${listID[order]},${
          nameleague_and_round.split("-")[0]
        },${homeTeam},${awayTeam},${dateTime[1]},${dateTime[0].split(".")[2]}-${
          dateTime[0].split(".")[1]
        }-${
          dateTime[0].split(".")[0]
        },${goalHomeTeam},${goalAwayTeam},${referee},${venue}, ${
          attendance.split(" ")[0]
        }${attendance.split(" ")[1]}, ${
          nameleague_and_round.split("-")[1]
        },${status}\r\n`;
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
    // fs.appendFileSync(`${source_location}/${name_file}`, result.data);
    /*
      check if isContinue is true then continue scraping result matchs
      and if isContinue is false then close browser, scraping new year
      final: all complete then log string "finish"
    */
    list_result_by_date += `${result.data}`;
    if (result.isContinue) {
      newPage.close();
      scrapingResutByMatch(
        listID,
        browser,
        order + 1,
        name_file,
        list_result_by_date,
        source_name,
        branch,
        ftp,
        user_name,
        password
      );
    } else {
      console.log("finish all!");
      fs.writeFile(
        `${process.env.PATH_STORE}${name_file}`,
        list_result_by_date,
        (err) => {
          if (err) throw err;
          uftf.uploadFileToFtpServer(
            ftp,
            user_name,
            password,
            process.env.PATH_STORE,
            name_file
          );
        }
      );
      // fs.appendFileSync(`${process.env.PATH_STORE}/${name_file}`, list_result_by_date);
    }
  } catch (error) {
    console.log("what's is error: ", error);
    browser.close();
  }
};
exports.scrapingResutByMatch = scrapingResutByMatch;
