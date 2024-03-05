'use client';

import React, { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import BottomDrawer from '@/components/common/bottomDrawer/bottomDrawer';
import ReservationCalendar from '../modal/reservationCalendar';
import ReservationSlider from '../modal/reservationSlider';

interface FilterModalProps {
  drawerOpen: boolean;
  filterData: any;
  setDrawerOpen: (open: boolean) => void;
}

export default function StudyroomFilterModal({
  drawerOpen,
  setDrawerOpen,
  filterData,
}: FilterModalProps) {
  const [data, setData] = useState(filterData);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (date: Date, startsAt: number, endsAt: number) => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set('date', new Date(date).toISOString());
    } else {
      params.delete('date');
    }

    if (startsAt) {
      params.set('startsAt', startsAt.toString());
    } else {
      params.delete('startsAt');
    }

    if (endsAt) {
      params.set('endsAt', endsAt.toString());
    } else {
      params.delete('endsAt');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomDrawer
      openState={drawerOpen}
      onClose={() => {
        setDrawerOpen(false);
      }}
      onSubmit={() => {
        handleSearch(data.date, data.timeRange[0], data.timeRange[1]);
        setDrawerOpen(false);
      }}
      submitLabel="완료"
    >
      <div className="px-4">
        <h2 className="f20 mb-3 font-bold text-text_primary">날짜</h2>
        <ReservationCalendar
          day={new Date(data.date)}
          setSelectedDay={(date: Date) => {
            setData({ ...data, date });
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
            setData({ ...data, timeRange });
          }}
        />
      </div>
    </BottomDrawer>
  );
}
