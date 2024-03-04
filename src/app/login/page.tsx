'use client';

import Button from '@/components/common/button/button';
import useModal from '@/hooks/useModal';
import { login } from '@/lib/actions/auth';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisualViewPortResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (divRef) {
        divRef.current!.style.height = `${currentVisualViewport}px`;
      }
      if (window.visualViewport) {
        window.visualViewport.onresize = handleVisualViewPortResize;
      }
    };
    handleVisualViewPortResize();
  }, []);

  return (
    <div className="safe-area-top h-full overflow-visible" ref={divRef}>
      <main className="safe-area-bottom container flex h-full flex-col justify-between overflow-scroll bg-white px-4">
        <div>
          <h1 className="f28 mb-2 mt-4 font-bold text-text_primary">
            세종대학교 포털
            <br />
            계정으로 시작하기
          </h1>
          <p className="on-board mb-9 font-medium text-text_secondary">
            세종대학교 포털 계정으로 로그인해주세요.
          </p>
          <p className="f14 font-bold text-text_secondary">포털 아이디</p>
          <input
            type="number"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="아이디를 입력해주세요"
            className="f18 mb-6 h-12 w-full border-b-2 border-button_default_bg bg-transparent text-text_primary placeholder:font-medium placeholder:text-text_secondary focus:border-theme_secondary focus:outline-none"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <p className="f14 font-bold text-text_secondary">포탈 비밀번호</p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="f18 mb-6 h-12 w-full border-b-2 border-button_default_bg bg-transparent text-text_primary placeholder:font-medium placeholder:text-text_secondary focus:border-theme_secondary focus:outline-none"
          />
        </div>
        <div className="mb-4 px-2">
          <Spin spinning={loading} fullscreen />
          <Button label="로그인" onClick={handleLoginClick} variant="primary" size="full" />
        </div>
      </main>
    </div>
  );
}
