import { fetchExtended } from '@/utils/fetchExtended';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const os = req.cookies.get('os')?.value;
    const pushToken = req.cookies.get('pushToken')?.value;
    if (!os || !pushToken) {
      redirect('/update');
    }
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
    redirect('/update');
  } catch (e) {
    redirect('/update');
  }
}
export async function POST() {
  return redirect('/update');
}
