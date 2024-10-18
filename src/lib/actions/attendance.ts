'use server';

import { CourseAttendance, Restaurants } from '@/lib/definitions';
import { fetchExtended, retryFetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import postMessageToDiscord from '@/lib/actions/discord';
import { auth } from '@/auth';

export async function getCourseAttendance(): Promise<CourseAttendance> {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const data = await fetchExtended<CourseAttendance>('/v1/attendance/course', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'force-cache',
    next: {
      tags: ['courseAttendance'],
    },
  }).then((response) => response.body);

  const sortedCourses = data.courses.sort(
    (a, b) => b.lecturesLeft + b.assignmentsLeft - (a.lecturesLeft + a.assignmentsLeft),
  );
  return {
    ...data,
    courses: sortedCourses,
  };
}

export async function updateCourseAttendance({ refresh }: { refresh: boolean }): Promise<boolean> {
  const session = await auth();
  const accessToken = session?.user.accessToken;
  const password = session?.user.encryptedPassword;
  try {
    await retryFetchExtended<CourseAttendance>('/v1/attendance/update', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: {
        password,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      postMessageToDiscord('출석 업데이트 에러 발생', e.message);
    }
    return false;
  }

  if (refresh) {
    revalidateTag('courseAttendance');
  } else {
    revalidateTag('courseAttendance');
    redirect('/dashboard');
  }
  return true;
}

export async function getRestaurants(): Promise<Restaurants> {
  const data = await fetchExtended<Restaurants>('/v1/restaurant').then((response) => response.body);
  return data;
}
