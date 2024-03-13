'use client';

import { useState } from 'react';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import useModal from '@/hooks/useModal';

interface ReservationProps {
  id: number;
  name: string;
  date: string;
  startsAt: number;
  duration: number;
  isLeader: boolean;
  users: {
    studentId: string;
    name: string;
  }[];
  onCancel: (id: number) => Promise<null | string>;
}

export default function StudyRoomReservationItem({
  id,
  name,
  date,
  startsAt,
  duration,
  isLeader,
  users,
  onCancel,
}: ReservationProps) {
  const { confirmModal, modal } = useModal();

  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });

  const endTime = startsAt + duration;
  const userNames = users.map((user) => `${user.studentId} ${user.name}`).join(' ');

  const handleExpand = () => {
    trackAmplitudeEvent('dropdown_스터디룸_동반이용자_btn');
    setIsExpanded((prev) => !prev);
  };
  const handleCancel = () => {
    trackAmplitudeEvent('click_스터디룸_취소_btn');
    confirmModal({
      title: '예약 취소',
      content: '예약을 취소하시겠습니까?',
      onClick: async () => {
        setIsLoading(true);
        const res = await onCancel(id);
        setIsLoading(false);
        if (res) {
          modal({
            title: '예약 실패',
            content: res,
          });
        }
        modal({
          title: '예약 취소',
          content: '예약이 취소되었습니다.',
        });
      },
    });
  };
  return (
    <div className="mb-2 flex flex-col">
      <div className="flex justify-between">
        <span className="f16 font-bold text-text_primary">{name}</span>
        <Button
          label={isLeader ? '취소' : '동반이용'}
          variant="default"
          size="sm"
          type="button"
          disabled={!isLeader}
          loading={isLoading}
          onClick={handleCancel}
        />
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
          <Icons.ArrowDown
            className={`ml-1 transform fill-theme_tertiary transition-transform 
            ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
            width="0.8rem"
            height="0.8rem"
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
