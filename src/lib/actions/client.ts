import { Session } from 'next-auth';
import { UpdateSession } from 'next-auth/react';
import { fetchExtended } from '@/utils/fetchExtended';
import postMessageToDiscord from './discord';
import { StudyroomReservationList } from '../definitions';

export default async function getReservationList(
  session:
    | { update: UpdateSession; data: Session; status: 'authenticated' }
    | { update: UpdateSession; data: null; status: 'unauthenticated' | 'loading' }
    | { update: UpdateSession; data: null; status: 'loading' },
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
      postMessageToDiscord('[재요청] 스터디룸 예약현황 조회 실패', error.message);
    }
    throw error;
  }
}
