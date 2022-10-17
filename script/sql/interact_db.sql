use stagging_result_football;
use dw_result_football;
CREATE TABLE result_football (
    id_match VARCHAR(100) NOT NULL,
    name_league VARCHAR(50) DEFAULT 'unknown',
    home_team VARCHAR(50) DEFAULT 'unknown',
    away_team VARCHAR(50) DEFAULT 'unknown',
    time_start TIME DEFAULT NULL,
    match_day DATE DEFAULT NULL,
    goal_home_team INTEGER DEFAULT 0,
    goal_away_team INTEGER DEFAULT 0,
    referee VARCHAR(50) DEFAULT 'unknown',
    venue VARCHAR(50) DEFAULT 'unknown',
    attendance VARCHAR(25) DEFAULT 'unknown',
    round VARCHAR(25) DEFAULT 'unknown',
    status VARCHAR(25) DEFAULT 'unknown'
);

load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/all copy.csv" 
into table result_football fields terminated by "," lines terminated by "\n" (@vid_match, @vname_league, @vhome_team, @vaway_team, @vtime_start,
@vmatch_day, @vgoal_home_team, @vgoal_away_team, @vreferee, @vvenue, @vattendance, @vround, @vstatus) set id_match= nullif(@vid_match, 'unknown',
name_league = nullif(@vname_league, 'unknown'), home_team = nullif(@vhome_team, 'unknown'), away_team = nullif(@away_team, 'unknown'), time_start = NULLIF(@vtime_start, null),
match_day = nullif(@vmatch_day, null), goal_home_team = nullif(@vgoal_home_team, 0),goal_away_team = nullif(@vgoal_away_team, 0), referee=nullif(@vreferee, 'unknow'),
venue = nullif(@vvenue, 'unknown'), attendance = nullif(@vattendance, 'unknown'), round = nullif(@vround, 'unknown'), status = nullif(@vstatus, 'unknown'));

delete from result_football;

load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/all_edited.csv" 
into table result_football fields terminated by ","  lines terminated by "\n" ignore 1 rows 
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
status = if(@status='', 'unknown', @status);


insert into dw_result_football.result_football (id_match, name_league, home_team, away_team, time_start, match_day, goal_home_team,
goal_away_team, referee, venue, attendance, round, status ) select * from stagging_result_football.result_football;

delete from stagging_result_football.result_football;

delete from venue_dim 
