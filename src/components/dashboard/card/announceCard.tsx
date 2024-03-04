'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';

interface AnnounceCardProps {
  title: string;
  description: string;
  iconName: string;
  link: string;
  courseName?: string;
}

export default function AnnounceCard({
  title,
  description,
  iconName,
  link,
  courseName = '',
}: AnnounceCardProps) {
  console.log(link);
  const { navigateTo } = useLink();
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 rounded-2xl bg-card_bg py-5 pl-7 pr-6"
      onClick={() => {
        navigateTo({ page: link, title: courseName });
      }}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-md p-0.5">
          <Icons.ImageIcon name={iconName} width={42} height={42} />
        </div>
        <div className="text-start">
          <p className="f14 text-text_secondary">{description}</p>
          <p className="f16 font-bold text-theme_primary">{title}</p>
        </div>
      </div>
      <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
    </button>
  );
}
