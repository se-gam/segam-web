import { fetchExtended } from '@/utils/fetchExtended';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await fetchExtended('/v1/user/push-token', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        os: req.cookies.get('os')?.value,
        pushToken: req.cookies.get('pushToken')?.value,
      },
    });
    redirect('/dashboard');
  } catch (e) {
    redirect('/dashboard');
  }
}
export async function POST() {
  redirect('/dashboard');
}
