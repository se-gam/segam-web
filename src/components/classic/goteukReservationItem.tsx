'use client';

import Button from '@/components/common/button/button';
import useModal from '@/hooks/useModal';
import { useState } from 'react';

export default function GoteukReservationItem() {
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = new Date().toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const { confirmModal, modal } = useModal();
  const onSubmit = async () => {
    setIsLoading(true);

    // const res = await onCancel(id);
    setIsLoading(false);
    // if (res) {
    //   modal({
    //     title: '예약 실패',
    //     content: res,
    //   });
    // }
    modal({
      title: '예약 취소',
      content: '예약이 취소되었습니다.',
    });
  };
  const handleCancel = () => {
    confirmModal({
      title: '예약 취소',
      content: '예약을 취소하시겠습니까?',
      onClick: onSubmit,
    });
  };
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="f16 font-bold text-text_primary">총균쇠</h3>
        <p className="f14 font-semibold text-text_secondary">{formattedDate} 10시</p>
      </div>
      <Button
        label="취소"
        variant="default"
        size="sm"
        type="button"
        onClick={handleCancel}
        loading={isLoading}
      />
    </div>
  );
}
