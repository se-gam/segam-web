'use client';

import { useState } from 'react';
import useAmplitudeContext from '@/hooks/useAmplitudeContext';
import CourseList from '@/components/attendance/list/courseList';
import Tab from '@/components/common/tab/tab';
import ClassList from '@/components/attendance/list/classList';
import { Course } from '@/lib/definitions';
import getSortedClassData from '@/utils/getSortedCourseData';

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
}

export default function AttendanceBoard({ type, courses }: AttendanceBoardProps) {
  const { trackAmplitudeEvent } = useAmplitudeContext();
  const [index, setIndex] = useState<number>(TAB_OPTIONS[type][0].value);
  const lectures = courses.flatMap((course) => course.lectures);
  const assignments = courses.flatMap((course) => course.assignments);
  const sortedLectures = getSortedClassData(lectures);
  const sortedAssignments = getSortedClassData(assignments);
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <Tab
        options={TAB_OPTIONS[type]}
        value={index}
        onChange={(value) => {
          trackAmplitudeEvent(`click_이러닝_${value}_btn`);
          setIndex(value);
        }}
      />
      <div className="flex flex-col overflow-hidden">
        {index === 0 && <CourseList courses={courses} />}
        {index === 1 && <ClassList items={sortedLectures} type="lecture" />}
        {index === 2 && <ClassList items={sortedAssignments} type="assignment" />}
      </div>
    </div>
  );
}
