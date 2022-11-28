const updateDate = async (connection, day, month, year) => {
  const [rows, result] = await connection.instance.query(
    `select id from ${process.env.DATABASE3}.${process.env.DD} where day=${day} and month = ${month} and year=${year}`
  );
  let id;
  if (rows.length == 0) {
    const result = await connection.instance.query(
      `insert into ${process.env.DATABASE3}.${process.env.DD} (day, month, year) values (${day}, ${month}, ${year});`
    );
    id = result[0].insertId;
    console.log("Update date available success");
  }
  return rows.length == 0 ? id : rows[0].id;
};
exports.updateDate = updateDate;
