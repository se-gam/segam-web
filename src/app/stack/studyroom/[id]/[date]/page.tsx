import StackHeader from '@/components/common/stackHeader/stackHeader';
import ReservationForm from '@/components/studyroom/reservationForm';
import { getStudyroomInfo } from '@/lib/actions/studyroom';
import { getFriends } from '@/lib/actions/user';

export default async function ReservationPage({
  params,
}: {
  params: { id: number; date: string };
}) {
  const data = Promise.all([
    getStudyroomInfo({ id: params.id, date: new Date(params.date) }),
    getFriends(),
  ]);
  const [studyRoom, friends] = await data;
  return (
    <div className="safe-area-bottom flex h-screen flex-col overflow-hidden">
      <StackHeader title="예약하기" />
      <div className="h-full overflow-auto">
        <ReservationForm studyRoom={studyRoom} friendData={friends} date={params.date} />
      </div>
    </div>
  );
}
