import { auth } from '@/auth';
import postMessageToDiscord from '@/lib/actions/discord';
import { ClassicStatusList } from '@/lib/definitions';
import { fetchExtended } from '@/utils/fetchExtended';

export default async function getClassicStatus(): Promise<ClassicStatusList> {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  try {
    const data = await fetchExtended<ClassicStatusList>('/v1/godok/status/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        cache: 'no-cache',
      },
      body: {
        password,
      },
    });

    return data.body;
  } catch (error) {
    if (error instanceof Error) {
      postMessageToDiscord('고전독서 현황 조회', error.message);
    }
    throw error;
  }
}
