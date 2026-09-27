import { TimetableSession } from '../types/timetable';

// Preset 1: Indian School Timetable (CBSE / ICSE Class 11-12 & Secondary)
export const INDIAN_SCHOOL_V1_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
MATH-XII,Mathematics & Integration,Class 12-A,Monday,08:30,09:45,Room 104 (Ramanujan Block),Mr. R. K. Sharma
PHYS-XII,Physics & Electromagnetism,Practical Lab 1,Tuesday,10:00,11:30,Physics Lab (Science Wing),Mrs. Sunita Deshmukh
CHEM-XII,Chemistry & Organic Reactions,Practical Lab 2,Wednesday,09:00,10:30,Chemistry Lab Room 3,Dr. V. K. Murthy
ENG-XII,English Core & Comprehension,Class 12-A,Thursday,08:30,09:45,Room 104 (Ramanujan Block),Mrs. Priya Nair
CS-XII,Computer Science & Python,Computer Practical 1,Friday,11:30,13:00,Computer Lab,Mr. Amit Verma
MATH-XII,Mathematics & Integration,Doubt Clearing Session,Wednesday,14:00,15:00,Math Block Room 102,Mr. R. K. Sharma
BIO-XII,Biology & Genetics,Class 12-B,Tuesday,13:30,15:00,Biology Lab (Ground Floor),Dr. Meenakshi Sundaram`;

export const INDIAN_SCHOOL_V2_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
ENG-XII,English Core & Comprehension,Class 12-A,Thursday,08:30,09:45,Room 104 (Ramanujan Block),Mrs. Priya Nair
PHYS-XII,Physics & Electromagnetism,Practical Lab 1,Tuesday,10:00,11:30,Room 205 (New Science Wing),Mrs. Sunita Deshmukh
CHEM-XII,Chemistry & Organic Reactions,Practical Lab 2,Friday,14:00,15:30,Chemistry Lab Room 3,Dr. V. K. Murthy
MATH-XII,Mathematics & Integration,Class 12-A,Monday,08:30,09:45,Room 104 (Ramanujan Block),Mr. R. K. Sharma
CS-XII,Computer Science & Python,Computer Practical 1,Friday,11:30,13:00,Comp. Laboratory,Mr. Amit Verma
MATH-XII,Mathematics & Integration,Problem Remedial Batch A,Thursday,14:00,15:00,Math Block Room 102,Mr. R. K. Sharma
HINDI-XII,Hindi Core & Sahitya,Class 12-A,Monday,11:30,13:00,Language Hall 2,Acharya B. P. Shukla`;

// Preset 2: Indian College / Engineering & Degree Timetable (B.Tech / B.Sc / Delhi University / IIT)
export const INDIAN_COLLEGE_V1_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
CS301,Data Structures & Algorithms,CSE Section 1,Monday,09:00,10:30,LT-1 (Aryabhatta Lecture Hall),Prof. Ramesh K. Narayanan
CS302,Operating Systems & Concurrency,CSE Section 1,Tuesday,10:30,12:00,LH-3 (Technology Block),Dr. Ananya Sen
CS303,Database Management Systems,CSE Lab A,Wednesday,14:00,16:30,Computer Lab,Prof. Rajesh Gupta
EC201,Digital Electronics & Circuits,ECE Section 2,Thursday,09:00,10:30,EC Department Room 12,Dr. K. S. Rao
MA201,Discrete Mathematics & Graph Theory,Tutorial Batch 1,Friday,11:00,12:30,Room 204 (Math Block),Dr. P. V. Ramaswamy
CS301,Data Structures & Algorithms,Tutorial Session A,Wednesday,16:30,17:30,Room 105 (CSE Wing),Prof. Ramesh K. Narayanan
HS101,Environmental Studies & Ethics,All Sections,Tuesday,15:00,16:30,Auditorium Block C,Prof. Sandhya Roy`;

export const INDIAN_COLLEGE_V2_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
CS302,Operating Systems & Concurrency,CSE Section 1,Tuesday,10:30,12:00,LH-3 (Technology Block),Dr. Ananya Sen
CS301,Data Structures & Algorithms,CSE Section 1,Monday,09:00,10:30,LT-1 (Aryabhatta Lecture Hall),Prof. Ramesh K. Narayanan
EC201,Digital Electronics & Circuits,ECE Section 2,Thursday,09:00,10:30,Dr. APJ Abdul Kalam Block 102,Dr. K. S. Rao
CS303,Database Management Systems,CSE Lab A,Friday,10:00,12:30,Comp. Laboratory,Prof. Rajesh Gupta
MA201,Discrete Mathematics & Graph Theory,Tutorial Batch 1,Friday,11:00,12:30,Room 204 (Math Block),Dr. P. V. Ramaswamy
CS301,Data Structures & Algorithms,Problem Practicum Batch 1,Thursday,16:00,17:00,Room 105 (CSE Wing),Prof. Ramesh K. Narayanan
AI401,Artificial Intelligence & Machine Learning,Elective Batch,Monday,14:00,15:30,Turing Seminar Hall,Dr. S. Mukherjee`;

