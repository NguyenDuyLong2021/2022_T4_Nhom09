create database dw_result_football;
use dw_result_football;
/*create table result football */
CREATE TABLE result_football (
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
    status VARCHAR(25),
    isDelete boolean default false,
    expirationDate datetime default now()
);

/*
edit table result football from all in to multi dimention
*/
/*
table date dim
*/
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
    id_venue integer default null,
    id_round integer default null,
    id_status integer default null,
    id_time_available integer default 0,
    id_date_available integer default 0,
    isDelete boolean default false
);
alter table result_football add foreign key (id_league) references league_dim(id);
alter table result_football add foreign key (id_date_start) references date_dim(id);
alter table result_football add foreign key (id_time_start) references time_dim(id);
alter table result_football add foreign key (id_home_team) references team_dim(id);
alter table result_football add foreign key (id_away_team) references team_dim(id);
alter table result_football add foreign key (id_venue) references venue_dim(id);
alter table result_football add foreign key (id_round) references round_dim(id);
alter table result_football add foreign key (id_time_available) references time_dim(id);
alter table result_football add foreign key (id_date_available) references date_dim(id); 
alter table result_football add foreign key (id_status) references status_dim(id);
/*
insert to table 
*/
insert into time_dim (hour, miniute, second) values(24, 24, 59);
insert into date_dim (day, month, year) values(31,12,9999);
insert into status_dim (name_status) value("Finished");

insert into time_dim (hour, miniute, second) select distinct hour(time_start), minute(time_start), second(time_start) from stagging_result_football.result_football;
insert into date_dim (day, month, year) select distinct day(match_day) , month(match_day), year(match_day) from stagging_result_football.result_football;
insert into league_dim(name_league) select distinct name_league from stagging_result_football.result_football;
insert into team_dim (name_team) select distinct home_team from stagging_result_football.result_football;
insert into round_dim (name_round) select distinct round from stagging_result_football.result_football;
insert into venue_dim (name_venue, attendance) select distinct venue, attendance from stagging_result_football.result_football;


/*create table control*/
create database control_db;
use control_db;
/*craete table configration acccess to source data and address ftp server*/
CREATE TABLE configration (
    id INTEGER auto_increment primary key,
    id_source_name integer not null,
    source_location VARCHAR(50) not null,
    ftp VARCHAR(50) not null,
    id_contact INTEGER not null
);

/*create table sraping log to log process scarping data from source data*/
CREATE TABLE scraping_log (
    id INTEGER auto_increment primary key,
    id_config INTEGER not null,
    file_name VARCHAR(100) not null,
    date_log DATEtime default now(),
    status INTEGER default 0
);

/*create table contactor: contactor who is responsible*/
CREATE TABLE contactor (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50),
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

/*create table source name: contain all name want to scraping data*/
create table source_name(id integer auto_increment primary key, source_name varchar(50));

/*create table branch source name: contains all branch of web source data*/
create table branch_source_name (
id integer auto_increment primary key,
id_source_name integer not null,
name_branch varchar(50) default "",
branch varchar(100) default ""
);
alter table configration add foreign key (id_contact) references contactor (id);
alter table configration add foreign key (id_source_name) references source_name (id);
alter table scraping_log add foreign key(id_config) references configration(id);
alter table branch_source_name add foreign key (id_source_name) references source_name(id); 

insert into contactor (full_name,user_name, password) values ("Nguyễn Dũy Long", "long-ftp", "1234");
insert into contactor (full_name,user_name, password) values ("DrakeNguyen", "dw@techdak.studio", "`1234Qwert");
insert into source_name(source_name) value ("www.flashscore.com");
insert into scraping_log(id_config, file_name, date_log) values (1, "test.csv", "2022-1-2") ;
insert into branch_source_name (id_source_name, name_branch, branch ) values (1, "PEAR-2022-2023", "/football/england/premier-league-2022-2023/results/");
insert into branch_source_name (id_source_name, name_branch, branch ) values (1, "PEM-2022-2023", "/match/");
insert into configration (id_source_name, source_location, ftp, id_contact) values (1, 'D:/js/scraping/ver-01/results', 'ftpupload.net',1 );
insert into configration (id_source_name, source_location, ftp, id_contact) values (1, 'D:/js/scraping/ver-01/results', 'techdak.studio',2 );
