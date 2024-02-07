'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import cn from '@/utils/cn';

interface ButtonProps {
  label: string;
  variant: 'default' | 'primary' | 'selected' | 'disabled';
  size: 'sm' | 'md' | 'lg' | 'full';
  className: string;
  onClick: () => void;
}

const ButtonVariants = cva(
  'transition-opacity duration-200 active:opacity-80',
  {
    variants: {
      variant: {
        default: 'bg-button_default_bg text-text_primary',
        primary: 'bg-theme_primary text-white',
        selected: 'bg-button_default_bg text-theme_secondary',
        disabled: ' bg-button_default_bg text-theme_tertiary',
      },
      size: {
        sm: 'f12 rounded px-2 py-1.5 font-semibold',
        md: 'f14 rounded px-3 py-1.5 font-semibold',
        lg: 'f14 rounded px-4 py-1.5 font-semibold',
        full: 'f16 h-12 w-full rounded-md font-bold',
      },
    },
  },
);

export default function Button({
  label,
  variant,
  size,
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        ButtonVariants({
          size,
          variant,
        }),
        className,
      )}
    >
      {label}
    </button>
  );
}
