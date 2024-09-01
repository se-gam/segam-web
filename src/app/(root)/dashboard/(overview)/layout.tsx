'use client';

import PullToRefresh from 'react-simple-pull-to-refresh';
import { updateCourseAttendance } from '@/lib/actions/attendance';
import { Spin } from 'antd';
import getQueryClient from '@/lib/getQueryClient';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  const onRefresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ['studyroomReservations'],
    });
    queryClient.invalidateQueries({
      queryKey: ['classicStatus'],
    });
    queryClient.invalidateQueries({
      queryKey: ['classicReservations'],
    });
    await updateCourseAttendance({
      refresh: true,
    });
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
