'use client';

import { updateReservationList } from '@/lib/actions/studyroom';
import { PullToRefresh } from 'antd-mobile';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = (date: Date, startsAt: number, endsAt: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('date', date.toISOString());
    params.set('startsAt', startsAt.toString());
    params.set('endsAt', endsAt.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const onRefresh = async () => {
    await updateReservationList();
    handleSearch(new Date(), 10, 22);
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
