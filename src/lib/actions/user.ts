'use server';

import { Friends } from '@/lib/definitions';
import fetchExtended from '@/utils/fetchExtended';
import { cookies } from 'next/headers';

export async function getFriends() {
  const res = await fetchExtended<Friends>('/v1/user/friend', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  })
    .then((response) => {
      const friends = response.body.friends.map((friend) => ({
        studentId: friend.studentId,
        name: friend.name,
      }));
      return friends;
    })
    .catch(() => {
      throw new Error('친구 목록을 불러오는데 실패했습니다.');
    });
  return res;
}
export async function removeFriend(friendId: string) {
  const res = await fetchExtended(`/v1/user/friend/${friendId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  })
    .then(() => true)
    .catch(() => false);
  return res;
}
export async function addFriend(friendId: string) {
  const res = await fetchExtended(`/v1/user/friend`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    body: {
      studentId: friendId,
    },
  })
    .then(() => true)
    .catch(() => false);
  return res;
}
