import { stackRouterBack, stackRouterPush } from '@/utils/stackRouter';
import { useRouter } from 'next/navigation';

interface NavigateToProps {
  page: string;
  title?: string;
}

export default function useLink() {
  const router = useRouter();
  const navigateTo = ({ page, title }: NavigateToProps) => {
    stackRouterPush({
      router,
      page,
      title,
    });
  };
  const navigatePop = () => {
    stackRouterBack(router);
  };
  return { navigateTo, navigatePop };
}
