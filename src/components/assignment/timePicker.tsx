'use client';

import { TimePicker, ConfigProvider } from 'antd';
import type { Dayjs } from 'dayjs';
import koKR from 'antd/locale/ko_KR';
import 'dayjs/locale/ko';

interface CustomTimePickerProps {
  value?: Dayjs;
  onChange: (time: Dayjs | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function CustomTimePicker({
  value,
  onChange,
  placeholder = '시간 선택',
  disabled = false,
}: CustomTimePickerProps) {
  return (
    <ConfigProvider locale={koKR}>
      <TimePicker
        value={value}
        onChange={onChange}
        format="HH:mm"
        placeholder={placeholder}
        minuteStep={5}
        allowClear={false}
        disabled={disabled}
        className="w-full"
      />
    </ConfigProvider>
  );
}
