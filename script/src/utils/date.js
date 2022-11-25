let date = null;
const instance = () => {
  if (date === null) {
    date = new Date();
  }
  return date;
};
const getDate = () => instance().getDate();
const getMonth = () => instance().getMonth() + 1;
const getYear = () => instance().getFullYear();
module.exports = { getDate, getMonth, getYear };
