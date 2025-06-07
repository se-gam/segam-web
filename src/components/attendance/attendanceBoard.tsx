'use client';

import { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import CourseList from '@/components/attendance/list/courseList';
import Tab from '@/components/common/tab/tab';
import ClassList from '@/components/attendance/list/classList';
import getSortedClassData from '@/utils/getSortedCourseData';
import { Course } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';
import { useSearchParams } from 'next/navigation';

const TAB_OPTIONS = {
  dashboard: [
    { label: '과목별', value: 0 },
    { label: '강의별', value: 1 },
    { label: '과제별', value: 2 },
  ],
  subject: [
    { label: '강의별', value: 1 },
    { label: '과제별', value: 2 },
  ],
};

interface AttendanceBoardProps {
  type: 'dashboard' | 'subject';
  courses: Course[];
  onChangeTab?: (value: number) => void;
}

export default function AttendanceBoard({ type, courses, onChangeTab }: AttendanceBoardProps) {
  const { trackAmplitudeEvent } = useAmplitudeContext();

  const searchParams = useSearchParams();
  const tabParam = parseInt(searchParams.get('tab') || '', 10);
  const validTabValues = TAB_OPTIONS[type].map((option) => option.value);
  const defaultTab = validTabValues.includes(tabParam) ? tabParam : TAB_OPTIONS[type][0].value;
  const [index, setIndex] = useState<number>(defaultTab);

  const lectures = courses.flatMap((course) => course.lectures);
  const assignments = courses.flatMap((course) => course.assignments);
  const { classData: sortedLectures, latestUpdatedAt: latestLectureUpdate } =
    getSortedClassData(lectures);
  const { classData: sortedAssignments, latestUpdatedAt: latestAssignmentsUpdate } =
    getSortedClassData(assignments);

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <Tab
        options={TAB_OPTIONS[type]}
        value={index}
        onChange={(value) => {
          trackAmplitudeEvent(`click_이러닝_${TAB_OPTIONS[type][value].label}_btn`);
          setIndex(value);
          onChangeTab?.(value);
        }}
      />
      <div className="f12 flex flex-col px-[1.375rem] font-light text-text_secondary">
        <p>
          강의 마지막 업데이트:{' '}
          {latestLectureUpdate ? dateDotFormatter(latestLectureUpdate) : '남은 강의 없음'}
        </p>
        <p>
          과제 마지막 업데이트:{' '}
          {latestAssignmentsUpdate ? dateDotFormatter(latestAssignmentsUpdate) : '남은 과제 없음'}
        </p>
      </div>
      <div className="flex flex-col overflow-hidden">
        {index === 0 && <CourseList courses={courses} />}
        {index === 1 && <ClassList items={sortedLectures} type="lecture" />}
        {index === 2 && <ClassList items={sortedAssignments} type="assignment" />}
      </div>
    </div>
  );
}
