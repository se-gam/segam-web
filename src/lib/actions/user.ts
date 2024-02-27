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
    .catch(() => []);
  return res;
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
