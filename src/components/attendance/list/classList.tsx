'use client';

import ClassCard from '@/components/attendance/card/classCard';
import Tag from '@/components/common/tag/tag';
import useLink from '@/hooks/useLink';
import Icons from '@/components/common/icons/icons';
import React from 'react';

const data = [
  {
    id: 'dg3f23234',
    title: '초급인공지능활용 1강',
    tag: <Tag label="5일 남음" variant="warning" size="sm" />,
    description: '2024.03.12 12:00 ~ 2024.03.19 23:59',
  },
  {
    id: 'dg3f23235',
    title: 'Capstone 디자인(산학협력프로젝트입니다ddfsadfasdfasdf',
    tag: <Tag label="완료" variant="done" size="sm" />,
    description: '2024.03.12 12:00 ~ 2024.03.19 23:59',
  },
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
];
export default function ClassList() {
  const { navigateTo } = useLink();
  return (
    <div className="space-y-1">
      {data.map((item) => (
        <button
          type="button"
          aria-label="go to detail"
          onClick={() => {
            navigateTo(`/attendance/${item.title}`);
          }}
          className="flex w-full flex-nowrap items-center justify-between gap-9 rounded pr-1.5 text-left active:bg-gray-300"
        >
          <ClassCard
            key={item.id}
            title={item.title}
            description={item.description}
            tag={item.tag}
          />
          <Icons.ArrowRight className="fill-theme_tertiary" width={16} height={16} />
        </button>
      ))}
    </div>
  );
}
