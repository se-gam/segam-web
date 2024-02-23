import AttendanceBoard from '@/components/attendance/attendanceBoard';
import Tag from '@/components/common/tag/tag';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { CourseAttendance } from '@/lib/definitions';
import { dateWeekFormatter } from '@/utils/format';

export default async function AttendanceContent() {
  const { courses, totalJobs, imminentLectureLeft, imminentAssignmentLeft }: CourseAttendance =
    await getCourseAttendance();

  return (
    <>
      <section className="mb-5 space-y-2">
        <Tag label={`${dateWeekFormatter(new Date())} · 1주차`} variant="default" size="md" />
        <div>
          <h2 className="f28 font-bold text-text_primary">{`할 일이 ${totalJobs}개 있어요`}</h2>
          <p className="f16 font-medium text-text_secondary">{`토요일까지 할 일이 ${
            imminentLectureLeft + imminentAssignmentLeft
          }개가 있어요`}</p>
        </div>
      </section>
      <AttendanceBoard type="dashboard" courses={courses} />
    </>
  );
}
