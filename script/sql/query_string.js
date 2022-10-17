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
const insertLog = (id_config, file_name, date_log) => {
  return `insert into scraping_log (id_config, file_name, date_log) values(${id_config}, "${file_name}", "${date_log}")`;
};
exports.insertLog = insertLog;
//string query load record from intermediary stagging to main database
const loadRecordToDatabase =
  () => `insert into dw_result_football.result_football (id_match, name_league, home_team, away_team, time_start, match_day, goal_home_team,
  goal_away_team, referee, venue, attendance, round, status ) select * from stagging_result_football.result_football`;
exports.loadRecordToDatabase = loadRecordToDatabase;
//string load record from csv file to stagging
const loadRecordToStagging =
 (
  nameFile
) => `load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${nameFile}" 
into table stagging_result_football.result_football fields terminated by ","  lines terminated by "\n" ignore 1 rows 
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
  `update dw_result_football.scraping_log set status=${newStatus} where file_name = '${file_name}'`;
exports.updateStatusSrapinglog = updateStatusSrapinglog;

