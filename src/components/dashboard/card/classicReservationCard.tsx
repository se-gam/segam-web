'use client';

import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import useModal from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import getQueryClient from '@/lib/getQueryClient';
import { useMutation } from '@tanstack/react-query';
import { cancelClassicReservation } from '@/lib/actions/client';
import { ClassicReservation, ClassicReservationList } from '@/lib/definitions';
import { CLASSIC_CATEGORY_CODE } from '@/lib/constants';

interface ClassicReservationCardProps {
  reservation: ClassicReservation;
}
export default function ClassicReservationCard({
  reservation,
}: Readonly<ClassicReservationCardProps>) {
  const { confirmModal, modal } = useModal();
  const session = useSession();
  const queryClient = getQueryClient();
  const formattedDate = new Date(reservation.reservationTime).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const formattedTime = new Date(reservation.reservationTime).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  });
  const [hour, minute] = formattedTime.split(':');
  const description = `${formattedDate} ${hour}시 ${minute}분`;
  const cancelMutation = useMutation({
    mutationFn: (reservationId: string) => cancelClassicReservation(session, reservationId),
    onSuccess: () => {
      queryClient.setQueryData(['classicReservations'], (oldData: ClassicReservationList) => ({
        reservations: oldData.reservations.filter(
          (item) => item.reservationId !== reservation.reservationId,
        ),
      }));
    },
    onError: () => {
      modal({
        title: '예약 실패',
        content: '예약 취소에 실패했습니다. 다시 시도해주세요.',
      });
    },
  });
  const handleCancel = (reservationId: string) => {
    confirmModal({
      title: '예약 취소',
      content: '예약을 취소하시겠습니까?',
      onClick: () => cancelMutation.mutate(reservationId),
    });
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md p-3">
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-icons_bg p-0.5">
          <Icons.ImageIcon
            name={CLASSIC_CATEGORY_CODE[reservation.bookCategoryId]}
            width={36}
            height={36}
          />
        </div>
        <div>
          <h3 className="f16 font-bold text-text_primary">{reservation.bookName}</h3>
          <p className="f12 font-medium text-text_secondary">{description}</p>
        </div>
      </div>
      <Button
        size="lg"
        variant="default"
        label="취소"
        loading={cancelMutation.isPending}
        onClick={() => {
          handleCancel(reservation.reservationId);
        }}
      />
    </div>
  );
}
