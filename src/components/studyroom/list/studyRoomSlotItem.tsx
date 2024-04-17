'use client';

import { Studyroom } from '@/lib/definitions';
import Tag from '@/components/common/tag/tag';
import Icons from '@/components/common/icons/icons';
import cn from '@/utils/cn';

interface StudyRoomSlotItemProps {
  data: Studyroom;
  date: string;
}

export default function StudyRoomSlotItem({ data, date }: StudyRoomSlotItemProps) {
  const { name, location, minUsers, maxUsers, operatingHours, slots } = data;
  const filteredDate = new Date(date);
  const day = filteredDate.toLocaleDateString('ko-KR', {
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const todayDay = new Date().toLocaleDateString('ko-KR', {
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const isToday = day === todayDay;
  const todayHour = Number(
    new Date()
      .toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        hourCycle: 'h23',
        formatMatcher: 'best fit',
        timeZone: 'Asia/Seoul',
      })
      .replace('시', ''),
  );
  const [startTime, endTimeInitial] = operatingHours.split('~').map((time) => parseInt(time, 10));
  let endTime = endTimeInitial;
  if (day === '토요일') {
    endTime = 16;
  }
  const hoursRange = Array.from({ length: endTime - startTime + 1 }, (_, i) => startTime + i);

  const getTagVariant = (min: number) => {
    if (min <= 2) return 'done';
    if (min <= 3) return 'orange';
    if (min <= 6) return 'yellow';
    return 'warning';
  };

  const getIconName = () => {
    if (data.isCinema) return 'cinema';
    if (data.name.includes('SL')) return 'SL';
    return 'studyRoom';
  };

  return (
    <div className="mb-6 flex flex-col rounded-md pt-1 transition-transform active:scale-[0.98] active:bg-app_bg">
      <div className="mb-3 flex">
        <div className="mr-2 flex h-12 w-12 justify-center rounded-lg bg-slate-100 align-middle">
          <Icons.ImageIcon name={getIconName()} width={42} height={42} />
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
            const isClosed = slot ? slot.isClosed || (isToday && hour <= todayHour) : true;
            const isReserved = slot ? slot.isReserved : true;
            return (
              <div
                key={hour}
                className={cn('h-1 w-full', {
                  'bg-theme_primary': !(isClosed || isReserved),
                  'bg-timeline_bg': isClosed || isReserved,
                })}
              />
            );
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
