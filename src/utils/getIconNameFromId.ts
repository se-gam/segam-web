import { COURSE_LIST } from '@/lib/constants';

function getIconNameFromSchool(school: string) {
  const schoolIconMap: { [key: string]: string } = {
    인공지능융합대학: 'ai',
    예체능대학: 'art',
    자연과학대학: 'science',
    경영경제대학: 'business',
    전자정보공학대학: 'electronic',
    공과대학: 'engineering',
    대학: 'etc',
    호텔관광대학: 'hotel',
    대양휴머니티칼리지: 'humanities',
    생명과학대학: 'biological',
    인문과학대학: 'socialScience',
    소프트웨어융합대학: 'software',
  };
  return schoolIconMap[school] || 'etc';
}

export default function getIconNameFromCourseId(courseId: string) {
  const course = COURSE_LIST.find((c) => c.id === courseId.toString());
  if (!course) {
    return 'etc';
  }
  const { school } = course;
  return getIconNameFromSchool(school);
}
