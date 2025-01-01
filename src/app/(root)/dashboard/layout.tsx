import NavLinks from '@/components/common/navLinks/NavLinks';
// import { getClassicStatus } from '@/lib/actions/classic';
import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ['classicStatus'],
  //   queryFn: async () => getClassicStatus(),
  // });

  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
      <NavLinks />
    </div>
  );
}
