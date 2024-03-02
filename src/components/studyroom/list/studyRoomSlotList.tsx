'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */ // 모바일 온리 사용으로 해제

import useLink from '@/hooks/useLink';
import { Studyroom } from '@/lib/definitions';
import StudyRoomSlotItem from './studyRoomSlotItem';

interface StudyRoomSlotListProps {
  date: string;
  data: Studyroom[];
}

export default function StudyRoomSlotList({ date, data }: StudyRoomSlotListProps) {
  const { navigateTo } = useLink();
  const dateString = new Date(date).toISOString().split('T')[0];
  return (
    <div className="flex flex-col">
      {data.map((studyroom) => (
        <div
          onClick={() => {
            navigateTo({
              page: `studyroom/${studyroom.id}/${dateString}`,
              title: studyroom.name,
            });
          }}
        >
          <StudyRoomSlotItem key={studyroom.id} data={studyroom} />
        </div>
      ))}
    </div>
  );
}
