import { auth } from '@/auth';
import { fetchExtended } from '@/utils/fetchExtended';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

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
  redirect('/update');
}
export async function POST() {
  return null;
}
