'use client';

import { Calendar, ConfigProvider, Select } from 'antd';
import locale from 'antd/locale/ko_KR';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';

import Icons from '@/components/common/icons/icons';
import cn from '@/utils/cn';
import { CalendarProps } from 'antd/lib';
import type { CellRenderInfo } from 'rc-picker/lib/interface';

dayjs.locale('ko');

const headerRender: CalendarProps<Dayjs>['headerRender'] = ({ value, onChange }) => {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  let current = value.clone();
  const months = [];
  for (let i = start; i < end; i += 1) {
    current = current.month(i);
    months.push(current.format('MMMM'));
  }

  for (let i = start; i < end; i += 1) {
    monthOptions.push(
      <Select.Option key={i} value={i} className="month-item">
        {months[i]}
      </Select.Option>,
    );
  }

  const year = value.year();
  const month = value.month();

  const handlePrevMonth = () => {
    onChange(value.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    onChange(value.add(1, 'month'));
  };

  const disablePrev = value <= dayjs();
  const disableNext = value >= dayjs();

  return (
    <div className="flex items-center justify-between">
      <div className="f20 mb-2 mt-3 font-bold text-text_primary">{`${year}년 ${months[month]}`}</div>
      <div className="flex">
        <Icons.ArrowLeftSM
          width="20px"
          height="20px"
          onClick={!disablePrev ? handlePrevMonth : undefined}
          className={cn({
            'fill-text_secondary': disablePrev,
            'fill-theme_primary': !disablePrev,
          })}
        />
        <Icons.ArrowRight
          width="20px"
          height="20px"
          onClick={!disableNext ? handleNextMonth : undefined}
          className={cn({
            'fill-text_secondary': disableNext,
            'fill-theme_primary': !disableNext,
          })}
        />
      </div>
    </div>
  );
};

export default function GtCalender() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (
    date: Dayjs,
    info: CellRenderInfo<Dayjs>,
  ) => {
    if (info.type === 'date') {
      const isCurrentMonth =
        date.year() === currentMonth.year() && date.month() === currentMonth.month();
      if (!isCurrentMonth) {
        return null;
      }

      const isSelected = date.isSame(selectedDate, 'day');

      return (
        <div
          className={cn('flex h-full w-full items-center justify-center rounded-md', {
            'bg-theme_primary': isSelected,
            'text-white': isSelected,
          })}
        >
          {date.date()}
        </div>
      );
    }
    return null;
  };

  const onDateSelect = (newDate: Dayjs) => {
    setSelectedDate(newDate);
    setCurrentMonth(newDate);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setCurrentMonth(newValue);
  };

  return (
    <ConfigProvider locale={locale}>
      <Calendar
        fullCellRender={cellRender}
        fullscreen={false}
        headerRender={headerRender}
        value={selectedDate}
        onSelect={onDateSelect}
        onPanelChange={onPanelChange}
        disabledDate={(date) => date.isBefore(dayjs(), 'day')}
      />
    </ConfigProvider>
  );
}
