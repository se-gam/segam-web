import AttendanceBoard from '@/components/attendance/attendanceBoard';
import Tag from '@/components/common/tag/tag';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { CourseAttendance } from '@/lib/definitions';
import { dateWeekFormatter, dayFormatByDate } from '@/utils/format';

export default async function Attendance() {
  const {
    courses,
    totalJobs,
    imminentLectureLeft,
    imminentAssignmentLeft,
    imminentDueDate,
  }: CourseAttendance = await getCourseAttendance();
  const totalJobText =
    totalJobs > 0 ? `할 일이 ${totalJobs}개 있어요.` : '모든 할 일을 완료했어요. 🎉';
  return (
    <main className="container mb-2.5 bg-white px-4">
      <header className="mb-4 mt-2.5">
        <h1 className="f20 font-bold text-text_primary">이러닝</h1>
      </header>
      <section className="mb-5 space-y-2">
        <Tag label={`${dateWeekFormatter(new Date())} · 1주차`} variant="default" size="md" />
        <div>
          <h2 className="f28 font-bold text-text_primary">{totalJobText}</h2>
          {imminentDueDate && (
            <p className="f16 font-medium text-text_secondary">{`${dayFormatByDate(imminentDueDate)}요일 까지 할 일이 ${
              imminentLectureLeft + imminentAssignmentLeft
            }개가 있어요.`}</p>
          )}
        </div>
      </section>
      <AttendanceBoard type="dashboard" courses={courses} />
    </main>
  );
}
