/**
 * @description 2024. 03. 12 12:00
 */
export function dateDotFormatter(date: string) {
  if (!date) return '마감 기한 없음';
  const d = new Date(date).toLocaleString('ko-kr', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
    timeZone: 'Asia/Seoul',
  });
  return d;
}

/**
 * @description dateString 받아 'N일 후 수강 가능해요' 반환
 */
export function dateDiffInDays(date: string) {
  const now = new Date();
  const due = new Date(date);
  const diff = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${diff}일 후 수강 가능해요`;
}

/**
 * @description 월요일, 화요일,
 */
export function dayFormatByDate(date: string) {
  const d = new Date(date).toLocaleDateString('ko-KR', {
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  return d;
}

export function getDayLabelByNumber(day: number) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[day];
}

const SEMESTER_START_DATE = process.env.NEXT_PUBLIC_SEMESTER_START_DATE;

export function getSemesterWeek() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(SEMESTER_START_DATE as string);
  const diff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const week = Math.floor(diff / 7) + 1;
  return `${week}주차`;
}
