require("dotenv").config({ path: "../../.env" });
//check exits record
const checkStatus = (status) =>
  `select id from control_db.scraping_log where status ='${status}'`;
exports.checkStatus = checkStatus;
//string query get config
const queryGetConfigPE = (year_leagues, full_name) => {
  return `SELECT 
    s.source_name,
    j.id_source_name,
    j.source_location,
    j.branch,
    j.ftp,
    j.id_contact,
    j.user_name,
    j.password
  FROM
    source_name s
        LEFT JOIN
    (SELECT DISTINCT
        c.id_source_name,
        c.source_location,
            bcn.branch,
            c.ftp,
            c.id_contact,
            ct.user_name,
            ct.password
    FROM
        contactor ct
    LEFT JOIN configration c ON ct.id = c.id_contact
    LEFT JOIN branch_source_name bcn ON c.id_source_name = bcn.id_source_name
    WHERE
        bcn.name_branch = 'PEAR-${year_leagues}'  and ct.full_name='${full_name}') j ON s.id = j.id_source_name`;
};
exports.queryGetConfigPE = queryGetConfigPE;
//string query get branch of source name from database
const getBranchPEM = (name_branch) =>
  `select branch from branch_source_name where name_branch = "${name_branch}" `;
exports.getBranchPEM = getBranchPEM;
//string query insert log into database
const insertLog = (id_config, file_name, date_log, status) => {
  return `insert into scraping_log (id_config, file_name, date_log, status) values(${id_config}, "${file_name}", "${date_log}", "${status}")`;
};
exports.insertLog = insertLog;
//string query load record from intermediary stagging to main database
const loadRecordToDatabase =
  () => `insert into dw_result_football.result_football (id_match, name_league, home_team, away_team, time_start, match_day, goal_home_team,
  goal_away_team, referee, venue, attendance, round, status ) select * from stagging_result_football.result_football`;
exports.loadRecordToDatabase = loadRecordToDatabase;
//string load record from csv file to stagging
const loadRecordToStagging = (
  nameFile
) => `load data infile "${process.env.PATH_DES_LOAD}${nameFile}" 
into table ${process.env.DATABASE2}.snapshot_result fields terminated by ","  lines terminated by "\n" ignore 1 rows 
(@id_match, @name_league, @home_team, @away_team, @time_start,
@match_day, @goal_home_team, @goal_away_team, @referee, @venue, @attendance, @round, @status) 
set id_match= if(@id_match='', 'unknown',@id_match )
,name_league= if(@name_league='', 'unknown',@name_league ),
home_team = if(@home_team='', 'unknown',@home_team),
away_team = if(@away_team = '', 'unknow', @away_team), 
time_start = if(@time_start = '', null, @time_start) ,
match_day= if(@match_day ='', null, @match_day),
goal_home_team = if(@goal_home_team ='', 0, @goal_home_team), 
goal_away_team = if(@goal_away_team, 0, @goal_away_team),
referee = if(@referee='','unknown', @referee),
venue = if(@venue='', 'unknown', @venue), 
attendance = if(@attendance='', 'unknown', @attendance),
round = if(@round = '', 'unknown', @round), 
status = if(@status='', 'unknown', @status);`;
exports.loadRecordToStagging = loadRecordToStagging;
//string load log file not load to stagging
const loadLogFile = `select file_name from scraping_log where status =0 `;
exports.loadLogFile = loadLogFile;
//detete records in stagging
const deleteRecords = "delete from stagging_result_football.result_football";
exports.deleteRecords = deleteRecords;
const updateStatusSrapinglog = (newStatus, file_name) =>
  `update ${process.env.DATABASE1}.scraping_log set status='${newStatus}' where file_name = '${file_name}'`;
exports.updateStatusSrapinglog = updateStatusSrapinglog;
const getListNameFile = () =>
  `select file_name from ${process.env.DATABASE1}.scraping_log where status = '${process.env.EXTRACT_START}'`;
exports.getListNameFile = getListNameFile;
const getListTablesTrancate = `SELECT
concat('Truncate table ',TABLE_NAME, ";") as command
FROM
information_schema.tables
WHERE
table_schema = "${process.env.DATABASE2}";`;
exports.getListTablesTrancate = getListTablesTrancate;
//transfer data to date dim
const transferDataDateDim1 = `insert into ${process.env.DATABASE2}.date_dim (day, month, year)  select distinct day(match_day), month(match_day), year(match_day) from ${process.env.DATABASE2}.snapshot_result;
`;
exports.transferDataDateDim1 = transferDataDateDim1;
//transfer data to time dim
const transferDataTimeDim1 = `insert into ${process.env.DATABASE2}.time_dim (hour, miniute, second)  select distinct hour(time_start), minute(time_start), second(time_start) from ${process.env.DATABASE2}.snapshot_result;
`;
exports.transferDataTimeDim1 = transferDataTimeDim1;
//transfer data to league dim
const transferDataLeagueDim1 = `insert into ${process.env.DATABASE2}.league_dim (name_league)  select distinct name_league from ${process.env.DATABASE2}.snapshot_result;
`;
exports.transferDataLeagueDim1 = transferDataLeagueDim1;
//transfer data to round dim
const transferDataRoundDim1 = `insert into ${process.env.DATABASE2}.round_dim (name_round)  select distinct round from ${process.env.DATABASE2}.snapshot_result;
`;
exports.transferDataRoundDim1 = transferDataRoundDim1;
//transfer data to status dim
const transferDataStatusDim1 = `insert into ${process.env.DATABASE2}.status_dim (name_status)  select distinct status from ${process.env.DATABASE2}.snapshot_result;
`;
exports.transferDataStatusDim1 = transferDataStatusDim1;
//transfer data to team dim
const transferDataTeamDim1 = `insert into ${process.env.DATABASE2}.team_dim (name_team) select distinct home_team as team from ${process.env.DATABASE2}.snapshot_result union select distinct away_team as team from ${process.env.DATABASE2}.snapshot_result ;`;
exports.transferDataTeamDim1 = transferDataTeamDim1;

