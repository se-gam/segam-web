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
      content: <p className="f14 font-medium text-text_secondary">{content}</p>,
      icon: null,
      maskClosable: true,
      okText: '확인',
      okButtonProps: {
        style: {
          backgroundColor: '#626FE5',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
        },
      },
      onOk: () => {
        onClick();
        Modal.destroyAll();
      },
    });
  };
  const confirmModal = ({ title, content, onClick = () => null }: ModalProps) => {
    Modal.confirm({
      title: <h3 className="f20 font-bold text-text_primary">{title}</h3>,
      content: <p className="f14 font-medium text-text_secondary">{content}</p>,
      icon: null,
      maskClosable: true,
      okText: '확인',
      cancelText: '취소',
      okButtonProps: {
        style: {
          backgroundColor: '#626FE5',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#F5F6FA',
          color: '#626FE5',
          borderRadius: '4px',
          border: 'none',
        },
      },
      onOk: () => {
        onClick();
        Modal.destroyAll();
      },
    });
  };
  return { modal, confirmModal };
}
