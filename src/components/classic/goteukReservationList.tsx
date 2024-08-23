import GoteukReservationItem from '@/components/classic/goteukReservationItem';

const DATA = [
  {
    id: 1,
    title: '고투크 1회차',
    date: '2021.09.01',
  },
  {
    id: 2,
    title: '고투크 1회차',
    date: '2021.09.01',
  },
  {
    id: 3,
    title: '고투크 1회차',
    date: '2021.09.01',
  },
];

export default function GoteukReservationList() {
  if (DATA.length === 0) {
    return (
      <div className="flex h-10 items-center justify-center">
        <p className="f16 font-medium text-text_secondary">예약 내역이 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {DATA.map((item) => (
        <GoteukReservationItem key={item.id} />
      ))}
    </div>
  );
}
