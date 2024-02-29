import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <Spin />
    </div>
  );
}
