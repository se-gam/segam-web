'use client';

import React, { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import BottomDrawer from '@/components/common/bottomDrawer/bottomDrawer';
import { DateFilterData } from '@/lib/definitions';
import ReservationCalendar from '@/components/studyroom/modal/reservationCalendar';
import ReservationSlider from '@/components/studyroom/modal/reservationSlider';

interface FilterModalProps {
  drawerOpen: boolean;
  dateFilterData: DateFilterData;
  setDrawerOpen: (open: boolean) => void;
  setDateFilterData: (data: DateFilterData) => void;
}

export default function StudyroomFilterModal({
  drawerOpen,
  dateFilterData,
  setDrawerOpen,
  setDateFilterData,
}: FilterModalProps) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [data, setData] = useState<{
    date: string;
    timeRange: number[];
  }>(dateFilterData);
  return (
    <BottomDrawer
      openState={drawerOpen}
      onClose={() => {
        setDrawerOpen(false);
      }}
      onSubmit={() => {
        setDateFilterData(data);
        setDrawerOpen(false);
      }}
      submitLabel="완료"
    >
      <div className="px-4">
        <h2 className="f20 mb-3 font-bold text-text_primary">날짜</h2>
        <ReservationCalendar
          day={new Date(data.date)}
          setSelectedDay={(date: Date) => {
            trackAmplitudeEvent('click_스터디룸_필터모달_날짜_btn');
            const dateString = date.toISOString();
            setData({ ...data, date: dateString });
          }}
        />
        <div className="flex h-6 flex-row">
          <h2 className="f20 mb-4 mr-1 flex font-bold text-text_primary">시간</h2>
          <p className="f14 flex self-end font-medium leading-4 text-text_secondary">
            {data.timeRange[0]}시부터 {data.timeRange[1]}시까지
          </p>
        </div>
        <ReservationSlider
          value={data.timeRange}
          onChange={(timeRange: number[]) => {
            trackAmplitudeEvent('click_스터디룸_필터모달_시간_btn');
            setData({ ...data, timeRange });
          }}
        />
      </div>
    </BottomDrawer>
  );
}
