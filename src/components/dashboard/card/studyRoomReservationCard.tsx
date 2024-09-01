'use client';

import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import useModal from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import getQueryClient from '@/lib/getQueryClient';
import { useMutation } from '@tanstack/react-query';
import { cancelStudyroomReservation } from '@/lib/actions/client';
import { StudyroomReservationList } from '@/lib/definitions';

interface StudyRoomReservationCardProps {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
export default function StudyRoomReservationCard({
  id,
  title,
  iconName,
  description,
}: Readonly<StudyRoomReservationCardProps>) {
  const session = useSession();
  const { confirmModal, modal } = useModal();
  const queryClient = getQueryClient();
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

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-md p-3">
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-icons_bg p-0.5">
          <Icons.ImageIcon name={iconName} width={36} height={36} />
        </div>
        <div>
          <h3 className="f16 font-bold text-text_primary">{title}</h3>
          <p className="f12 font-medium text-text_secondary">{description}</p>
        </div>
      </div>
      <Button
        size="lg"
        variant="default"
        label="취소"
        loading={cancelMutation.isPending}
        onClick={() => {
          handleCancel(id);
        }}
      />
    </div>
  );
}
