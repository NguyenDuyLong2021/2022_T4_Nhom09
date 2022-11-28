const loadRoundDim = async (connection) => {
    //get rows record
    const [rows, fields] = await connection.instance.query(
      `select * from ${process.env.DATABASE2}.${process.env.RD}`
    );
    for (let index = 0; index < rows.length; index++) {
      //check id is exits
      const [rs1, fs1] = await connection.instance.query(
        `select id from ${process.env.DATABASE3}.${process.env.RD} where id=${rows[index].id};`
      );
      //if not then add to date dim
      if (rs1.length == 0) {
        await connection.instance.query(
          `insert into ${process.env.DATABASE3}.${process.env.RD} (id, name_round) values (${rows[index].id},"${rows[index].name_round}");`
        );
      }
    }
  };
  exports.loadRoundDim = loadRoundDim;
  