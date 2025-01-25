import { NoticeSummary } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';
import Link from 'next/link';

interface NoticeListProps{
  notices:NoticeSummary[];
}

export default function NoticeList({notices}:NoticeListProps) {
  return (
    <div className="flex flex-col">
      {notices.map((notice) => (
        <Link
          key={notice.id}
          href={`/stack/notion/${notice.id}`}
          className="flex flex-col justify-center h-20 px-4 py-4 hover:bg-gray-50 transition"
        >
          <h2 className="f16 font-semibold text-text_primary truncat mb-0.5">
            {notice.title}
          </h2>
          <time className="f14 font-medium text-text_secondary">
            {dateDotFormatter(notice.createdAt)}
          </time>
        </Link>
      ))}
    </div>
  );
}
