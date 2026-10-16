export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
  language: string;
  timezone: string;
  courses: number;
  average: number;
  joinedDate: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  instructorTitle: string;
  schedule: string;
  virtualRoom: string;
  topics: number;
  progress: number;
  grade: number;
  semester: string;
  image: string;
}

export interface Session {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  type: 'class' | 'tutorship' | 'exam';
  status: 'upcoming' | 'completed' | 'recorded';
  link?: string;
}

export interface Grade {
  id: string;
  course: string;
  code: string;
  credits: number;
  midterm: number;
  final: number;
  average: number;
  grade: string;
}

export interface Activity {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
