'use server';

import { fetchExtended } from '@/utils/fetchExtended';
import { Notice } from '../definitions';

export default async function getNoticePopUP() {
  try {
    const { body: noticeData } = await fetchExtended<Notice>('/v1/notice/popup', {
      cache: 'no-store',
      next: {
        tags: ['noticePopUp'],
      },
    });
    return noticeData;
  } catch (e) {
    return null;
  }
}
