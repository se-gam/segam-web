'use client';

import Icons from '@/components/common/icons/icons';
import React from 'react';

export default function MenuRoulette({ componentKey }: { componentKey: number }) {
  const shuffleArray = (array: String[]) => {
    const newArray = [...array];
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  function getBgColorClass(index: number) {
    const colorClasses = {
      0: 'bg-roulette_item_bg1',
      1: 'bg-roulette_item_bg2',
      2: 'bg-roulette_item_bg3',
      3: 'bg-roulette_item_bg4',
    };
    // @ts-ignore
    return colorClasses[index % 4];
  }
  const menuItems = shuffleArray([
    'chicken',
    'cake',
    'frenchFries',
    'hamburger',
    'hotdog',
    'pizza',
    'kebab',
    'noodle',
    'seshi',
  ]);
  const extendedMenuItems = [...menuItems, ...menuItems];

  return (
    <div
      className={`mb-5 flex ${componentKey % 2 === 0 ? 'animate-slide' : 'animate-slide_reverse'}`}
    >
      {extendedMenuItems.map((item, index) => (
        <div
          key={item + index.toString()}
          className={`mr-4 h-20 w-20 rounded-3xl ${getBgColorClass(index)}`}
        >
          <Icons.ImageIcon name={`${item}`} width={80} height={80} />
        </div>
      ))}
    </div>
  );
}
