'use client';

import Button from '@/components/common/button/button';
import useViewportResize from '@/hooks/useViewportResize';

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
  const { divRef } = useViewportResize();
  if (!openState) {
    return null;
  }
  return (
    <div
      ref={divRef}
      className="safe-area-bottom fixed left-0 top-0 z-10 h-screen w-full bg-transparent"
    >
      <button
        type="button"
        className="fixed left-0 top-0 z-10 h-screen w-full bg-black bg-opacity-40"
        aria-label="backdrop"
        onClick={onClose}
      />
      <div className="safe-area-bottom absolute bottom-0 z-20 mb-2 w-full px-4">
        <div className="rounded-[18px] bg-white pb-2 pt-7">
          {children}
          <div className="px-2 pt-3">
            <Button size="full" label={submitLabel} variant="primary" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
