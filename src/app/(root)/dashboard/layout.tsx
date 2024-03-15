import NavLinks from '@/components/common/navLinks/NavLinks';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col justify-between overflow-hidden">
      {children}
      <NavLinks />
    </div>
  );
}