// Preset 3: Oxford Collegiate Timetable
export const OXFORD_V1_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
CS301,Distributed Consensus,Lecture 01,Monday,10:00,11:30,Radcliffe Computing Hall A,Prof. Alistair Sterling
MATH240,Spectral Tensors,Lecture 01,Tuesday,09:30,11:00,Andrew Wiles Hall 2,Dr. Evelyn Thorne-Clarke
AI412,Machine Learning Architectures,Lab 02,Friday,14:00,16:00,Computing Laboratory Room 3B,Prof. Julian H. Vance
PHIL210,Epistemology & AI,Tutorial A,Tuesday,11:00,12:30,Codrington Library Room 4,Archivist Thomas Pemberton
CS301,Distributed Consensus,Practical 01,Wednesday,14:00,16:00,Computer Lab,Prof. Alistair Sterling
MATH240,Spectral Tensors,Problem Seminar A,Wednesday,16:00,17:30,Andrew Wiles Room 12,Dr. Evelyn Thorne-Clarke
HIST102,Medieval Papal Diplomacy,Seminar B,Thursday,16:30,18:00,Examination Schools Hall 3,Canon R. V. Dunstan`;

export const OXFORD_V2_CSV = `Course Code,Course Name,Section,Day,Start Time,End Time,Room,Instructor
MATH240,Spectral Tensors,Lecture 01,Tuesday,09:30,11:00,Andrew Wiles Hall 2,Dr. Evelyn Thorne-Clarke
AI412,Machine Learning Architectures,Lab 02,Friday,14:00,16:00,Turing Laboratory - Room 10,Prof. Julian H. Vance
PHIL210,Epistemology & AI,Tutorial A,Thursday,15:00,16:30,Codrington Library Room 4,Archivist Thomas Pemberton
CS301,Distributed Consensus,Lecture 01,Monday,10:00,11:30,Radcliffe Computing Hall A,Prof. Alistair Sterling
CS301,Distributed Consensus,Practical 01,Wednesday,14:00,16:00,Comp. Laboratory,Prof. Alistair Sterling
MATH240,Spectral Tensors,Problem Practicum 1,Thursday,14:00,15:30,Andrew Wiles Room 12,Dr. Evelyn Thorne-Clarke
NEUR320,Biological Neural Networks,Lecture 01,Monday,11:00,12:30,Sherrington Building 1,Prof. Katherine Wu`;

// Default to Indian School & College Timetable
export const SAMPLE_TIMETABLE_V1_CSV = INDIAN_COLLEGE_V1_CSV;
export const SAMPLE_TIMETABLE_V2_CSV = INDIAN_COLLEGE_V2_CSV;

export const SCHOOL_COLLEGE_V1_CSV = INDIAN_COLLEGE_V1_CSV;
export const SCHOOL_COLLEGE_V2_CSV = INDIAN_COLLEGE_V2_CSV;
export const UNIVERSITY_V1_CSV = OXFORD_V1_CSV;
export const UNIVERSITY_V2_CSV = OXFORD_V2_CSV;

export function parseCsvTimetable(csvText: string): TimetableSession[] {
  const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Find column indexes with lenient matching
  const codeIdx = headers.findIndex(h => h.includes('code') || h === 'course' || h === 'sub code');
  const nameIdx = headers.findIndex(h => h.includes('name') || h === 'title' || h === 'subject');
  const sectionIdx = headers.findIndex(h => h.includes('section') || h === 'sec' || h === 'class' || h === 'batch');
  const dayIdx = headers.findIndex(h => h.includes('day'));
  const startIdx = headers.findIndex(h => h.includes('start'));
  const endIdx = headers.findIndex(h => h.includes('end'));
  const roomIdx = headers.findIndex(h => h.includes('room') || h.includes('venue') || h.includes('location') || h.includes('hall') || h.includes('lab'));
  const instructorIdx = headers.findIndex(h => h.includes('instructor') || h.includes('teacher') || h.includes('lecturer') || h.includes('prof') || h.includes('faculty'));

  const sessions: TimetableSession[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i];
    // Support basic CSV parsing handling potential quotes
    const cells: string[] = [];
    let inQuotes = false;
    let currentCell = '';
    
    for (let charIndex = 0; charIndex < rawLine.length; charIndex++) {
      const char = rawLine[charIndex];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());

    if (cells.length < 3) continue;

    const courseCode = (codeIdx >= 0 ? cells[codeIdx] : cells[0]) || `SUBJ-${i}`;
    const courseName = (nameIdx >= 0 ? cells[nameIdx] : cells[1]) || courseCode;
    const section = (sectionIdx >= 0 ? cells[sectionIdx] : cells[2]) || 'Class A';
    const day = (dayIdx >= 0 ? cells[dayIdx] : cells[3]) || 'Monday';
    const startTime = (startIdx >= 0 ? cells[startIdx] : cells[4]) || '09:00';
    const endTime = (endIdx >= 0 ? cells[endIdx] : cells[5]) || '10:30';
    const room = (roomIdx >= 0 ? cells[roomIdx] : cells[6]) || 'Room 101';
    const instructor = (instructorIdx >= 0 ? cells[instructorIdx] : cells[7]) || 'Subject Teacher';

    sessions.push({
      id: `sess-${i}-${courseCode}-${section}`.replace(/\s+/g, '-').toLowerCase(),
      courseCode: courseCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      section: section.trim(),
      day: day.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      room: room.trim(),
      instructor: instructor.trim(),
      rawRowIndex: i,
    });
  }

  return sessions;
}
