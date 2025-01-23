import AdminTable from '@/components/admin/adminTable';
import { getNotices } from '@/lib/actions/admin';

export default async function AdminDashBoard() {
  const notices = await getNotices();
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">공지사항 관리</h1>

      <div className="rounded-lg bg-white p-4 shadow">
        <AdminTable notices={notices} />
      </div>
    </div>
  );
}
