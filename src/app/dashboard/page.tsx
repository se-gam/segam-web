import Board from '@/components/board/board';
import AttendanceCard from '@/components/cards/attendanceCard';
import StudyRoomCard from '@/components/cards/studyRoomCard';
import Icons from '@/components/common/icons/icons';

const data = [
  {
    id: 1,
    title: '감자탕',
    description: '1월 22일 10시~12시',
    iconName: 'studyRoom',
  },
  {
    id: 2,
    title: '감자탕',
    description: '1월 22일 10시~12시',
    iconName: 'cinema',
  },
];

export default function DashBoard() {
  return (
    <main className="container h-full bg-app_bg px-4 py-3">
      <header className="mb-4 flex w-full justify-between">
        <h1 className="f20 font-bold text-text_primary">감자탕</h1>
        <Icons.Bell className="h-6 w-6 fill-theme_tertiary" />
      </header>
      <div className="space-y-3">
        <Board title="출석 현황" url="attendance">
          {data.map((item) => (
            <AttendanceCard
              key={item.id}
              title={item.title}
              iconName={item.iconName}
            />
          ))}
        </Board>
        <Board title="나의 예약현황" url="studyRoom">
          {data.map((item) => (
            <StudyRoomCard
              key={item.id}
              title={item.title}
              description={item.description}
              iconName={item.iconName}
            />
          ))}
        </Board>
      </div>
    </main>
  );
}
