import clsx from 'clsx';
import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size: 'sm' | 'md';
}

export default function Tag({
  children,
  size,
  className = 'bg-button_default_bg text-text_primary',
}: TagProps) {
  return (
    <span
      className={clsx(
        'rounded font-semibold',
        {
          'f12 px-2 py-1': size === 'sm',
          'f14 px-3 py-1': size === 'md',
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
