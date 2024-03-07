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
    <div className="flex h-full flex-col overflow-hidden">
      <section className="mb-5 flex h-full flex-col space-y-2 overflow-hidden">
        <div className="mb-4 flex h-8 items-center justify-between px-4">
          <div className="flex">
            <h1 className="f24 mr-1 font-bold text-text_primary">예약하기</h1>
            <p className="f14 flex self-end font-medium text-text_secondary">
              {new Date(params.date).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Seoul',
              })}
            </p>
          </div>
          <StudyRoomModalButton />
        </div>
        {studyroomListData && studyroomListData.studyrooms.length > 0 ? (
          <StudyRoomSlotList
            data={studyroomListData?.studyrooms}
            date={params.date}
            startsAt={params.startsAt}
            endsAt={params.endsAt}
          />
        ) : (
          <div className="flex items-center justify-center">
            <p className="f16 mt-12 flex  font-medium text-text_secondary">
              예약 가능한 스터디룸이 없습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
