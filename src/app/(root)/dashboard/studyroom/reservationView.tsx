import { cancelReservation, getReservationList } from '@/lib/actions/studyroom';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';

export default async function ReservationView() {
  const reservationListData = await getReservationList();
  return (
    <div>
      {reservationListData && reservationListData.reservations.length > 0 && (
        <section className="mb-5 space-y-2">
          <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
          <StudyRoomReservationList
            data={reservationListData.reservations}
            onCancel={cancelReservation}
          />
        </section>
      )}
    </div>
  );
}
