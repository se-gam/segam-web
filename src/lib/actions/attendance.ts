'use server';

import { cookies } from 'next/headers';
import { CourseAttendance } from '@/lib/definitions';
import fetchExtended from '@/utils/fetchExtended';
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
  })
    .then((response) => response.body)
    .catch(() => {
      throw new Error('출석 데이터 조회에 실패했습니다. 다시 시도해주세요.');
    });
  return {
    courses: data.courses ?? [],
    totalJobs: data.totalJobs ?? 0,
    imminentDueDate: data.imminentDueDate,
    imminentCourseName: data.imminentCourseName,
    imminentCourseId: data.imminentCourseId,
    nextLectureDate: data.nextLectureDate,
    nextLectureCourseName: data.nextLectureCourseName,
    nextLectureCourseId: data.nextLectureCourseId,
    imminentLecturesLeft: data.imminentLecturesLeft,
    imminentAssignmentsLeft: data.imminentAssignmentsLeft,
  };
}
export async function updateCourseAttendance(): Promise<void> {
  const password = cookies().get('encrypted')?.value;

  await fetchExtended<CourseAttendance>('/v1/attendance/update', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
    method: 'POST',
    body: {
      password,
    },
  })
    .then((response) => response.body)
    .catch(() => {
      throw new Error('출석 업데이트에 실패했습니다. 다시 시도해주세요.');
    });
  revalidateTag('courseAttendance');
}
