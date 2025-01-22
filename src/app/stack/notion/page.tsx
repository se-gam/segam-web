import StackHeader from '@/components/common/stackHeader/stackHeader';
import NoticeList from '@/components/notion/noticeList';

export default function Page() {
  return (
    <div className="container h-full flex flex-col overflow-hidden">
      <StackHeader title="공지사항"/>
      <div className="h-full overflow-auto">
        <NoticeList />
      </div>
    </div>
  );
}