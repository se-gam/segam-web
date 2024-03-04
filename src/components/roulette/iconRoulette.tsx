'use client';

import Icons from '@/components/common/icons/icons';
import React, { useMemo } from 'react';
// eslint-disable-next-line
import _ from 'lodash';
import shuffleArray from '@/utils/shuffleArray';

export default function IconRoulette({ componentKey }: { componentKey: number }) {
  const menuItems = [
    { iconName: 'chicken', bgColor: 'bg-bg_chicken' },
    { iconName: 'cake', bgColor: 'bg-bg_cake' },
    { iconName: 'frenchFries', bgColor: 'bg-bg_frenchFries' },
    { iconName: 'hamburger', bgColor: 'bg-bg_hamburger' },
    { iconName: 'hotdog', bgColor: 'bg-bg_hotdog' },
    { iconName: 'pizza', bgColor: 'bg-bg_pizza' },
    { iconName: 'kebab', bgColor: 'bg-bg_kebab' },
    { iconName: 'noodle', bgColor: 'bg-bg_noodle' },
    { iconName: 'sushi', bgColor: 'bg-bg_sushi' },
    { iconName: 'bibimbab', bgColor: 'bg-bg_bibimbab' },
    { iconName: 'corndog', bgColor: 'bg-bg_corndog' },
    { iconName: 'jjigae', bgColor: 'bg-bg_jjigae' },
    { iconName: 'kimbab', bgColor: 'bg-bg_kimbab' },
    { iconName: 'pudding', bgColor: 'bg-bg_pudding' },
    { iconName: 'ramen', bgColor: 'bg-bg_ramen' },
    { iconName: 'stick', bgColor: 'bg-bg_stick' },
    { iconName: 'tteokguk', bgColor: 'bg-bg_tteokguk' },
    { iconName: 'yackgwa', bgColor: 'bg-bg_yackgwa' },
  ];

  const shuffledMenuItems = useMemo(
    () => shuffleArray(menuItems),
    // eslint-disable-next-line
    [],
  );

  return (
    <div
      className={`mb-5 flex w-auto ${componentKey % 2 === 0 ? 'animate-slide' : 'animate-slide_reverse'}`}
    >
      {shuffledMenuItems.map((item, index) => (
        <div key={item + index.toString()} className={`mr-4 h-20 w-20 rounded-3xl ${item.bgColor}`}>
          <Icons.ImageIcon name={`${item.iconName}`} width={80} height={80} />
        </div>
      ))}
      ,
    </div>
  );
}
