'use client';

import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import { isApp } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;

export default function PermissionPage() {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const router = useRouter();
  const handleButtonClick = () => {
    trackAmplitudeEvent('click_온보딩_동의_btn');
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
    <main className="safe-area-bottom flex h-full flex-col items-center justify-between bg-white px-6">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="f24 mb-2 font-bold text-text_primary">시작하기 앞서</h1>
        <p className="on-board font-medium text-text_secondary">더 나은 서비스 제공을 위해</p>
        <p className="on-board mb-12 font-medium text-text_secondary">
          동의가 필요한 내용을 확인해주세요.
        </p>
        <div className="mb-2">
          <Icons.ImageIcon name="alarm" width={36} height={36} />
        </div>
        <p className="on-board font-medium text-text_secondary">
          <b className="font-bold text-text_primary">새로운 강의, 마감이 임박한 과제</b> 등
        </p>
        <p className="on-board mb-9 font-medium text-text_secondary">
          <b className="font-bold text-text_primary">알림</b>을 받을 수 있어요.
        </p>
        <div className="mb-2">
          <Icons.ImageIcon name="lock" width={36} height={36} />
        </div>
        <p className="on-board font-medium text-text_secondary">
          <b className="font-bold text-text_primary">출석 확인, 스터디룸 예약</b>등을 위해
        </p>
        <p className="on-board font-medium text-text_secondary">
          <b className="font-bold text-text_primary">비밀번호</b>를 기기에 저장합니다.
        </p>
      </div>
      <div className="mb-4 w-full">
        <Button
          variant="primary"
          size="full"
          onClick={handleButtonClick}
          label="동의하고 시작하기"
          className="flex-shrink-0"
        />
      </div>
    </main>
  );
}
