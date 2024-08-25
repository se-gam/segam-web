'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';

export default function GoteukReservationCard() {
  const { navigateTo } = useLink();
  return (
    <button
      className="w-full rounded-2xl p-4"
      onClick={() => {
        navigateTo({ page: 'classic' });
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left">
          <p className="f14 font-medium text-text_secondary">고전특강을 듣기 싫다면?</p>
          <p className="f16 font-bold text-text_primary">독서인증시험 예약하기</p>
        </div>
        <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
      </div>
    </button>
  );
}
