'use client';

import { Divider } from 'antd';
import Button from '../common/button/button';
import Icons from '../common/icons/icons';

interface TimeSlotProps {
  title?: string;
  subTitle?: string;
}

export default function TimeSlotSelector({ title = '', subTitle = '' }: TimeSlotProps) {
  const timeSlots = [
    { time: '11:00', slots: 1 },
    { time: '11:30', slots: 3 },
    { time: '14:00', slots: 12 },
    { time: '14:30', slots: 6 },
    { time: '15:30', slots: 2 },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <div className="f20 font-bold text-text_primary">{title}</div>
        <div className="f14 text-text_secondary">{subTitle}</div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-x-[10px] gap-y-2">
        {timeSlots.map((slot) => (
          <Button
            key={slot.time}
            variant="default"
            size="full"
            className="f14 flex h-auto items-center justify-center p-2 font-semibold"
          >
            <div className="w-14">{slot.time}</div>
            <Divider type="vertical" style={{ marginLeft: 0, marginRight: '8px' }} />
            <div className="text-text_[#88888a] flex w-8 items-center gap-0 fill-[#88888A]">
              <Icons.Classic width="14px" height="14px" />
              {slot.slots}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
