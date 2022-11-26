const queryString = require("../../sql/query_string");
const updateTeamDim = async (connection) => {
  //get last index
  const [rs, fs] = await connection.instance.query(
    queryString.getLastIndexDim(process.env.TED)
  );
  let lastIndex = rs[0].id;
  const [rs1, fs1] = await connection.instance.query(
    `select name_team from ${process.env.DATABASE2}.${process.env.TED}`
  );
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs1.length; index++) {
    console.log(
      `Updating ${rs1[index].name_venue}`
    );
    //check is exisis hour/miniute/second yet
    const [rs2, fs2] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.TED} where name_team='${rs1[index].name_team}';`
    );
    //rs2.length if length equal is 0 then increase lastIndex and update in stagging_result_football.time_dim
    if (rs2.length == 0) {
      lastIndex++;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.TED} set id = ${lastIndex} where name_team='${rs1[index].name_team}';`
      );
    } else {
      const temp = rs2[0].id;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.TED} set id = ${temp} where name_team='${rs1[index].name_team}';`
      );
    }
  }
  await connection.instance.commit();
  console.log("Update team dim complete");
};
exports.updateTeamDim = updateTeamDim;
