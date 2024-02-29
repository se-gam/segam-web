'use client';

import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import Button from '@/components/common/button/button';

interface ReservationProps {
  // 아이템 map 할 시 key로 사용
  // eslint-disable-next-line react/no-unused-prop-types
  id: number;
  name: string;
  date: string;
  startsAt: number;
  duration: number;
  users: {
    studentId: string;
    name: string;
  }[];
}

function ReservationItem({ name, date, startsAt, duration, users }: ReservationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const endTime = startsAt + duration;
  const userNames = users.map((user) => `${user.studentId} ${user.name}`).join(' ');

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mb-2 flex flex-col">
      <div className="flex justify-between">
        <span className="f16 font-bold text-text_primary">{name}</span>
        <Button label="취소" variant="default" size="sm" type="button" onClick={() => {}} />
      </div>
      <div className="flex">
        <span className="f14 font-semibold text-text_secondary">
          {`${formattedDate} ${startsAt}시 ~ ${endTime}시`}
        </span>
        <button
          type="button"
          onClick={handleExpand}
          className="f14 flex items-center font-semibold text-text_secondary"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <DownOutlined
            className={`ml-1 transform transition-transform ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>
      </div>
      {isExpanded && (
        <div>
          <span className="f12 font-regular text-text_secondary">{userNames}</span>
        </div>
      )}
    </div>
  );
}

export default function StudyRoomReservationList({ data }: { data: ReservationProps[] }) {
  return (
    <div>
      {data.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          id={reservation.id}
          name={reservation.name}
          date={reservation.date}
          startsAt={reservation.startsAt}
          duration={reservation.duration}
          users={reservation.users}
        />
      ))}
    </div>
  );
}
