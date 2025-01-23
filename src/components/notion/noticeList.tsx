'use client';

import { useState, useEffect } from 'react';
import { NoticeForList } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';
import { getNotices } from '@/lib/actions/notice';
import Loading from '@/app/loading';
import Link from 'next/link';

export default function NoticeList() {
  const [notices, setNotices] = useState<NoticeForList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-4 text-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-2">
      {notices.map((notice) => (
        <Link
          key={notice.id}
          href={`/stack/notion/${notice.id}`}
          className="flex flex-col justify-center h-[78px] px-4 py-[16px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <h2 className="text-[16px] font-semibold leading-[24px] text-text_primary truncate">
            {notice.title}
          </h2>
          <time className="text-[14px] font-medium leading-[20px] text-text_secondary">
            {dateDotFormatter(notice.createdAt)}
          </time>
        </Link>
      ))}
    </div>
  );
}
