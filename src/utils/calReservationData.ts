import { Reservation } from '@/lib/definitions';

export default function calReservationData(reservations: Reservation[]) {
  return reservations.map((reservation: Reservation) => {
    const date = new Date(reservation.date);
    const startTime = `${reservation.startsAt}시`;
    const endTime = `${reservation.startsAt + reservation.duration}시`;
    const formattedDate = date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Seoul',
    });

    return {
      id: reservation.id,
      title: reservation.name,
      description: `${formattedDate} ${startTime}~${endTime}`,
      iconName: reservation.isCinema ? 'cinema' : 'studyRoom',
    };
  });
}
