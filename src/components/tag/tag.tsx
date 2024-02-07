import cn from '@/utils/cn';
import { cva } from 'class-variance-authority';

interface TagProps {
  label: string;
  size: 'sm' | 'md';
  variant: 'default' | 'done' | 'warning' | 'orange' | 'yellow' | 'danger';
  className: string;
}

const TagVariants = cva('px-2 py-1 font-semibold rounded', {
  variants: {
    variant: {
      default: 'bg-button_default_bg text-text_primary',
      done: 'bg-tag_blue_bg text-tag_blue_text',
      warning: 'bg-tag_red_bg text-tag_red_text',
      orange: 'bg-tag_orange_bg text-tag_orange_text',
      yellow: 'bg-tag_yellow_bg text-tag_yellow_text',
      danger: 'bg-button_default_bg text-error',
    },
    size: {
      sm: 'f12',
      md: 'f14',
    },
  },
});

export default function Tag({
  label,
  variant = 'default',
  size,
  className = '',
}: TagProps) {
  return (
    <span
      className={cn(
        TagVariants({
          variant,
          size,
        }),
        className,
      )}
    >
      {label}
    </span>
  );
}
