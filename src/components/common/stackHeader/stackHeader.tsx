'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';
import cn from '@/utils/cn';

export default function StackHeader({
  title = '',
  bgClass = 'bg-white',
  rightElement = null,
}: {
  title?: string;
  bgClass?: string;
  rightElement?: React.ReactNode;
}) {
  const { navigatePop } = useLink();
  return (
    <header className="safe-area-top w-full">
      <div className={cn('flex w-full items-center justify-between bg-white px-4 py-3', bgClass)}>
        <button type="button" onClick={() => navigatePop()} aria-label="back">
          <Icons.ArrowLeft width="1.5rem" height="1.5rem" className=" fill-text_primary" />
        </button>
        {title && <span className="f16 truncate font-bold text-text_primary">{title}</span>}
        <div className="flex h-6 w-6 items-center justify-center">{rightElement ?? <div />}</div>
      </div>
    </header>
  );
}
