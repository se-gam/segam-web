'use client';

import { useState, ReactNode } from 'react';
import { Course } from '@/lib/definitions';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import AttendanceBoard from '@/components/attendance/attendanceBoard';
import PlusButton from '@/components/common/button/plusButton';

interface SubjectPageContentProps {
  course: Course;
  children: ReactNode;
}

export default function SubjectPageContent({ course, children }: SubjectPageContentProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const ASSIGNMENT_TAB_INDEX = 2;
  const isAssignmentTab = selectedIndex === ASSIGNMENT_TAB_INDEX;

  return (
    <>
      <StackHeader
        title={course.name}
        rightElement={
          <PlusButton route={`/assignment/add?courseId=${course.id}`} visible={isAssignmentTab} />
        }
      />
      <main className="flex h-full flex-col overflow-hidden bg-white py-2.5">
        {children}
        <AttendanceBoard type="subject" courses={[course]} onChangeTab={setSelectedIndex} />
      </main>
    </>
  );
}
