import { 
  TimetableSession, 
  SessionComparisonItem, 
  TimetableDiffSummary, 
  FieldChange 
} from '../types/timetable';

// Inconsistent label canonicalization map
const AI_ROOM_SYNONYMS: Record<string, string> = {
  // Computer labs
  'comp. laboratory': 'computer lab',
  'comp laboratory': 'computer lab',
  'comp. lab': 'computer lab',
  'comp lab': 'computer lab',
  'computing laboratory': 'computer lab',
  'computing lab': 'computer lab',
  'computer lab': 'computer lab',
  'computer laboratory': 'computer lab',
  'it lab': 'computer lab',
  'it laboratory': 'computer lab',

  // Chemistry labs
  'chem. lab': 'chemistry lab',
  'chem lab': 'chemistry lab',
  'chem. laboratory': 'chemistry lab',
  'chem laboratory': 'chemistry lab',
  'chemistry lab': 'chemistry lab',
  'chemistry laboratory': 'chemistry lab',

  // Physics labs
  'phys. lab': 'physics lab',
  'phys lab': 'physics lab',
  'phys. laboratory': 'physics lab',
  'phys laboratory': 'physics lab',
  'physics lab': 'physics lab',
  'physics laboratory': 'physics lab',

  // Biology labs
  'bio. lab': 'biology lab',
  'bio lab': 'biology lab',
  'bio. laboratory': 'biology lab',
  'bio laboratory': 'biology lab',
  'biology lab': 'biology lab',
  'biology laboratory': 'biology lab',

  // General school & campus blocks
  'main bldg': 'main block',
  'main building': 'main block',
  'main block': 'main block',
  'science wing': 'science block',
  'science block': 'science block',
  'sci block': 'science block',
  'math block': 'mathematics block',
  'maths block': 'mathematics block',
  'mathematics block': 'mathematics block',
  'radcliffe sci lib': 'radcliffe science library',
  'radcliffe sci library': 'radcliffe science library',
  'radcliffe science lib': 'radcliffe science library',
  'radcliffe science library': 'radcliffe science library',
  'andrew wiles bldg': 'andrew wiles building',
  'andrew wiles building': 'andrew wiles building',
  'turing lab': 'turing laboratory',
  'turing laboratory': 'turing laboratory',
  'codrington lib': 'codrington library',
  'codrington library': 'codrington library',
};

