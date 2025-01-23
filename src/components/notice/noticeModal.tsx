'use client';

import { Notice } from '@/lib/definitions';
import { useEffect } from 'react';
import useModal from '@/hooks/useModal';

export default function NoticeModal({ noticeData }: { noticeData: Notice }) {
  const { title, content, id } = noticeData;
  const { confirmModal } = useModal();

  useEffect(() => {
    const dismissCheck = localStorage.getItem('dismiss');
    const seenCheck = sessionStorage.getItem('seen');
    if (dismissCheck !== String(id)) {
      localStorage.removeItem('dismiss');
    }
    if (seenCheck !== String(id)) {
      sessionStorage.removeItem('seen');
    }
    const onCancleClick = () => {
      localStorage.setItem('dismiss', String(id));
    };
    const onClick = () => {
      sessionStorage.setItem('seen', String(id));
    };

    if (!seenCheck && !dismissCheck) {
      confirmModal({ title, content, onCancleClick, onClick, isNotice: true });
    }
  }, [confirmModal, content, title, id]);

  return <div />;
}
