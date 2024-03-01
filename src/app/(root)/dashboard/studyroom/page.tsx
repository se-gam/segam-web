'use client';

import { useEffect, useState } from 'react';
import { getReservationList, getStudyroomList, cancelReservation } from '@/lib/actions/studyroom';
import { StudyroomList, StudyroomReservationList } from '@/lib/definitions';
import StudyRoomSlotList from '@/components/studyroom/list/studyRoomSlotList';
import StudyRoomReservationList from '@/components/studyroom/list/studyRoomReservationList';
import StudyroomFilterModal from '@/components/studyroom/list/studyRoomFilterModal';
import Button from '@/components/common/button/button';

export default function StudyRoom() {
  const [studyroomList, setStudyroomList] = useState<StudyroomList>();
  const [reservationList, setReservationList] = useState<StudyroomReservationList>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState({
    date: new Date(),
    timeRange: [10, 22],
  });

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudyroomList({
        date: filterData.date,
        timeGte: filterData.timeRange[0],
        timeLt: filterData.timeRange[1],
      });

      setStudyroomList(data);
    };

    fetchData();
  }, [filterData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReservationList();
      setReservationList(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="page bg-white px-4 pt-2.5">
        <header className="mb-4">
          <h1 className="f20 font-bold text-text_primary">스터디룸</h1>
        </header>
        {reservationList && reservationList.reservations.length > 0 && (
          <section className="mb-5 space-y-2">
            <h1 className="f24 font-bold text-text_primary">내 예약 현황</h1>
            <StudyRoomReservationList
              data={reservationList.reservations}
              onCancel={cancelReservation}
            />
          </section>
        )}
        {studyroomList && (
          <section className="mb-5 space-y-2">
            <div className="mb-4 flex h-8 items-center justify-between">
              <div className="flex">
                <h1 className="f24 mr-1 font-bold text-text_primary">예약하기</h1>
                <p className="f14 flex self-end font-medium text-text_secondary">
                  {filterData.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </p>
              </div>
              <Button label="필터 선택" size="sm" variant="default" onClick={handleDrawerOpen} />
            </div>
            <StudyRoomSlotList data={studyroomList?.studyrooms} />
          </section>
        )}
      </main>
      <StudyroomFilterModal
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  );
}
