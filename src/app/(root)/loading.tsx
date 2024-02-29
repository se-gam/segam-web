import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-3">
      <p className="f20 font-bold text-text_primary">강의 정보를 업데이트 하고 있어요...</p>
      <Spin />
    </div>
  );
}
