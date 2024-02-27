'use client';

import useModal from '@/hooks/useModal';
import login from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginPage() {
  const [result, formAction] = useFormState(login, null);
  const { pending } = useFormStatus();
  const router = useRouter();
  const { modal } = useModal();
  useEffect(() => {
    if (result === null) return;
    const message = result?.message;
    switch (message) {
      case '로그인 성공':
        router.replace('/dashboard');
        break;
      default:
        modal({
          title: '로그인 실패',
          content: result.message,
        });
    }
  }, [result, router]);
  return (
    <main className="container flex h-full flex-col bg-app_bg p-4 pt-6">
      <h1 className="f20 mb-4 font-bold text-text_primary">로그인</h1>
      <form action={formAction}>
        <input
          type="text"
          id="studentId"
          name="studentId"
          placeholder="학번"
          className="mb-4 h-12 w-full rounded-md px-4"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          className="mb-4 h-12 w-full rounded-md px-4"
        />

        <button
          type="submit"
          className="mb-4 h-12 w-full rounded-md bg-theme_primary font-medium text-white transition-opacity duration-200 active:opacity-80 aria-disabled:opacity-50"
          aria-disabled={pending}
        >
          로그인
        </button>
      </form>
    </main>
  );
}
