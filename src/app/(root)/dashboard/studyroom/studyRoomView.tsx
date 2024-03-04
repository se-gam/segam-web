import { getStudyroomList } from '@/lib/actions/studyroom';
import StudyRoomSlotList from '@/components/studyroom/list/studyRoomSlotList';
import StudyRoomModalButton from '@/components/studyroom/StudyRoomModalButton';

interface StudyRoomViewProps {
  params: {
    date: string;
    startsAt: number;
    endsAt: number;
  };
}

export default async function StudyRoomView({ params }: StudyRoomViewProps) {
  const studyroomListData = await getStudyroomList({
    date: new Date(params.date).toISOString(),
  });

  return (
    <div>
      {studyroomListData && (
        <section className="mb-5 space-y-2">
          <div className="mb-4 flex h-8 items-center justify-between">
            <div className="flex">
              <h1 className="f24 mr-1 font-bold text-text_primary">예약하기</h1>
              <p className="f14 flex self-end font-medium text-text_secondary">
                {new Date(params.date).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <StudyRoomModalButton />
          </div>
          <StudyRoomSlotList
            data={studyroomListData?.studyrooms}
            date={params.date}
            startsAt={params.startsAt}
            endsAt={params.endsAt}
          />
        </section>
      )}
    </div>
  );
}
