'use client';

import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';
import useLink from '@/hooks/useLink';

interface AttendanceCardProps {
  title: string;
  iconName: string;
}
export default function AttendanceCard({ title, iconName }: AttendanceCardProps) {
  const { navigateTo } = useLink();

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 rounded-md p-3 active:bg-gray-200"
      onClick={() => {
        navigateTo(`attendance/${title}`, 'Detail', title);
      }}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-icons_bg p-0.5">
          <Icons.ImageIcon name={iconName} width={36} height={36} />
        </div>
        <p className="f16 font-bold text-text_primary">{title}</p>
      </div>
      <Tag size="sm" variant="done" label="1개" />
    </button>
  );
}
