/* eslint-disable @typescript-eslint/no-unused-vars */

const isWithinADay = (date: Date) => {
  const today = new Date();
  const timeValue = new Date(date);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60 / 60);
  if (betweenTime < 24) {
    return true;
  }
  return false;
};
export default isWithinADay;
