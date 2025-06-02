'use client';

import { useState } from 'react';
import AssignmentCalendar from '@/components/assignment/assignmentCalendar';
import { Dayjs } from 'dayjs';

interface DateSectionProps {
  value?: { start?: Dayjs; end?: Dayjs };
  onChange?: (range: { start?: Dayjs; end?: Dayjs }) => void;
}

export default function DateSection({ value, onChange }: DateSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const range = value || {};

  const formatDate = (date?: Dayjs, isStart?: boolean) => {
    if (date) {
      return `${date.format('YYYY년 M월 D일(dd)')} ${isStart ? '00시 00분' : '23시 59분'}`;
    }
    if (isStart) return '시작일 선택해주세요';
    return '마감일 선택해주세요';
  };

  return (
    <div className="flex flex-col">
      <div className="f20 font-bold text-text_primary">과제 기간</div>
      <p className="f14 font-medium text-text_secondary">시작일부터 마감일을 선택해 주세요</p>

      <div className="mt-4">
        <p className="f16 font-semibold text-text_primary">시작일</p>
        <button
          className={`f14 mt-3 h-[40px] w-full rounded-sm bg-button_default_bg p-2.5 text-left font-medium ${
            range.start ? 'text-theme_accent' : 'text-text_secondary'
          }`}
          onClick={() => setModalOpen(true)}
        >
          {formatDate(range.start, true)}
        </button>
      </div>

      <div className="mt-3">
        <p className="f16 font-semibold text-text_primary">마감일</p>
        <button
          className={`f14 mt-3 h-[40px] w-full rounded-sm bg-button_default_bg p-2.5 text-left font-medium ${
            range.end ? 'text-theme_accent' : 'text-text_secondary'
          }`}
          onClick={() => setModalOpen(true)}
        >
          {formatDate(range.end, false)}
        </button>
      </div>
      {modalOpen && (
        <AssignmentCalendar
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          value={range}
          onChange={(newRange: { start?: Dayjs; end?: Dayjs }) => {
            onChange?.(newRange);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
