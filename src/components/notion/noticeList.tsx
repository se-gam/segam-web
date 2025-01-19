'use client';

import { useState } from 'react';
import { NoticeForList } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';
import { getNotices } from '@/lib/actions/notice';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import Loading from '@/app/loading';

export default function NoticeList() {
  const [notices, setNotices] = useState<NoticeForList[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const take = 10;

  const fetchData = async () => {
    if (isLoading || !hasMoreData) return;

    setIsLoading(true);

    try {
      const { data: newNotices } = await getNotices(skip, take);
      if (newNotices.length === 0) {
        setHasMoreData(false);
      } else {
        setNotices((prev) => [...prev, ...newNotices]);
        setSkip((prevSkip) => prevSkip + take);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const observerRef = useInfiniteScroll({
    onIntersect: fetchData,
    enabled: hasMoreData && !isLoading,
  });

  return (
    <div className="flex flex-col px-4 py-2">
      {notices.map((notice,index) => (
        <div
          key={index} //백에서 id도 넘겨주는 거로 수정하기 전이라 일단 index 껴둠
          className="flex flex-col justify-center h-[78px] px-4 py-[16px] hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <h2 className="text-[16px] font-semibold leading-[24px] text-[#4E5968] truncate">
            {notice.title}
          </h2>
          <time className="text-[14px] font-medium leading-[20px] text-[#979799]">
            {dateDotFormatter(notice.createdAt)}
          </time>
        </div>
      ))}
      
      {isLoading && (
        <div className="py-4 text-center">
          <Loading />
        </div>
      )}
      
      <div ref={observerRef} className="h-4" />
    </div>
  );
}