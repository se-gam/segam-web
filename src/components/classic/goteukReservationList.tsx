'use client';

import GoteukReservationItem from '@/components/classic/goteukReservationItem';
import SuspenseView from '@/components/common/suspenseView';
import { getClassicReservation } from '@/lib/actions/client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function GoteukReservationList() {
  const session = useSession();
  const { data, isLoading, error } = useQuery({
    // 세션 변경되어도 쿼리 날리지 않기
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['classicReservations'],
    queryFn: () => getClassicReservation(session),
    enabled: session.status === 'authenticated',
  });

  if (isLoading) return <SuspenseView content="예약 내역을 불러오는 중이에요..." />;
  if (error) return <SuspenseView content="예약 내역을 불러오는 중 오류가 발생했어요." />;
  if (!data?.reservations || data.reservations.length === 0)
    return <SuspenseView content="예약 내역이 없어요." />;
  return (
    <div className="flex flex-col gap-2">
      {data.reservations.map((item) => (
        <GoteukReservationItem key={item.bookId} reservation={item} />
      ))}
    </div>
  );
}
