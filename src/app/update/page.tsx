import Link from 'next/link';
import { updateCourseAttendance } from '@/lib/actions/attendance';

export default async function Update() {
  const data = await updateCourseAttendance({
    refresh: false,
  });
  if (!data) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-2">
        <h1 className="f16 mb-6 font-semibold">계정을 홈페이지를 통해 확인해주세요.</h1>
        <Link
          href="/logout"
          className='hover:bg-blue-400" mb-1 mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors'
        >
          홈으로 돌아가기
        </Link>
      </main>
    );
  }
}
