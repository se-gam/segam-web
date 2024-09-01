import cn from '@/utils/cn';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/common/drawer';
import Button from '@/components/common/button/button';
import Icons from '@/components/common/icons/icons';
import { Option } from '@/lib/definitions';

interface InfoSelectorProps {
  type: 'book' | 'area';
  data: Option[];
  value?: Option;
  onChange: (data: Option) => void;
  title?: string;
  placeholder?: string;
}

export default function InfoSelector({
  type,
  data,
  value,
  onChange,
  title,
  placeholder,
}: InfoSelectorProps) {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="f16 font-semibold text-text_primary">{title}</div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            disabled={data?.length === 0}
            variant="default"
            size="full"
            className="flex h-auto items-center justify-between rounded-sm p-2 px-3 py-[10px] font-semibold"
          >
            <div
              className={cn('f14 font-medium ', {
                'text-text_primary': value?.label,
                'text-text_secondary': !value?.label,
              })}
            >
              {value?.label || placeholder}
            </div>
            <Icons.ArrowDown width="14px" height="14px" className=" fill-theme_tertiary" />
          </Button>
        </DrawerTrigger>
        <DrawerContent data-vaul-no-drag>
          <div className="mb-[14px] ml-4 mr-4 flex items-center justify-between">
            <h3 className="f20 font-bold text-text_primary">
              {type === 'book' ? '도서 선택하기' : '영역 선택하기'}
            </h3>
            <DrawerClose asChild>
              <Icons.Close width="24px" height="24px" className="stroke-theme_tertiary" />
            </DrawerClose>
          </div>
          <div className="mx-2 mb-6 grid h-full max-h-[504px] grid-cols-1 gap-2 overflow-scroll">
            {data?.map((item) => (
              <DrawerClose asChild key={item.value}>
                <button
                  onClick={() => onChange(item)}
                  className={cn('flex justify-start rounded-md px-2 py-3 text-text_primary', {
                    'bg-button_default_bg': item.value === value?.value,
                  })}
                >
                  {item.label}
                </button>
              </DrawerClose>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
