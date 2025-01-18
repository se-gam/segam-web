'use client';

import Button from '@/components/common/button/button';
import { Modal } from 'antd';

interface ModalProps {
  title: string;
  content: string;
  onClick?: () => void;
}

export default function useModal() {
  const modal = ({ title, content, onClick = () => null }: ModalProps) => {
    Modal.error({
      title: <h3 className="f20 font-bold text-text_primary">{title}</h3>,
      content: <p className="f16 font-medium text-text_secondary">{content}</p>,
      footer: (
        <Button
          label="확인"
          variant="primary"
          size="full"
          onClick={() => {
            onClick();
            Modal.destroyAll();
          }}
          className="mt-4"
        />
      ),
      icon: null,
      maskClosable: true,
      centered: true,
    });
  };
  const confirmModal = ({ title, content, onClick = () => null }: ModalProps) => {
    Modal.confirm({
      title: <h3 className="f20 font-bold text-text_primary">{title}</h3>,
      content: <p className="f16 font-medium text-text_secondary">{content}</p>,
      footer: (
        <div className="mt-4 flex flex-row">
          <Button
            label="취소"
            variant="default"
            size="full"
            onClick={() => {
              Modal.destroyAll();
            }}
            className="mr-2"
          />
          <Button
            label="확인"
            variant="primary"
            size="full"
            onClick={() => {
              onClick();
              Modal.destroyAll();
            }}
          />
        </div>
      ),
      icon: null,
      maskClosable: true,
      centered: true,
    });
  };
  const noticeModal = ({ title, content, onClick = () => null }: ModalProps) => {
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
              Modal.destroyAll();
            }}
            className="mr-2"
          />
          <Button
            label="확인"
            variant="primary"
            size="full"
            onClick={() => {
              onClick();
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
  return { modal, confirmModal, noticeModal };
}
