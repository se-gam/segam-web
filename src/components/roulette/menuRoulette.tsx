'use client';

import { Restaurant } from '@/lib/definitions';
import { useState } from 'react';
import shuffleArray from '@/utils/shuffleArray';
import IconRoulette from './iconRoulette';
import Button from '../common/button/button';
// eslint-disable-next-line
import _ from 'lodash';

export default function MenuRoulette({ menus }: { menus: Restaurant[] }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [menuList, setMenuList] = useState(shuffleArray(menus).slice(0, 61));

  const handleSpinRoulette = () => {
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * menuList.length);
    setSelectedItem(menuList[randomIndex].name);
    const newMenuList = [...menuList];
    [newMenuList[0], newMenuList[randomIndex]] = [newMenuList[randomIndex], newMenuList[0]];
    setMenuList(newMenuList);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <>
      <div className="f28 mb-14 mt-16 flex h-20 w-72 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-app_bg font-bold text-text_primary">
        {!selectedItem.length && <div className="text-center">돌려 돌려 돌림판😵‍💫</div>}
        <div
          className={`${isSpinning && 'animate-slideIn'} text-center transition-all duration-1000`}
        >
          {isSpinning
            ? menuList.map((option, index) => (
                <div key={option + index.toString()} className="h-20 text-center">
                  {option.name}
                </div>
              ))
            : selectedItem}
        </div>
      </div>
      {_.times(3, (index) => (
        <IconRoulette key={index} componentKey={index} />
      ))}
      <div className="mb-8 flex h-full w-full items-end px-5">
        <Button
          type="button"
          size="full"
          label="룰렛 돌리기"
          variant={isSpinning ? 'disabled' : 'primary'}
          disabled={isSpinning}
          onClick={handleSpinRoulette}
        />
      </div>
    </>
  );
}
