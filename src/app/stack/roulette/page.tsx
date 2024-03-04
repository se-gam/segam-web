import MenuRoulette from '@/components/roulette/menuRoulette';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import { getRestaurants } from '@/lib/actions/attendance';

export default async function RoulettePage() {
  const data = await getRestaurants();
  return (
    <>
      <div className="absolute -z-10 h-full w-full bg-gradient-to-b from-roulette_bg to-white" />
      <main className="container flex h-full w-full flex-col items-center overflow-x-hidden overflow-y-scroll bg-transparent">
        <StackHeader bgClass="bg-transparent" />
        <div className="f28 pt-[2.625rem] font-bold text-text_primary">점심 뭐 먹을까?</div>
        <div className=" f16 p-1 font-medium text-text_secondary">
          세종대 주변 58개의 맛집중에서 골랐어요
        </div>
        <MenuRoulette menus={data.restaurants} />
      </main>
    </>
  );
}
