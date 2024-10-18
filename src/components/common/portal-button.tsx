'use client';

import { stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

export default function PortalButton() {
  const router = useRouter();
  return (
    <button
      className="f14 font-bold text-theme_tertiary underline"
      onClick={() => {
        stackRouterPush({ router, page: 'portal', title: '계정 확인' });
      }}
    >
      계정 확인
    </button>
  );
}
