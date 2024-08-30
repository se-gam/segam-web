'use client';

import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';
import { CLASSIC_CATEGORY_CODE } from '@/lib/constants';
import { ClassicStatus } from '@/lib/definitions';

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
          <Icons.ImageIcon
            name={CLASSIC_CATEGORY_CODE[classicStatus.categoryCode]}
            width={36}
            height={36}
          />
        </div>
        <p className="f16 text-left font-semibold text-text_primary">
          {classicStatus.categoryName}
        </p>
      </div>
      <Tag className="flex-shrink-0" size="sm" variant={variant} label={label} />
    </div>
  );
}
