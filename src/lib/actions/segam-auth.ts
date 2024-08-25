'use server';

import { AuthResponse } from '@/lib/definitions';
import encryptPassword from '@/utils/encryptPassword';
import { fetchExtended } from '@/utils/fetchExtended';
import { cookies } from 'next/headers';

interface LoginProps {
  studentId: string;
  password: string;
}
export async function login({ studentId, password }: LoginProps) {
  const encryptedPassword = encryptPassword(password?.toString() || '');
  const pushToken = cookies().get('pushToken')?.value;
  const os = cookies().get('os')?.value;
  const result = await fetchExtended<AuthResponse>('/v1/auth/signup', {
    method: 'POST',
    body: {
      studentId,
      password: encryptedPassword,
      os,
      pushToken,
    },
  });
  const { accessToken, refreshToken } = result.body;
  return {
    accessToken,
    refreshToken,
    encryptedPassword,
    pushToken,
    os,
  };
}

export async function refreshAccessTokenByRefreshToken(token: string) {
  const result = await fetchExtended<AuthResponse>('/v1/auth/refresh', {
    method: 'POST',
    body: {
      refreshToken: token,
    },
  });
  const { accessToken, refreshToken } = result.body;
  return {
    accessToken,
    refreshToken,
  };
}
