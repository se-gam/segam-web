'use client';

import { useEffect, useState } from 'react';
import { getStudyroomList } from '@/lib/actions/studyroom';
import StudyRoomSlotList from '@/components/studyroom/list/studyRoomSlotList';
import { DateFilterData, StudyroomList } from '@/lib/definitions';
import StudyroomFilterModal from '@/components/studyroom/list/studyRoomFilterModal';

export default function StudyRoomView() {
  const [dateFilterData, setDateFilterData] = useState<DateFilterData>({
    date: new Date().toISOString(),
    timeRange: [10, 22],
  });
  const [studyroomListData, setStudyroomListData] = useState<StudyroomList>({
    studyrooms: [],
  });
  useEffect(() => {
    const getStudyroomListData = async () => {
      const res = await getStudyroomList({ date: dateFilterData.date });
      setStudyroomListData({
        studyrooms: res.studyrooms.toSorted((a, b) => a.name.localeCompare(b.name)),
      });
    };
    getStudyroomListData();
  }, [dateFilterData.date]);
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="flex h-full flex-col space-y-2 overflow-hidden">
        <div className="mb-4 flex h-8 items-center justify-between px-4">
          <div className="flex">
            <h1 className="f24 mr-1 font-bold text-text_primary">예약하기</h1>
            <p className="f14 flex self-end font-medium text-text_secondary">
              {new Date(dateFilterData.date).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Seoul',
              })}
            </p>
          </div>
          <StudyroomFilterModal
            dateFilterData={dateFilterData}
            setDateFilterData={setDateFilterData}
          />
        </div>

        {studyroomListData && studyroomListData.studyrooms.length > 0 ? (
          <StudyRoomSlotList data={studyroomListData?.studyrooms} dateFilterData={dateFilterData} />
        ) : (
          <div className="flex items-center justify-center">
            <p className="f16 mt-12 flex  font-medium text-text_secondary">
              예약 가능한 스터디룸이 없어요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
