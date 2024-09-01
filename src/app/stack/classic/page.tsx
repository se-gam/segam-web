import StackContent from '@/components/classic/stackContent';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import { getBookData, getCalendarSlot } from '@/lib/actions/classic';

export default async function ClassicPage() {
  const [calendarSlot, bookData] = await Promise.all([getCalendarSlot(), getBookData()]);

  return (
    <main className="safe-area-bottom mb-3 flex h-screen flex-col overflow-hidden pb-6">
      <StackHeader title="예약하기" />
      <StackContent calendarSlot={calendarSlot} bookData={bookData} />
    </main>
  );
}
