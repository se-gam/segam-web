import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';

const data = [
  {
    id: 'dg3f23234',
    title: '초급인공지능활용 1강',
    tag: <Tag label="5일 남음" variant="warning" size="sm" />,
    description: '2024.03.12 12:00 ~ 2024.03.19 23:59',
  },
  {
    id: 'dg3f23235',
    title: '초급인공지능활용 2강',
    tag: <Tag label="완료" variant="done" size="sm" />,
    description: '2024.03.12 12:00 ~ 2024.03.19 23:59',
  },
  {
    id: 'dg3f23235',
    title: 'Capstone 디자인(산학협력프로젝트입니다',
    tag: <Tag label="완료" variant="done" size="sm" />,
    description: '2024.03.12 12:00 ~ 2024.03.19 23:59',
  },
];
export default function SubjectList() {
  return (
    <div className="space-y-1">
      {data.map((item) => (
        <ClassCard key={item.id} title={item.title} description={item.description} tag={item.tag} />
      ))}
    </div>
  );
}
