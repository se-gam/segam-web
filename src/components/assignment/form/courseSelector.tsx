'use client';

import InfoSelector from '@/components/classic/infoSelector';
import { Option } from '@/lib/definitions';

interface Props {
  courses: Option[];
  selectedCourse?: Option;
  onSelect: (option?: Option) => void;
  disabled?: boolean;
}

export default function CourseSelector({ courses, selectedCourse, onSelect, disabled }: Props) {
  return (
    <InfoSelector
      type="assignment"
      data={courses}
      value={selectedCourse}
      onChange={onSelect}
      title="과목 선택하기"
      placeholder="과목을 선택해주세요"
      titleClassName="f20 font-bold"
      selectedClassName="text-theme_accent"
      disabled={disabled || courses.length === 0}
    />
  );
}
