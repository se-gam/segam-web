'use client';

import Icons from '@/components/common/icons/icons';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import useModal from '@/hooks/useModal';

import { withdrawal } from '@/lib/actions/auth';
import { updateToken } from '@/lib/actions/user';
import { isApp, stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;

export default function MenuList() {
  const router = useRouter();
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const { confirmModal, modal } = useModal();
  const settings = [
    {
      label: '친구 관리',
      onClick: () => {
        trackAmplitudeEvent('click_마이페이지_친구목록_list');
        stackRouterPush({ router, page: 'friends', title: '스터디룸 친구 목록' });
      },
    },
    {
      label: '앱 사용 문의',
      onClick: () => {
        trackAmplitudeEvent('click_마이페이지_문의_list');
        stackRouterPush({ router, page: 'inquiry' });
      },
    },
    {
      label: '공지사항',
      onClick: () => {
        trackAmplitudeEvent('click_마이페이지_공지사항_list');
        stackRouterPush({ router, page: 'notion' });
      },
    },
    {
      label: '앱 크레딧',
      onClick: () => {
        trackAmplitudeEvent('click_마이페이지_크레딧_list');
        stackRouterPush({ router, page: 'credit', title: '앱 크레딧' });
      },
    },
  ];
  const auth = [
    {
      label: '로그아웃',
      onClick: () => {
        confirmModal({
          title: '로그아웃',
          content: '정말 로그아웃하시겠습니까?',
          onClick: async () => {
            trackAmplitudeEvent('click_마이페이지_로그아웃_list');
            const res = await updateToken();
            if (res) {
              modal({
                title: '로그아웃 실패',
                content: '로그아웃에 실패했어요. 잠시 후 다시 시도해주세요.',
              });
            } else {
              if (isApp()) {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: 'LOGOUT',
                    path: `${BASE_URL}`,
                  }),
                );
              }
              router.replace('/logout');
            }
          },
        });
      },
    },
    {
      label: '회원 탈퇴',
      onClick: () => {
        confirmModal({
          title: '회원 탈퇴',
          content: '정말 탈퇴하시겠습니까?',
          onClick: async () => {
            trackAmplitudeEvent('click_마이페이지_회원탈퇴_list');
            const res = await withdrawal();
            if (res) {
              modal({
                title: '회원 탈퇴 실패',
                content: '회원 탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.',
              });
            } else {
              if (isApp()) {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: 'LOGOUT',
                    path: `${BASE_URL}`,
                  }),
                );
              }
              router.replace('/logout');
            }
          },
        });
      },
    },
  ];
  return (
    <>
      <div className="h-2 w-full bg-app_bg" />

      <section className="bg-white py-2">
        <h2 className="f20 mb-3 mt-3.5 px-4 font-bold text-text_primary">설정</h2>
        <div className="space-y-1 px-2">
          {settings.map((setting) => (
            <button
              key={setting.label}
              type="button"
              className="flex w-full items-center justify-between rounded bg-white px-2 py-4 transition-transform duration-300 focus:scale-[0.98] focus:bg-app_bg active:scale-[0.98] active:bg-app_bg"
              onClick={setting.onClick}
            >
              <span className="f16 font-medium text-text_primary">{setting.label}</span>
              <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
            </button>
          ))}
        </div>
      </section>
      <div className="h-2.5 w-full bg-app_bg" />
      <section>
        <div className="space-y-1 bg-white px-2 py-1">
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
