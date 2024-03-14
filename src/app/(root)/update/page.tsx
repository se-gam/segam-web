import { updateCourseAttendance } from '@/lib/actions/attendance';

export default async function Page() {
  await updateCourseAttendance({
    refresh: false,
  });
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-3">
      <p className="f20 font-bold text-text_primary">강의 정보를 업데이트 하고 있어요...</p>
    </div>
  );
}
