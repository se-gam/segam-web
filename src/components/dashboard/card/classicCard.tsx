import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';
import Link from 'next/link';

export default function ClassicCard() {
  const variant = 'done';
  const label = '완료';
  return (
    <div className="w-full rounded-2xl bg-white px-3 py-5">
      <Link href="/dashboard/classic">
        <div className="flex items-center justify-between px-3">
          <h2 className="f20 font-bold text-text_primary">고전독서 현황</h2>
          <div className="flex items-center gap-1">
            <Tag className="flex-shrink-0" size="sm" variant={variant} label={label} />
            <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
          </div>
        </div>
      </Link>
    </div>
  );
}
