'use client';

import Button from '@/components/common/button/button';
import useModal from '@/hooks/useModal';
import { login } from '@/lib/actions/auth';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { modal } = useModal();

  const handleLoginClick = async () => {
    setLoading(true);
    if (studentId === '') {
      modal({
        title: '로그인 실패',
        content: '학번을 입력해주세요.',
        onClick: () => {
          setLoading(false);
        },
      });
      return;
    }
    if (password === '') {
      modal({
        title: '로그인 실패',
        content: '비밀번호를 입력해주세요.',
        onClick: () => {
          setLoading(false);
        },
      });
      return;
    }
    try {
      await login({
        studentId,
        password,
      });

      router.replace('/dashboard');
    } catch (error) {
      modal({
        title: '로그인 실패',
        content: '학번과 비밀번호를 확인해주세요.',
        onClick: () => {
          setLoading(false);
        },
      });
    }
  };
  return (
    <>
      <Spin spinning={loading} fullscreen />
      <main className="container flex h-full flex-col bg-app_bg p-4 pt-6">
        <h1 className="f20 mb-4 font-bold text-text_primary">로그인</h1>
        <input
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="학번"
          className="mb-4 h-12 w-full rounded-md px-4"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 h-12 w-full rounded-md px-4"
        />
        <Button label="로그인" onClick={handleLoginClick} variant="primary" size="full" />
      </main>
    </>
  );
}
