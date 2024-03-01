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
  id: number;
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
