import GoteukStatusListItem from '@/components/classic/goteukStatusListItem';

const DATA = [
  {
    id: '1',
    title: '서양의 역사와 사상',
    done: 2,
    total: 4,
    icon: 'classic_west',
  },
  {
    id: '2',
    title: '동양의 역사와 사상',
    done: 0,
    total: 4,
    icon: 'classic_east',
  },
  {
    id: '3',
    title: '동서양의 문학',
    done: 4,
    total: 4,
    icon: 'classic_east_west',
  },
  {
    id: '4',
    title: '과학 사상',
    done: 0,
    total: 4,
    icon: 'classic_science',
  },
];
export default function GoteukStatusList() {
  return (
    <div className="flex flex-col gap-4">
      {DATA.map((item) => (
        <GoteukStatusListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
