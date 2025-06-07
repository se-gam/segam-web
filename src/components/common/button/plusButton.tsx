'use client';

import { stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';
import Icons from '@/components/common/icons/icons';
import cn from '@/utils/cn';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';

interface PlusButtonProps {
  route: string;
  className?: string;
  visible?: boolean;
}

export default function PlusButton({ route, className = '', visible = true }: PlusButtonProps) {
  const router = useRouter();
  const { trackAmplitudeEvent } = useAmplitudeContext();

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        trackAmplitudeEvent('click_과제_추가_btn');
        stackRouterPush({
          router,
          page: route,
          title: '과제 추가하기',
        });
      }}
      aria-label="추가하기"
      className={cn(className)}
    >
      <Icons.Plus width="1.5rem" height="1.5rem" />
    </button>
  );
}
