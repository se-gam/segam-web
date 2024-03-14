'use client';

import { updateCourseAttendance } from '@/lib/actions/attendance';
import { Spin } from 'antd';
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function Layout({ children }: { children: React.ReactNode }) {
  const onRefresh = async () => {
    await updateCourseAttendance({
      refresh: true,
    });
  };
  return (
    <div className="page container pb-0">
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
        <div className="flex h-full flex-col overflow-hidden">{children}</div>
      </PullToRefresh>
    </div>
  );
}
