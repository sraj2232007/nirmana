export interface WeeklyModule {
  id: string;
  weekSpan: string;
  title: string;
  description: string;
  lectures: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'prep';
  statusText: string;
}

export interface ReadingItem {
  id: string;
  type: 'TOME' | 'PAPER';
  title: string;
  authors: string;
  source: string;
  callNumber: string;
  statusBadge: string;
  pdfAvailable?: boolean;
}

export interface AssessmentItem {
  id: string;
  weight: number;
  title: string;
  deadlineText: string;
  statusTag?: string;
}

export interface Course {
  id: string;
  code: string;
  typeBadge: string;
  credits: number;
  title: string;
  lecturer: string;
  lecturerRole: string;
  lecturerOffice: string;
  lecturerInitials: string;
  department: string;
  description: string;
  examNote: string;
  readings: ReadingItem[];
  classmark: string;
  weeklyModules: WeeklyModule[];
  assessments: AssessmentItem[];
  lastRevision: string;
}

export interface ElectiveCourse {
  id: string;
  code: string;
  faculty: string;
  credits: number;
  title: string;
  description: string;
  lecturer: string;
  schedule: string;
  seatsOpen: number;
  totalSeats: number;
  prereq: string;
  isAuditOnly?: boolean;
  category: 'CS & AI' | 'Mathematics' | 'Humanities' | 'Natural Sciences';
}

export interface TutorialRosterItem {
  id: string;
  name: string;
  initials: string;
  college: string;
  office: string;
  timeSlot: string;
  day: string;
}

export interface CreditCategory {
  label: string;
  current: number;
  total: number;
  percentage: number;
  status?: string;
  color: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  matriculationNo: string;
  folioNo: string;
  yearOfStudy: string;
  program: string;
  faculty: string;
  institution: string;
  residentialHouse: string;
  email: string;
  advisor: string;
  standing: string;
  currentTerm: string;
  gpa: string;
  rank: string;
  photoUrl: string;
  enrolledCredits: number;
  completedCredits: number;
  totalDegreeCredits: number;
  attendanceRate: string;
  emergencyContact: string;
}
