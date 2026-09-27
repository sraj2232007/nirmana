export interface TimetableSession {
  id: string;
  courseCode: string;
  courseName: string;
  section: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
  rawRowIndex?: number;
}

export type ChangeType = 'added' | 'removed' | 'changed' | 'unchanged';

export interface FieldChange {
  field: 'room' | 'schedule' | 'instructor' | 'courseName' | 'section';
  fieldLabel: string;
  oldValue: string;
  newValue: string;
  isAiNormalized?: boolean;
}

export interface SessionComparisonItem {
  id: string;
  changeType: ChangeType;
  oldSession?: TimetableSession;
  newSession?: TimetableSession;
  courseCode: string;
  courseName: string;
  section: string;
  
  // Specific change flags
  isRoomChange: boolean;
  isRescheduled: boolean;
  isInstructorChange: boolean;
  
  // Row movement detection
  wasReordered: boolean;
  oldRowIndex?: number;
  newRowIndex?: number;
  
  // Uncertainty & Human-in-the-loop
  isUncertain: boolean;
  uncertaintyReason?: string;
  confidenceScore: number;
  userDecision?: 'confirmed' | 'rejected' | 'pending';
  
  // Field diffs
  differences: FieldChange[];
  aiInterpretationNote?: string;
}

export interface TimetableDiffSummary {
  totalV1: number;
  totalV2: number;
  addedCount: number;
  removedCount: number;
  changedCount: number;
  roomChangeCount: number;
  rescheduledCount: number;
  instructorChangeCount: number;
  unchangedCount: number;
  reorderedIgnoredCount: number;
  uncertainCount: number;
}

export interface TimetableFilterState {
  courseFilter: string;
  sectionFilter: string;
  changeTypeFilter: 'all' | 'added' | 'removed' | 'changed' | 'room' | 'rescheduled' | 'unchanged' | 'uncertain';
  searchQuery: string;
}
