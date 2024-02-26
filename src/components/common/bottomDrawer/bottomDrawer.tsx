'use client';

import Button from '@/components/common/button/button';
import { Drawer } from 'antd';

interface DrawerProps {
  openState: boolean;
  submitLabel: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onClose: () => void;
}
export default function BottomDrawer({
  openState,
  children,
  submitLabel,
  onClose,
  onSubmit,
}: DrawerProps) {
  return (
    <Drawer
      placement="bottom"
      height="auto"
      onClose={onClose}
      open={openState}
      closeIcon={null}
      styles={{
        body: {
          margin: 0,
          padding: '0 0 8px 0',
        },
        wrapper: {
          boxShadow: 'none',
        },
        content: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <div className="mx-4 rounded-[18px] bg-white pb-2 pt-7">
        {children}
        <div className="px-2 pt-3">
          <Button size="full" label={submitLabel} variant="primary" onClick={onSubmit} />
        </div>
      </div>
    </Drawer>
  );
}
