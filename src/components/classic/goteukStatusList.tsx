'use client';

import GoteukStatusListItem from '@/components/classic/goteukStatusListItem';
import SuspenseView from '@/components/common/suspenseView';
import { getClassicStatus } from '@/lib/actions/client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function GoteukStatusList() {
  const session = useSession();
  const { data, isLoading, error } = useQuery({
    // 세션 변경되어도 쿼리 날리지 않기
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['classicStatus'],
    queryFn: () => getClassicStatus(session),
    enabled: session.status === 'authenticated',
  });

  if (isLoading) return <SuspenseView content="예약 내역을 불러오는 중입니다..." />;
  if (error) return <SuspenseView content="예약 내역을 불러오는 중 오류가 발생했습니다." />;
  return (
    <div className="flex flex-col gap-4">
      {data?.categoryStatus.map((item) => (
        <GoteukStatusListItem key={item.categoryCode} classicStatus={item} />
      ))}
    </div>
  );
}
