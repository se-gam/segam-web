'use server';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { StudyroomList, Studyroom, StudyroomReservationList } from '@/lib/definitions';
import fetchExtended from '@/utils/fetchExtended';
import { revalidateTag, unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

interface StudyroomListProps {
  date: string;
}

export async function getStudyroomList({ date }: StudyroomListProps): Promise<StudyroomList> {
  const query = new URLSearchParams({
    date,
  });
  const url = `/v1/studyroom?${query}`;

  try {
    unstable_noStore();
    const data = await fetchExtended<StudyroomList>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data.body;
  } catch (error) {
    throw new Error('스터디룸 정보를 불러오는데 실패했습니다.');
  }
}

interface StudyroomProps {
  id: number;
  date: Date;
}

export async function getStudyroomInfo({ id, date }: StudyroomProps): Promise<Studyroom> {
  unstable_noStore();
  const query = new URLSearchParams({ date: new Date(date).toISOString() });
  const url = `/v1/studyroom/${id}?${query}`;
  const data = await fetchExtended<Studyroom>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.body)
    .catch(() => {
      throw new Error('스터디룸 정보를 불러오는데 실패했습니다.');
    });

  return data;
}
export async function getReservationList(): Promise<StudyroomReservationList> {
  try {
    const data = await fetchExtended<StudyroomReservationList>('/v1/studyroom/reservation/me', {
      method: 'POST',
      cache: 'force-cache',
      next: {
        tags: ['reservationList'],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        password: cookies().get('encrypted')?.value,
      },
    });
    return data.body;
  } catch (error) {
    throw new Error('예약 정보를 불러오는데 실패했습니다.');
  }
}

export async function updateReservationList(): Promise<void> {
  revalidateTag('reservationList');
}

export async function cancelReservation(id: number) {
  try {
    await fetchExtended(`/v1/studyroom/reservation/cancel/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        password: cookies().get('encrypted')?.value,
        cancelReason: '예약취소',
      },
    });
    revalidateTag('reservationList');
  } catch (error) {
    throw new Error('예약 취소에 실패했습니다.');
  }
}

interface CheckUserProps {
  friendId: string;
  friendName: string;
  date: Date;
}
export async function checkUser({ friendId, friendName, date }: CheckUserProps) {
  await fetchExtended(`/v1/studyroom/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    body: {
      password: cookies().get('encrypted')?.value,
      friendId,
      friendName,
      date: date.toISOString(),
    },
  });
}

interface ReserveStudyroomProps {
  studyroomId: number;
  date: Date;
  startsAt: number;
  duration: number;
  reason: string;
  users: string[];
}
export async function reserveStudyroom({
  studyroomId,
  date,
  startsAt,
  duration,
  reason,
  users,
}: ReserveStudyroomProps) {
  const password = cookies().get('encrypted')?.value;
  try {
    await fetchExtended(`/v1/studyroom/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        studyroomId,
        password,
        startsAt,
        duration,
        reason,
        users,
        date: date.toISOString(),
      },
    });
    revalidateTag('reservationList');
  } catch (error) {
    throw new Error('스터디룸 예약에 실패했습니다.');
  }
}
