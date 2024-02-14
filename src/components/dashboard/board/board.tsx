'use client';

import Icons from '@/components/common/icons/icons';
import useLink from '@/hooks/useLink';

interface BoardProps {
  title: string;
  url: string;
  children?: React.ReactNode;
}

export default function Board({ title, children, url }: BoardProps) {
  const { navigateTo } = useLink();
  return (
    <section className="rounded-2xl bg-white px-3 py-5">
      <div className="mb-4 flex items-center justify-between px-3">
        <h2 className="f20 font-bold text-text_primary">{title}</h2>
        <button
          type="button"
          aria-label={`go to ${title}`}
          onClick={() => {
            navigateTo(url);
          }}
        >
          <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
        </button>
      </div>
      {children}
    </section>
  );
}
