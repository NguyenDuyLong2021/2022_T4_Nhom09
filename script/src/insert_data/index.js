const connection = require("../connection/index");
connection.instance().connect((err) => {
  if (err) throw err;
  console.log("connected!");
  
});
