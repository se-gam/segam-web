'use client';

import useLink from '@/hooks/useLink';
import Icons from '@/components/common/icons/icons';

export default function RouletteCard() {
  const { navigateTo } = useLink();

  return (
    <button
      className="w-full rounded-2xl bg-white px-3 py-5"
      onClick={() => {
        navigateTo({ page: 'roulette' });
      }}
    >
      <div className="flex items-center justify-between px-3">
        <h2 className="f20 font-bold text-text_primary">점심 메뉴 추천받기</h2>
        <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
      </div>
    </button>
  );
}
