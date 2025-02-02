import StackHeader from '@/components/common/stackHeader/stackHeader';
import { Notice } from '@/lib/definitions';
import { getNoticeDetail } from '@/lib/actions/notice';
import NoticeDetail from '@/components/notion/noticeDetail';

export default async function DetailPage({params}:{params:{id:number}}){
    const notice : Notice|null = await getNoticeDetail(params.id)

    if (!notice) {
        throw new Error('공지사항을 불러올 수 없습니다.');
    }

    return(
        <div className = "container h-full flex flex-col overflow-hidden">
            <StackHeader title = {notice.title}/>
            <div className = "mt-8 h-full overflow-auto">
                <NoticeDetail notice={notice}/>
            </div>
        </div>
    );
}