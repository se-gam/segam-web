import ReservationView from '@/components/studyroom/reservationView';
import StudyRoomView from '@/components/studyroom/studyRoomView';

export default async function Page() {
  return (
    <main className="flex h-full flex-col overflow-hidden">
      <header className="mb-4 px-4 pt-2.5">
        <h1 className="f20 font-bold text-text_primary">스터디룸</h1>
      </header>
      <section className="mb-5 space-y-2 px-4">
        <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
        <ReservationView />
      </section>
      <div className="mb-[25px] h-1.5 w-full bg-button_default_bg" />
      <StudyRoomView />
    </main>
  );
}
