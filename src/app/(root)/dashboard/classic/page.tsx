import { Suspense } from 'react';
import Loading from '@/components/common/loading';
import GoteukReservationList from '@/components/classic/goteukReservationList';
import GoteukStatusList from '@/components/classic/goteukStatusList';
import GoteukReservationCard from '@/components/classic/goteukReservationCard';

export default async function ClassicPage() {
  return (
    <main className="page container overflow-auto pb-8">
      <header className="mb-4 px-4 pt-2.5">
        <h1 className="f20 font-bold text-text_primary">고전독서인증</h1>
      </header>
      <section className="mb-5 space-y-2 px-4">
        <h1 className="f24 font-bold text-text_primary">예약 현황</h1>
        <Suspense fallback={<Loading size="small" />}>
          <GoteukReservationList />
        </Suspense>
      </section>
      <div className="h-1.5 w-full bg-button_default_bg" />
      <section className="mb-8 flex flex-col px-4 pt-5">
        <h2 className="f20 mb-[18px] font-bold text-text_primary">인증현황</h2>
        <GoteukStatusList />
      </section>
      <GoteukReservationCard />
    </main>
  );
}
