'use client';

import { ConfigProvider, Slider } from 'antd';

interface ReservationSliderProps {
  value: number[];
  onChange: (timeRange: number[]) => void;
}

export default function ReservationSlider({ value, onChange }: ReservationSliderProps) {
  return (
    <>
      <div className="mt-2 flex w-full px-1">
        <ConfigProvider
          theme={{
            components: {
              Slider: {
                railBg: '#E5E5E5',
                trackBg: '#626FE5',
                handleColor: '#626FE5',
                handleActiveColor: '#626FE5',
              },
            },
          }}
        >
          <Slider
            range
            min={10}
            max={22}
            value={value}
            onChange={onChange}
            dots={false}
            tooltipVisible={false}
            className="flex w-full"
          />
        </ConfigProvider>
      </div>
      <div className="flex w-full justify-between">
        <span className="f12 font-semibold text-text_primary">10시</span>
        <span className="f12 font-semibold text-text_primary">22시</span>
      </div>
    </>
  );
}
