import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const sendRouterEvent = (path: string, page: string | null, title: string | null): void => {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({ type: 'ROUTER_EVENT', data: path, page, title }),
  );
};
// react native app 환경인지 판단
const isApp = () => {
  let checkIsApp = false;
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    checkIsApp = true;
  }
  return checkIsApp;
};
// 뒤로가기 하는 경우
export const stackRouterBack = (router: AppRouterInstance) => {
  if (isApp()) {
    sendRouterEvent('back', null, null);
  } else {
    router.back();
  }
};

// push 하는 경우
export const stackRouterPush = (
  router: AppRouterInstance,
  url: string,
  page: string,
  title: string,
) => {
  if (isApp()) {
    sendRouterEvent(url, page, title);
  } else {
    router.push(url);
  }
};
