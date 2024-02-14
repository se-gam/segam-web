'use client';

import ClassList from '@/components/attendance/list/classList';
import SubjectList from '@/components/attendance/list/subjectList';
import Tab from '@/components/common/tab/tab';
import { useState } from 'react';

const options = {
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
}

export default function AttendanceBoard({ type }: AttendanceBoardProps) {
  const [index, setIndex] = useState<number>(options[type][0].value);
  return (
    <div className="space-y-3">
      <Tab
        options={options[type]}
        value={index}
        onChange={(value) => {
          setIndex(value);
        }}
      />
      {index === 0 && <ClassList />}
      {index === 1 && <SubjectList />}
      {index === 2 && <p>3</p>}
    </div>
  );
}
