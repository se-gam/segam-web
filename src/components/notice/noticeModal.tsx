'use client';

import { Notice } from '@/lib/definitions';
import { Modal } from 'antd';
import { useEffect } from 'react';
import Button from '../common/button/button';

export default function NoticeModal({ noticeData }: { noticeData: Notice }) {
  const { title, content, id } = noticeData;

  useEffect(() => {
    const dismissCheck = localStorage.getItem('dismiss');
    const seenCheck = sessionStorage.getItem('seen');
    if (dismissCheck !== String(id)) {
      localStorage.removeItem('dismiss');
    }
    if (seenCheck !== String(id)) {
      sessionStorage.removeItem('seen');
    }
    const noticeModal = () => {
      Modal.confirm({
        title: <h3 className="f20 mb-4 font-bold text-text_primary">{title}</h3>,
        content: <p className="f16 font-medium text-text_primary">{content}</p>,
        footer: (
          <div className="mt-6 flex flex-row">
            <Button
              label="다시보지 않기"
              variant="default"
              size="full"
              onClick={() => {
                localStorage.setItem('dismiss', String(id));
                Modal.destroyAll();
              }}
              className="mr-2"
            />
            <Button
              label="확인"
              variant="primary"
              size="full"
              onClick={() => {
                sessionStorage.setItem('seen', String(id));
                Modal.destroyAll();
              }}
            />
          </div>
        ),
        icon: null,
        maskClosable: false,
        centered: true,
        width: '358px',
        style: { top: -100 },
        transitionName: '',
      });
    };
    if (!seenCheck && !dismissCheck) {
      noticeModal();
    }
  }, [content, title, id]);

  return <div />;
}
