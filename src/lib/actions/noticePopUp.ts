'use server';

import { fetchExtended } from '@/utils/fetchExtended';
import { Notice } from '../definitions';

export default async function getNoticePopUP() {
  const { body: noticeData } = await fetchExtended<Notice>(
    'http://dev.api.segam.org:3000/v1/notice/popup',
    {
      cache: 'no-store',
      next: {
        tags: ['noticePopUp'],
      },
    },
  );

  return noticeData;
}
