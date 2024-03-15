'use server';

import { updateCourseAttendance } from '@/lib/actions/attendance';
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
  if (pushToken && os) {
    cookies().set('pushToken', pushToken, { maxAge: 60 * 60 * 24 * 168, httpOnly: true });
    cookies().set('os', os, { maxAge: 60 * 60 * 24 * 168, httpOnly: true });
  }
  if (accessToken && refreshToken) {
    cookies().set('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
    cookies().set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 168, httpOnly: true });
    cookies().set('encrypted', encryptedPassword, {
      maxAge: 60 * 60 * 24 * 168,
      httpOnly: true,
    });
    await updateCourseAttendance({
      refresh: false,
    });
  }
}

export async function withdrawal() {
  try {
    await fetchExtended('/v1/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}
