import { cancelReservation, getReservationList } from '@/lib/actions/studyroom';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';

export default async function ReservationView() {
  const reservationListData = await getReservationList();
  return (
    <div>
      {reservationListData && reservationListData.reservations.length > 0 ? (
        <StudyRoomReservationList
          data={reservationListData.reservations}
          onCancel={cancelReservation}
        />
      ) : (
        <div className="flex h-10 items-center justify-center">
          <p className="f16 font-medium text-text_secondary">예약 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
