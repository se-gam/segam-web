'use client';

import { updateCourseAttendance } from '@/lib/actions/attendance';
import { PullToRefresh } from 'antd-mobile';

export default function Layout({ children }: { children: React.ReactNode }) {
  const onRefresh = async () => {
    await updateCourseAttendance();
  };
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      refreshingText="Refreshing..."
      completeText="Refresh complete"
      canReleaseText="Release to refresh"
      pullingText="Pull down to refresh"
    >
      {children}
    </PullToRefresh>
  );
}
