'use server';

import { Option } from '@/lib/definitions';
import { getCourseAttendance } from '@/lib/actions/attendance';
import { fetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import postMessageToDiscord from '@/lib/actions/discord';

interface AssignmentPayload {
  courseId: string;
  name: string;
  startsAt: string;
  endsAt: string;
}

export async function createAssignment(data: AssignmentPayload): Promise<void> {
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
      postMessageToDiscord('커스텀 과제 추가 에러 발생', e.message);
    }
    throw e;
  }
}

export async function updateAssignment(id: string, data: AssignmentPayload): Promise<void> {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  try {
    await fetchExtended(`/v1/assignment/${id}`, {
      method: 'PUT',
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
      postMessageToDiscord('커스텀 과제 수정 에러 발생', e.message);
    }
    throw e;
  }
}

export async function getAssignmentById(id: string): Promise<AssignmentPayload> {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  const res = await fetchExtended<AssignmentPayload>(`/v1/assignment/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  }).then((r) => r.body);

  return res;
}

export async function deleteAssignment(id: string) {
  const session = await auth();
  const accessToken = session?.user.accessToken;

  await fetchExtended(`/v1/assignment/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  revalidateTag('assignments');
  revalidateTag('courseAttendance');
}

export async function getCourseOptions(): Promise<Option[]> {
  const data = await getCourseAttendance();
  return data.courses.map((course) => ({
    label: course.name,
    value: course.id,
  }));
}
