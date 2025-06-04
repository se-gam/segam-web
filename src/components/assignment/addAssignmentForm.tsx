'use client';

import { useState } from 'react';
import { Option } from '@/lib/definitions';
import { Dayjs } from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';
import CourseSelector from '@/components/assignment/form/courseSelector';
import AssignmentNameInput from '@/components/assignment/form/assignmentNameInput';
import DateSection from '@/components/assignment/form/dateSection';
import Button from '@/components/common/button/button';
import { createAssignment } from '@/lib/actions/assignment';

interface Props {
  courses: Option[];
}

export default function AddAssignmentForm({ courses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIdFromQueryParam = searchParams.get('courseId');
  const defaultCourse = courses.find((course) => course.value === courseIdFromQueryParam);
  const [selectedCourse, setSelectedCourse] = useState<Option | undefined>(defaultCourse);
  const [assignmentName, setAssignmentName] = useState('');
  const [range, setRange] = useState<{ start?: Dayjs; end?: Dayjs }>({});
  const [loading, setLoading] = useState(false);

  const isValid =
    !!selectedCourse && assignmentName.trim().length > 0 && !!range.start && !!range.end;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    await createAssignment({
      courseId: String(selectedCourse.value),
      name: assignmentName.trim(),
      startsAt: range.start!.second(0).toISOString(),
      endsAt: range.end!.second(59).toISOString(),
    });
    setLoading(false);
    router.back();
  };

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
