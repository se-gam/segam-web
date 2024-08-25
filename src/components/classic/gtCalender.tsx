'use client';

import { Calendar, ConfigProvider, Select } from 'antd';
import { HeaderRender } from 'antd/es/calendar/generateCalendar';
import { createStyles } from 'antd-style';
import locale from 'antd/locale/ko_KR';
import dayjs from 'dayjs';

import 'dayjs/locale/ko';
import { useState } from 'react';
import cn from '@/utils/cn';
import Icons from '../common/icons/icons';

dayjs.locale('ko');

const useStyles = createStyles(({ css }) => ({
  calender: css`
    .ant-picker-panel {
      border: none !important;
    }
    .ant-picker-content thead tr th {
      font-size: 12px !important;
      font-weight: 400 !important;
      font-style: normal !important;
      color: #979799 !important;
      font-color: #979799 !important;
    }
    .ant-picker-content tbody tr td {
      vertical-align: middle !important;
      text-align: -webkit-center !important;
    }
    .ant-picker-content tbody tr td div {
      width: 42px !important;
      height: 42px !important;
    }
    .ant-picker-cell {
      padding: 0px !important;
      font-size: 20px;
    }
    .ant-typography {
      margin-bottom: 0px;
    }
  `,
}));

function headerRender({ value, onChange }: HeaderRender) {
  const start = 0;
  const end = 12;
  const monthOptions = [];

  let current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i += 1) {
    current = current.month(i);
    months.push(localeData.monthsShort(current));
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

  return (
    <div className="flex items-center justify-between">
      <div className="f20 mb-2 mt-3 font-bold text-text_primary">{`${year}년 ${months[month]}`}</div>
      <div className="flex">
        <Icons.ArrowLeft width="20px" height="20px" onClick={handlePrevMonth} />
        <Icons.ArrowRight width="20px" height="20px" onClick={handleNextMonth} />
      </div>
    </div>
  );
}

export default function GtCalender() {
  const { styles } = useStyles();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const cellRender = (currentDate: Dayjs, info: { type: 'date' | 'month' | 'year' }) => {
    if (info.type === 'date') {
      const isCurrentMonth =
        currentDate.year() === currentMonth.year() && currentDate.month() === currentMonth.month();
      if (!isCurrentMonth) {
        return null;
      }

      const isSelected = currentDate.isSame(selectedDate, 'day');

      return (
        <div
          className={cn('flex h-full w-full items-center justify-center rounded-md', {
            'bg-theme_primary': isSelected,
            'text-white': isSelected,
          })}
        >
          {currentDate.date()}
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
        className={styles.calender}
        // @ts-ignore
        fullCellRender={cellRender}
        fullscreen={false}
        headerRender={headerRender}
        value={selectedDate}
        onSelect={onDateSelect}
        onPanelChange={onPanelChange}
      />
    </ConfigProvider>
  );
}
