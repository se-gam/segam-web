'use client';

import { Spin } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Button from '@/components/common/button/button';
import useModal from '@/hooks/useModal';
import { login } from '@/lib/actions/auth';
import { stackRouterPush } from '@/utils/stackRouter';

export default function LoginPage() {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [loading, setLoading] = useState(false);
  const { modal } = useModal();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    trackAmplitudeEvent('click_로그인_btn');
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const studentId = formData.get('studentId') as string;
    const password = formData.get('password') as string;
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
    <div className="safe-area-top h-full overflow-visible">
      <form
        className="safe-area-bottom container flex h-full flex-col justify-between overflow-scroll bg-white px-4"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="f28 mb-2 mt-4 font-bold text-text_primary">
            세종대학교 포털
            <br />
            계정으로 시작하기
          </h1>
          <p className="on-board mb-9 font-medium text-text_secondary">
            계정 비밀번호는 서버에 저장되지 않아요
          </p>
          <p className="f14 font-bold text-text_secondary">포털 아이디</p>
          <input
            type="number"
            id="studentId"
            name="studentId"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="아이디를 입력해주세요"
            className="f18 mb-6 h-12 w-full border-b-2 border-button_default_bg bg-transparent text-text_primary placeholder:font-medium placeholder:text-text_secondary focus:border-theme_secondary focus:outline-none"
          />

          <p className="f14 font-bold text-text_secondary">포탈 비밀번호</p>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="f18 mb-6 h-12 w-full border-b-2 border-button_default_bg bg-transparent text-text_primary placeholder:font-medium placeholder:text-text_secondary focus:border-theme_secondary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              trackAmplitudeEvent('click_개인정보보호');
              stackRouterPush({ router, page: 'privacy' });
            }}
            className="f14 font-bold text-theme_tertiary underline"
          >
            개인정보 처리방침 확인하기
          </button>
        </div>

        <div className="mb-4 px-2">
          <Spin spinning={loading} fullscreen />
          <Button type="submit" label="로그인" variant="primary" size="full" />
        </div>
      </form>
    </div>
  );
}
