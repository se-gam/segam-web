'use client'

import { Notice } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

interface NoticeDetailProps{
    notice:Notice;
}

export default function NoticeDetail({ notice }: NoticeDetailProps) {
    return (
      <div className="safe-area-bottom flex h-screen flex-col overflow-hidden bg-white">
        <header className="px-4">
          <h1 className="text-[20px] font-bold text-[#4E5968]">{notice.title}</h1>
          <time className="block mt-2 text-[16px] text-[#979799]">{dateDotFormatter(notice.createdAt)}</time>
        </header>
        <main className="mt-4 flex-1 px-4 py-2 overflow-auto">
          <p className="ext-[16px] text-[#4E5968] leading-6 whitespace-pre-wrap">{notice.content}</p>
        </main>
      </div>
    );
  }