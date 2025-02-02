import StackHeader from '@/components/common/stackHeader/stackHeader';
import NoticeList from '@/components/notion/noticeList';
import { getNotices } from '@/lib/actions/notice';
import { NoticeSummary } from '@/lib/definitions';

export default async function Page() {
  const notices:NoticeSummary[] = await getNotices();
  return (
    <div className="container h-full flex flex-col overflow-hidden">
      <StackHeader title="공지사항"/>
      <div className="h-full overflow-auto">
        <NoticeList notices={notices}/>
      </div>
    </div>
  );
}