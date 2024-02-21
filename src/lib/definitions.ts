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
  nextLectureDate: string;
  imminentLectureLeft: number;
  imminentAssignmentLeft: number;
};
export type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T;
};
