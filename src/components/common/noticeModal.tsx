'use client';

import useModal from '@/hooks/useModal';
import Button from './button/button';

export default function NoticeModal() {
  const { noticeModal } = useModal();

  const handleClick = () => {
    noticeModal({
      title: '공지사항제목',
      content: `아래부터 공지사항 내용입니다 아래부터 공지사항 내용입니다 아래부터 공지사항 내용입니다`,
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
