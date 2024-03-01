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
  return <ReservationForm studyRoom={studyRoom} friendData={friends} />;
}
