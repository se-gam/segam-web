'use client';

import Button from '@/components/common/button/button';
import { isApp } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;

export default function PermissionPage() {
  const router = useRouter();
  const handleButtonClick = () => {
    if (isApp()) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'PERMISSION',
          path: `${BASE_URL}/login`,
        }),
      );
    } else {
      router.push('/login');
    }
  };
  return (
    <main className="bg-theme_background flex h-screen flex-col items-center justify-center">
      <h1 className="f28 mb-4 font-bold">권한 페이지</h1>
      <Button variant="primary" size="full" onClick={handleButtonClick} label="동의하고 시작하기" />
    </main>
  );
}
