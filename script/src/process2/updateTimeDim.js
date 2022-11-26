const queryString = require("../../sql/query_string");
const updateTimeDim = async (connection) => {
  //get last index
  const [rs, fs] = await connection.instance.query(
    queryString.getLastIndexDim(process.env.TD)
  );
  let lastIndex = rs[0].id;
  const [rs1, fs1] = await connection.instance.query(
    `select hour, miniute, second from ${process.env.DATABASE2}.${process.env.TD}`
  );
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs1.length; index++) {
    console.log(
      `Updating ${rs1[index].day}/${rs1[index].month}/${rs1[index].year}`
    );
    //check is exisis hour/miniute/second yet
    const [rs2, fs2] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.TD} where hour=${rs1[index].hour} and miniute=${rs1[index].miniute} and second=${rs1[index].second}`
    );
    //rs2.length if length equal is 0 then increase lastIndex and update in stagging_result_football.time_dim
    if (rs2.length == 0) {
      lastIndex++;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.TD} set id = ${lastIndex} where hour=${rs1[index].hour} and miniute=${rs1[index].miniute} and second=${rs1[index].second}`
      );
    } else {
      const temp = rs2[0].id;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.TD} set id = ${temp} where hour=${rs1[index].hour} and miniute=${rs1[index].miniute} and second=${rs1[index].second}`
      );
    }
  }
  await connection.instance.commit();
  console.log("Update time dim complete");
};
exports.updateTimeDim = updateTimeDim;
