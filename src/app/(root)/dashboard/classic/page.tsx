import GoteukReservationList from '@/components/classic/goteukReservationList';
import GoteukStatusList from '@/components/classic/goteukStatusList';
import GoteukReservationCard from '@/components/classic/goteukReservationCard';

export default async function ClassicPage() {
  return (
    <main className="page container overflow-auto pb-8">
      <header className="px-4 pt-2.5">
        <h1 className="f20 font-bold text-text_primary">고전독서인증</h1>
      </header>
      <GoteukReservationCard />
      <div className="h-1.5 w-full bg-button_default_bg" />
      <section className="space-y-2 px-4 py-5">
        <h1 className="f24 font-bold text-text_primary">예약 현황</h1>
        <GoteukReservationList />
      </section>
      <div className="h-1.5 w-full bg-button_default_bg" />
      <section className="mb-8 flex flex-col px-4 pt-5">
        <h2 className="f20 mb-[18px] font-bold text-text_primary">인증현황</h2>
        <GoteukStatusList />
      </section>
    </main>
  );
}
