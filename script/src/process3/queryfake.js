//get all records of snapshot_result table
const getRecordsSnapshot = () =>
  `select id_match, name_league, home_team, away_team, time_start, match_day, goal_home_team, goal_away_team, referee, venue, attendance, round, status from ${process.env.DATABASE2}.${process.env.SNS}`;
exports.getRecordsSnapshot = getRecordsSnapshot;
//get id of name league
const getIdLeague = (nameLeague) =>
  `select id from ${process.env.DATABASE3}.${process.env.LD} where name_league="${nameLeague}"`;
exports.getIdLeague = getIdLeague;
//get id of team
const getIdTeam = (nameTeam) =>
  `select id from ${process.env.DATABASE3}.${process.env.TED} where name_team="${nameTeam}"`;
exports.getIdTeam = getIdTeam;
//get id of time
const getIdTime = (hour, miniute, second) =>
  `select id from ${process.env.DATABASE3}.${process.env.TD} where hour=${hour} and miniute=${miniute} and second = ${second}`;
exports.getIdTime = getIdTime;
//get id of date
const getIdDate = (day, month, year) =>
  `select id from ${process.env.DATABASE3}.${process.env.DD} where day=${day} and month=${month} and year = ${year}`;
exports.getIdDate = getIdDate;
//get id of reference
const getIdReference = (nameReference) =>
  `select id from ${process.env.DATABASE3}.${process.env.RED} where name_reference="${nameReference}"`;
exports.getIdReference = getIdReference;
//get id of venue
const getIdVenue = (venue, attendance) =>
  `select id from ${process.env.DATABASE3}.${process.env.VD} where name_venue="${venue}" and attendance ='${attendance}'`;
exports.getIdVenue = getIdVenue;
//get id of status
const getIdStatus = (status) =>
  `select id from ${process.env.DATABASE3}.${process.env.SD} where name_status="${status}"`;
exports.getIdStatus = getIdStatus;
//get id of round
const getIdRound = (round) =>
  `select id from ${process.env.DATABASE3}.${process.env.RD} where name_round="${round}"`;
exports.getIdRound = getIdRound;
exports.getIdRound = getIdRound;
//insert to result fact table
const insertFactResultTable = (
  id_match,
  id_league,
  id_date_start,
  id_time_start,
  goal_home_team,
  goal_away_team,
  id_home_team,
  id_away_team,
  id_reference,
  id_venue,
  id_round,
  id_status
) =>
  `insert into ${process.env.DATABASE3}.${process.env.RF} (id_match, id_league, id_date_start, id_time_start,goal_home_team,goal_away_team, id_home_team, id_away_team, id_reference, id_venue, id_round, id_status)
  values ("${id_match}", ${id_league}, ${id_date_start}, ${id_time_start}, ${goal_home_team}, ${goal_away_team},${id_home_team}, ${id_away_team}, ${id_reference}, ${id_venue}, ${id_round}, ${id_status})`;
exports.insertFactResultTable = insertFactResultTable;
