'use client';

import React, { useState } from 'react';
import { Modal, Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { handlePopup } from '@/lib/actions/admin';

type PopupButtonProps = {
  noticeId: number;
};

export default function PopupButton({ noticeId }: PopupButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    try {
      const result = await handlePopup(noticeId);
      if (result.success) {
        notification.success({
          message: '팝업 공지 변경 완료',
          description: `ID ${noticeId}로 팝업 공지가 변경되었습니다.`,
        });
        router.refresh();
      }
    } catch (error) {
      notification.error({
        message: '팝업 공지 변경 실패',
        description: '팝업 공지 설정에 실패했습니다.',
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="rounded-md bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
      >
        팝업
      </button>
      <Modal
        title="팝업 공지 변경"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            아니오
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            예
          </Button>,
        ]}
      >
        <p>팝업 공지를 ID {noticeId}로 변경하시겠습니까?</p>
      </Modal>
    </>
  );
}
