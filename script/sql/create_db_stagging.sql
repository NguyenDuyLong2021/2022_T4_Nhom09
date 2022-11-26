create database stagging_result_football;
use stagging_result_football;
CREATE TABLE snapshot_result (
	idex integer auto_increment primary key,
    id_match VARCHAR(100),
    name_league VARCHAR(50),
    home_team VARCHAR(50),
    away_team VARCHAR(50),
    time_start TIME,
    match_day DATE,
    goal_home_team INTEGER,
    goal_away_team INTEGER,
    referee VARCHAR(50),
    venue VARCHAR(50),
    attendance VARCHAR(25),
    round VARCHAR(25),
    status VARCHAR(25)
);
CREATE TABLE date_dim (
    id INTEGER AUTO_INCREMENT primary key,
    day INTEGER not null,
    month INTEGER not null,
    year INTEGER not null
);
/*
create table time dim
*/
CREATE TABLE time_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    hour INTEGER NOT NULL,
    miniute INTEGER NOT NULL,
    second INTEGER NOT NULL
);
/*
create table 
*/
CREATE TABLE league_dim (
	id integer auto_increment primary key,
    name_league VARCHAR(100) NOT NULL,
    code varchar(50) default null,
    year_first_league integer default null
);
/*
create table team dim
*/
CREATE TABLE team_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name_team varchar(100) not null,
    code_team VARCHAR(50) default null
);
/*
create table round dimention
*/
CREATE TABLE round_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name_round VARCHAR(25)
);
/*
create table venue dim
*/
CREATE TABLE venue_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name_venue VARCHAR(100) NOT NULL,
    attendance varchar(10) not null
);
/*create table status dim*/
CREATE TABLE status_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name_status VARCHAR(25)
);
/*create table reference dim*/
CREATE TABLE reference_dim (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name_reference VARCHAR(50),
    nation varchar(50)
);
/*
create table result football (fact)
*/
CREATE TABLE result_football (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_match VARCHAR(25) not null,
    id_league INTEGER NOT NULL,
    id_date_start INTEGER default null,
    id_time_start integer default null,
    id_home_team integer not null,
    id_away_team integer not null,
    id_reference integer not null,
    id_venue integer default null,
    id_round integer default null,
    id_status integer default null
);
/* add foreign key*/
alter table result_football add foreign key (id_reference) references reference_dim(id);
alter table result_football add foreign key (id_league) references league_dim(id);
alter table result_football add foreign key (id_date_start) references date_dim(id);
alter table result_football add foreign key (id_time_start) references time_dim(id);
alter table result_football add foreign key (id_home_team) references team_dim(id);
alter table result_football add foreign key (id_away_team) references team_dim(id);
alter table result_football add foreign key (id_venue) references venue_dim(id);
alter table result_football add foreign key (id_round) references round_dim(id);
alter table result_football add foreign key (id_status) references status_dim(id);

load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/all_edited.csv" 
into table snapshot_result fields terminated by ","  lines terminated by "\n" ignore 1 rows 
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









/*load file csv*/
SHOW VARIABLES LIKE "secure_file_priv";
load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/all.csv" into table result_football fields terminated by "," ignore 1 rows;