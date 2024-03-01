import NavLinks from '@/components/common/navLinks/NavLinks';
import { updateCourseAttendance } from '@/lib/actions/attendance';

export default async function Layout({ children }: { children: React.ReactNode }) {
  await updateCourseAttendance();
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="page overflow-auto bg-app_bg">{children}</div>
      <NavLinks />
    </div>
  );
}
