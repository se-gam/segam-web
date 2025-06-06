'use client';

import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import cn from '@/utils/cn';

interface CustomTimePickerProps {
  value?: Dayjs;
  onChange: (time: Dayjs | null) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
}

export default function CustomTimePicker({
  value,
  onChange,
  placeholder = '시간 선택',
  disabled = false,
  onFocus,
}: CustomTimePickerProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(value.format('HH:mm'));
    } else {
      setInputValue('');
    }
  }, [value]);

  const formatTimeInput = (input: string) => {
    const digits = input.replace(/[^0-9]/g, '');

    if (digits.length === 0) return '';
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;

    return `${digits.slice(-4, -2)}:${digits.slice(-2)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatTimeInput(rawValue);

    setInputValue(formatted);

    if (formatted.length === 5 && formatted.includes(':')) {
      const [hourStr, minuteStr] = formatted.split(':');
      let hour = parseInt(hourStr, 10);
      let minute = parseInt(minuteStr, 10);

      // 시간 보정
      if (hour > 23) hour = 23;
      if (minute > 59) minute = 59;

      const adjusted = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      if (adjusted !== formatted) {
        setInputValue(adjusted);
      }

      const newTime = dayjs().hour(hour).minute(minute);
      onChange(newTime);
    } else if (formatted.length === 0) {
      onChange(null);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    onFocus?.();
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onFocus={handleFocus}
      disabled={disabled}
      placeholder={placeholder}
      className={cn(
        'w-full rounded-md bg-button_default_bg px-3 py-2 text-left font-medium text-theme_accent outline-none',
        'f14 placeholder:font-medium placeholder:text-text_secondary',
        disabled && 'cursor-not-allowed opacity-50',
      )}
      maxLength={5}
      inputMode="numeric"
    />
  );
}
