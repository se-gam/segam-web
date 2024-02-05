import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg' | 'full';
  accent: boolean;
}
export default function Button({
  children,
  onClick,
  size,
  accent = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'transition-opacity duration-200 active:opacity-80',
        {
          'f12 rounded bg-button_default_bg px-2 py-1.5 font-semibold':
            size === 'sm',
          'f14 rounded bg-button_default_bg px-3 py-1.5 font-semibold':
            size === 'md',
          'f14 rounded bg-button_default_bg px-4 py-1.5 font-semibold':
            size === 'lg',
          'f16 h-12 w-full rounded-md bg-theme_primary font-bold':
            size === 'full',
        },
        {
          'text-white': size === 'full',
          'text-text_primary': !accent,
          'text-theme_secondary': accent && size !== 'full',
        },
      )}
    >
      {children}
    </button>
  );
}
