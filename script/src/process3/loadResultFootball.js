const dateIns = require("../utils/date");
const ut = require("./updateTime");
const ud = require("./updateDate");
const loadResultFootball = async (connection) => {
  //get rows record
  const [rows, fields] = await connection.instance.query(
    `select * from ${process.env.DATABASE2}.${process.env.RF}`
  );
  for (let index = 0; index < rows.length; index++) {
    //check id is exits
    const [rs1, fs1] = await connection.instance.query(
      `select id_match from ${process.env.DATABASE3}.${process.env.RF} where id_match="${rows[index].id_match}";`
    );
    //if exit then upadte time
    if (rs1.length > 0) {
      const day = dateIns.getDate();
      const month = dateIns.getMonth();
      const year = dateIns.getYear();
      const second = dateIns.getSecond();
      const hour = dateIns.getHour();
      const miniute = dateIns.getMiniute();
      const idTime = await ut.updateTime(connection, hour, miniute, second); //update time in time table
      const idDate = await ud.updateDate(connection, day, month, year); //update date in date table
      await connection.instance.query(
        //update by id_macth, id time available(0:0:0):20 and id date available (31/12/2022):3412
        `update ${process.env.DATABASE3}.${process.env.RF} set id_time_available = ${idTime}, 
        id_date_available=${idDate} where id_match="${rs1[0].id_match}" and id_time_available = ${process.env.IDTV}
        and id_date_available=${process.env.IDDV};`
      );
    }
    //and date of record old and insert new record into table
    await connection.instance.query(
      `insert into ${process.env.DATABASE3}.${process.env.RF} (id_match, id_league, id_date_start, id_time_start, goal_home_team, goal_away_team,id_home_team, id_away_team,  id_reference, id_venue, id_round, id_status) values 
      ("${rows[index].id_match}", ${rows[index].id_league}, ${rows[index].id_date_start},${rows[index].id_time_start},${rows[index].goal_home_team},${rows[index].goal_away_team},${rows[index].id_home_team}, ${rows[index].id_away_team}, 
          ${rows[index].id_reference},${rows[index].id_venue}, ${rows[index].id_round}, ${rows[index].id_status});`
    );
  }
};
exports.loadResultFootball = loadResultFootball;
