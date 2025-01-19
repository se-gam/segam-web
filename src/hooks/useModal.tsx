'use client';

import Button from '@/components/common/button/button';
import { Modal } from 'antd';

interface ModalProps {
  title: string;
  content: string;
  isNotice?: boolean;
  onCancleClick?: () => void;
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
  const confirmModal = ({
    title,
    content,
    isNotice = false,
    onCancleClick = () => null,
    onClick = () => null,
  }: ModalProps) => {
    Modal.confirm({
      title: (
        <h3 className={`f20 font-bold text-text_primary ${isNotice ? 'mb-4' : ''}`}>{title}</h3>
      ),
      content: (
        <p className={`f16 font-medium ${isNotice ? 'text-text_primary' : 'text-text_secondary'}`}>
          {content}
        </p>
      ),
      footer: (
        <div className={`${isNotice ? 'mt-6' : 'mt-4'} flex flex-row`}>
          <Button
            label={isNotice ? '다시보지 않기' : '취소'}
            variant="default"
            size="full"
            onClick={() => {
              onCancleClick();
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
      maskClosable: !isNotice,
      centered: true,
      transitionName: isNotice ? '' : undefined,
    });
  };

  return { modal, confirmModal };
}
