import cn from '@/utils/cn';
import Button from '../common/button/button';
import Icons from '../common/icons/icons';

interface AreaSelectorProps {
  value?: string;
  onClick: () => void;
  title?: string;
  placeholder?: string;
}

export default function InfoSelector({ value, onClick, title, placeholder }: AreaSelectorProps) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="f16 font-semibold text-text_primary">{title}</div>
      <Button
        variant="default"
        size="full"
        className="flex h-auto items-center justify-between rounded-sm p-2 px-3 py-[10px] font-semibold"
        onClick={onClick}
      >
        <div
          className={cn('f14 font-medium ', {
            'text-theme_accent': value,
            'text-text_secondary': !value,
          })}
        >
          {value || placeholder}
        </div>
        <Icons.ArrowDown width="14px" height="14px" className=" fill-theme_tertiary" />
      </Button>
    </div>
  );
}
