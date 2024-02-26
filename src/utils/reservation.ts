import { Slot } from '@/lib/definitions';

export function getDurationList({ startsAt, slots }: { startsAt: number | null; slots: Slot[] }) {
  if (!startsAt) return [];
  const nextTime = startsAt + 1;
  const nextSlot = slots.find((s) => s.startsAt === nextTime);
  if (!nextSlot) return [{ label: '1시간', value: 1 }];
  return [
    { label: '1시간', value: 1 },
    { label: '2시간', value: 2 },
  ];
}
export function getButtonStatus({ value, cValue }: { value: number | null; cValue: number }) {
  if (!value) return 'default';
  if (value === cValue) return 'selected';
  return 'disabled';
}
