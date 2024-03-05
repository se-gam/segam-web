import AttendanceBoard from '@/components/attendance/attendanceBoard';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import Tag from '@/components/common/tag/tag';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { CourseAttendance } from '@/lib/definitions';
import { dateWeekFormatter, dayFormatter } from '@/utils/format';

export default async function SubjectPage({ params }: { params: { id: number } }) {
  const { courses }: CourseAttendance = await getCourseAttendance();
  const course = courses.find((c) => c.id === params.id);
  if (!course) return null;
  const todayLabel = dateWeekFormatter(new Date());
  const updateDayLabel = course.updateDay ? `매주 ${dayFormatter(course.updateDay)}요일` : '';
  const lectureAbsencesLabel = course.lectureAbsences
    ? `강의 ${course.lectureAbsences}회 미출석`
    : '';
  const assignmentAbsencesLabel = course.assignmentAbsences
    ? `과제 ${course.assignmentAbsences}회 미제출`
    : '';
  const totalJobs = course.lecturesLeft + course.assignmentsLeft;
  const totalJobText =
    totalJobs > 0 ? `할 일이 ${totalJobs}개 있어요` : '모든 할 일을 완료했어요 🎉';
  return (
    <>
      <StackHeader title={course.name} />
      <main className="page overflow-auto bg-white py-2.5">
        <section className="mb-5 space-y-2  px-4 ">
          <div className="space-x-2">
            <Tag label={todayLabel} variant="default" size="md" />
            {updateDayLabel && <Tag label={updateDayLabel} variant="default" size="md" />}
            {lectureAbsencesLabel && (
              <Tag label={lectureAbsencesLabel} variant="danger" size="md" />
            )}
            {assignmentAbsencesLabel && (
              <Tag label={assignmentAbsencesLabel} variant="danger" size="md" />
            )}
          </div>
          <div>
            <h2 className="f28 font-bold text-text_primary">{totalJobText}</h2>
            {totalJobs > 0 && (
              <p className="f16 font-medium text-text_secondary">
                {`들어야하는 강의 ${course.lecturesLeft}개 · 과제 ${course.assignmentsLeft}개`}
              </p>
            )}
          </div>
        </section>
        <AttendanceBoard type="subject" courses={[course]} />
      </main>
    </>
  );
}
