'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { fetchExtended } from '../../utils/fetchExtended';
import { Notice } from '../definitions';

const ADMIN_PASSWORD = '1234'; // 비밀번호 설정

export async function login(prevState: any, formData: FormData) {
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

export async function getNotices() {
  const { body: notices } = await fetchExtended<Notice[]>(
    'http://dev.api.segam.org:3000/v1/notice',
    {
      cache: 'force-cache',
      next: {
        tags: ['notices'],
      },
    },
  );

  return notices;
}

export async function handleDelete(id: number) {
  await fetchExtended(`http://dev.api.segam.org:3000/v1/notice/${id}`, {
    method: 'DELETE',
  });
  revalidateTag('notices');
}
