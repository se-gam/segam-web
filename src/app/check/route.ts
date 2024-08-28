import { auth } from '@/auth';
import { fetchExtended } from '@/utils/fetchExtended';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const os = req.cookies.get('os')?.value;
  const pushToken = req.cookies.get('pushToken')?.value;
  if (os && pushToken) {
    await fetchExtended('/v1/user/push-token', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        os: req.cookies.get('os')?.value,
        pushToken: req.cookies.get('pushToken')?.value,
      },
    });
  }
  return NextResponse.redirect(new URL('/update', req.url));
}
export async function POST(req: NextRequest) {
  return NextResponse.redirect(new URL('/update', req.url));
}
