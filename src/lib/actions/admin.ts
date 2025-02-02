'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { fetchExtended } from '@/utils/fetchExtended';
import { Notice } from '@/lib/definitions';

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
  const { body: notices } = await fetchExtended<Notice[]>('/v1/notice', {
    cache: 'force-cache',
    next: {
      tags: ['notices'],
    },
  });

  return notices;
}

export async function handleDelete(id: number) {
  await fetchExtended(`/v1/notice/${id}`, {
    method: 'DELETE',
  });
  revalidateTag('notices');
  revalidateTag(`notice-${id}`);
}

export async function handleCreate(data: Pick<Notice, 'title' | 'content'>) {
  await fetchExtended('/v1/notice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  revalidateTag('notices');
}

export async function handleEdit(id: number, data: Pick<Notice, 'title' | 'content'>) {
  await fetchExtended(`/v1/notice/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  revalidateTag('notices');
  revalidateTag(`notice-${id}`);
}

export async function getNoticeById(id: number): Promise<Pick<Notice, 'title' | 'content'>> {
  const { body: notice } = await fetchExtended<Pick<Notice, 'title' | 'content'>>(
    `/v1/notice/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      next: {
        tags: [`notice-${id}`],
      },
    },
  );
  return notice;
}

export async function handlePopup(id: number) {
  const response = await fetchExtended(`/v1/notice/popup/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return {
    success: response.status === 201,
  };
}