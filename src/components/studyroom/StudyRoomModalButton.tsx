'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/common/button/button';
import StudyroomFilterModal from '@/components/studyroom/list/studyRoomFilterModal';

export default function StudyRoomModalButton() {
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const filterData = {
    date: searchParams.get('date') || new Date(),
    timeRange: [searchParams.get('startsAt') || 10, searchParams.get('endsAt') || 22],
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  return (
    <>
      <Button label="필터 선택" size="sm" variant="default" onClick={handleDrawerOpen} />
      <StudyroomFilterModal
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        filterData={filterData}
      />
    </>
  );
}
