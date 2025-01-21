import { Session } from 'next-auth';
import { UpdateSession } from 'next-auth/react';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  encryptedPassword: string;
  pushToken?: string;
  os?: string;
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
  id: string;
  courseId: string;
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
  tags: string[];
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

export type ReservationResponse = {
  id: number;
  title: string;
  isLeader: boolean;
  description: string;
  iconName: string;
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

export type ClassicReservation = {
  reservationId: string;
  bookId: number;
  bookName: string;
  reservationTime: string;
  bookCategoryId: number;
};

export type ClassicReservationList = {
  reservations: ClassicReservation[];
};

export type ClassicStatus = {
  categoryCode: 1000 | 2000 | 3000 | 4000;
  categoryName: string;
  categoryStatus: boolean;
  count: number;
  targetCount: number;
};
export type ClassicStatusList = {
  status: boolean;
  categoryStatus: ClassicStatus[];
};

export type ClientSession =
  | { update: UpdateSession; data: Session; status: 'authenticated' }
  | { update: UpdateSession; data: null; status: 'unauthenticated' | 'loading' }
  | { update: UpdateSession; data: null; status: 'loading' };

export type ReservationItem = ReservationResponse | ClassicReservation;

export type GodokSlot = {
  id: string;
  slotId: string;
  startsAt: string;
  availableSeats: number;
  totalSeats: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type GodokCalendar = {
  [date: string]: GodokSlot[];
};

export type GodokCalendarResponse = {
  godokSlots: GodokCalendar;
};

export type BookInfo = {
  bookId: number;
  bookName: string;
  categoryId: number;
  categoryName: string;
};

export type Option = {
  value: number;
  label: string;
};

export type Category = {
  categoryId: number;
  categoryName: string;
  books: Option[];
};

export type Notice = {
  id: number;
  title: string;
  content: string;
  isPopup: boolean;
  createdAt: string;
  deletedAt: string | null;
}

export type NoticeForList = {
  // id:number;
  title:string;
  createdAt:string;
}