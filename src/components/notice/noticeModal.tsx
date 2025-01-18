'use client';

import useModal from '@/hooks/useModal';
import { Notice } from '@/lib/definitions';
import { useEffect } from 'react';

export default function NoticeModal({ noticeData }: { noticeData: Notice }) {
  const { noticeModal } = useModal();

  useEffect(() => {
    noticeModal({
      title: noticeData.title,
      content: noticeData.content,
      onClick: () => {
        // TODO: 확인버튼, 다시보지 않기 버튼 클릭 2가지 경우 고려해서 함수 구현
        console.log('모달 확인 버튼 클릭');
      },
    });
  }, [noticeData.content, noticeData.title, noticeModal]);

  return <div />;
}
