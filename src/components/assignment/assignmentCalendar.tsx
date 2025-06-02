'use client';

import { Modal, Calendar, ConfigProvider } from 'antd';
import { useState } from 'react';
import { CalendarProps } from 'antd/lib';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/ko_KR';
import Icons from '@/components/common/icons/icons';
import Button from '@/components/common/button/button';
import cn from '@/utils/cn';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface DateRange {
  start?: Dayjs;
  end?: Dayjs;
}

interface AssignmentCalendarProps {
  open: boolean;
  onClose: () => void;
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function AssignmentCalendar({
  open,
  onClose,
  value,
  onChange,
}: AssignmentCalendarProps) {
  const [range, setRange] = useState<DateRange>(value || {});
  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());

  const handleDateClick = (date: Dayjs) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: undefined });
    } else if (date.isBefore(range.start, 'day')) {
      setRange({ start: date, end: range.start });
    } else {
      setRange({ start: range.start, end: date });
    }
  };

  const headerRender: CalendarProps<Dayjs>['headerRender'] = ({
    value: headerValue,
    onChange: onHeaderChange,
  }) => {
    const year = headerValue.year();
    const month = headerValue.month();
    const isCurrentMonth = headerValue.isSame(dayjs(), 'month');

    const handlePrevMonth = () => {
      if (isCurrentMonth) return;
      const newDate = headerValue.subtract(1, 'month');
      onHeaderChange(newDate);
      setCalendarValue(newDate);
    };

    const handleNextMonth = () => {
      const newDate = headerValue.add(1, 'month');
      onHeaderChange(newDate);
      setCalendarValue(newDate);
    };

    return (
      <div className="mb-9 mt-4 flex items-center justify-between">
        <div className="f20 font-bold text-text_primary">{`${year}년 ${month + 1}월`}</div>
        <div className="flex gap-3">
          <Icons.ArrowLeftSM
            width="20"
            height="20"
            onClick={isCurrentMonth ? undefined : handlePrevMonth}
            className={cn(
              isCurrentMonth
                ? 'fill-text_secondary stroke-text_secondary'
                : 'fill-theme_primary stroke-theme_primary',
            )}
          />
          <Icons.ArrowRightSM
            width="20"
            height="20"
            onClick={handleNextMonth}
            className="fill-theme_primary stroke-theme_primary"
          />
        </div>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (
    date: Dayjs,
    info: CellRenderInfo<Dayjs>,
  ) => {
    if (info.type !== 'date') return null;

    const isCurrentMonth =
      date.year() === calendarValue.year() && date.month() === calendarValue.month();
    if (!isCurrentMonth) return null;

    const isStart = range.start?.isSame(date, 'day');
    const isEnd = range.end?.isSame(date, 'day');
    const isInRange =
      range.start &&
      range.end &&
      date.isAfter(range.start, 'day') &&
      date.isBefore(range.end, 'day');
    const isSelected = isStart || isEnd || isInRange;
    const isPastDate = date.isBefore(dayjs(), 'day');

    return (
      <button
        className={`
        relative flex items-center justify-center
        ${isSelected ? 'bg-theme_primary' : ''}
        ${isStart ? 'rounded-l-md' : ''}
        ${isEnd ? 'rounded-r-md' : ''}
        ${isStart && isEnd ? 'rounded-md' : ''}
        ${isPastDate ? 'opacity-50' : ''}
      `}
        onClick={() => handleDateClick(date)}
      >
        <div
          className={`
          relative z-10 flex h-[42px] w-[42px] items-center justify-center
          ${isSelected ? 'text-white' : 'text-text_primary'}
        `}
        >
          {date.date()}
        </div>
      </button>
    );
  };

  const formatDate = (date?: Dayjs, isStart?: boolean) => {
    if (date) {
      return `(${date.date()}일) ${isStart ? '00시 00분' : '23시 59분'}`;
    }
    return isStart ? '시작일 선택' : '마감일 선택';
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={true}
      width={358}
      centered
      title={<div className="f20 font-bold text-text_primary">과제 기간</div>}
    >
      <div>
        <ConfigProvider locale={locale}>
          <Calendar
            value={calendarValue}
            fullscreen={false}
            headerRender={headerRender}
            disabledDate={(current) =>
              current.month() !== calendarValue.month() || current.year() !== calendarValue.year()
            }
            fullCellRender={cellRender}
          />
        </ConfigProvider>

        <div className="mt-6 flex justify-between">
          <div>
            <div className="f16 mb-2 font-semibold text-text_primary">시작 시간</div>
            <div className="f14 w-[151px] rounded-md bg-button_default_bg px-3 py-2 font-medium text-theme_accent">
              {formatDate(range.start, true)}
            </div>
          </div>
          <div>
            <div className="f16 mb-2 font-semibold text-text_primary">마감 시간</div>
            <div className="f14 w-[151px] rounded-md bg-button_default_bg px-3 py-2 font-medium text-theme_accent">
              {formatDate(range.end, false)}
            </div>
          </div>
        </div>

        <Button
          variant={range.start && range.end ? 'primary' : 'disabled'}
          size="full"
          className="mt-6"
          onClick={() => {
            if (range.start && range.end) onChange(range);
          }}
          disabled={!range.start || !range.end}
        >
          완료
        </Button>
      </div>
    </Modal>
  );
}
