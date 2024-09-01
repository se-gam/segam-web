'use client';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Divider } from 'antd';
import dayjs from 'dayjs';
import { GodokSlot } from '@/lib/definitions';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale('ko');

interface TimeSlotSelectorProps {
  availableTimeSlots: GodokSlot[];
  value: string;
  onChange: (id: string) => void;
}

export default function TimeSlotSelector({
  availableTimeSlots,
  value,
  onChange,
}: TimeSlotSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <div className="f20 font-bold text-text_primary">시간 선택하기</div>
        <div className="f14 text-text_secondary">예약이 마감된 시간은 보이지 않아요</div>
      </div>
      <div className="grid grid-cols-3 gap-x-[10px] gap-y-2 ">
        {availableTimeSlots?.map((slot) => (
          <Button
            key={slot.startsAt}
            onClick={() => onChange(slot.slotId)}
            variant={value === slot.slotId ? 'selected' : 'default'}
            size="full"
            className="f14 flex h-auto items-center justify-center p-2 font-semibold"
          >
            <div className="w-14 flex-grow-5.5">{dayjs(slot.startsAt).tz().format('HH:mm')}</div>
            <Divider type="vertical" style={{ marginLeft: 0, marginRight: '8px' }} />
            <div className="text-text_[#88888a] flex w-8 flex-grow-4.5 items-center justify-center gap-0 fill-[#88888A]">
              <div className="flex w-8 items-center justify-start">
                <Icons.Classic width="14px" height="14px" className="fill-current" />
                {slot.availableSeats}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
