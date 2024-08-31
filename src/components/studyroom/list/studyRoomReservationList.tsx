'use client';

import { Reservation } from '@/lib/definitions';
import StudyRoomReservationItem from './studyRoomReservationItem';

interface StudyRoomReservationListProps {
  data: Reservation[];
}

export default function StudyRoomReservationList({ data }: StudyRoomReservationListProps) {
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
          isLeader={reservation.isLeader}
          users={reservation.users}
        />
      ))}
    </div>
  );
}
