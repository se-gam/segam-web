import { fetchExtended } from '@/utils/fetchExtended';
import { NoticeForList } from '@/lib/definitions';

export default async function getNotices(): Promise<NoticeForList[]> {
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
