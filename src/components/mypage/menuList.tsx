'use client';

import Icons from '@/components/common/icons/icons';
import { stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

export default function MenuList() {
  const router = useRouter();
  const settings = [
    {
      label: '친구 관리',
      onClick: () => {
        stackRouterPush({ router, page: 'friends', title: '스터디룸 친구 목록' });
      },
    },
    {
      label: '알림 설정',
      onClick: () => {
        stackRouterPush({ router, page: 'notification', title: '알림 설정' });
      },
    },
    {
      label: 'FAQ',
      onClick: () => {
        stackRouterPush({ router, page: 'faq', title: 'FAQ' });
      },
    },
  ];
  const auth = [
    {
      label: '로그아웃',
      onClick: () => {
        router.replace('/logout');
      },
    },
    {
      label: '회원 탈퇴',
      onClick: () => {},
    },
  ];
  return (
    <>
      <div className="h-2.5 w-full bg-app_bg" />
      <h1 className="f20 mb-2 px-4 font-bold text-text_primary">설정</h1>
      <section className="bg-white py-2">
        <div className="space-y-1 px-2">
          {settings.map((setting) => (
            <button
              key={setting.label}
              type="button"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform duration-300 focus:scale-[0.98] focus:bg-app_bg active:scale-[0.98] active:bg-app_bg"
              onClick={setting.onClick}
            >
              <span className="f16 font-medium text-text_primary ">{setting.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </button>
          ))}
        </div>
      </section>
      <div className="h-2.5 w-full bg-app_bg" />
      <section>
        <div className="space-y-1 bg-white px-2 py-2">
          {auth.map((fn) => (
            <button
              key={fn.label}
              type="submit"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform  focus:scale-[0.98] focus:bg-app_bg active:scale-[0.98] active:bg-app_bg"
              onClick={fn.onClick}
            >
              <span className="f16 font-medium text-text_primary">{fn.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
