import BookInfoSelector from '@/components/classic/bookInfoSelector';
import GtCalender from '@/components/classic/gtCalender';
import TimeSlotSelector from '@/components/classic/timeSlotSelector';
import StackHeader from '@/components/common/stackHeader/stackHeader';

export default function ClassicPage() {
  return (
    <main className="safe-area-bottom mb-3 h-screen flex-col overflow-auto">
      <StackHeader title="예약하기" />
      <div className="mx-4 flex flex-col gap-6">
        <GtCalender />
        <TimeSlotSelector title="시간 선택하기" subTitle="예약이 마간된 시간은 보이지 않아요" />
        <BookInfoSelector title="도서 선택하기" />
      </div>
    </main>
  );
}
