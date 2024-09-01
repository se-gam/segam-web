import { auth } from '@/auth';
import postMessageToDiscord from '@/lib/actions/discord';
import {
  BookInfo,
  ClassicStatusList,
  GodokCalendar,
  GodokCalendarResponse,
} from '@/lib/definitions';
import { fetchExtended } from '@/utils/fetchExtended';

export async function getClassicStatus(): Promise<ClassicStatusList> {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  try {
    const data = await fetchExtended<ClassicStatusList>('/v1/godok/status/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        cache: 'no-cache',
      },
      body: {
        password,
      },
    });

    return data.body;
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('고전독서 현황 조회', error.message);
    }
    throw error;
  }
}

export async function getCalendarSlot(): Promise<GodokCalendar> {
  try {
    const data = await fetchExtended<GodokCalendarResponse>('/v1/godok/calendar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cache: 'no-cache',
      },
    });
    return data.body.godokSlots;
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('캘린더 슬롯', error.message);
    }
    throw error;
  }
}

export async function getBookData(): Promise<BookInfo[]> {
  try {
    const data = await fetchExtended<BookInfo[]>('/v1/godok/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cache: 'no-cache',
      },
    });
    return data.body;
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('도서 정보', error.message);
    }
    throw error;
  }
}
