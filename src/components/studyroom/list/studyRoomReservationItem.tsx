'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import useModal from '@/hooks/useModal';
import getQueryClient from '@/lib/getQueryClient';
import { cancelStudyroomReservation } from '@/lib/actions/client';
import { StudyroomReservationList } from '@/lib/definitions';
import { useSession } from 'next-auth/react';

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
}

export default function StudyRoomReservationItem({
  id,
  name,
  date,
  startsAt,
  duration,
  isLeader,
  users,
}: Readonly<ReservationProps>) {
  const { confirmModal, modal } = useModal();
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const session = useSession();
  const queryClient = getQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const endTime = startsAt + duration;
  const userNames = users.map((user) => `${user.studentId} ${user.name}`).join(' ');
  const cancelMutation = useMutation({
    mutationFn: (reservationId: number) => cancelStudyroomReservation(session, reservationId),
    onSuccess: (_, reservationId) => {
      // 직접 상태 업데이트
      queryClient.setQueryData(['studyroomReservations'], (oldData: StudyroomReservationList) => ({
        reservations: oldData.reservations.filter((item) => item.id !== reservationId),
      }));
    },
    onError: () => {
      modal({
        title: '예약 실패',
        content: '예약 취소에 실패했어요. 다시 시도해주세요.',
      });
    },
  });
  const handleCancel = (reservationId: number) => {
    confirmModal({
      title: '예약 취소',
      content: '예약을 취소하시겠습니까?',
      onClick: () => cancelMutation.mutate(reservationId),
    });
  };
  const handleExpand = () => {
    trackAmplitudeEvent('dropdown_스터디룸_동반이용자_btn');
    setIsExpanded((prev) => !prev);
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
          loading={cancelMutation.isPending}
          onClick={() => {
            if (isLeader) {
              handleCancel(id);
            }
          }}
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
