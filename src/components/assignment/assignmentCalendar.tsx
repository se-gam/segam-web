'use client';

import { Calendar, ConfigProvider } from 'antd';
import { useState } from 'react';
import { CalendarProps } from 'antd/lib';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import dayjs, { Dayjs } from 'dayjs';
import locale from 'antd/locale/ko_KR';
import Icons from '@/components/common/icons/icons';
import Button from '@/components/common/button/button';
import cn from '@/utils/cn';
import CustomTimePicker from '@/components/assignment/timePicker';
import 'dayjs/locale/ko';
import { Drawer, DrawerContent, DrawerClose } from '@/components/common/drawer';

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
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().hour(0).minute(0));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().hour(23).minute(59));

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
        className={cn(
          'relative m-0 flex h-full w-full items-center justify-center p-0',
          isSelected && 'bg-theme_primary',
          isStart && 'rounded-l-md',
          isEnd && 'rounded-r-md',
          isStart && isEnd && 'rounded-md',
          isPastDate && 'opacity-50',
        )}
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

  return open ? (
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent>
        <div className="px-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="f20 font-bold text-text_primary">과제 기간</h3>
            <DrawerClose asChild>
              <Icons.Close width="24px" height="24px" className="stroke-theme_tertiary" />
            </DrawerClose>
          </div>
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

          <div className="mt-2 flex justify-between gap-4">
            <div className="flex-1">
              <div className="f16 mb-2 font-semibold text-text_primary">시작 시간</div>
              <CustomTimePicker
                value={startTime ?? undefined}
                onChange={setStartTime}
                placeholder="00:00"
                disabled={!range.start}
              />
            </div>
            <div className="flex-1">
              <div className="f16 mb-2 font-semibold text-text_primary">마감 시간</div>
              <CustomTimePicker
                value={endTime ?? undefined}
                onChange={setEndTime}
                placeholder="23:59"
                disabled={!range.end}
              />
            </div>
          </div>

          <Button
            variant={range.start && range.end ? 'primary' : 'disabled'}
            size="full"
            className="mb-6 mt-6 px-4"
            onClick={() => {
              if (range.start && range.end && startTime && endTime) {
                const fullRange = {
                  start: range.start.hour(startTime.hour()).minute(startTime.minute()),
                  end: range.end.hour(endTime.hour()).minute(endTime.minute()),
                };
                onChange(fullRange);
              }
            }}
            disabled={!range.start || !range.end}
          >
            완료
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ) : null;
}