//transfer data to venue dim
const transferDataVenueDim1 = `insert into ${process.env.DATABASE2}.venue_dim (name_venue, attendance)  select distinct venue, attendance from ${process.env.DATABASE2}.snapshot_result;`;
exports.transferDataVenueDim1 = transferDataVenueDim1;

//transfer data to reference dim
const transferDataReferenceDim1 = `insert into ${process.env.DATABASE2}.reference_dim (name_reference)  select distinct referee from ${process.env.DATABASE2}.snapshot_result;`;
exports.transferDataReferenceDim1 = transferDataReferenceDim1;
//enable foreign keys with mode is 0 or 1
const enableForeigKeysCheck = () => {
  return `SET FOREIGN_KEY_CHECKS = 0;`;
};
exports.enableForeigKeysCheck = enableForeigKeysCheck;
//truncate all tables in stagging database
const truncates = `
truncate snapshot_result;   
truncate date_dim;
truncate time_dim;
truncate league_dim;
truncate venue_dim;
truncate team_dim;
truncate round_dim;
truncate reference_dim;
truncate status_dim;
SET FOREIGN_KEY_CHECKS = 1; 
`;
exports.truncates = truncates;
//const get last index dim table
const getLastIndexDim = (mode) => {
  const arrayConst = [
    process.env.DD,
    process.env.TD,
    process.env.VD,
    process.env.RD,
    process.env.SD,
    process.env.RED,
    process.env.TED,
    process.env.LD,
  ];
  return arrayConst.includes(mode)
    ? `select id from ${process.env.DATABASE3}.${mode} order by id desc limit 1`
    : null;
};
exports.getLastIndexDim = getLastIndexDim;
//get all records of snapshot_result table
const getRecordsSnapshot = () =>
  `select id_match, name_league, home_team, away_team, time_start, match_day, goal_home_team, goal_away_team, referee, venue, attendance, round, status from ${process.env.DATABASE2}.${process.env.SNS}`;
exports.getRecordsSnapshot = getRecordsSnapshot;
//get id of name league
const getIdLeague = (nameLeague) =>
  `select id from ${process.env.DATABASE2}.${process.env.LD} where name_league="${nameLeague}"`;
exports.getIdLeague = getIdLeague;
//get id of team
const getIdTeam = (nameTeam) =>
  `select id from ${process.env.DATABASE2}.${process.env.TED} where name_team="${nameTeam}"`;
exports.getIdTeam = getIdTeam;
//get id of time
const getIdTime = (hour, miniute, second) =>
  `select id from ${process.env.DATABASE2}.${process.env.TD} where hour=${hour} and miniute=${miniute} and second = ${second}`;
exports.getIdTime = getIdTime;
//get id of date
const getIdDate = (day, month, year) =>
  `select id from ${process.env.DATABASE2}.${process.env.DD} where day=${day} and month=${month} and year = ${year}`;
exports.getIdDate = getIdDate;
//get id of reference
const getIdReference = (nameReference) =>
  `select id from ${process.env.DATABASE2}.${process.env.RED} where name_reference="${nameReference}"`;
exports.getIdReference = getIdReference;
//get id of venue
const getIdVenue = (venue, attendance) =>
  `select id from ${process.env.DATABASE2}.${process.env.VD} where name_venue="${venue}" and attendance = ${attendance} `;
exports.getIdVenue = getIdVenue;
//get id of status
const getIdStatus = (status) =>
  `select id from ${process.env.DATABASE2}.${process.env.SD} where name_status="${status}"`;
exports.getIdStatus = getIdStatus;
//get id of round
const getIdRound = (round) =>
  `select id from ${process.env.DATABASE2}.${process.env.RD} where name_round="${round}"`;
exports.getIdRound = getIdRound;
//insert to result fact table
const insertFactResultTable = (
  id_match,
  id_league,
  id_date_start,
  id_time_start,
  id_home_team,
  id_away_team,
  id_reference,
  id_venue,
  id_round,
  id_status
) =>
  `insert into ${process.env.DATABASE2}.${process.env.RF} (id_match, id_league, id_date_start, id_time_start, id_home_team, id_away_team, id_reference, id_venue, id_round, id_status)
  values ("${id_match}", ${id_league}, ${id_date_start}, ${id_time_start}, ${id_home_team}, ${id_away_team}, ${id_reference}, ${id_venue}, ${id_round}, ${id_status})`;
exports.insertFactResultTable = insertFactResultTable;
