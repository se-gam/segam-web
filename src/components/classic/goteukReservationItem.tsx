'use client';

import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/button/button';
import { cancelClassicReservation } from '@/lib/actions/client';
import { ClassicReservation } from '@/lib/definitions';
import getQueryClient from '@/lib/getQueryClient';

export default function GoteukReservationItem({
  reservation,
}: Readonly<{
  reservation: ClassicReservation;
}>) {
  const session = useSession();
  const formattedDate = new Date(reservation.reservationTime).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  });
  const { confirmModal, modal } = useModal();
  const queryClient = getQueryClient();
  const cancelMutation = useMutation({
    mutationFn: (reservationId: string) => cancelClassicReservation(session, reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classicReservations'] });
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
    <div className="flex items-center justify-between">
      <div>
        <h3 className="f16 font-bold text-text_primary">{reservation.bookName}</h3>
        <p className="f14 font-semibold text-text_secondary">{formattedDate}</p>
      </div>
      <Button
        label="취소"
        variant="default"
        size="sm"
        type="button"
        onClick={() => handleCancel(reservation.reservationId)}
        loading={cancelMutation.isPending}
      />
    </div>
  );
}
