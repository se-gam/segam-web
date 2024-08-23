'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icons from '@/components/common/icons/icons';
import cn from '@/utils/cn';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: '대시보드', href: '/dashboard', icon: Icons.DashBoard },
  {
    name: '이러닝',
    href: '/dashboard/attendance',
    icon: Icons.Attendance,
  },
  { name: '스터디룸', href: '/dashboard/studyroom', icon: Icons.Studyroom },
  { name: '고전독서', href: '/dashboard/classic', icon: Icons.Studyroom },
  { name: '마이페이지', href: '/dashboard/mypage', icon: Icons.Mypage },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="safe-area-bottom flex w-full items-center justify-around bg-nav_bg px-2.5 pt-2.5">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="mb-2 flex h-10 w-14 flex-col items-center justify-center gap-1"
          >
            <LinkIcon
              className={cn('fill-theme_tertiary', {
                'fill-theme_accent': pathname === link.href,
              })}
              width="2rem"
              height="2rem"
            />
            <p
              className={cn('f12 font-medium text-text_secondary', {
                'text-theme_accent': pathname === link.href,
              })}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}
