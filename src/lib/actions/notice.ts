import { fetchExtended } from '@/utils/fetchExtended';
import { NoticeForList, Notice } from '@/lib/definitions';

export async function getNotices(): Promise<NoticeForList[]> {
  try {
    const response = await fetchExtended<NoticeForList[]>(
      `http://dev.api.segam.org:3000/v1/notice`,
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
    const response = await fetchExtended<Notice>(
      `http://dev.api.segam.org:3000/v1/notice/${id}`,
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