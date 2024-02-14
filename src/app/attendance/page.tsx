import AttendanceBoard from '@/components/attendance/attendanceBoard';
import Tag from '@/components/common/tag/tag';

export default function Attendance() {
  return (
    <main className="container mb-2.5 h-full overflow-auto bg-white px-4">
      <header className="mb-4 mt-2.5">
        <h1 className="f20 font-bold text-text_primary">이러닝</h1>
      </header>
      <section className="mb-5 space-y-2">
        <Tag label="3월 21일 · 2주차" variant="default" size="md" />
        <div>
          <h2 className="f28 font-bold text-text_primary">할 일이 9개 있어요.</h2>
          <p className="f16 font-medium text-text_secondary">토요일까지 할 일이 3개가 있어요.</p>
        </div>
      </section>
      <AttendanceBoard type="total" />
    </main>
  );
}
