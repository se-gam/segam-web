'use client';

import PullToRefresh from 'react-simple-pull-to-refresh';
import { Spin } from 'antd';
import getQueryClient from '@/lib/getQueryClient';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  const onRefresh = async () => {
    queryClient.invalidateQueries({
      queryKey: ['studyroomReservations'],
    });
  };

  return (
    <div className="page container">
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
