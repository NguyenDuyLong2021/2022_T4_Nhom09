const queryString = require("../../sql/query_string");
const transfer = async (connection) => {
  //get all record
  const [rs, fns] = await connection.instance.query(
    queryString.getRecordsSnapshot()
  );
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs.length; index++) {
    //get id of league
    const [rLeague, fl] = await connection.instance.query(
      queryString.getIdLeague(rs[index].name_league)
    );
    //get id of date
    const date = new Date(rs[index].match_day);
    const [rDate, fd] = await connection.instance.query(
      queryString.getIdDate(
        parseInt(date.getDate()),
        parseInt(date.getMonth()) + 1,
        parseInt(date.getFullYear())
      )
    );
    //get id of time
    const time = rs[index].time_start.split(":");
    const [rTime, ft] = await connection.instance.query(
      queryString.getIdTime(
        parseInt(time[0]),
        parseInt(time[1]),
        parseInt(time[2])
      )
    );
    //get id of venue
    const [rVenue, fv] = await connection.instance.query(
      queryString.getIdVenue(rs[index].venue, rs[index].attendance)
    );
    //get id of home team
    const [rHte, fhte] = await connection.instance.query(
      queryString.getIdTeam(rs[index].home_team)
    );
    //get id of away team
    const [rAte, fate] = await connection.instance.query(
      queryString.getIdTeam(rs[index].away_team)
    );
    //get id of status
    const [rS, fs] = await connection.instance.query(
      queryString.getIdStatus(rs[index].status)
    );
    //get id of round
    const [rR, fr] = await connection.instance.query(
      queryString.getIdRound(rs[index].round)
    );
    //get id of reference
    const [rRe, fre] = await connection.instance.query(
      queryString.getIdReference(rs[index].referee)
    );
    console.log(rAte, rDate, rHte, rLeague, rR, rRe, rS, rTime, rVenue);
    await connection.instance.query(
      queryString.insertFactResultTable(
        rs[index].id_match,
        rLeague[0].id,
        rDate[0].id,
        rTime[0].id,
        rHte[0].id,
        rAte[0].id,
        rRe[0].id,
        rVenue[0].id,
        rR[0].id,
        rS[0].id
      )
    );
  }
  await connection.instance.commit();
};
exports.transfer = transfer;
