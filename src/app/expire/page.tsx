'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  const reset = () => {
    router.replace('/logout');
  };
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">로그인 정보가 만료되었습니다.</h2>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        로그인 하러가기
      </button>
    </main>
  );
}
