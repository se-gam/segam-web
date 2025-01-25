import { fetchExtended } from '@/utils/fetchExtended';
import { NoticeSummary, Notice } from '@/lib/definitions';

export async function getNotices(): Promise<NoticeSummary[]> {
  try {
    const response = await fetchExtended<NoticeSummary[]>(`/v1/notice`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.body;
  } catch (error) {
    return [];
  }
}

export async function getNoticeDetail(id:number):Promise<Notice|null>{
  try{
    const response = await fetchExtended<Notice>(`/v1/notice/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.body
  } catch(error){
    return null;
  }
}