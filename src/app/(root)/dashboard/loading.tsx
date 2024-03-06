import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-dvh items-center justify-center">
      <Spin />
    </div>
  );
}
