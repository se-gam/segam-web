'use client';

import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';
import useLink from '@/hooks/useLink';

interface AttendanceCardProps {
  title: string;
  iconName: string;
  remainJobs?: number;
  id: number;
}
export default function AttendanceCard({ title, iconName, remainJobs, id }: AttendanceCardProps) {
  const { navigateTo } = useLink();
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-4 rounded-md p-3 active:bg-gray-200"
      onClick={() => {
        navigateTo({
          page: `attendance/${id}`,
          title,
        });
      }}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-md bg-icons_bg p-0.5">
          <Icons.ImageIcon name={iconName} width={36} height={36} />
        </div>
        <p className="f16 text-left font-bold text-text_primary">{title}</p>
      </div>
      <Tag
        className="flex-shrink-0"
        size="sm"
        variant={remainJobs ? 'warning' : 'done'}
        label={remainJobs ? `${remainJobs}개` : '완료'}
      />
    </button>
  );
}
