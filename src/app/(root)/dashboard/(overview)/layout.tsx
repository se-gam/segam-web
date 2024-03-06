'use client';

import PullToRefresh from 'react-simple-pull-to-refresh';
import { updateCourseAttendance } from '@/lib/actions/attendance';
import { Spin } from 'antd';

export default function Layout({ children }: { children: React.ReactNode }) {
  const onRefresh = async () => {
    await updateCourseAttendance();
  };
  return (
    <div className="page container bg-app_bg pb-0">
      <PullToRefresh
        onRefresh={onRefresh}
        pullingContent={
          <div className="flex w-full items-center justify-center p-4">
            <Spin />
          </div>
        }
        refreshingContent={
          <div className="flex w-full items-center justify-center p-4">
            <Spin />
          </div>
        }
      >
        <div>{children}</div>
      </PullToRefresh>
    </div>
  );
}
