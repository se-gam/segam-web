import AdminTable from '@/components/admin/adminTable';
import { getNotices } from '@/lib/actions/admin';
import Link from 'next/link';

export default async function AdminDashBoard() {
  const notices = await getNotices();
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">공지사항 관리</h1>
      <div className="mb-4 flex justify-end">
        <Link
          href="/admin/dashboard/create"
          className="rounded-full bg-theme_primary px-6 py-2 text-white hover:bg-theme_secondary"
        >
          공지사항 등록
        </Link>
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        <AdminTable notices={notices} />
      </div>
    </div>
  );
}
