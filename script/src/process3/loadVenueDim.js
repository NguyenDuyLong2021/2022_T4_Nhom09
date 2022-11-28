const loadVenueDim = async (connection) => {
  //get rows record
  const [rows, fields] = await connection.instance.query(
    `select * from ${process.env.DATABASE2}.${process.env.VD}`
  );
  for (let index = 0; index < rows.length; index++) {
    //check id is exits
    const [rs1, fs1] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.VD} where id=${rows[index].id};`
    );
    //if not then add to date dim
    if (rs1.length == 0) {
      await connection.instance.query(
        `insert into ${process.env.DATABASE3}.${process.env.VD} (id, name_venue, attendance) values (${rows[index].id},"${rows[index].name_venue}", ${rows[index].attendance});`
      );
    }
  }
};
exports.loadVenueDim = loadVenueDim;
