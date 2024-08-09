'use server';

import { auth } from '@/auth';
import { Friends, UserInfo } from '@/lib/definitions';
import { fetchExtended } from '@/utils/fetchExtended';
import { unstable_noStore } from 'next/cache';

export async function getUserInfo() {
  unstable_noStore();
  const session = await auth();
  const accessToken = session?.user.accessToken;

  const res = await fetchExtended<UserInfo>('/private', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.body;
}

export async function getFriends() {
  unstable_noStore();
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const res = await fetchExtended<Friends>('/v1/user/friend', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  const url = date ? '/v1/studyroom/user' : '/v1/user/friend';
  const body = date
    ? {
        password,
        friendId,
        friendName,
        date: date?.toISOString(),
      }
    : {
        password,
        studentId: friendId,
        name: friendName,
      };
  try {
    await fetchExtended(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}
export async function deleteFriend({ studentId }: { studentId: string }) {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  try {
    await fetchExtended(`/v1/user/friend/${studentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}
export async function updateToken() {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  try {
    await fetchExtended('/v1/user/push-token', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        os: 'IOS',
        pushToken: '',
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}
