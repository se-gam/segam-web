import { Session } from 'next-auth';
import { UpdateSession } from 'next-auth/react';
import { fetchExtended } from '@/utils/fetchExtended';
import postMessageToDiscord from './discord';
import {
  ClassicReservation,
  ClassicReservationList,
  ClassicStatusList,
  ClientSession,
  StudyroomReservationList,
} from '../definitions';

export async function getStudyroomReservation(
  session: ClientSession,
): Promise<StudyroomReservationList> {
  const accessToken = session?.data?.user.accessToken;
  const password = session?.data?.user.encryptedPassword;

  try {
    const data = await fetchExtended<StudyroomReservationList>('/v1/studyroom/reservation/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        password,
      },
    });
    return data.body;
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('스터디룸 예약현황 조회 실패', error.message);
    }
    throw error;
  }
}

export async function getClassicReservation(
  session: ClientSession,
): Promise<ClassicReservationList> {
  const accessToken = session?.data?.user.accessToken;
  const password = session?.data?.user.encryptedPassword;
  try {
    const data = await fetchExtended<ClassicReservation[]>('/v1/godok/reservation/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        password,
      },
    });
    return {
      reservations: data.body,
    };
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('고전독서 예약현황 에러', error.message);
    }
    throw error;
  }
}

export async function cancelClassicReservation(session: ClientSession, reservationId: string) {
  const accessToken = session?.data?.user.accessToken;
  const password = session?.data?.user.encryptedPassword;
  try {
    await fetchExtended<ClassicReservation[]>(`/v1/godok/reservation/cancel/${reservationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        password,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}

export async function getClassicStatus(
  session:
    | { update: UpdateSession; data: Session; status: 'authenticated' }
    | { update: UpdateSession; data: null; status: 'unauthenticated' | 'loading' }
    | { update: UpdateSession; data: null; status: 'loading' },
): Promise<ClassicStatusList> {
  const accessToken = session?.data?.user.accessToken;
  const password = session?.data?.user.encryptedPassword;
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
