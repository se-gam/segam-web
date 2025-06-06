'use client';

import { useRouter } from 'next/navigation';
import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import Icons from '@/components/common/icons/icons';
import { Assignment, Lecture } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';
import { stackRouterPush } from '@/utils/stackRouter';

const getRemainDate = (endDate: string) => {
  const todayDate = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - todayDate.getTime();
  const day = 1000 * 60 * 60 * 24;
  return Math.floor(diff / day);
};

const tagStatus = (endDate: string) => {
  const remainDate = getRemainDate(endDate);
  return remainDate < 0 ? 'orange' : 'warning';
};

const tagLabel = (endDate: string) => {
  const remainDate = getRemainDate(endDate);
  if (remainDate < 0) return '미완료';
  if (remainDate === 0) return '임박';
  return `${remainDate}일 남음`;
};

const getDescription = (item: Lecture | Assignment) => {
  if ('startsAt' in item) {
    return `${dateDotFormatter(item.startsAt)} ~ ${dateDotFormatter(item.endsAt)}`;
  }
  return `${dateDotFormatter(item.endsAt)}`;
};

export default function ClassList({
  items,
  type,
}: {
  items: Lecture[] | Assignment[] | [];
  type: 'lecture' | 'assignment';
}) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg px-4">
        <p className="f16 font-medium text-text_secondary">
          업데이트 된 {type === 'lecture' ? '강의' : '과제'}가 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full space-y-1 overflow-scroll px-4">
      {items.map((item) => {
        const description = getDescription(item);
        const isCustomAssignment = type === 'assignment' && 'week' in item && item.week === null;

        const content = (
          <ClassCard
            key={item.id}
            title={item.name}
            description={description}
            tag={
              <Tag
                label={item.isDone ? '완료' : tagLabel(item.endsAt)}
                variant={item.isDone ? 'done' : tagStatus(item.endsAt)}
                size="sm"
              />
            }
          />
        );

        return isCustomAssignment ? (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              stackRouterPush({
                router,
                page: `assignment/${item.id}/edit`,
                title: '과제 수정하기',
              })
            }
            className="flex w-full items-center justify-between gap-3 rounded text-left active:scale-[0.98] active:bg-app_bg"
          >
            {content}
            <Icons.ArrowRight className="shrink-0 fill-theme_tertiary" width="1rem" height="1rem" />
          </button>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </div>
  );
}
