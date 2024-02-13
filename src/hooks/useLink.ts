import { stackRouterBack, stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

export default function useLink() {
  const router = useRouter();
  const navigateTo = (url: string) => {
    stackRouterPush(router, url);
  };
  const navigatePop = () => {
    stackRouterBack(router);
  };
  return { navigateTo, navigatePop };
}