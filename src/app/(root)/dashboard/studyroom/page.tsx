import { Suspense } from 'react';
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
    <main className="page bg-white px-4">
      <header className="mb-4 pt-2.5">
        <h1 className="f20 font-bold text-text_primary">스터디룸</h1>
      </header>
      <Suspense>
        <ReservationView />
      </Suspense>
      <StudyRoomView params={{ date, startsAt, endsAt }} />
    </main>
  );
}
