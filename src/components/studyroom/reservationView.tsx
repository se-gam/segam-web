'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getStudyroomReservation } from '@/lib/actions/client';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';
import SuspenseView from '@/components/common/suspenseView';

export default function ReservationView() {
  const session = useSession();
  const { data, isLoading, error } = useQuery({
    // 세션 변경되어도 쿼리 날리지 않기
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['studyroomReservations'],
    queryFn: () => getStudyroomReservation(session),
    enabled: session.status === 'authenticated',
  });

  if (isLoading) return <SuspenseView content="예약 내역을 불러오는 중입니다..." />;
  if (error) return <SuspenseView content="예약 내역을 불러오는 중 오류가 발생했어요." />;
  if (!data?.reservations || data.reservations.length === 0)
    return <SuspenseView content="예약 내역이 없어요." />;

  return <StudyRoomReservationList data={data.reservations} />;
}
