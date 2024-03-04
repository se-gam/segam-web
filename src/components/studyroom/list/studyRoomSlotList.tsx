'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // 모바일 온리 사용으로 해제

import useLink from '@/hooks/useLink';
import { Studyroom } from '@/lib/definitions';
import StudyRoomSlotItem from './studyRoomSlotItem';

const filterStudyRooms = (studyRooms: Studyroom[], startsAt: number, endsAt: number) => {
  const rooms = JSON.parse(JSON.stringify(studyRooms)); // 쿼리 좁히다가 다시 넓힐 것 대비해서 딥카피
  const adjustedEndsAt = endsAt > startsAt ? endsAt - 1 : endsAt;

  return rooms.filter((room: Studyroom) => {
    const hasOpenSlotsInRange = room.slots.some(
      (slot) =>
        slot.startsAt >= startsAt &&
        slot.startsAt <= adjustedEndsAt &&
        !slot.isReserved &&
        !slot.isClosed,
    );

    return hasOpenSlotsInRange;
  });
};

interface StudyRoomSlotListProps {
  date: string;
  data: Studyroom[];
  startsAt: number;
  endsAt: number;
}

export default function StudyRoomSlotList({
  date,
  data,
  startsAt,
  endsAt,
}: StudyRoomSlotListProps) {
  const { navigateTo } = useLink();
  const dateString = new Date(date).toISOString().split('T')[0];
  const filteredData = filterStudyRooms(data, startsAt, endsAt);

  return (
    <div className="flex flex-col">
      {filteredData.map((studyroom: Studyroom) => (
        <div
          onClick={() => {
            navigateTo({
              page: `studyroom/${studyroom.id}/${dateString}`,
              title: studyroom.name,
            });
          }}
          key={studyroom.id}
        >
          <StudyRoomSlotItem key={studyroom.id} data={studyroom} />
        </div>
      ))}
    </div>
  );
}
