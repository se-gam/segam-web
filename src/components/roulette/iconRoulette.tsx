'use client';

import Icons from '@/components/common/icons/icons';
import React from 'react';
// eslint-disable-next-line
import _ from 'lodash';

const menuItems = [
  [
    { iconName: 'jjigae', bgColor: 'bg-bg_jjigae' },
    { iconName: 'yackgwa', bgColor: 'bg-bg_yackgwa' },
    { iconName: 'pizza', bgColor: 'bg-bg_pizza' },
    { iconName: 'frenchFries', bgColor: 'bg-bg_frenchFries' },
    { iconName: 'corndog', bgColor: 'bg-bg_corndog' },
    { iconName: 'kimbab', bgColor: 'bg-bg_kimbab' },
  ],
  [
    { iconName: 'ramen', bgColor: 'bg-bg_ramen' },
    { iconName: 'hotdog', bgColor: 'bg-bg_hotdog' },
    { iconName: 'sushi', bgColor: 'bg-bg_sushi' },
    { iconName: 'tteokguk', bgColor: 'bg-bg_tteokguk' },
    { iconName: 'kebab', bgColor: 'bg-bg_kebab' },
    { iconName: 'pudding', bgColor: 'bg-bg_pudding' },
  ],
  [
    { iconName: 'bibimbab', bgColor: 'bg-bg_bibimbab' },
    { iconName: 'noodle', bgColor: 'bg-bg_noodle' },
    { iconName: 'stick', bgColor: 'bg-bg_stick' },
    { iconName: 'cake', bgColor: 'bg-bg_cake' },
    { iconName: 'chicken', bgColor: 'bg-bg_chicken' },
    { iconName: 'hamburger', bgColor: 'bg-bg_hamburger' },
  ],
];

export default function IconRoulette({ componentKey }: { componentKey: number }) {
  return (
    <div
      className={`mb-5 flex w-auto ${componentKey % 2 === 0 ? 'animate-slide' : 'animate-slide_reverse'} ${componentKey >= 2 && 'responsive-roulette-image-div'}`}
    >
      {_.times(2, () =>
        menuItems[componentKey].map((item, index) => (
          <div
            key={item + index.toString()}
            className={`mr-4 h-20 w-20 rounded-3xl ${item.bgColor}`}
          >
            <Icons.ImageIcon name={`${item.iconName}`} width={80} height={80} />
          </div>
        )),
      )}
      ,
    </div>
  );
}
