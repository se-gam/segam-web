'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Option } from '@/lib/definitions';
import { createAssignment, updateAssignment, deleteAssignment } from '@/lib/actions/assignment';
import useModal from '@/hooks/useModal';
import dayjs, { Dayjs } from 'dayjs';

export type AssignmentPayload = {
  courseId: string;
  name: string;
  startsAt: string;
  endsAt: string;
};

interface UseAssignmentFormProps {
  courses: Option[];
  initialData?: AssignmentPayload & { assignmentId?: string };
  onSubmitSuccess?: () => void;
}

export default function useAssignmentForm({ courses, initialData }: UseAssignmentFormProps) {
  const router = useRouter();
  const { confirmModal } = useModal();
  const searchParams = useSearchParams();
  const courseIdFromQueryParam = searchParams.get('courseId');

  const defaultCourse =
    courses.find((course) => course.value === courseIdFromQueryParam) ||
    courses.find((course) => course.value === initialData?.courseId);

  const [selectedCourse, setSelectedCourse] = useState<Option | undefined>(defaultCourse);
  const [assignmentName, setAssignmentName] = useState(initialData?.name || '');
  const [range, setRange] = useState<{ start?: Dayjs; end?: Dayjs }>({
    start: initialData?.startsAt ? dayjs(initialData.startsAt) : undefined,
    end: initialData?.endsAt ? dayjs(initialData.endsAt) : undefined,
  });
  const [loading, setLoading] = useState(false);

  const isValid =
    !!selectedCourse && assignmentName.trim().length > 0 && !!range.start && !!range.end;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    const payload: AssignmentPayload = {
      courseId: String(selectedCourse!.value),
      name: assignmentName.trim(),
      startsAt: range.start!.second(0).toISOString(),
      endsAt: range.end!.second(59).toISOString(),
    };

    if (initialData?.assignmentId) {
      await updateAssignment(initialData.assignmentId, payload);
    } else {
      await createAssignment(payload);
    }

    setLoading(false);
    const fallbackPath = courseIdFromQueryParam
      ? `/stack/attendance/${courseIdFromQueryParam}?tab=2`
      : '/dashboard/attendance?tab=2';
    router.replace(fallbackPath);
  };

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = () => {
    if (!initialData?.assignmentId) return;
    const fallbackPath = courseIdFromQueryParam
      ? `/stack/attendance/${courseIdFromQueryParam}?tab=2`
      : '/dashboard/attendance?tab=2';

    confirmModal({
      title: '과제를 삭제할까요?',
      content: '다시 되돌릴 수 없어요',
      onClick: async () => {
        setDeleteLoading(true);
        await deleteAssignment(initialData.assignmentId!);
        router.replace(fallbackPath);
      },
    });
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
    handleDelete,
    courseIdFromQueryParam,
    deleteLoading,
  };
}
