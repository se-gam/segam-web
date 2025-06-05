'use client';

import { Option } from '@/lib/definitions';
import CourseSelector from '@/components/assignment/form/courseSelector';
import AssignmentNameInput from '@/components/assignment/form/assignmentNameInput';
import DateSection from '@/components/assignment/form/dateSection';
import Button from '@/components/common/button/button';
import useAssignmentForm from '@/hooks/useAssignmentForm';

interface AssignmentFormProps {
  courses: Option[];
  initialData?: {
    courseId: string;
    name: string;
    startsAt: string;
    endsAt: string;
  };
  onSubmitSuccess?: () => void;
}

export default function AssignmentForm({
  courses,
  initialData,
  onSubmitSuccess,
}: AssignmentFormProps) {
  const {
    selectedCourse,
    setSelectedCourse,
    assignmentName,
    setAssignmentName,
    range,
    setRange,
    loading,
    isValid,
    handleSubmit,
    courseIdFromQueryParam,
  } = useAssignmentForm({ courses, initialData, onSubmitSuccess });

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <CourseSelector
          courses={courses}
          selectedCourse={selectedCourse}
          onSelect={setSelectedCourse}
          disabled={!!courseIdFromQueryParam}
        />
        <AssignmentNameInput value={assignmentName} onChange={setAssignmentName} />
        <DateSection value={range} onChange={setRange} />
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
