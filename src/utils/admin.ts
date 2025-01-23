'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = '1234'; // 비밀번호 설정

export default async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  if (password === ADMIN_PASSWORD) {
    const session = { username: 'admin' };
    const cookieStore = cookies();
    cookieStore.set('adminSession', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    redirect('/admin/dashboard');
  }
  redirect('/admin');
}
