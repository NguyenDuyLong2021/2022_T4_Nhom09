const fs = require("fs");
//this module used to writing into file pause.txt
const updateLineSpecific = (newValue, index) => {
  var data = fs.readFileSync("pause.txt", "utf-8");
  let newData = "";
  if (index === 0) {
    newData = `${newValue}\r${data.split("\r\n")[1]}`;
  } else {
    newData = `${data.split("\r\n")[0]}\r${newValue}`;
  }
  fs.writeFileSync("pause.txt", newData, "utf-8");
};
exports.updateLineSpecific = updateLineSpecific;
