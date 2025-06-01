'use client';

import { useState } from 'react';
import { Option } from '@/lib/definitions';
import CourseSelector from '@/components/assignment/form/courseSelector';
import AssignmentNameInput from '@/components/assignment/form/assignmentNameInput';
import DateSection from '@/components/assignment/form/dateSection';
import Button from '@/components/common/button/button';

interface Props {
  courses: Option[];
}

export default function AddAssignmentForm({ courses }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<Option | undefined>(undefined);
  const [assignmentName, setAssignmentName] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = !!selectedCourse && assignmentName.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      // 과제 제출 로직
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          onSelect={setSelectedCourse}
        />
        <AssignmentNameInput value={assignmentName} onChange={setAssignmentName} />
        <DateSection />
      </div>
      <div className="pb-4 pt-6">
        <Button
          variant={isValid ? 'primary' : 'disabled'}
          size="full"
          label={loading ? '저장 중...' : '완료'}
          loading={loading}
          disabled={!isValid || loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
