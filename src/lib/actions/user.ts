'use server';

import { Friends, UserInfo } from '@/lib/definitions';
import { fetchExtended } from '@/utils/fetchExtended';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function getUserInfo() {
  unstable_noStore();
  const res = await fetchExtended<UserInfo>('/private', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  return res.body;
}

export async function getFriends() {
  unstable_noStore();

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
export async function deleteFriend({ studentId }: { studentId: string }) {
  try {
    await fetchExtended(`/v1/user/friend/${studentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    return null;
  } catch (e) {
    return e;
  }
}
export async function updateToken() {
  try {
    await fetchExtended('/v1/user/push-token', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        os: 'IOS',
        pushToken: '',
      },
    });
    return null;
  } catch (e) {
    return e;
  }
}
