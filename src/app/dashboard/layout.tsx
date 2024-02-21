import NavLinks from '@/components/common/navLinks/NavLinks';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="h-full overflow-auto">{children}</div>
      <NavLinks />
    </div>
  );
}
