import Icons from '@/components/common/icons/icons';
import Link from 'next/link';

interface BoardProps {
  title: string;
  url?: string;
  children?: React.ReactNode;
}

export default function Board({ title, children, url }: Readonly<BoardProps>) {
  return (
    <section className="rounded-2xl bg-white px-3 py-5">
      <div className="mb-4 flex items-center justify-between px-3">
        <h2 className="f20 font-bold text-text_primary">{title}</h2>
        {url && (
          <Link type="button" aria-label={`go to ${title}`} href={url}>
            <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
