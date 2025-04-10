'use client';

import useLink from '@/hooks/useLink';
import { NoticeSummary } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

interface NoticeListProps {
  notices: NoticeSummary[];
}

export default function NoticeList({ notices }: Readonly<NoticeListProps>) {
  const { navigateTo } = useLink();
  return (
    <div className="flex flex-col">
      {notices.map((notice) => (
        <button
          key={notice.id}
          onClick={() =>
            navigateTo({
              page: `/notion/${notice.id}`,
              title: notice.title,
            })
          }
          className="flex h-20 flex-col items-start justify-center px-4 py-4 transition hover:bg-gray-50"
        >
          <h2 className="f16 mb-0.5 truncate font-semibold text-text_primary">{notice.title}</h2>
          <time className="f14 font-medium text-text_secondary">
            {dateDotFormatter(notice.createdAt)}
          </time>
        </button>
      ))}
    </div>
  );
}
