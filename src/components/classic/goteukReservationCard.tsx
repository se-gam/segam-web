'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';

export default function GoteukReservationCard() {
  const { navigateTo } = useLink();
  return (
    <div className="w-full px-4">
      <button
        className="w-full rounded-2xl bg-button_default_bg px-4 py-5"
        onClick={() => {
          navigateTo({ page: 'roulette' });
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.ImageIcon name="classic_west" width={36} height={36} />
            <div className="flex flex-col gap-1 text-left">
              <p className="f14 font-medium text-text_secondary">고전특강을 듣기 싫다면?</p>
              <p className="f18 font-bold text-text_primary">독서인증시험 예약하기</p>
            </div>
          </div>
          <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
        </div>
      </button>
    </div>
  );
}
