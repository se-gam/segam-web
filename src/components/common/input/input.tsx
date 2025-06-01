import { cva } from 'class-variance-authority';
import cn from '@/utils/cn';

interface InputProps {
  value: string;
  type: 'text' | 'textarea';
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputVariants = cva(
  'f14 px-3 py-2.5 font-normal rounded-sm bg-button_default_bg text-text_primary focus:outline-none w-full placeholder-text_placeholder',
  {
    variants: {
      type: {
        textarea: 'h-10',
      },
    },
  },
);

export default function Input({
  value,
  type,
  onChange,
  placeholder = 'placeholder',
  className = '',
}: InputProps) {
  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        className={cn(
          InputVariants({
            type,
          }),
          className,
        )}
        placeholder={placeholder}
      />
    );
  }
  return (
    <input
      className={cn(InputVariants(), className)}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
