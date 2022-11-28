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
const getHour = () => instance().getHours();
const getMiniute = ()=> instance().getMinutes();
const getSecond =()=>instance().getSeconds()
module.exports = { getDate, getMonth, getYear,getHour, getMiniute, getSecond };
