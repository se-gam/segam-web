'use client';

import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';
import { ClassicStatus } from '@/lib/definitions';

const ICON_CODE = {
  1000: 'classic_west',
  2000: 'classic_east',
  3000: 'classic_east_west',
  4000: 'classic_science',
};
export default function GoteukStatusListItem({
  classicStatus,
}: Readonly<{
  classicStatus: ClassicStatus;
}>) {
  const label = classicStatus.categoryStatus
    ? '완료'
    : `${classicStatus.count}/${classicStatus.targetCount}`;
  const variant = classicStatus.categoryStatus ? 'done' : 'warning';
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-icons_bg p-1.5">
          <Icons.ImageIcon name={ICON_CODE[classicStatus.categoryCode]} width={36} height={36} />
        </div>
        <p className="f16 text-left font-semibold text-text_primary">
          {classicStatus.categoryName}
        </p>
      </div>
      <Tag className="flex-shrink-0" size="sm" variant={variant} label={label} />
    </div>
  );
}
