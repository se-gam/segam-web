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

export async function addFriend(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId');
  const result = await fetchExtended(`/v1/user/friend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    body: {
      studentId,
    },
  })
    .then(() => '친구 추가에 성공했습니다.')
    .catch((e) => {
      const error = JSON.parse(e.message);
      switch (error.statusCode) {
        case 404:
          return '존재하지 않는 사용자 입니다.';
        case 400:
          switch (error.message) {
            case '이미 친구로 등록된 사용자입니다.':
              return '이미 친구로 등록된 사용자입니다.';
            case '자기 자신을 친구로 등록할 수 없습니다.':
              return '자기 자신을 친구로 등록할 수 없습니다.';
            default:
              return '알 수 없는 오류가 발생했습니다.';
          }
        default:
          throw new Error('친구 추가 서버 오류');
      }
    });
  return { message: result };
}
