import { Assignment, Lecture } from '@/lib/definitions';

export function getSortedLectures(prevLectures: Lecture[]) {
  const today = new Date();
  const imminentCourseLectures = prevLectures.filter(
    (lecture) => new Date(lecture.endsAt) > today && !lecture.isDone,
  );
  const overdueCourseLectures = prevLectures.filter(
    (lecture) => new Date(lecture.endsAt) < today && !lecture.isDone,
  );
  const completedCourseLectures = prevLectures.filter((lecture) => lecture.isDone);
  const sortedImminentLectures = imminentCourseLectures.sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
  );
  const sortedOverdueLectures = overdueCourseLectures.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const sortedCompletedLectures = completedCourseLectures.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const lectures = [
    ...sortedImminentLectures,
    ...sortedOverdueLectures,
    ...sortedCompletedLectures,
  ];
  return lectures;
}
export function getSortedAssignments(prevAssignments: Assignment[]) {
  const today = new Date();
  // 임박한 과제
  const imminentAssignments = prevAssignments.filter(
    (assignment) => new Date(assignment.endsAt) > today && !assignment.isDone,
  );
  // 결석한 과제
  const overdueAssignments = prevAssignments.filter(
    (assignment) => new Date(assignment.endsAt) < today && !assignment.isDone,
  );
  // 완료한 과제
  const completedAssignments = prevAssignments.filter((assignment) => assignment.isDone);
  const sortedImminentAssignments = imminentAssignments.sort(
    (a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime(),
  );
  const sortedOverdueAssignments = overdueAssignments.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const sortedCompletedAssignments = completedAssignments.sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
  );
  const assignments = [
    ...sortedImminentAssignments,
    ...sortedOverdueAssignments,
    ...sortedCompletedAssignments,
  ];
  return assignments;
}
