import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Spin />
    </div>
  );
}
