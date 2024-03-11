import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import { Assignment, Lecture } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

const getRemainDate = (endDate: string) => {
  const todayDate = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - todayDate.getTime();
  const day = 1000 * 60 * 60 * 24;
  const remainDate = Math.floor(diff / day);
  return remainDate;
};
const tagStatus = (endDate: string) => {
  const remainDate = getRemainDate(endDate);
  if (remainDate < 0) {
    return 'orange';
  }
  return 'warning';
};
const tagLabel = (endDate: string) => {
  const remainDate = getRemainDate(endDate);
  if (remainDate < 0) {
    return '미완료';
  }
  if (remainDate === 0) {
    return '임박';
  }
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
  if (items.length === 0)
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg px-4">
        <p className="f16 font-medium text-text_secondary">
          업데이트 된 {type === 'lecture' ? '강의' : '과제'}가 없습니다.
        </p>
      </div>
    );
  return (
    <div className="h-full space-y-1 overflow-scroll px-4">
      {items.map((item) => {
        const description = getDescription(item);
        return (
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
      })}
    </div>
  );
}
