'use server';

import { AuthResponse } from '@/lib/definitions';
import encryptPassword from '@/utils/encryptPassword';
import fetchExtended from '@/utils/fetchExtended';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(formData: FormData) {
  const studentId = formData.get('studentId');
  const password = formData.get('password');
  const encryptedPassword = encryptPassword(password?.toString() || '');
  const { accessToken, refreshToken } = await fetchExtended<AuthResponse>('/v1/auth/signup', {
    method: 'POST',
    body: {
      studentId,
      password: encryptedPassword,
    },
  })
    .then((response) => response.body)
    .catch(() => {
      throw new Error('학번과 비밀번호를 확인하세요.');
    });
  cookies().set('accessToken', accessToken, {
    maxAge: 60 * 60 * 24 * 7,
  });
  cookies().set('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 168,
  });
  cookies().set('encrypted', encryptedPassword, {
    maxAge: 60 * 60 * 24 * 168,
  });
  redirect('/dashboard');
}
