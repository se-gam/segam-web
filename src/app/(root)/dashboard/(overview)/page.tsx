import Board from '@/components/dashboard/board/board';
import StudyRoomCard from '@/components/dashboard/card/studyRoomCard';
import { getCourseAttendance } from '@/lib/actions/attendance';
import AttendanceCard from '@/components/dashboard/card/attendanceCard';
import AnnounceCard from '@/components/dashboard/card/announceCard';
import calAnnounceData from '@/utils/calAnnounceData';
import RouletteCard from '@/components/dashboard/card/rouletteCard';
import { getReservationList } from '@/lib/actions/studyroom';
import calReservationData from '@/utils/calReservationData';
import getIconNameFromCourseId from '@/utils/getIconNameFromId';

export default async function DashBoard() {
  const {
    courses,
    imminentDueDate,
    imminentCourseName,
    imminentCourseId,
    nextLectureDate,
    nextLectureCourseName,
    nextLectureCourseId,
    imminentLecturesLeft,
    imminentAssignmentsLeft,
  } = await getCourseAttendance();
  const { reservations } = await getReservationList();
  const { title, description, iconName, link } = calAnnounceData({
    imminentDueDate,
    imminentCourseName,
    imminentCourseId,
    nextLectureDate,
    nextLectureCourseName,
    nextLectureCourseId,
    imminentLecturesLeft,
    imminentAssignmentsLeft,
  });
  const reservationData = calReservationData(reservations);
  return (
    <main className="bg-app_bg px-4">
      <header className="mb-4 flex w-full justify-between pt-3">
        <h1 className="f20 font-bold text-text_primary">감자탕</h1>
      </header>
      <div className="space-y-3 pb-3">
        <AnnounceCard title={title} description={description} iconName={iconName} link={link} />
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
                  iconName={getIconNameFromCourseId(course.id)}
                  id={course.id}
                  remainJobs={course.lecturesLeft + course.assignmentsLeft}
                />
              );
            }
            return null;
          })}
        </Board>
        <Board title="내 예약현황" url="dashboard/studyroom">
          {reservationData.length === 0 && (
            <div className="flex h-20 w-full items-center justify-center rounded-lg">
              <p className="f16 font-medium text-text_secondary">예약내역이 존재하지 않습니다.</p>
            </div>
          )}
          {reservationData.map((item) => (
            <StudyRoomCard
              key={item.id}
              title={item.title}
              description={item.description}
              iconName={item.iconName}
              id={item.id}
            />
          ))}
        </Board>
        <RouletteCard />
      </div>
    </main>
  );
}
