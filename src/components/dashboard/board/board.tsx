import Icons from '@/components/common/icons/icons';
import Link from 'next/link';
import cn from '@/utils/cn';

interface BoardProps {
  title: string;
  url: string;
  type?: 'default' | 'independent';

  children?: React.ReactNode;
}

export default function Board({ title, children, url, type = 'default' }: BoardProps) {
  return (
    <section className="rounded-2xl bg-white px-3 py-5">
      <div className={cn('flex items-center justify-between px-3', type === 'default' && 'mb-4')}>
        <h2 className="f20 font-bold text-text_primary">{title}</h2>
        <Link type="button" aria-label={`go to ${title}`} href={url}>
          <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
        </Link>
      </div>
      {children}
    </section>
  );
}
