import { AnnounceData } from '@/lib/definitions';

export default function calAnnounceData({
  imminentDueDate,
  imminentCourseId,
  imminentCourseName,
  nextLectureDate,
  nextLectureCourseId,
  nextLectureCourseName,
  imminentLecturesLeft,
  imminentAssignmentsLeft,
}: AnnounceData) {
  const dueHour = new Date(imminentDueDate).getHours();
  const dueMinute = new Date(imminentDueDate).getMinutes();
  if (imminentDueDate) {
    let DESCRIPTION = '';
    const daysLeft = calDiffInDays(imminentDueDate);
    if (daysLeft === 0 || daysLeft === 1) {
      if (imminentAssignmentsLeft && imminentLecturesLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour}시 ${dueMinute}분까지 할 일이 ${imminentLecturesLeft + imminentAssignmentsLeft}개 있어요`;
      }
      if (imminentLecturesLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour}시 ${dueMinute}분 마감 강의가 ${imminentLecturesLeft}개 있어요`;
      }
      if (imminentAssignmentsLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour}시 ${dueMinute}분 마감 과제가 ${imminentAssignmentsLeft}개 있어요`;
      }
    } else {
      if (imminentAssignmentsLeft && imminentLecturesLeft) {
        DESCRIPTION = `${calDiffInDays(imminentDueDate)}일 후 까지 할 일이 ${imminentLecturesLeft + imminentAssignmentsLeft}개 있어요`;
      }
      if (imminentLecturesLeft) {
        DESCRIPTION = `${calDiffInDays(imminentDueDate)}일 후 마감 강의가 ${imminentLecturesLeft}개 있어요`;
      }
      if (imminentAssignmentsLeft) {
        DESCRIPTION = `${calDiffInDays(imminentDueDate)}일 후 마감 과제가 ${imminentAssignmentsLeft}개 있어요`;
      }
    }
    return {
      title: '확인하러 가기',
      description: DESCRIPTION,
      iconName: 'notification',
      link: `/attendance/${imminentCourseId}`,
      courseName: imminentCourseName,
    };
  }
  if (nextLectureDate) {
    return {
      title: '확인하러 가기',
      description: `새로운 강의가 ${calDiffInDays(nextLectureDate)}일 후에 열려요`,
      iconName: 'bell',
      link: `/attendance/${nextLectureCourseId}`,
      couseName: nextLectureCourseName,
    };
  }
  return {
    title: '메뉴 추천받기',
    description: '더이상 할 일이 없어요! 식사는 하셨나요?',
    iconName: 'graduationHat',
    link: 'roulette',
  };
}

function calDiffInDays(date: string) {
  const now = new Date();
  const targetDate = new Date(date);
  return targetDate.getDate() - now.getDate();
}
