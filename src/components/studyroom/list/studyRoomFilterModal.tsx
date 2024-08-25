'use client';

import React, { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import { DateFilterData } from '@/lib/definitions';
import ReservationCalendar from '@/components/studyroom/modal/reservationCalendar';
import ReservationSlider from '@/components/studyroom/modal/reservationSlider';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/common/drawer';
import Button from '@/components/common/button/button';

interface FilterModalProps {
  dateFilterData: DateFilterData;
  setDateFilterData: (data: DateFilterData) => void;
}

export default function StudyroomFilterModal({
  dateFilterData,
  setDateFilterData,
}: Readonly<FilterModalProps>) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [data, setData] = useState<{
    date: string;
    timeRange: number[];
  }>(dateFilterData);
  const handleSubmit = () => {
    setDateFilterData(data);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          label="필터 선택"
          size="sm"
          variant="default"
          onClick={() => {
            trackAmplitudeEvent('click_스터디룸_필터_btn');
          }}
        />
      </DrawerTrigger>
      <DrawerContent data-vaul-no-drag>
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
        <DrawerFooter>
          <DrawerClose>
            <div className="px-2 pt-3">
              <Button size="full" label="완료" variant="primary" onClick={handleSubmit} />
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
