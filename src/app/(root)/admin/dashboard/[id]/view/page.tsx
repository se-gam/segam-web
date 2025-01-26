import React from 'react';
import NoticeForm from '@/components/admin/adminNoticeForm';
import { getNoticeById } from '@/lib/actions/admin';

export default async function NoticeViewPage({ params }: { params: { id: string } }) {
  const noticeData = await getNoticeById(Number(params.id));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">공지사항 조회</h1>
      <div className="rounded-lg bg-white p-4 shadow">
        <NoticeForm initialData={noticeData} readOnly />
      </div>
    </div>
  );
}
