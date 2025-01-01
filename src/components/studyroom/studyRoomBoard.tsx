'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ReservationItem, ReservationResponse } from '@/lib/definitions';
import { getStudyroomReservation } from '@/lib/actions/client';
import StudyRoomReservationCard from '@/components/dashboard/card/studyRoomReservationCard';
import calReservationData from '@/utils/calReservationData';

function MessageView({ content }: Readonly<{ content: string }>) {
  return (
    <div className="flex h-20 w-full items-center justify-center rounded-lg">
      <p className="f16 font-medium text-text_secondary">{content}</p>
    </div>
  );
}

function isStudyroom(item: ReservationItem): item is ReservationResponse {
  return 'id' in item && 'title' in item;
}

export default function ReservationList() {
  const session = useSession();
  const {
    data: studyroomData,
    isLoading: studyroomLoading,
    error: studyroomError,
  } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['studyroomReservations'],
    queryFn: () => getStudyroomReservation(session),
    enabled: session.status === 'authenticated',
  });
  // const {
  //   data: classicData,
  //   isLoading: classicLoading,
  //   error: classicError,
  // } = useQuery({
  //   // eslint-disable-next-line @tanstack/query/exhaustive-deps
  //   queryKey: ['classicReservations'],
  //   queryFn: () => getClassicReservation(session),
  //   enabled: session.status === 'authenticated',
  // });

  const isLoading = studyroomLoading;
  const error = studyroomError;

  if (isLoading) {
    return <MessageView content="예약내역을 불러오는 중이에요..." />;
  }
  if (error) {
    return <MessageView content="예약내역을 불러오는 중 오류가 발생했어요." />;
  }
  const reservationData = calReservationData(studyroomData?.reservations || []);
  // const data = [...reservationData, ...(classicData?.reservations || [])];
  const data = reservationData;

  if (data.length === 0) {
    return <MessageView content="예약 내역이 없어요." />;
  }
  return data.map((item) => {
    if (isStudyroom(item)) {
      return (
        <StudyRoomReservationCard
          key={item.id}
          id={item.id}
          isLeader={item.isLeader}
          title={item.title}
          description={item.description}
          iconName={item.iconName}
        />
      );
    }
    return null;
    // return <ClassicReservationCard key={item.reservationId} reservation={item} />;
  });
}
