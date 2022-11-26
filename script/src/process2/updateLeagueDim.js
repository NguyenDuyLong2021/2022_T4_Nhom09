const queryString = require("../../sql/query_string");
const updateLeagueDim = async (connection) => {
  //get last index
  const [rs, fs] = await connection.instance.query(
    queryString.getLastIndexDim(process.env.LD)
  );
  let lastIndex = rs[0].id;
  const [rs1, fs1] = await connection.instance.query(
    `select name_league from ${process.env.DATABASE2}.${process.env.LD}`
  );
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs1.length; index++) {
    console.log(
      `Updating ${rs1[index].name_league}`
    );
    //check is exisis hour/miniute/second yet
    const [rs2, fs2] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.LD} where name_league='${rs1[index].name_league}';`
    );
    //rs2.length if length equal is 0 then increase lastIndex and update in stagging_result_football.time_dim
    if (rs2.length == 0) {
      lastIndex++;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.LD} set id = ${lastIndex} where name_league='${rs1[index].name_league}';`
      );
    } else {
      const temp = rs2[0].id;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.LD} set id = ${temp} where name_league='${rs1[index].name_league}';`
      );
    }
  }
  await connection.instance.commit();
  console.log("Update league dim complete");
};
exports.updateLeagueDim = updateLeagueDim;
