import AttendanceBoard from '@/components/attendance/attendanceBoard';
import Tag from '@/components/common/tag/tag';

export default function SubjectPage() {
  return (
    <main className="container h-full overflow-auto bg-white px-4 py-2.5">
      <header className="mb-4">
        <h1 className="f20 font-bold text-text_primary">이러닝</h1>
      </header>
      <section className="mb-5 space-y-2">
        <div className="space-x-2">
          <Tag label="3월 21일 · 2주차" variant="default" size="md" />
          <Tag label="온라인 결석 2개" variant="danger" size="md" />
        </div>
        <div>
          <h2 className="f28 font-bold text-text_primary">할 일이 3개 있어요</h2>
          <p className="f16 font-medium text-text_secondary">들어야하는 강의 1개 · 과제 2개</p>
        </div>
      </section>
      <AttendanceBoard type="subject" />
    </main>
  );
}
