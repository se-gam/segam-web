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
  const formatTime = (date: Date, options: Intl.DateTimeFormatOptions) =>
    date.toLocaleTimeString('ko-KR', {
      ...options,
      hour12: false,
      timeZone: 'Asia/Seoul',
    });

  const dueHour = imminentDueDate ? formatTime(new Date(imminentDueDate), { hour: 'numeric' }) : '';
  const dueMinute = imminentDueDate
    ? formatTime(new Date(imminentDueDate), { minute: 'numeric' })
    : '';

  const daysLeft = imminentDueDate ? calDiffInDays(imminentDueDate) : null;

  if (imminentDueDate && daysLeft !== null) {
    let DESCRIPTION = '';

    if (daysLeft === 0 || daysLeft === 1) {
      if (imminentAssignmentsLeft && imminentLecturesLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour} ${dueMinute}분까지 할 일이 ${
          imminentLecturesLeft + imminentAssignmentsLeft
        }개 있어요`;
      } else if (imminentLecturesLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour} ${dueMinute}분 마감 강의가 ${imminentLecturesLeft}개 있어요`;
      } else if (imminentAssignmentsLeft) {
        DESCRIPTION = `${daysLeft === 0 ? '오늘' : '내일'} ${dueHour} ${dueMinute}분 마감 과제가 ${imminentAssignmentsLeft}개 있어요`;
      }
    } else if (imminentAssignmentsLeft && imminentLecturesLeft) {
      DESCRIPTION = `${daysLeft}일 후까지 할 일이 ${imminentLecturesLeft + imminentAssignmentsLeft}개 있어요`;
    } else if (imminentLecturesLeft) {
      DESCRIPTION = `${daysLeft}일 후 마감 강의가 ${imminentLecturesLeft}개 있어요`;
    } else if (imminentAssignmentsLeft) {
      DESCRIPTION = `${daysLeft}일 후 마감 과제가 ${imminentAssignmentsLeft}개 있어요`;
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
      courseName: nextLectureCourseName,
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
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
