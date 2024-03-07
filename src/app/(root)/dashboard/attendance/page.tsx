import AttendanceBoard from '@/components/attendance/attendanceBoard';
import Tag from '@/components/common/tag/tag';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { CourseAttendance } from '@/lib/definitions';
import { dayFormatByDate, getSemesterWeek } from '@/utils/format';

export default async function Attendance() {
  const {
    courses,
    totalJobs,
    imminentLecturesLeft,
    imminentAssignmentsLeft,
    imminentDueDate,
  }: CourseAttendance = await getCourseAttendance();
  const totalJobText =
    totalJobs > 0 ? `할 일이 ${totalJobs}개 있어요` : '모든 할 일을 완료했어요 🎉';
  const todayLabel = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="mb-4 px-4  pt-2.5">
        <h1 className="f20 font-bold text-text_primary">이러닝</h1>
      </header>
      <section className="mb-5 space-y-2  px-4">
        <Tag label={`${todayLabel} · ${getSemesterWeek()}`} variant="default" size="md" />
        <div>
          <h2 className="f28 font-bold text-text_primary">{totalJobText}</h2>
          {imminentDueDate && (
            <p className="f16 font-medium text-text_secondary">{`${dayFormatByDate(imminentDueDate)} 까지 할 일이 ${
              imminentLecturesLeft + imminentAssignmentsLeft
            }개가 있어요`}</p>
          )}
        </div>
      </section>
      <AttendanceBoard type="dashboard" courses={courses} />
    </main>
  );
}
