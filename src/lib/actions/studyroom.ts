'use server';

import { Studyroom } from '@/lib/definitions';
import fetchExtended from '@/utils/fetchExtended';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

interface StudyroomProps {
  id: number;
  date: Date;
}

export async function getStudyroomInfo({ id, date }: StudyroomProps): Promise<Studyroom> {
  unstable_noStore();
  const query = new URLSearchParams({ date: date.toISOString() });
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
export async function getReservationList({ id, date }: StudyroomProps) {
  await fetchExtended(`/v1/studyroom/${id}/reservation?date=${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
}
