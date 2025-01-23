import StackHeader from '@/components/common/stackHeader/stackHeader';
import { Notice } from '@/lib/definitions';
import { getNoticeDetail } from '@/lib/actions/notice';
import NoticeDetail from '@/components/notion/noticeDetail';

export default async function DetailPage({params}:{params:{id:number}}){
    const notice : Notice|null = await getNoticeDetail(params.id)

    if(!notice){
        return(
            <div className = "container h-full flex flex-col overflow-hidden">
                <StackHeader title = "공지사항 상세"/>
                <div className = "h-full flex items-center justify-center text-gray-500">
                    공지사항을 불러올 수 없습니다.
                </div>
            </div>
        )
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