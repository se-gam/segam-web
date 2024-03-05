import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import { Assignment } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

interface AssignmentListProps {
  assignments: Assignment[];
}
const tagLabel = (endDate: string) => {
  const todayDate = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - todayDate.getTime();
  const day = 1000 * 60 * 60 * 24;
  const remainDay = Math.floor(diff / day);
  if (remainDay < 0) {
    return '미완료';
  }
  if (remainDay === 0) {
    return '임박';
  }
  return `${remainDay}일 남음`;
};
export default function AssignmentList({ assignments }: AssignmentListProps) {
  if (assignments.length === 0)
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg px-4">
        <p className="f16 font-medium text-text_secondary">업데이트 된 과제가 없습니다.</p>
      </div>
    );
  return (
    <div className="h-full space-y-1 overflow-scroll px-4">
      {assignments.map((assignment) => (
        <ClassCard
          key={assignment.id}
          title={assignment.name}
          description={`${dateDotFormatter(assignment.endsAt)}`}
          tag={
            <Tag
              label={assignment.isDone ? '완료' : tagLabel(assignment.endsAt)}
              variant={assignment.isDone ? 'done' : 'warning'}
              size="sm"
            />
          }
        />
      ))}
    </div>
  );
}
