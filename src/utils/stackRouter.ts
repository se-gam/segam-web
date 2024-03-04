import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SendRouterEventProps {
  type: 'PUSH' | 'BACK' | 'PERMISSION';
  path?: string;
  title?: string;
}
const sendRouterEvent = ({ type, path, title }: SendRouterEventProps): void => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type, path, title }));
};
// react native app 환경인지 판단
export const isApp = () => {
  let checkIsApp = false;
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    checkIsApp = true;
  }
  return checkIsApp;
};
// 뒤로가기 하는 경우
export const stackRouterBack = (router: AppRouterInstance) => {
  if (isApp()) {
    sendRouterEvent({
      type: 'BACK',
    });
  } else {
    router.back();
  }
};

interface StackRouterPushProps {
  router: AppRouterInstance;
  page: string;
  title?: string;
}
// const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL;
const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
// push 하는 경우
export const stackRouterPush = ({ router, page, title = '' }: StackRouterPushProps) => {
  let url = '';

  if (isApp()) {
    url = `${BASE_URL}/stack/${page}`;
    sendRouterEvent({
      title,
      type: 'PUSH',
      path: url,
    });
  } else {
    url = `/stack/${page}`;
    router.push(url);
  }
};
