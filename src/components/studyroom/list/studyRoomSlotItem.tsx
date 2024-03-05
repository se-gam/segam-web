'use client';

import { Studyroom } from '@/lib/definitions';
import Tag from '@/components/common/tag/tag';
import Icons from '@/components/common/icons/icons';

interface StudyRoomSlotItemProps {
  data: Studyroom;
}

export default function StudyRoomSlotItem({ data }: StudyRoomSlotItemProps) {
  const { name, location, minUsers, maxUsers, operatingHours, slots } = data;
  const [startTime, endTime] = operatingHours.split('~').map((time) => parseInt(time, 10));
  const hoursRange = Array.from({ length: endTime - startTime + 1 }, (_, i) => startTime + i);

  const getTagVariant = (min: number) => {
    if (min <= 2) return 'done';
    if (min <= 3) return 'yellow';
    if (min <= 6) return 'orange';
    return 'warning';
  };

  return (
    <div className="mb-6 flex flex-col rounded-md pt-1 transition-transform active:scale-[0.98] active:bg-app_bg">
      <div className="mb-3 flex">
        <div className="mr-2 flex h-12 w-12 justify-center rounded-lg bg-slate-100 align-middle">
          {data.isCinema ? (
            <Icons.ImageIcon name="cinema" width={42} height={42} />
          ) : (
            <Icons.ImageIcon name="studyRoom" width={42} height={42} />
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="f16 font-bold leading-4 text-text_primary">{name}</h3>
          <div className="flex">
            <Tag label={location} variant="default" size="sm" className="mr-1" />
            <Tag label={`${minUsers}~${maxUsers}명`} variant={getTagVariant(minUsers)} size="sm" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full justify-between">
          {hoursRange.slice(0, -1).map((hour) => {
            const slot = slots.find((s) => s.startsAt === hour);
            const isClosed = slot ? slot.isClosed : true;
            const isReserved = slot ? slot.isReserved : true;
            const bgColor = isClosed || isReserved ? 'bg-timeline_bg' : 'bg-text_primary'; // TODO: refactor with cn @kmsu44
            return <div key={hour} className={`h-1 w-full ${bgColor}`} />;
          })}
        </div>
        <div className="mt-1 flex w-full justify-between">
          {hoursRange.map((hour, index) => (
            <span
              key={hour}
              className={`f12 font-medium text-text_secondary ${index % 2 === 0 ? 'visible' : 'invisible'}`}
            >
              {index % 2 === 0 ? hour : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
