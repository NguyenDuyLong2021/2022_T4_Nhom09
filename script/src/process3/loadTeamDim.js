const loadTeamDim = async (connection) => {
  //get rows record
  const [rows, fields] = await connection.instance.query(
    `select * from ${process.env.DATABASE2}.${process.env.TED}`
  );
  for (let index = 0; index < rows.length; index++) {
    //check id is exits
    const [rs1, fs1] = await connection.instance.query(
      `select id from ${process.env.DATABASE3}.${process.env.TED} where id=${rows[index].id};`
    );
    //if not then add to date dim
    if (rs1.length == 0) {
      await connection.instance.query(
        `insert into ${process.env.DATABASE3}.${process.env.TED} (id, name_team) values (${rows[index].id},"${rows[index].name_team}");`
      );
    }
  }
};
exports.loadTeamDim = loadTeamDim;
