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
    assignmentId?: string;
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
    handleDelete,
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
        {initialData?.assignmentId ? (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="full"
              label="삭제"
              className="flex-1 border border-error bg-white text-error"
              onClick={handleDelete}
            />
            <Button
              variant={isValid ? 'primary' : 'disabled'}
              size="full"
              label="완료"
              loading={loading}
              disabled={!isValid || loading}
              onClick={handleSubmit}
              className="flex-1"
            />
          </div>
        ) : (
          <Button
            variant={isValid ? 'primary' : 'disabled'}
            size="full"
            label="완료"
            loading={loading}
            disabled={!isValid || loading}
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
