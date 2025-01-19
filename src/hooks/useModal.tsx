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

  return { modal, confirmModal };
}
