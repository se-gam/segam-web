'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ReservationResponse } from '@/lib/definitions';
import getReservationList from '@/lib/actions/client';
import calReservationData from '@/utils/calReservationData';
import Board from '@/components/dashboard/board/board';
import StudyRoomCard from '@/components/dashboard/card/studyRoomCard';

function MessageView({ content }: Readonly<{ content: string }>) {
  return (
    <div className="flex h-20 w-full items-center justify-center rounded-lg">
      <p className="f16 font-medium text-text_secondary">{content}</p>
    </div>
  );
}

function ReservationList({
  reservationData,
}: Readonly<{ reservationData: ReservationResponse[] }>) {
  return (
    <>
      {reservationData.map((item) => (
        <StudyRoomCard
          key={item.id}
          title={item.title}
          description={item.description}
          iconName={item.iconName}
          id={item.id}
        />
      ))}
    </>
  );
}

export default function StudyRoomBoard() {
  const session = useSession();
  const { data, isLoading, error } = useQuery({
    // 세션 변경되어도 쿼리 날리지 않기
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['studyroomReservations'],
    queryFn: () => getReservationList(session),
    enabled: session.status === 'authenticated',
  });

  let content: React.ReactNode;

  if (isLoading || !data?.reservations) {
    content = <MessageView content="예약내역을 불러오는 중입니다..." />;
  } else if (error) {
    content = <MessageView content="예약 내역을 불러오는 중 오류가 발생했습니다." />;
  } else {
    const reservationData = calReservationData(data?.reservations || []);
    content =
      reservationData.length === 0 ? (
        <MessageView content="예약 내역이 없습니다." />
      ) : (
        <ReservationList reservationData={reservationData} />
      );
  }

  return (
    <Board title="내 예약현황" url="dashboard/studyroom">
      {content}
    </Board>
  );
}
