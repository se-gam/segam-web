import fetchExtended from '@/utils/fetchExtended';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const pushToken = req.cookies.get('pushToken');
  // const os = req.cookies.get('os');
  try {
    await fetchExtended('/v1/user/push-token', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
      body: {
        pushToken: pushToken?.value,
      },
    });
  } catch (e) {
    throw new Error('푸시 토큰 등록에 실패했습니다.');
  }
  redirect('/dashboard');
}
export async function POST() {
  redirect('/dashboard');
}
