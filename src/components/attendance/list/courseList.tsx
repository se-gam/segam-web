'use client';

import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import useLink from '@/hooks/useLink';
import Icons from '@/components/common/icons/icons';
import React from 'react';
import { Course } from '@/lib/definitions';
import { dateDiffInDays } from '@/utils/format';

interface CourseListProps {
  courses: Course[];
}
export default function CourseList({ courses }: CourseListProps) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const { navigateTo } = useLink();
  if (courses.length === 0)
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg px-4">
        <p className="f16 font-medium text-text_secondary">수강중인 강의가 없어요</p>
      </div>
    );
  return (
    <div className="h-full space-y-1 overflow-scroll px-4">
      {courses.map((course) => {
        const lectureDone = course.lecturesLeft <= 0;
        const assignmentDone = course.assignmentsLeft <= 0;
        const isDone = lectureDone && assignmentDone;
        const nextLectureText = course.nextLectureDate
          ? dateDiffInDays(course.nextLectureDate)
          : '모든 강의를 완료했어요';
        return (
          <button
            key={course.id}
            type="button"
            aria-label="go to detail"
            onClick={() => {
              trackAmplitudeEvent('click_이러닝_개별과목_list');
              navigateTo({
                page: `attendance/${course.id}`,
                title: course.name,
              });
            }}
            className="flex w-full flex-nowrap items-center justify-between gap-9 rounded pr-1.5 text-left transition-transform active:scale-[0.98] active:bg-app_bg"
          >
            <ClassCard
              title={course.name}
              description={
                isDone
                  ? nextLectureText
                  : `남은 강의 ${course.lecturesLeft}개 · 남은 과제 ${course.assignmentsLeft}개`
              }
              tag={
                <Tag
                  label={isDone ? '완료' : `${course.lecturesLeft + course.assignmentsLeft}개 남음`}
                  variant={isDone ? 'done' : 'warning'}
                  size="sm"
                />
              }
            />
            <Icons.ArrowRight className="fill-theme_tertiary" width="1rem" height="1rem" />
          </button>
        );
      })}
    </div>
  );
}
