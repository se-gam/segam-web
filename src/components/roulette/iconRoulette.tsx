'use client';

import Icons from '@/components/common/icons/icons';
import React, { useMemo } from 'react';
// eslint-disable-next-line
import _ from 'lodash';

export default function IconRoulette({ componentKey }: { componentKey: number }) {
  function getBgColorClass(index: number) {
    const colorClasses = [
      'bg-roulette_item_bg1',
      'bg-roulette_item_bg2',
      'bg-roulette_item_bg3',
      'bg-roulette_item_bg4',
    ];
    return colorClasses[index % 4];
  }
  function shuffleArray(array: string[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const menuItems = [
    'chicken',
    'cake',
    'frenchFries',
    'hamburger',
    'hotdog',
    'pizza',
    'kebab',
    'noodle',
    'sushi',
    'bibimbab',
    'corndog',
    'jjigae',
    'kimbab',
    'pudding',
    'ramen',
    'stick',
    'tteokguk',
    'yackgwa',
  ];

  const shuffledMenuItems = useMemo(() => shuffleArray(menuItems), []);

  return (
    <div
      className={`mb-5 flex w-auto ${componentKey % 2 === 0 ? 'animate-slide' : 'animate-slide_reverse'}`}
    >
      {shuffledMenuItems.map((item, index) => (
        <div
          key={item + index.toString()}
          className={`mr-4 h-20 w-20 rounded-3xl ${getBgColorClass(index)}`}
        >
          <Icons.ImageIcon name={`${item}`} width={80} height={80} />
        </div>
      ))}
      ,
    </div>
  );
}
