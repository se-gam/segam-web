import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SendRouterEventProps {
  type: 'PUSH' | 'BACK' | 'PERMISSION';
  screen?: string;
  path?: string;
  title?: string;
}
const sendRouterEvent = ({ type, path, title, screen }: SendRouterEventProps): void => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type, path, title, screen }));
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
const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL;
const NOTION_URL = process.env.NEXT_PUBLIC_NOTION_URL;
const INQUIRY_URL = process.env.NEXT_PUBLIC_INQUIRY_URL;
// push 하는 경우
export const stackRouterPush = ({ router, page, title = '' }: StackRouterPushProps) => {
  let url = '';
  let screen = '';
  if (isApp()) {
    switch (page) {
      case 'faq':
        url = `${NOTION_URL}`;
        screen = 'stack';
        break;
      case 'inquiry':
        url = `${INQUIRY_URL}`;
        screen = 'stack';
        break;
      case 'roulette':
        url = `${BASE_URL}/stack/roulette`;
        screen = 'fullStack';
        break;
      default:
        url = `${BASE_URL}/stack/${page}`;
        break;
    }
    sendRouterEvent({
      title,
      screen,
      type: 'PUSH',
      path: url,
    });
  } else {
    switch (page) {
      case 'faq':
        url = `${NOTION_URL}`;
        break;
      case 'inquiry':
        url = `${INQUIRY_URL}`;
        break;
      default:
        url = `/stack/${page}`;
        break;
    }
    router.push(url);
  }
};
