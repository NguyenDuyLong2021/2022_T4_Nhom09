const loadDateDim = async (connection) => {
  //get rows record date from table date dim of stagging database
  const [rows, fields] = await connection.instance.query(
    `select * from ${process.env.DATABASE2}.${process.env.DD}`
  );
  for (let index = 0; index < rows.length; index++) {
    //check id is exits in table date dim of datawarehouse database
    const [rs1, fs1] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.DD} where id=${rows[index].id};`
    );
    console.log("chiều dài là bao nhiêu ", rows.length);
    //if not then add to date dim
    if (rs1.length == 0) {
      await connection.instance.query(
        `insert into ${process.env.DATABASE3}.${process.env.DD} (id, day, month, year) values (${rows[index].id},${rows[index].day}, ${rows[index].month}, ${rows[index].year});`
      );
    }
  }
};
exports.loadDateDim = loadDateDim;
