import Board from '@/components/dashboard/board/board';
import StudyRoomCard from '@/components/dashboard/card/studyRoomCard';
import Icons from '@/components/common/icons/icons';
import { getCourseAttendance } from '@/lib/actions/attendance';
import AttendanceCard from '@/components/dashboard/card/attendanceCard';

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

export default async function DashBoard() {
  const { courses } = await getCourseAttendance();
  return (
    <main className="page bg-app_bg px-4 py-3">
      <header className="mb-4 flex w-full justify-between">
        <h1 className="f20 font-bold text-text_primary">감자탕</h1>
        <Icons.Bell className="fill-theme_tertiary" width="1.5rem" height="1.5rem" />
      </header>
      <div className="space-y-3">
        <Board title="출석 현황" url="dashboard/attendance">
          {courses.length === 0 && (
            <div className="flex h-20 w-full items-center justify-center rounded-lg">
              <p className="f16 font-medium text-text_secondary">수강중인 강의가 없습니다.</p>
            </div>
          )}
          {courses.map((course, index) => {
            if (index <= 2) {
              return (
                <AttendanceCard
                  key={course.id}
                  title={course.name}
                  iconName="studyRoom"
                  id={course.id}
                  remainJobs={course.lecturesLeft + course.assignmentsLeft}
                />
              );
            }
            return null;
          })}
        </Board>
        <Board title="나의 예약현황" url="dashboard/studyroom">
          {data.length === 0 && (
            <div className="flex h-20 w-full items-center justify-center rounded-lg">
              <p className="f16 font-medium text-text_secondary">예약내역이 존재하지 않습니다.</p>
            </div>
          )}
          {data.map((item) => (
            <StudyRoomCard
              key={item.id}
              title={item.title}
              description={item.description}
              iconName={item.iconName}
            />
          ))}
        </Board>
        <Board title="점심 메뉴 추천받기" url="roulette" type="independent" />
      </div>
    </main>
  );
}
