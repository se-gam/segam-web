'use client';

import { stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';
import Icons from '@/components/common/icons/icons';
import cn from '@/utils/cn';

interface PlusButtonProps {
  route: string;
  className?: string;
  visible?: boolean; // 이거 나중에 과제별 탭에서만 렌더링 하도록
}

export default function PlusButton({ route, className = '', visible = true }: PlusButtonProps) {
  const router = useRouter();

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        stackRouterPush({
          router,
          page: route,
          title: '과제 추가하기',
        })
      }
      aria-label="추가하기"
      className={cn(className)}
    >
      <Icons.Plus width="1.5rem" height="1.5rem" />
    </button>
  );
}
