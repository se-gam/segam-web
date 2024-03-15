export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type Lecture = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  isDone: boolean;
  week: number;
};
export type Assignment = {
  id: number;
  name: string;
  endsAt: string;
  isDone: boolean;
  week: number;
};
export type Course = {
  id: number;
  ecampusId: number;
  name: string;
  lectureAbsences: number;
  assignmentAbsences: number;
  updateDay: number;
  imminentDueDate: string;
  nextLectureDate: string;
  lecturesLeft: number;
  assignmentsLeft: number;
  lectures: Lecture[];
  assignments: Assignment[];
};
export type CourseAttendance = {
  courses: Course[] | [];
  totalJobs: number;
  imminentDueDate: string;
  imminentCourseName: string;
  imminentCourseId: string;
  nextLectureDate: string;
  nextLectureCourseName: string;
  nextLectureCourseId: string;
  imminentLecturesLeft: number;
  imminentAssignmentsLeft: number;
};
export type AnnounceData = {
  imminentDueDate: string;
  imminentCourseName: string;
  imminentCourseId: string;
  nextLectureDate: string;
  nextLectureCourseName: string;
  nextLectureCourseId: string;
  imminentLecturesLeft: number;
  imminentAssignmentsLeft: number;
};
export type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};
export type Slot = {
  id: string;
  date: string;
  startsAt: number;
  isReserved: boolean;
  isClosed: boolean;
};
export type Studyroom = {
  id: number;
  name: string;
  location: string;
  minUsers: number;
  maxUsers: number;
  isCinema: boolean;
  operatingHours: string;
  slots: Slot[];
};
export type StudyroomList = {
  studyrooms: Studyroom[];
};
export type StudyroomReservationList = {
  reservations: Reservation[];
};
export type Reservation = {
  id: number;
  name: string;
  date: string;
  startsAt: number;
  duration: number;
  isLeader: boolean;
  isCinema: boolean;
  reason: string;
  users: ReservationUser[];
};
export type Friend = {
  studentId: string;
  name: string;
};
export type Friends = {
  friends: Friend[];
};

export type ReservationUser = {
  studentId: string;
  name: string;
};
export type UserInfo = {
  studentId: string;
  name: string;
  departmentName: string | null;
  os: string;
  sejongPid: string;
  pushToken: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
export type Restaurants = {
  restaurants: Restaurant[];
};
export type Restaurant = {
  name: string;
};
export type DateFilterData = {
  date: string;
  timeRange: number[];
};
