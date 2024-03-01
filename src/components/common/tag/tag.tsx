import cn from '@/utils/cn';
import { cva } from 'class-variance-authority';

interface TagProps {
  label: string;
  size: 'sm' | 'ms' | 'md';
  variant: 'default' | 'done' | 'warning' | 'orange' | 'yellow' | 'danger';
  className?: string;
}

const TagVariants = cva('font-semibold rounded', {
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
      sm: 'f12 px-2 py-1',
      ms: 'f12 px-3 py-1.5',
      md: 'f14 px-3 py-1.5',
    },
  },
});

export default function Tag({ label, size, variant = 'default', className = '' }: TagProps) {
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
