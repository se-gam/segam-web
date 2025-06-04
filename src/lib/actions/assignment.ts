'use server';

import { Option } from '@/lib/definitions';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { fetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import postMessageToDiscord from '@/lib/actions/discord';

interface CreateAssignmentRequest {
  courseId: string;
  name: string;
  startsAt: string;
  endsAt: string;
}

export async function createAssignment(data: CreateAssignmentRequest): Promise<void> {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  try {
    await fetchExtended('/v1/assignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });

    revalidateTag('assignments');
    revalidateTag('courseAttendance');
  } catch (e) {
    if (e instanceof Error) {
      postMessageToDiscord('커스텀 과제 추천 에러 발생', e.message);
    }
    throw e;
  }
}

export async function getCourseOptions(): Promise<Option[]> {
  const data = await getCourseAttendance();
  return data.courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));
}
