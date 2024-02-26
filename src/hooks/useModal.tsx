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
      okButtonProps: {
        style: {
          backgroundColor: '#626FE5',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
        },
      },
      onOk: () => {
        Modal.destroyAll();
        onClick();
      },
    });
  };
  return { modal };
}
