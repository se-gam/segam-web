'use server';

import { cookies } from 'next/headers';
import { CourseAttendance, Restaurants } from '@/lib/definitions';
import { fetchExtended, retryFetchExtended } from '@/utils/fetchExtended';
import { revalidateTag } from 'next/cache';

export async function getCourseAttendance(): Promise<CourseAttendance> {
  const data = await fetchExtended<CourseAttendance>('/v1/attendance/course', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
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
export async function updateCourseAttendance(): Promise<void> {
  const password = cookies().get('encrypted')?.value;
  await retryFetchExtended<CourseAttendance>('/v1/attendance/update', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    method: 'POST',
    body: {
      password,
    },
  });
  revalidateTag('courseAttendance');
}

export async function getRestaurants(): Promise<Restaurants> {
  const data = await fetchExtended<Restaurants>('/v1/restaurant').then((response) => response.body);
  return data;
}
