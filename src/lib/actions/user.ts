'use server';

import { Friends, UserInfo } from '@/lib/definitions';
import fetchExtended from '@/utils/fetchExtended';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function getUserInfo() {
  unstable_noStore();
  try {
    const res = await fetchExtended<UserInfo>('/private', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return res.body;
  } catch (e) {
    throw new Error('내 정보를 불러오는데 실패 했습니다.');
  }
}

export async function getFriends() {
  unstable_noStore();
  try {
    const res = await fetchExtended<Friends>('/v1/user/friend', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const friends = res.body.friends.map((friend) => ({
      studentId: friend.studentId,
      name: friend.name,
    }));
    return friends;
  } catch (e) {
    throw new Error('친구목록을 불러오는데 실패 했습니다.');
  }
}

interface AddFriendProps {
  friendId: string;
  friendName: string;
  date?: Date;
}
export async function postAddFriend({ friendId, friendName, date }: AddFriendProps) {
  const url = date ? '/v1/studyroom/user' : '/v1/user/friend';
  const body = date
    ? {
        password: cookies().get('encrypted')?.value,
        friendId,
        friendName,
        date: date?.toISOString(),
      }
    : {
        password: cookies().get('encrypted')?.value,
        studentId: friendId,
        name: friendName,
      };
  await fetchExtended(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    body,
  });
}
export default async function deleteFriend({ studentId }: { studentId: string }) {
  await fetchExtended(`/v1/user/friend/${studentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
}
