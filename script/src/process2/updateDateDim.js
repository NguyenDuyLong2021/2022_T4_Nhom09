const queryString = require("../../sql/query_string");
const updateDateDim = async (connection) => {
  //get last index
  const [rs, fs] = await connection.instance.query(
    queryString.getLastIndexDim(process.env.DD)
  );
  let lastIndex = rs[0].id;
  const [rs1, fs1] = await connection.instance.query(
    `select day, month, year from ${process.env.DATABASE2}.${process.env.DD}`
  );
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs1.length; index++) {
    console.log(`Updating ${rs1[index].day}/${rs1[index].month}/${rs1[index].year}`);
    //check is exisis day/month/year yet
    const [rs2, fs2] = await connection.instance.query(
        `select id from ${process.env.DATABASE3}.${process.env.DD} where day=${rs1[index].day} and month=${rs1[index].month} and year=${rs1[index].year}`    );
    //rs2.length if length equal is 0 then increase lastIndex and update in stagging_result_football.date_dim
    if (rs2.length == 0) {
      lastIndex++;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.DD} set id = ${lastIndex} where day=${rs1[index].day} and month=${rs1[index].month} and year=${rs1[index].year}`
      );
    } else {
      const temp = rs2[0].id;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.DD} set id = ${temp} where day=${rs1[index].day} and month=${rs1[index].month} and year=${rs1[index].year}`
      );
    }
  }
  await connection.instance.commit();
  console.log("Update date dim complete");
};
exports.updateDateDim = updateDateDim;
