'use client';

import useModal from '@/hooks/useModal';
import { Notice } from '@/lib/definitions';
import Button from './button/button';

export default function NoticeModal({ noticeData }: { noticeData: Notice }) {
  const { noticeModal } = useModal();

  const handleClick = () => {
    noticeModal({
      title: noticeData.title,
      content: noticeData.content,
      onClick: () => {
        console.log('모달 확인 버튼 클릭');
      },
    });
  };

  return (
    <div className="mt-4">
      <Button label="모달 열기" variant="primary" size="full" onClick={handleClick} />
    </div>
  );
}
