import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SendRouterEventProps {
  type: string;
  path?: string;
  title?: string;
}
const sendRouterEvent = ({ type, path, title }: SendRouterEventProps): void => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type, path, title }));
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
    sendRouterEvent({
      type: 'back',
    });
  } else {
    router.back();
  }
};

interface StackRouterPushProps {
  router: AppRouterInstance;
  page: string;
  title: string;
}
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const NOTION_URL = process.env.NEXT_PUBLIC_NOTION_URL;
// push 하는 경우
export const stackRouterPush = ({ router, page, title }: StackRouterPushProps) => {
  if (isApp()) {
    const url = page === 'faq' ? `${NOTION_URL}` : `${SERVER_URL}/stack/${page}`;
    sendRouterEvent({
      type: 'push',
      path: url,
      title,
    });
  } else {
    const url = page === 'faq' ? `${NOTION_URL}` : `/stack/${page}`;
    router.push(url);
  }
};
