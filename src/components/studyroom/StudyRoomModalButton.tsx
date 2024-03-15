'use client';

import { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Button from '@/components/common/button/button';
import StudyroomFilterModal from '@/components/studyroom/list/studyRoomFilterModal';
import { DateFilterData } from '@/lib/definitions';

interface StudyRoomModalButtonProps {
  data: DateFilterData;
  setData: (data: DateFilterData) => void;
}
export default function StudyRoomModalButton({ data, setData }: StudyRoomModalButtonProps) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    trackAmplitudeEvent('click_스터디룸_필터_btn');
    setDrawerOpen(true);
  };
  return (
    <>
      <Button label="필터 선택" size="sm" variant="default" onClick={handleDrawerOpen} />
      <StudyroomFilterModal
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        dateFilterData={data}
        setDateFilterData={setData}
      />
    </>
  );
}
