'use client';

import { useState, useRef, useEffect } from 'react';
import AssignmentCalendar from '@/components/assignment/assignmentCalendar';
import CustomTimePicker from '@/components/assignment/timePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateSectionProps {
  value?: { start?: Dayjs; end?: Dayjs };
  onChange?: (range: { start?: Dayjs; end?: Dayjs }) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

export default function DateSection({ value, onChange, scrollContainerRef }: DateSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [endTime, setEndTime] = useState<Dayjs | null>(
    value?.end ? dayjs(value.end) : dayjs().hour(23).minute(59),
  );

  const range = value || {};

  const timeRef = useRef<HTMLDivElement>(null);

  const [startLabel, setStartLabel] = useState('날짜를 선택해주세요');
  const [endLabel, setEndLabel] = useState('날짜를 선택해주세요');

  useEffect(() => {
    if (range.start) {
      setStartLabel(range.start.format('YYYY년 M월 D일 (dd)'));
    } else {
      setStartLabel('날짜를 선택해주세요');
    }

    if (range.end) {
      setEndLabel(range.end.format('YYYY년 M월 D일 (dd)'));
    } else {
      setEndLabel('날짜를 선택해주세요');
    }
  }, [range.start, range.end]);

  const handleTimeChange = (time: Dayjs | null) => {
    setEndTime(time);

    if (range.end && time) {
      const updatedRange = {
        ...range,
        end: range.end.hour(time.hour()).minute(time.minute()),
      };
      onChange?.(updatedRange);
    }
  };

  const handleDateChange = (newRange: { start?: Dayjs; end?: Dayjs }) => {
    if (newRange.end && endTime) {
      const updatedRange = {
        ...newRange,
        end: newRange.end.hour(endTime.hour()).minute(endTime.minute()),
      };
      onChange?.(updatedRange);
    } else {
      onChange?.(newRange);
    }
    setModalOpen(false);
  };

  const handleTimeFocus = () => {
    setTimeout(() => {
      scrollContainerRef?.current?.scrollTo({
        top: timeRef.current?.offsetTop ?? 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  return (
    <div className="ref={divRef} flex flex-col">
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
          {startLabel}
        </button>
      </div>

      <div className="mt-4">
        <p className="f16 font-semibold text-text_primary">마감일</p>
        <button
          className={`f14 mt-3 h-[40px] w-full rounded-sm bg-button_default_bg p-2.5 text-left font-medium ${
            range.end ? 'text-theme_accent' : 'text-text_secondary'
          }`}
          onClick={() => setModalOpen(true)}
        >
          {endLabel}
        </button>
      </div>

      <div className="mt-4" ref={timeRef}>
        <p className="f16 font-semibold text-text_primary">마감 시간</p>
        <div className="mt-3">
          <CustomTimePicker
            value={endTime ?? undefined}
            onChange={handleTimeChange}
            placeholder="23:59"
            disabled={!range.end}
            onFocus={handleTimeFocus}
          />
        </div>
      </div>

      {modalOpen && (
        <AssignmentCalendar
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          value={range}
          onChange={handleDateChange}
        />
      )}
    </div>
  );
}
