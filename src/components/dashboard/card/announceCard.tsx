'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';
import Link from 'next/link';

interface AnnounceCardProps {
  title: string;
  description: string;
  iconName: string;
  link: string;
  courseName?: string;
  useStackRoute?: boolean;
}

export default function AnnounceCard({
  title,
  description,
  iconName,
  link,
  courseName = '',
  useStackRoute = true,
}: AnnounceCardProps) {
  const { navigateTo } = useLink();

  const cardContent = (
    <div className="flex w-full items-center justify-between gap-2 rounded-2xl bg-card_bg py-5 pl-4 pr-6">
      <div className="flex items-center gap-2">
        <div className="rounded-md p-0.5">
          <Icons.ImageIcon name={iconName} width={42} height={42} />
        </div>
        <div className="text-start">
          <p className="f14 text-text_secondary">{description}</p>
          <p className="f16 font-bold text-theme_primary">{title}</p>
        </div>
      </div>
      <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
    </div>
  );

  if (useStackRoute) {
    return (
      <button
        type="button"
        className="w-full"
        onClick={() => navigateTo({ page: link, title: courseName })}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link href={link} className="w-full">
      {cardContent}
    </Link>
  );
}
