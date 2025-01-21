import { fetchExtended } from '@/utils/fetchExtended';
import { NoticeForList } from '@/lib/definitions';

export default async function getNotices(page: number, size: number): Promise<{ data: NoticeForList[]; total: number }> {
  const skip = page;
  const take = size;

  try {
    const response = await fetchExtended<NoticeForList[]>(
      `http://dev.api.segam.org:3000/v1/notice?skip=${skip}&take=${take}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      data: response.body,
      total: response.body.length,
    };
  } catch (error) {
    return { data: [], total: 0 };
  }
}
