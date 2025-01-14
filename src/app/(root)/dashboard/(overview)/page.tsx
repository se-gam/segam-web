import { getCourseAttendance } from '@/lib/actions/attendance';
import getIconNameFromCourseId from '@/utils/getIconNameFromId';
import calAnnounceData from '@/utils/calAnnounceData';
import Board from '@/components/dashboard/board/board';
import AttendanceCard from '@/components/dashboard/card/attendanceCard';
import AnnounceCard from '@/components/dashboard/card/announceCard';
import RouletteCard from '@/components/dashboard/card/rouletteCard';
import ReservationList from '@/components/studyroom/studyRoomBoard';
import NoticeModal from '@/components/common/noticeModal';
// import ClassicCard from '@/components/dashboard/card/classicCard';

export default async function DashBoard() {
  const CourseData = await getCourseAttendance();
  const { title, description, iconName, link } = calAnnounceData(CourseData);

  return (
    <main className="bg-app_bg px-4">
      <header className="mb-4 flex w-full justify-between pt-3">
        <h1 className="f20 font-bold text-text_primary">대시보드</h1>
      </header>
      <div className="space-y-3 pb-3">
        <AnnounceCard title={title} description={description} iconName={iconName} link={link} />
        <Board title="출석 현황" url="dashboard/attendance">
          {CourseData.courses.length === 0 && (
            <div className="flex h-20 w-full items-center justify-center rounded-lg">
              <p className="f16 font-medium text-text_secondary">수강중인 강의가 없어요.</p>
            </div>
          )}
          {CourseData.courses.map((course, index) => {
            if (index <= 2) {
              return (
                <AttendanceCard
                  key={course.courseId}
                  title={course.name}
                  iconName={getIconNameFromCourseId(course.courseId)}
                  id={course.id}
                  remainJobs={course.lecturesLeft + course.assignmentsLeft}
                />
              );
            }
            return null;
          })}
        </Board>
        <Board title="예약 현황">
          <ReservationList />
        </Board>
        {/* <ClassicCard /> */}
        <RouletteCard />
      </div>
      <NoticeModal />
    </main>
  );
}
