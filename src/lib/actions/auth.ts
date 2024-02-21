'use server';

import { AuthResponse } from '@/lib/definitions';
import encryptPassword from '@/utils/encryptPassword';
import fetchExtended from '@/utils/fetchExtended';
import { cookies } from 'next/headers';

export default async function login(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId');
  const password = formData.get('password');

  if (studentId === '') return { message: '학번을 입력해주세요.' };
  if (password === '') return { message: '비밀번호를 입력해주세요.' };
  const encryptedPassword = encryptPassword(password?.toString() || '');
  const result = await fetchExtended<AuthResponse>('/v1/auth/signup', {
    method: 'POST',
    body: {
      studentId,
      password: encryptedPassword,
    },
  })
    .then((response) => {
      const { accessToken, refreshToken } = response.body;
      cookies().set('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 7 });
      cookies().set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 168 });
      cookies().set('encrypted', encryptedPassword, { maxAge: 60 * 60 * 24 * 168 });
      return { message: '로그인 성공' };
    })
    .catch((e) => {
      switch (e.status) {
        case 500:
          throw new Error('서버 오류가 발생했습니다. 다시 시도해주세요.');
        default:
          return {
            message: '아이디 또는 비밀번호가 일치하지 않습니다.',
          };
      }
    });
  return result;
}
