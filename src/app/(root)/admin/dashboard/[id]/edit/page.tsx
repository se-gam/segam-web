'use client';

import React, { useEffect, useState } from 'react';
import NoticeForm from '@/components/admin/adminNoticeForm';
import { getNoticeById, handleEdit } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { Notice } from '@/lib/definitions';

export default function NoticeEditPage({ params }: { params: { id: string } }) {
  const [noticeData, setNoticeData] = useState<Pick<Notice, 'title' | 'content'> | undefined>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNoticeById(Number(params.id));
        setNoticeData(data);
      } catch (err) {
        setError('공지사항 데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [params.id]);

  const handleEditSubmit = async (values: Pick<Notice, 'title' | 'content'>) => {
    try {
      await handleEdit(Number(params.id), values);
      notification.success({
        message: '공지사항 수정 완료',
        description: '공지사항이 성공적으로 수정되었습니다.',
      });
      router.push('/admin/dashboard');
    } catch (err) {
      notification.error({
        message: '공지사항 수정 실패',
        description: '공지사항 수정에 실패했습니다.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">로딩 중...</div>
    );
  }

  if (error) {
    throw new Error('공지사항을 불러올 수 없습니다.');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">공지사항 수정</h1>
      <div className="rounded-lg bg-white p-4 shadow">
        <NoticeForm initialData={noticeData} onSubmit={handleEditSubmit} />
      </div>
    </div>
  );
}
