'use client';

import { Studyroom } from '@/lib/definitions';
import StudyRoomSlotItem from './studyRoomSlotItem';

interface StudyRoomSlotListProps {
  data: Studyroom[];
}

export default function StudyRoomSlotList({ data }: StudyRoomSlotListProps) {
  return (
    <div className="flex flex-col">
      {data.map((studyroom) => (
        <StudyRoomSlotItem key={studyroom.id} data={studyroom} />
      ))}
    </div>
  );
}
