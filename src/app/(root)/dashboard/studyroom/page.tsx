import { Suspense } from 'react';
import Loading from '@/components/common/loading';
import StudyRoomView from './studyRoomView';
import ReservationView from './reservationView';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    date: string;
    startsAt: number;
    endsAt: number;
  };
}) {
  const date = searchParams?.date || new Date().toISOString();
  const startsAt = searchParams?.startsAt || 10;
  const endsAt = searchParams?.endsAt || 22;

  return (
    <main className="flex h-full flex-col overflow-hidden">
      <header className="mb-4 px-4 pt-2.5">
        <h1 className="f20 font-bold text-text_primary">스터디룸</h1>
      </header>
      <section className="mb-5 space-y-2 px-4">
        <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
        <Suspense fallback={<Loading size="small" />}>
          <ReservationView />
        </Suspense>
      </section>
      <StudyRoomView params={{ date, startsAt, endsAt }} />
    </main>
  );
}
