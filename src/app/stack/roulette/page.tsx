import MenuRoulette from '@/components/roulette/menuRoulette';
import StackHeader from '@/components/common/stackHeader/stackHeader';
import { getRestaurants } from '@/lib/actions/attendance';
import Tag from '@/components/common/tag/tag';

export default async function RoulettePage() {
  const data = await getRestaurants();
  return (
    <>
      <div className="absolute -z-10 h-full w-full bg-gradient-to-b from-roulette_bg to-white" />
      <div className="flex h-full flex-col overflow-hidden">
        <StackHeader bgClass="bg-transparent" />
        <Tag
          label="세감의 랜덤 점메추"
          variant="message"
          size="sm"
          className="mb-3 mt-[1.875rem]"
        />
        <div className="f28 font-bold text-text_primary">점심 뭐 먹을까?</div>
        <div className=" f16 p-1 font-medium text-text_secondary">
          세종대 주변 58개의 맛집중에서 골랐어요
        </div>
        <MenuRoulette menus={data.restaurants} />
      </main>
    </>
  );
}
