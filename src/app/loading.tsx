import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-3">
      <Spin />
    </div>
  );
}
