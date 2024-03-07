import NavLinks from '@/components/common/navLinks/NavLinks';
import { updateCourseAttendance } from '@/lib/actions/attendance';

export default async function Layout({ children }: { children: React.ReactNode }) {
  await updateCourseAttendance();
  return (
    <div className="flex h-dvh flex-col justify-between overflow-hidden">
      {children}
      <NavLinks />
    </div>
  );
}