function normalizeString(val: string): string {
  return val.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function areRoomsSemanticallyEquivalent(room1: string, room2: string, enableAiInterpretation: boolean): { equivalent: boolean; reason?: string } {
  const norm1 = normalizeString(room1);
  const norm2 = normalizeString(room2);

  if (norm1 === norm2) {
    return { equivalent: true };
  }

  if (!enableAiInterpretation) {
    return { equivalent: false };
  }

  // Check synonym dictionary
  const canon1 = AI_ROOM_SYNONYMS[norm1] || norm1.replace(/\b(rm|bldg|lib|lab|dept)\b/g, (match) => {
    switch (match) {
      case 'rm': return 'room';
      case 'bldg': return 'building';
      case 'lib': return 'library';
      case 'lab': return 'laboratory';
      default: return match;
    }
  });

  const canon2 = AI_ROOM_SYNONYMS[norm2] || norm2.replace(/\b(rm|bldg|lib|lab|dept)\b/g, (match) => {
    switch (match) {
      case 'rm': return 'room';
      case 'bldg': return 'building';
      case 'lib': return 'library';
      case 'lab': return 'laboratory';
      default: return match;
    }
  });

  if (canon1 === canon2 || canon1.includes(canon2) || canon2.includes(canon1)) {
    return {
      equivalent: true,
      reason: `AI Interpretation: Resolved variant room labels ("${room1}" and "${room2}") as equivalent physical venue.`
    };
  }

  return { equivalent: false };
}

export interface DiffOptions {
  enableAiLabelInterpretation: boolean;
  userConfirmations: Record<string, 'confirmed' | 'rejected'>;
}

export function compareTimetableSessions(
  v1Sessions: TimetableSession[],
  v2Sessions: TimetableSession[],
  options: DiffOptions
): { items: SessionComparisonItem[]; summary: TimetableDiffSummary } {
  const items: SessionComparisonItem[] = [];
  const matchedV2Ids = new Set<string>();
  const matchedV1Ids = new Set<string>();

  // Helper to generate a candidate pair key for uncertain matches
  const getPairKey = (v1Id: string, v2Id: string) => `${v1Id}__vs__${v2Id}`;

  // STEP 1: Exact Match by Course Code + Section (Primary Session Key)
  for (const s1 of v1Sessions) {
    const s1Code = normalizeString(s1.courseCode);
    const s1Sec = normalizeString(s1.section);

    // Look for exact courseCode + section in v2
    const v2Match = v2Sessions.find(
      s2 => !matchedV2Ids.has(s2.id) &&
            normalizeString(s2.courseCode) === s1Code &&
            normalizeString(s2.section) === s1Sec
    );

    if (v2Match) {
      matchedV1Ids.add(s1.id);
      matchedV2Ids.add(v2Match.id);

      const differences: FieldChange[] = [];
      let isRoomChange = false;
      let isRescheduled = false;
      let isInstructorChange = false;
      let aiInterpretationNote: string | undefined = undefined;

      // Check Room
      const roomCheck = areRoomsSemanticallyEquivalent(s1.room, v2Match.room, options.enableAiLabelInterpretation);
      if (!roomCheck.equivalent) {
        isRoomChange = true;
        differences.push({
          field: 'room',
          fieldLabel: 'Room / Venue',
          oldValue: s1.room,
          newValue: v2Match.room,
        });
      } else if (roomCheck.reason) {
        aiInterpretationNote = roomCheck.reason;
      }

      // Check Schedule (Day, Start Time, End Time)
      const dayChanged = normalizeString(s1.day) !== normalizeString(v2Match.day);
      const timeChanged = s1.startTime !== v2Match.startTime || s1.endTime !== v2Match.endTime;
      if (dayChanged || timeChanged) {
        isRescheduled = true;
        differences.push({
          field: 'schedule',
          fieldLabel: 'Schedule / Day & Time',
          oldValue: `${s1.day} ${s1.startTime}–${s1.endTime}`,
          newValue: `${v2Match.day} ${v2Match.startTime}–${v2Match.endTime}`,
        });
      }

      // Check Instructor
      if (normalizeString(s1.instructor) !== normalizeString(v2Match.instructor)) {
        isInstructorChange = true;
        differences.push({
          field: 'instructor',
          fieldLabel: 'Instructor / Lecturer',
          oldValue: s1.instructor,
          newValue: v2Match.instructor,
        });
      }

      const isChanged = isRoomChange || isRescheduled || isInstructorChange;
      const wasReordered = (s1.rawRowIndex !== undefined && v2Match.rawRowIndex !== undefined)
        ? s1.rawRowIndex !== v2Match.rawRowIndex
        : false;

      items.push({
        id: `match-${s1.id}-${v2Match.id}`,
        changeType: isChanged ? 'changed' : 'unchanged',
        oldSession: s1,
        newSession: v2Match,
        courseCode: v2Match.courseCode,
        courseName: v2Match.courseName,
        section: v2Match.section,
        isRoomChange,
        isRescheduled,
        isInstructorChange,
        wasReordered,
        oldRowIndex: s1.rawRowIndex,
        newRowIndex: v2Match.rawRowIndex,
        isUncertain: false,
        confidenceScore: 1.0,
        differences,
        aiInterpretationNote,
      });
    }
  }

  // STEP 2: Heuristic & Candidate Matching for remaining unmatched sessions
  // Student Challenge: Match corresponding sessions even when rows move or labels/sections drift,
  // and ask the user to confirm uncertain matches!
  const remainingV1 = v1Sessions.filter(s1 => !matchedV1Ids.has(s1.id));
  const remainingV2 = v2Sessions.filter(s2 => !matchedV2Ids.has(s2.id));

  for (const s1 of remainingV1) {
    if (matchedV1Ids.has(s1.id)) continue;

    let bestV2Candidate: TimetableSession | null = null;
    let highestScore = 0;

    for (const s2 of remainingV2) {
      if (matchedV2Ids.has(s2.id)) continue;

      let score = 0;
      // Same course code is strong indicator
      if (normalizeString(s1.courseCode) === normalizeString(s2.courseCode)) {
        score += 0.50;
      }
      // Same instructor
      if (normalizeString(s1.instructor) === normalizeString(s2.instructor)) {
        score += 0.25;
      }
      // Same room
      if (normalizeString(s1.room) === normalizeString(s2.room)) {
        score += 0.15;
      }
      // Same day
      if (normalizeString(s1.day) === normalizeString(s2.day)) {
        score += 0.10;
      }

      if (score > highestScore) {
        highestScore = score;
        bestV2Candidate = s2;
      }
    }

    // Evaluate confidence threshold
    if (bestV2Candidate && highestScore >= 0.50) {
      const pairKey = getPairKey(s1.id, bestV2Candidate.id);
      const userChoice = options.userConfirmations[pairKey];

      // If user confirmed it, or confidence is very high (e.g. >= 0.85)
      if (userChoice === 'confirmed' || (!userChoice && highestScore >= 0.85)) {
        matchedV1Ids.add(s1.id);
        matchedV2Ids.add(bestV2Candidate.id);

        const differences: FieldChange[] = [];
        if (s1.section !== bestV2Candidate.section) {
          differences.push({
            field: 'section',
            fieldLabel: 'Section Designation',
            oldValue: s1.section,
            newValue: bestV2Candidate.section,
          });
        }
        if (s1.room !== bestV2Candidate.room) {
          differences.push({
            field: 'room',
            fieldLabel: 'Room / Venue',
            oldValue: s1.room,
            newValue: bestV2Candidate.room,
          });
        }
        if (s1.day !== bestV2Candidate.day || s1.startTime !== bestV2Candidate.startTime) {
          differences.push({
            field: 'schedule',
            fieldLabel: 'Schedule',
            oldValue: `${s1.day} ${s1.startTime}–${s1.endTime}`,
            newValue: `${bestV2Candidate.day} ${bestV2Candidate.startTime}–${bestV2Candidate.endTime}`,
          });
        }
        if (s1.instructor !== bestV2Candidate.instructor) {
          differences.push({
            field: 'instructor',
            fieldLabel: 'Instructor',
            oldValue: s1.instructor,
            newValue: bestV2Candidate.instructor,
          });
        }

        items.push({
          id: `match-fuzzy-${pairKey}`,
          changeType: 'changed',
          oldSession: s1,
          newSession: bestV2Candidate,
          courseCode: bestV2Candidate.courseCode,
          courseName: bestV2Candidate.courseName,
          section: bestV2Candidate.section,
          isRoomChange: s1.room !== bestV2Candidate.room,
          isRescheduled: s1.day !== bestV2Candidate.day || s1.startTime !== bestV2Candidate.startTime,
          isInstructorChange: s1.instructor !== bestV2Candidate.instructor,
          wasReordered: s1.rawRowIndex !== bestV2Candidate.rawRowIndex,
          oldRowIndex: s1.rawRowIndex,
          newRowIndex: bestV2Candidate.rawRowIndex,
          isUncertain: false,
          confidenceScore: highestScore,
          userDecision: 'confirmed',
          differences,
          aiInterpretationNote: userChoice === 'confirmed' ? 'Matched with student scholar confirmation.' : undefined,
        });
        continue;
      }

      // If user explicitly rejected the match, don't link them -> let them become added/removed below!
      if (userChoice === 'rejected') {
        // Do not match, proceed
      } else {
        // UNCERTAIN MATCH: Needs user confirmation!
        // We present this candidate pair to the user so they can confirm or reject
        matchedV1Ids.add(s1.id);
        matchedV2Ids.add(bestV2Candidate.id);

        const differences: FieldChange[] = [];
        if (s1.section !== bestV2Candidate.section) {
          differences.push({
            field: 'section',
            fieldLabel: 'Section Name',
            oldValue: s1.section,
            newValue: bestV2Candidate.section,
          });
        }
        if (s1.room !== bestV2Candidate.room) {
          differences.push({
            field: 'room',
            fieldLabel: 'Room / Venue',
            oldValue: s1.room,
            newValue: bestV2Candidate.room,
          });
        }
        if (s1.day !== bestV2Candidate.day || s1.startTime !== bestV2Candidate.startTime) {
          differences.push({
            field: 'schedule',
            fieldLabel: 'Schedule',
            oldValue: `${s1.day} ${s1.startTime}–${s1.endTime}`,
            newValue: `${bestV2Candidate.day} ${bestV2Candidate.startTime}–${bestV2Candidate.endTime}`,
          });
        }

        items.push({
          id: `uncertain-${pairKey}`,
          changeType: 'changed',
          oldSession: s1,
          newSession: bestV2Candidate,
          courseCode: s1.courseCode,
          courseName: s1.courseName,
          section: `${s1.section} → ${bestV2Candidate.section}`,
          isRoomChange: s1.room !== bestV2Candidate.room,
          isRescheduled: s1.day !== bestV2Candidate.day || s1.startTime !== bestV2Candidate.startTime,
          isInstructorChange: s1.instructor !== bestV2Candidate.instructor,
          wasReordered: s1.rawRowIndex !== bestV2Candidate.rawRowIndex,
          oldRowIndex: s1.rawRowIndex,
          newRowIndex: bestV2Candidate.rawRowIndex,
          isUncertain: true,
          uncertaintyReason: `Section name shifted from "${s1.section}" to "${bestV2Candidate.section}" with altered schedule. Please confirm if these represent the same session.`,
          confidenceScore: highestScore,
          userDecision: 'pending',
          differences,
        });
        continue;
      }
    }
  }

  // STEP 3: Remaining Unmatched V1 are REMOVED Sessions
  for (const s1 of v1Sessions) {
    if (!matchedV1Ids.has(s1.id)) {
      items.push({
        id: `removed-${s1.id}`,
        changeType: 'removed',
        oldSession: s1,
        courseCode: s1.courseCode,
        courseName: s1.courseName,
        section: s1.section,
        isRoomChange: false,
        isRescheduled: false,
        isInstructorChange: false,
        wasReordered: false,
        oldRowIndex: s1.rawRowIndex,
        isUncertain: false,
        confidenceScore: 1.0,
        differences: [
          {
            field: 'schedule',
            fieldLabel: 'Status',
            oldValue: `${s1.day} ${s1.startTime}–${s1.endTime} in ${s1.room}`,
            newValue: 'Session Cancelled / Removed in V2',
          }
        ],
      });
    }
  }

  // STEP 4: Remaining Unmatched V2 are ADDED Sessions
  for (const s2 of v2Sessions) {
    if (!matchedV2Ids.has(s2.id)) {
      items.push({
        id: `added-${s2.id}`,
        changeType: 'added',
        newSession: s2,
        courseCode: s2.courseCode,
        courseName: s2.courseName,
        section: s2.section,
        isRoomChange: false,
        isRescheduled: false,
        isInstructorChange: false,
        wasReordered: false,
        newRowIndex: s2.rawRowIndex,
        isUncertain: false,
        confidenceScore: 1.0,
        differences: [
          {
            field: 'schedule',
            fieldLabel: 'Status',
            oldValue: 'Not present in Version 1',
            newValue: `Newly Added: ${s2.day} ${s2.startTime}–${s2.endTime} in ${s2.room}`,
          }
        ],
      });
    }
  }

  // Calculate Summary metrics
  const addedCount = items.filter(i => i.changeType === 'added').length;
  const removedCount = items.filter(i => i.changeType === 'removed').length;
  const changedCount = items.filter(i => i.changeType === 'changed' && !i.isUncertain).length;
  const roomChangeCount = items.filter(i => i.isRoomChange && !i.isUncertain).length;
  const rescheduledCount = items.filter(i => i.isRescheduled && !i.isUncertain).length;
  const instructorChangeCount = items.filter(i => i.isInstructorChange && !i.isUncertain).length;
  const unchangedCount = items.filter(i => i.changeType === 'unchanged').length;
  const reorderedIgnoredCount = items.filter(i => i.changeType === 'unchanged' && i.wasReordered).length;
  const uncertainCount = items.filter(i => i.isUncertain).length;

  const summary: TimetableDiffSummary = {
    totalV1: v1Sessions.length,
    totalV2: v2Sessions.length,
    addedCount,
    removedCount,
    changedCount,
    roomChangeCount,
    rescheduledCount,
    instructorChangeCount,
    unchangedCount,
    reorderedIgnoredCount,
    uncertainCount,
  };

  return { items, summary };
}
