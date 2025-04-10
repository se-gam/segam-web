'use client';

import { Notice } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

interface NoticeDetailProps {
  notice: Notice;
}

export default function NoticeDetail({ notice }: NoticeDetailProps) {
  return (
    <div className="safe-area-bottom mt-8 flex flex-col overflow-hidden bg-white">
      <header className="px-4">
        <h1 className="f20 font-bold text-text_primary">{notice.title}</h1>
        <time className="f16 mt-2 block text-text_secondary">
          {dateDotFormatter(notice.createdAt)}
        </time>
      </header>
      <main className="mt-1 flex-1 overflow-auto px-4 py-2">
        <p className="f16 whitespace-pre-wrap leading-6 text-text_primary">{notice.content}</p>
      </main>
    </div>
  );
}
