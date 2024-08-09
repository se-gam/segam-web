'use client';

import { updateCourseAttendance } from '@/lib/actions/attendance';
import { Spin } from 'antd';
import { useEffect } from 'react';

export default function Update() {
  const handleUpdate = async () => {
    await updateCourseAttendance({
      refresh: false,
    });
  };
  useEffect(() => {
    handleUpdate();
  }, []);
  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="f20 mb-6 font-bold">강의 정보를 업데이트 중이에요...</h1>
      <Spin />
    </div>
  );
}
