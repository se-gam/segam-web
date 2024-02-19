import NavLinks from '@/components/common/navLinks/NavLinks';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex h-dvh flex-col justify-between">
      {children}
      <NavLinks />
    </div>
  );
}
