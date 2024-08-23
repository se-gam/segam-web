'use server';

import { auth } from '@/auth';
import { StudyroomList, Studyroom } from '@/lib/definitions';
import { fetchExtended } from '@/utils/fetchExtended';
import { revalidatePath, revalidateTag, unstable_noStore } from 'next/cache';

interface StudyroomListProps {
  date: string;
}

export async function getStudyroomList({ date }: StudyroomListProps): Promise<StudyroomList> {
  const queryDate = new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  });

  const query = new URLSearchParams({
    date: queryDate,
  });

  const url = `/v1/studyroom?${query}`;

  unstable_noStore();
  const data = await fetchExtended<StudyroomList>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.body;
}

interface StudyroomProps {
  id: number;
  date: Date;
}

export async function getStudyroomInfo({ id, date }: StudyroomProps): Promise<Studyroom> {
  unstable_noStore();
  const queryDate = new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  });
  const query = new URLSearchParams({ date: queryDate });
  const url = `/v1/studyroom/${id}?${query}`;
  const data = await fetchExtended<Studyroom>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.body;
}

export async function updateReservationList(): Promise<void> {
  revalidateTag('reservationList');
}

export async function cancelReservation(id: number) {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  try {
    await fetchExtended(`/v1/studyroom/reservation/cancel/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        password,
        cancelReason: '예약취소',
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  revalidateTag('reservationList');
  revalidatePath('/dashboard/studyroom', 'page');
  return null;
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
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  try {
    await fetchExtended(`/v1/studyroom/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  revalidateTag('reservationList');
  return null;
}
