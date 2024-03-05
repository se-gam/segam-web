import { Spin } from 'antd';

interface LoadingProps {
  size?: 'small' | 'default' | 'large';
  content?: string;
}

export default function Loading({ size = 'default', content }: LoadingProps) {
  let spinSize;
  switch (size) {
    case 'small':
      spinSize = 'small';
      break;
    case 'large':
      spinSize = 'large';
      break;
    default:
      spinSize = 'default';
      break;
  }

  return (
    <div className="container flex h-10 flex-col items-center justify-center">
      <Spin size={spinSize as 'small' | 'default' | 'large' | undefined} />
      <p className="f14 font-bold text-text_primary">{content}</p>
    </div>
  );
}
