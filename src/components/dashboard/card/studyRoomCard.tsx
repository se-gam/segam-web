'use client';

import { useState } from 'react';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import useModal from '@/hooks/useModal';
import { cancelReservation } from '@/lib/actions/studyroom';

interface StudyRoomCardProps {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
export default function StudyRoomCard({ id, title, iconName, description }: StudyRoomCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { confirmModal, modal } = useModal();
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
        loading={isLoading}
        onClick={() => {
          confirmModal({
            title: '예약 취소',
            content: '예약을 취소하시겠습니까?',
            onClick: async () => {
              setIsLoading(true);
              try {
                await cancelReservation(id);
              } catch (e) {
                setIsLoading(false);
                if (e instanceof Error) {
                  modal({
                    title: '예약 실패',
                    content: e.message,
                  });
                }
              }
            },
          });
        }}
      />
    </div>
  );
}
