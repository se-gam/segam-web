'use client';

import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

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

      // 시간 아닌 입력값 보정하기
      if (hour > 23) hour = 23;
      if (minute > 59) minute = 59;

      const adjustedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      if (adjustedTime !== formatted) {
        setInputValue(adjustedTime);
      }

      const newTime = dayjs().hour(hour).minute(minute);
      onChange(newTime);
    } else if (formatted.length === 0) {
      onChange(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 백스페이스랑 삭제, 탭, 화살표 키는 입력되고
    if ([8, 9, 37, 38, 39, 40, 46].includes(e.keyCode)) {
      return;
    }
    // 숫자키(0-9) 입력되도록
    if (!(e.keyCode >= 48 && e.keyCode <= 57) && !(e.keyCode >= 96 && e.keyCode <= 105)) {
      e.preventDefault();
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
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={disabled}
      placeholder={placeholder}
      className={`
        w-full rounded-md bg-button_default_bg px-3 py-2
        text-center font-medium text-theme_accent outline-none
        placeholder:text-text_secondary
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
      maxLength={5}
      inputMode="numeric"
    />
  );
}
