import { Assignment, Lecture } from '@/lib/definitions';

export default function getSortedClassData(prevClassData: Lecture[] | Assignment[]) {
  const today = new Date();
  // 임박한 과제
  const imminentClassData = prevClassData.filter(
    (item) => new Date(item.endsAt) > today && !item.isDone,
  );
  // 결석한 과제
  const overdueClassData = prevClassData.filter(
    (item) => new Date(item.endsAt) < today && !item.isDone,
  );
  // 완료한 과제
  const completedClassData = prevClassData.filter((item) => item.isDone);
  const sortedImminentClassData = imminentClassData.sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
  );
  const sortedOverdueClassData = overdueClassData.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const sortedCompletedClassData = completedClassData.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const classData = [
    ...sortedImminentClassData,
    ...sortedOverdueClassData,
    ...sortedCompletedClassData,
  ];

  // 가장 최근 업데이트 시간
  const latestUpdatedAt =
    prevClassData.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )[0]?.updatedAt || null;

  return {
    classData,
    latestUpdatedAt,
  };
}
