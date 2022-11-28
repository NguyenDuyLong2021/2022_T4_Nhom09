const updateTime = async (connection, hour, miniute, second) => {
  const [rows, result] = await connection.instance.query(
    `select id from ${process.env.DATABASE3}.${process.env.TD} where hour=${hour} and miniute = ${miniute} and second=${second}`
  );
  let id;
  if (rows.length == 0) {
    const result = await connection.instance.query(
      `insert into ${process.env.DATABASE3}.${process.env.TD} (hour, miniute, second) values (${hour}, ${miniute}, ${second});`
    );
    console.log("Update time available success");
    id = result[0].insertId;
  }
  return rows.length == 0 ? id : rows[0].id;
};
exports.updateTime = updateTime;
