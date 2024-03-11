'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // 모바일 온리 사용으로 해제

import useLink from '@/hooks/useLink';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import { Studyroom } from '@/lib/definitions';
import StudyRoomSlotItem from './studyRoomSlotItem';

const filterStudyRooms = (studyRooms: Studyroom[], startsAt: number, endsAt: number) => {
  const adjustedEndsAt = endsAt > startsAt ? endsAt - 1 : endsAt;

  return studyRooms.filter((room: Studyroom) => {
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
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const dateTime = new Date(date).getTime();
  const filteredData = filterStudyRooms(data, startsAt, endsAt);

  return (
    <div className="flex h-full flex-col overflow-auto px-4 ">
      {filteredData.map((studyroom: Studyroom) => (
        <div
          onClick={() => {
            trackAmplitudeEvent('click_스터디룸_개별스터디룸_list');
            navigateTo({
              page: `studyroom/${studyroom.id}/${dateTime}`,
              title: studyroom.name,
            });
          }}
          key={studyroom.id}
        >
          <StudyRoomSlotItem key={studyroom.id} data={studyroom} date={date} />
        </div>
      ))}
    </div>
  );
}
