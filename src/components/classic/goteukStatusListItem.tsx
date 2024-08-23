import Icons from '@/components/common/icons/icons';
import Tag from '@/components/common/tag/tag';

export default function GoteukStatusListItem({
  item,
}: Readonly<{
  item: {
    id: string;
    title: string;
    done: number;
    total: number;
    icon: string;
  };
}>) {
  const label = item.done >= item.total ? '완료' : `${item.done}/${item.total}`;
  const variant = item.done >= item.total ? 'done' : 'warning';
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-icons_bg p-1.5">
          <Icons.ImageIcon name={item.icon} width={36} height={36} />
        </div>
        <p className="f16 text-left font-semibold text-text_primary">{item.title}</p>
      </div>
      <Tag className="flex-shrink-0" size="sm" variant={variant} label={label} />
    </div>
  );
}
