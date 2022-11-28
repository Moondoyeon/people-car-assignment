const getDay = (date: string | undefined) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const today = date ? new Date(date.slice(0, 10)).getDay() : undefined;
  const day = today ? week[today] : undefined;
  return day;
};
const parseDate = (date: Date) =>
  `${String(date)?.slice(5, 7)}월 ${String(date)?.slice(8, 10)}일 (${getDay(String(date))}) 부터`;

export default parseDate;
