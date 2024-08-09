'use server';

import { auth, signIn } from '@/auth';
import { fetchExtended } from '@/utils/fetchExtended';

export async function withdrawal() {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  try {
    await fetchExtended('/v1/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    }
  }
  return null;
}
export async function loginAction(formData: FormData) {
  await signIn('credentials', {
    studentId: formData.get('studentId') as string,
    password: formData.get('password') as string,
    redirectTo: '/check',
  });
}
