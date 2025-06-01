'use client';

import Input from '@/components/common/input/input';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AssignmentNameInput({ value, onChange }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <div className="f20 font-bold text-text_primary">과제 이름</div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="과제 이름을 입력해주세요"
      />
    </div>
  );
}
