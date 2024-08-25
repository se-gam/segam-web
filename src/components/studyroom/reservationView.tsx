'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { cancelReservation } from '@/lib/actions/studyroom';
import getReservationList from '@/lib/actions/client';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';

function SuspenseView({ content }: Readonly<{ content: string }>) {
  return (
    <div className="flex h-10 items-center justify-center">
      <p className="f16 font-medium text-text_secondary">{content}</p>
    </div>
  );
}

export default function ReservationView() {
  const session = useSession();
  const { data, isLoading, error } = useQuery({
    // 세션 변경되어도 쿼리 날리지 않기
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['studyroomReservations'],
    queryFn: () => getReservationList(session),
    enabled: session.status === 'authenticated',
  });

  if (isLoading) return <SuspenseView content="예약 내역을 불러오는 중입니다..." />;
  if (error) return <SuspenseView content="예약 내역을 불러오는 중 오류가 발생했습니다." />;
  if (!data?.reservations || data.reservations.length === 0)
    return <SuspenseView content="예약 내역이 없습니다." />;

  return <StudyRoomReservationList data={data.reservations} onCancel={cancelReservation} />;
}
