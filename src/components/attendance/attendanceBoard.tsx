'use client';

import AssignmentList from '@/components/attendance/list/assignmentList';
import CourseList from '@/components/attendance/list/courseList';
import SubjectList from '@/components/attendance/list/subjectList';
import Tab from '@/components/common/tab/tab';
import { Course } from '@/lib/definitions';
import { useState } from 'react';

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
  const [index, setIndex] = useState<number>(TAB_OPTIONS[type][0].value);
  const lectures = courses.flatMap((course) => course.lectures);
  const assignments = courses.flatMap((course) => course.assignments);
  return (
    <div className="space-y-3">
      <Tab
        options={TAB_OPTIONS[type]}
        value={index}
        onChange={(value) => {
          setIndex(value);
        }}
      />
      {index === 0 && <CourseList courses={courses} />}
      {index === 1 && <SubjectList lectures={lectures} />}
      {index === 2 && <AssignmentList assignments={assignments} />}
    </div>
  );
}
