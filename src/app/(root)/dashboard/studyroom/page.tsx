'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';
import StudyRoomSlotList from '@/components/studyroom/list/studyRoomSlotList';
import { getReservationList, getStudyroomList } from '@/lib/actions/studyroom';
import { StudyroomList, StudyroomReservationList } from '@/lib/definitions';

export default function StudyRoom() {
  const [studyroomList, setStudyroomList] = useState<StudyroomList>();
  const [reservationList, setReservationList] = useState<StudyroomReservationList>();

  const exampleRes = {
    reservations: [
      {
        id: 318327,
        name: '시네마룸1',
        date: '2024-02-27T00:00:00.000Z',
        startsAt: 15,
        duration: 1,
        isLeader: true,
        isCinema: true,
        reason: 'ㅁ',
        users: [
          {
            studentId: '18011480',
            name: '이진형',
          },
          {
            studentId: '18011513',
            name: '이우식',
          },
        ],
      },
      {
        id: 318328,
        name: '시네마룸1',
        date: '2024-02-27T00:00:00.000Z',
        startsAt: 15,
        duration: 1,
        isLeader: true,
        isCinema: true,
        reason: 'ㅁ',
        users: [
          {
            studentId: '18011480',
            name: '이진형',
          },
          {
            studentId: '18011513',
            name: '이우식',
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all([
        // TODO: 이거 allsettled 묶지 말고 따로따로 렌더링 or 캐시 태울지 결정하기 (getReservationList 받아오는거 느린것 때문에)
        getStudyroomList({ date: new Date() }),
        getReservationList(),
      ]);
      setStudyroomList(data[0]);
      setReservationList(data[1]);
    };

    fetchData();
  }, []);

  return (
    <main className="page bg-white px-4 pt-2.5">
      <header className="mb-4">
        <h1 className="f20 font-bold text-text_primary">스터디룸</h1>
      </header>
      <section className="mb-5 space-y-2">
        <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
        <StudyRoomReservationList data={exampleRes.reservations} />
      </section>
      {/* {reservationList && reservationList.reservations.length > 0 && (
        <section className="mb-5 space-y-2">
          <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
          <StudyRoomReservationList data={reservationList.reservations} />
        </section>
      )} */}
      {studyroomList && (
        <section className="mb-5 space-y-2">
          <h1 className="f24 mb-[1rem] font-bold text-text_primary">예약하기</h1>
          <StudyRoomSlotList data={studyroomList?.studyrooms} />
        </section>
      )}
    </main>
  );
}
