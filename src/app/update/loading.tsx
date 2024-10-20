import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="f20 mb-6 font-bold">강의 정보를 업데이트 중이에요...</h1>
      <Spin />
    </div>
  );
}
