'use client';

import { useState } from 'react';
import IconRoulette from '@/components/roulette/iconRoulette';
import Button from '@/components/common/button/button';
import menuList from '../../components/roulette/menuList';
// eslint-disable-next-line
import _ from 'lodash';

export default function RoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleSpinRoulette = () => {
    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * menuList.length);
    setSelectedItem(menuList[randomIndex]);
    [menuList[0], menuList[randomIndex]] = [menuList[randomIndex], menuList[0]];

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <main className=" container flex h-full w-full flex-col items-center overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-roulette_bg to-white ">
      <div className="f28 pt-[4.375rem] font-bold text-text_primary">점심 뭐 먹을까?</div>
      <div className=" f16 p-1 font-medium text-text_secondary">
        세종대 주변 58개의 맛집중에서 골랐어요
      </div>
      <div className=" text-pri f28 mb-14 mt-16 flex h-20 w-72 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-app_bg font-bold text-text_primary">
        <div className={`${isSpinning ? 'animate-slideIn' : ''} transition-all duration-1000`}>
          {isSpinning
            ? menuList.map((option, index) => (
                <div key={option + index.toString()} className="h-20 text-center">
                  {option}
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
          onClick={handleSpinRoulette}
        />
      </div>
    </main>
  );
}
