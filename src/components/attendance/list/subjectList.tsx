import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import { Lecture } from '@/lib/definitions';
import { dateDotFormatter } from '@/utils/format';

interface LectureProps {
  lectures: Lecture[];
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
  return `${remainDay}일 남음`;
};
export default function SubjectList({ lectures }: LectureProps) {
  if (lectures.length === 0)
    return (
      <div className="flex h-20 w-full items-center justify-center rounded-lg">
        <p className="f16 font-medium text-text_secondary">업데이트 된 강의가 없습니다.</p>
      </div>
    );
  return (
    <div className="space-y-1">
      {lectures.map((lecture) => (
        <ClassCard
          key={lecture.id}
          title={lecture.name}
          description={`${dateDotFormatter(lecture.startsAt)} ~ ${dateDotFormatter(lecture.endsAt)}`}
          tag={
            <Tag
              label={lecture.isDone ? '완료' : tagLabel(lecture.endsAt)}
              variant={lecture.isDone ? 'done' : 'warning'}
              size="sm"
            />
          }
        />
      ))}
    </div>
  );
}
