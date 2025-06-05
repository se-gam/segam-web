import { useState, useEffect } from 'react';
import { Option } from '@/lib/definitions';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { createAssignment, updateAssignment } from '@/lib/actions/assignment';

interface UseAssignmentFormProps {
  courses: Option[];
  initialData?: {
    courseId: string;
    name: string;
    startsAt: string;
    endsAt: string;
  };
  onSubmitSuccess?: () => void;
}

export default function useAssignmentForm({
  courses,
  initialData,
  onSubmitSuccess,
}: UseAssignmentFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIdFromQueryParam = searchParams.get('courseId');
  const defaultCourse =
    courses.find((course) => course.value === courseIdFromQueryParam) ||
    courses.find((course) => course.value === initialData?.courseId);

  const [selectedCourse, setSelectedCourse] = useState<Option | undefined>(defaultCourse);
  const [assignmentName, setAssignmentName] = useState(initialData?.name || '');
  const [range, setRange] = useState<{ start?: Dayjs; end?: Dayjs }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setSelectedCourse(courses.find((course) => course.value === initialData.courseId));
      setAssignmentName(initialData.name);
      setRange({
        start: initialData.startsAt ? dayjs(initialData.startsAt) : undefined,
        end: initialData.endsAt ? dayjs(initialData.endsAt) : undefined,
      });
    }
  }, [initialData, courses]);

  const isValid =
    !!selectedCourse && assignmentName.trim().length > 0 && !!range.start && !!range.end;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    const payload = {
      courseId: String(selectedCourse.value),
      name: assignmentName.trim(),
      startsAt: range.start!.second(0).toISOString(),
      endsAt: range.end!.second(59).toISOString(),
    };
    if (initialData) {
      await updateAssignment(initialData.courseId, payload);
    } else {
      await createAssignment(payload);
    }
    setLoading(false);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    } else {
      router.back();
    }
  };

  return {
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
  };
}
