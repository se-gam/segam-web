/**
 * @description 2024.03.12 12:00
 */
export function dateDotFormatter(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} ${
    d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
  }:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
}
/**
 * @description 3월 12일
 */
export function dateWeekFormatter(date: string | Date) {
  const d = new Date(date);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}
/**
 * @description 월, 화, 수, 목, 금, 토, 일
 */
export function dayFormatter(day: number) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[day];
}
/**
 * @description 월,화, 수, 목, 금, 토, 일
 */
export function dayFormatByDate(date: string) {
  const d = new Date(date);
  return dayFormatter(d.getDay());
}
