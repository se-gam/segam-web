'use client';

import React from 'react';
import NoticeForm from '@/components/admin/adminNoticeForm';
import { handleCreate } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

async function submitHandler(
  values: { title: string; content: string },
  router: ReturnType<typeof useRouter>,
) {
  try {
    await handleCreate(values);
    notification.success({
      message: '공지사항 등록 완료',
      description: '공지사항이 성공적으로 등록되었습니다.',
    });
    router.push('/admin/dashboard');
  } catch (error) {
    notification.error({
      message: '공지사항 등록 실패',
      description: '공지사항 등록에 실패했습니다.',
    });
  }
}

export default function NoticeCreatePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">공지사항 등록</h1>
      <div className="rounded-lg bg-white p-4 shadow">
        <NoticeForm onSubmit={(values) => submitHandler(values, router)} />
      </div>
    </div>
  );
}
