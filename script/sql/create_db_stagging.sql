create database stagging_result_football;
use stagging_result_football;
CREATE TABLE result_football (
    id_match VARCHAR(100) nOT NULL,
    name_league VARCHAR(50) DEFAULT 'unknown',
    home_team VARCHAR(50) DEFAULT 'unknown',
    away_team VARCHAR(50) DEFAULT 'unknown',
    time_start varchar(50)  DEFAULT 'unknown',
    match_day varchar(50)  DEFAULT 'unknown',
    goal_home_team VARCHAR(10) DEFAULT 'unknown',
    goal_away_team VARCHAR(10) DEFAULT 'unknown',
    referee VARCHAR(50) DEFAULT 'unknown',
    venue VARCHAR(50) DEFAULT 'unknown',
    attendance varchar(10) DEFAULT "unknown",
    round VARCHAR(25) DEFAULT 'unknown',
    status VARCHAR(25) DEFAULT 'unknown'
);
/*load file csv*/
SHOW VARIABLES LIKE "secure_file_priv";
load data infile "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/all.csv" into table result_football fields terminated by "," ignore 1 rows;