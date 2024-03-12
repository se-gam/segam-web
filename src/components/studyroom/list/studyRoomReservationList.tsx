'use client';

import { Reservation } from '@/lib/definitions';
import StudyRoomReservationItem from './studyRoomReservationItem';

interface StudyRoomReservationListProps {
  data: Reservation[];
  onCancel: (id: number) => Promise<null | string>;
}

export default function StudyRoomReservationList({
  data,
  onCancel,
}: StudyRoomReservationListProps) {
  return (
    <div>
      {data.map((reservation) => (
        <StudyRoomReservationItem
          key={reservation.id}
          id={reservation.id}
          name={reservation.name}
          date={reservation.date}
          startsAt={reservation.startsAt}
          duration={reservation.duration}
          users={reservation.users}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
