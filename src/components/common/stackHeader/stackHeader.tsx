'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';
import cn from '@/utils/cn';

export default function StackHeader({
  title = '',
  bgClass = 'bg-white',
}: {
  title?: string;
  bgClass?: string;
}) {
  const { navigatePop } = useLink();
  return (
    <header className="safe-area-top">
      <div className={cn('flex w-full items-center justify-between bg-white px-4 py-3', bgClass)}>
        <button type="button" onClick={() => navigatePop()} aria-label="back">
          <Icons.ArrowLeft width="1.5rem" height="1.5rem" className=" fill-text_primary" />
        </button>
        <span className="f16 font-bold text-text_primary">{title}</span>
        <div className="h-6 w-6" />
      </div>
    </header>
  );
}
