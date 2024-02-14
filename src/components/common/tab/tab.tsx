'use client';

import { ConfigProvider, Segmented } from 'antd';

interface TabProps {
  value: number;
  onChange: (value: number) => void;
  options: { label: string; value: number }[];
}

export default function Tab({ value, onChange, options }: TabProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeightLG: 48,
          borderRadiusLG: 12,
        },
        components: {
          Segmented: {
            itemColor: '#979799',
            itemSelectedColor: '#4E5968',
            itemHoverColor: '#4E5968',
            trackPadding: 4,
          },
        },
      }}
    >
      <Segmented
        value={value}
        onChange={onChange}
        options={options.map((option) => ({
          label: <span className="f16 font-bold ">{option.label}</span>,
          value: option.value,
        }))}
        size="large"
        block
      />
    </ConfigProvider>
  );
}
