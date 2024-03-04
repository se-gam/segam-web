'use client';

import { updateReservationList } from '@/lib/actions/studyroom';
import { Spin } from 'antd';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PullToRefresh from 'react-simple-pull-to-refresh';

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
      pullingContent={
        <div className="mt-2 flex w-full items-center justify-center">
          <Spin />
        </div>
      }
      refreshingContent={
        <div className="mt-2 flex w-full items-center justify-center">
          <Spin />
        </div>
      }
    >
      <div className="flex h-full flex-col overflow-hidden">{children}</div>
    </PullToRefresh>
  );
}
