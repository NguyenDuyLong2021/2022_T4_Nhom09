const queryString = require("../../sql/query_string");
const updateStatusDim = async (connection) => {
  //get last index
  const [rs, fs] = await connection.instance.query(
    queryString.getLastIndexDim(process.env.SD)
  );
  let lastIndex = rs[0].id;
  const [rs1, fs1] = await connection.instance.query(
    `select name_status from ${process.env.DATABASE2}.${process.env.SD}`
  );
  console.log(rs1);
  await connection.instance.beginTransaction();
  for (let index = 0; index < rs1.length; index++) {
    console.log(`Updating ${rs1[index].name_status}`);
    const name_status = rs1[index].name_status.replace(/(\r\n|\n|\r)/gm, "");
    //check is exisis hour/miniute/second yet
    const [rs2, fs2] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.SD} where name_status='${name_status}';`
    );

    //rs2.length if length equal is 0 then increase lastIndex and update in stagging_result_football.time_dim
    if (rs2.length == 0) {
      lastIndex++;
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.SD} set id = ${lastIndex} where name_status='${name_status}\r';`
      );
      console.log("việt nam");
    } else {
      const temp = rs2[0].id;
      console.log(temp);
      await connection.instance.query(
        `update ${process.env.DATABASE2}.${process.env.SD} set id = ${temp} where name_status='${name_status}\r';`
      );
      console.log("thái lan");
    }
  }
  await connection.instance.commit();
  console.log("Update status dim complete");
};
exports.updateStatusDim = updateStatusDim;
