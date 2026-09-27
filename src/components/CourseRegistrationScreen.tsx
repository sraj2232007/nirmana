import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  GraduationCap, 
  MapPin, 
  PlusCircle, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  User, 
  Eye, 
  Calendar,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Award,
  ArrowLeftRight
} from 'lucide-react';
import { Course, ElectiveCourse, ReadingItem, TutorialRosterItem, StudentProfile } from '../types';
import { ENROLLED_COURSES, ELECTIVE_REGISTRY, TUTORIAL_ROSTER, CREDIT_BREAKDOWN } from '../data/mockData';
import { 
  INDIAN_COLLEGE_COURSES, 
  INDIAN_SCHOOL_COURSES, 
  INDIAN_COLLEGE_ELECTIVES,
  INDIAN_TUTORIAL_ROSTER,
  INDIAN_COLLEGE_CREDIT_BREAKDOWN 
} from '../data/indianCurriculumData';
import { INDIAN_COLLEGE_STUDENT } from '../data/indianStudentData';

interface CourseRegistrationScreenProps {
  isDarkMode: boolean;
  onExtractFolio: () => void;
  onOpenWaxSeal: () => void;
  onBookTutorial: (tutor: TutorialRosterItem) => void;
  onViewReading: (reading: ReadingItem, courseTitle: string) => void;
  onQueryAiTutor: (courseCode: string) => void;
  searchQuery: string;
  ballotElectives: ElectiveCourse[];
  setBallotElectives: React.Dispatch<React.SetStateAction<ElectiveCourse[]>>;
  onNavigateToDiff?: () => void;
  student?: StudentProfile;
}

export const CourseRegistrationScreen: React.FC<CourseRegistrationScreenProps> = ({
  isDarkMode,
  onExtractFolio,
  onOpenWaxSeal,
  onBookTutorial,
  onViewReading,
  onQueryAiTutor,
  searchQuery,
  ballotElectives,
  setBallotElectives,
  onNavigateToDiff,
  student = INDIAN_COLLEGE_STUDENT,
}) => {
  // Curriculum Mode: Indian College, Indian School, or Collegiate
  const getInitialCurriculum = (s: StudentProfile): 'indian-college' | 'indian-school' | 'collegiate' => {
    if (s.id.includes('iit')) return 'indian-college';
    if (s.id.includes('cbse')) return 'indian-school';
    return 'collegiate';
  };

  const [curriculumMode, setCurriculumMode] = useState<'indian-college' | 'indian-school' | 'collegiate'>(
    getInitialCurriculum(student)
  );

  // Sync when student changes
  React.useEffect(() => {
    setCurriculumMode(getInitialCurriculum(student));
  }, [student]);

  const activeCourses = curriculumMode === 'indian-college'
    ? INDIAN_COLLEGE_COURSES
    : curriculumMode === 'indian-school'
    ? INDIAN_SCHOOL_COURSES
    : ENROLLED_COURSES;

  // Selected course tab
  const [selectedCourseId, setSelectedCourseId] = useState<string>(activeCourses[0].id);

  // When activeCourses changes, ensure selectedCourseId exists
  React.useEffect(() => {
    if (!activeCourses.some(c => c.id === selectedCourseId)) {
      setSelectedCourseId(activeCourses[0].id);
    }
  }, [activeCourses, selectedCourseId]);

  const selectedCourse = activeCourses.find(c => c.id === selectedCourseId) || activeCourses[0];

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [auditRegistered, setAuditRegistered] = useState<Record<string, boolean>>({});

  // Credit math
  const baseCredits = activeCourses.reduce((acc, c) => acc + c.credits, 0);
  const electiveCredits = ballotElectives.reduce((acc, c) => acc + c.credits, 0);
  const totalCredits = baseCredits + electiveCredits;

  // Filtered electives
  const filteredElectives = ELECTIVE_REGISTRY.filter((el) => {
    const matchesSearch = 
      !searchQuery ||
      el.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'cs') return el.category === 'CS & AI';
    if (activeFilter === 'prereq') return el.prereq !== 'None';
    if (activeFilter === 'open') return el.seatsOpen > 0;
    return true;
  });

  const handleAddElective = (course: ElectiveCourse) => {
    if (totalCredits + course.credits > 20.0) {
      alert("Academic Maximum Quorum Reached (20.0 Credits). Cannot add further elective to Michaelmas Ballot without Dean's Special Dispensation.");
      return;
    }
    if (ballotElectives.some(e => e.id === course.id)) {
      alert(`${course.code} is already enrolled in your ballot slip.`);
      return;
    }
    setBallotElectives([...ballotElectives, course]);
  };

  const handleRemoveElective = (id: string) => {
    setBallotElectives(ballotElectives.filter(c => c.id !== id));
  };

  const handleToggleAudit = (id: string, code: string) => {
    setAuditRegistered(prev => ({ ...prev, [id]: !prev[id] }));
    alert(`Audit status updated for ${code}: You are registered to attend lectures without sit-in examination burdens.`);
  };

  return (
    <div className="w-full space-y-6">
      {/* ============================================================== */}
      {/* TOP BANNER / COLLEGIATE BOUND HEADER PLAQUE                   */}
      {/* ============================================================== */}
      <section className={`
        relative w-full rounded-2xl p-4 sm:p-6 lg:p-7 overflow-hidden border transition-all duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-r from-[#031122] via-[#0b1c33] to-[#08182c] border-[#1d3658] text-[#f8fafc] shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]' 
          : 'bg-gradient-to-r from-[#031427] via-[#0a233f] to-[#0e2744] border-[#1b314b] text-white shadow-[0_8px_24px_rgba(3,28,53,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]'}
      `}>
        {/* Subtle ambient gold glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#fde089]/5 blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#ffd768]/15 to-transparent" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Title & Matriculation Header */}
          <div className="flex items-start gap-3.5 sm:gap-4.5">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#091a2e]/90 border border-[#223d63] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.4)] flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-[#fed65b] to-[#b88c14] flex items-center justify-center text-[#2b1f00] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.4)]">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20 shadow-sm font-bold">
                  Folio #{student.folioNo} · Roll: {student.matriculationNo}
                </span>
                <span className="text-xs text-[#b0f1c4] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#52b788] shadow-[0_0_8px_rgba(82,183,136,0.9)] animate-pulse" />
                  {student.currentTerm.split('(')[0]} · Active
                </span>
              </div>

              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#fbf9f3] tracking-tight mt-1.5 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] leading-tight">
                {curriculumMode === 'indian-college' 
                  ? 'B.Tech Course Syllabus & Registration Ledger' 
                  : curriculumMode === 'indian-school' 
                  ? 'Senior Secondary Core Subjects & Lab Registers' 
                  : 'Course Registration & Academic Syllabus Repository'}
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-1 font-sans">
                {student.faculty} · {student.name} ({student.yearOfStudy}) · {student.institution}
              </p>

              {/* Curriculum selector tabs inside banner */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[11px] font-serif font-bold text-[#fde089] uppercase tracking-wider">
                  Curriculum Scope:
                </span>
                <button
                  onClick={() => {
                    setCurriculumMode('indian-college');
                    setSelectedCourseId(INDIAN_COLLEGE_COURSES[0].id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    curriculumMode === 'indian-college'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#52b788]" />
                  <span>Indian College (B.Tech CSE)</span>
                </button>

                <button
                  onClick={() => {
                    setCurriculumMode('indian-school');
                    setSelectedCourseId(INDIAN_SCHOOL_COURSES[0].id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    curriculumMode === 'indian-school'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Indian School (CBSE Class 12)</span>
                </button>

                <button
                  onClick={() => {
                    setCurriculumMode('collegiate');
                    setSelectedCourseId(ENROLLED_COURSES[0].id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    curriculumMode === 'collegiate'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#f5d061]" />
                  <span>Oxford Collegiate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Metric Plaque: Enrolled Credits */}
            <div className="px-4 py-2 rounded-xl bg-[#0b1b30]/90 border border-[#213b61] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <div className="text-[10px] uppercase tracking-wider text-[#ffd768] font-semibold">
                Curricular Quorum
              </div>
              <div className="flex items-baseline gap-1 mt-0.5 font-mono">
                <span className="text-lg sm:text-xl font-bold text-white">
                  {totalCredits.toFixed(0)}
                </span>
                <span className="text-xs text-slate-400">/ 20 Max Credits</span>
              </div>
            </div>

            {/* Metric Plaque: Standing */}
            <div className="px-4 py-2 rounded-xl bg-[#0b1b30]/90 border border-[#213b61] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
              <div className="text-[10px] uppercase tracking-wider text-[#ffd768] font-semibold">
                Standing
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#52b788]" />
                <span className="text-xs font-semibold text-[#b0f1c4]">
                  Dean Endorsed
                </span>
              </div>
            </div>

            {/* Skeuomorphic Brass-Foil Action Button */}
            <button
              onClick={onExtractFolio}
              id="printFolioBtn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1f1700] text-xs sm:text-sm font-serif font-bold shadow-[0_4px_12px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(0,0,0,0.4)] hover:brightness-105 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Extract Bound Folio (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* MAIN TWO-COLUMN COLLEGIATE LEDGER GRID                        */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: Enrolled Modules & Syllabus Dossier (8 cols)   */}
        {/* ============================================================ */}
        <div className="xl:col-span-8 flex flex-col gap-6 min-w-0">
          {/* Card 1: Michaelmas Enrolled Folios & Active Course Dossier */}
          <div className={`
            rounded-2xl overflow-hidden border transition-all duration-200
            ${isDarkMode 
              ? 'bg-[#0a1526] border-[#1d3557] shadow-[0_8px_24px_rgba(0,0,0,0.5)]' 
              : 'bg-[#fbf9f3] border-[#dcdad4] shadow-[0_4px_16px_rgba(27,49,75,0.08)]'}
          `}>
            {/* Header Strip */}
            <div className={`
              px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b
              ${isDarkMode 
                ? 'bg-[#06101f] border-[#1b3152]' 
                : 'bg-[#031c35] border-[#1b314b] text-white'}
            `}>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#f5d061]" />
                <div>
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#fbf9f3] tracking-tight leading-none">
                    Michaelmas Enrolled Folios
                  </h2>
                  <span className="text-[11px] text-[#93a9c7] uppercase tracking-widest mt-1 block">
                    4 Verified Reading Registers
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {onNavigateToDiff && (
                  <button
                    onClick={onNavigateToDiff}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172c47] hover:bg-[#1f3c63] text-[#fde089] border border-[#e5c158]/40 text-xs font-serif font-bold transition-all shadow-sm"
                    title="Compare two spreadsheet versions to detect room changes and rescheduled sessions"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Audit Timetable Changes (V1 vs V2)</span>
                  </button>
                )}

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122642] border border-[#23426e]">
                  <span className="w-2 h-2 rounded-full bg-[#f5d061] animate-pulse" />
                  <span className="text-xs font-semibold text-[#fde089]">
                    Week 7 Syllabus Active
                  </span>
                </div>
              </div>
            </div>

            {/* Course Selector Tabs Shelf */}
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeCourses.map((course) => {
                  const isSelected = course.id === selectedCourseId;
                  return (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`
                        text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden group
                        ${isSelected
                          ? isDarkMode
                            ? 'bg-gradient-to-b from-[#132742] to-[#0d1d33] border-[#e5c158] shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_2px_0_#e5c158]'
                            : 'bg-white border-[#735c00] shadow-[0_2px_6px_rgba(27,49,75,0.06),inset_0_2px_0_#735c00]'
                          : isDarkMode
                            ? 'bg-[#0d1c31] border-[#1d3454] hover:bg-[#12243d] text-slate-300'
                            : 'bg-[#f0eee8] border-[#e4e2dd] hover:bg-white text-slate-800'}
                      `}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#fde089]' : 'text-slate-400'
                        }`}>
                          {course.code} · {course.typeBadge}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30">
                          {course.credits} CR
                        </span>
                      </div>
                      <p className={`font-serif text-sm font-bold line-clamp-1 leading-tight ${
                        isSelected ? 'text-[#fbf9f3]' : isDarkMode ? 'text-slate-200' : 'text-[#031c35]'
                      }`}>
                        {course.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
                        {course.lecturer}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/30 pt-1.5">
                        <span className="text-[11px] font-medium">{course.examNote}</span>
                        <Bookmark className={`w-3.5 h-3.5 ${isSelected ? 'text-[#f5d061] fill-[#f5d061]' : 'text-slate-500'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Course Details Parchment Sheet */}
              <div className={`
                p-5 sm:p-6 rounded-2xl border relative transition-all duration-200
                ${isDarkMode 
                  ? 'bg-[#0d1b2f] border-[#223e66] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]' 
                  : 'bg-white border-[#e4e2dd] shadow-sm'}
              `}>
                {/* Skeuomorphic Paperclip & Stamp */}
                <div className="absolute -top-3.5 left-8 flex items-center gap-2">
                  <div className="w-4 h-8 rounded-full bg-gradient-to-b from-[#b38814] to-[#5a4816] shadow-md flex items-center justify-center border border-[#ffd768]/50">
                    <div className="w-1.5 h-6 rounded-full bg-[#fbf9f3]/60" />
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 bg-[#fde089] text-[#241a00] font-serif font-bold uppercase tracking-wider rounded shadow-sm">
                    Sub-Faculty Syndicate Certified
                  </span>
                </div>

                {/* Course Header Info & Lecturer Card */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-2 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#f5d061] font-semibold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4" />
                      <span>{selectedCourse.department}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#fbf9f3] tracking-tight">
                      {selectedCourse.code}: {selectedCourse.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
                      {selectedCourse.description}
                    </p>
                  </div>

                  {/* Lecturer Seal Card */}
                  <div className={`
                    p-3 rounded-xl border flex items-center gap-3 min-w-[220px] flex-shrink-0
                    ${isDarkMode ? 'bg-[#10233d] border-[#21406c]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}
                  `}>
                    <div className="w-10 h-10 rounded-full bg-[#051426] border border-[#f5d061]/40 flex items-center justify-center text-[#fde089] font-serif font-bold text-sm shadow-sm">
                      {selectedCourse.lecturerInitials}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-serif font-bold block text-slate-100 truncate">
                        {selectedCourse.lecturer}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {selectedCourse.lecturerRole}
                      </span>
                      <span className="text-[11px] text-[#f5d061] font-medium block truncate mt-0.5">
                        {selectedCourse.lecturerOffice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle double rule divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#25426e] to-transparent my-4" />

                {/* Bodleian Prescribed Readings */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#f5d061] flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      Bodleian Prescribed Readings & Archive Folios
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedCourse.classmark}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCourse.readings.map((reading) => (
                      <div
                        key={reading.id}
                        onClick={() => onViewReading(reading, selectedCourse.title)}
                        className={`
                          p-3 rounded-xl border flex items-start gap-3 cursor-pointer group transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-[#10223a] border-[#203a5f] hover:border-[#e5c158] hover:bg-[#142a47]' 
                            : 'bg-[#f0eee8] border-[#e4e2dd] hover:bg-white'}
                        `}
                      >
                        <div className={`
                          w-8 h-10 rounded flex flex-col items-center justify-center flex-shrink-0 shadow-sm
                          ${reading.type === 'TOME' 
                            ? 'bg-[#4b3519] text-[#fde089] border border-[#a37937]/50' 
                            : 'bg-[#152e4d] text-[#93c5fd] border border-[#2b598d]/50'}
                        `}>
                          <span className="text-[8px] font-mono font-bold leading-none">{reading.type}</span>
                          <FileText className="w-3.5 h-3.5 mt-0.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-serif font-bold text-slate-100 group-hover:text-[#fde089] transition-colors truncate">
                            {reading.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {reading.authors}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0a1727] text-slate-300 border border-slate-700/50">
                              {reading.callNumber}
                            </span>
                            <span className="text-[10px] text-[#f5d061] font-semibold">
                              {reading.statusBadge}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Syllabus Module Breakdown */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#f5d061] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Michaelmas Term Weekly Module Breakdown
                  </span>

                  <div className="space-y-2">
                    {selectedCourse.weeklyModules.map((m) => {
                      const isCurrent = m.status === 'in-progress';
                      return (
                        <div
                          key={m.id}
                          className={`
                            p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden transition-all
                            ${isCurrent
                              ? 'bg-gradient-to-r from-[#173050] to-[#12253f] border-[#e5c158] shadow-sm'
                              : isDarkMode
                                ? 'bg-[#0f2036] border-[#1d3557]'
                                : 'bg-[#f0eee8] border-[#e4e2dd]'}
                          `}
                        >
                          {isCurrent && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#e5c158]" />
                          )}

                          <div className="flex items-start sm:items-center gap-3">
                            <div className={`
                              w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                              ${m.status === 'completed'
                                ? 'bg-[#52b788] text-[#00210f]'
                                : isCurrent
                                  ? 'bg-[#ffd768] text-[#1f1700] animate-pulse'
                                  : 'bg-[#1b2f4a] text-slate-400'}
                            `}>
                              {m.status === 'completed' ? '✓' : isCurrent ? '▶' : m.lectures.split(' ')[1]?.split('–')[0] || '•'}
                            </div>

                            <div>
                              <div className="text-xs sm:text-sm font-serif font-bold text-slate-100">
                                {m.weekSpan}: {m.title}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-tight">
                                {m.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091524] text-slate-300 border border-slate-700">
                              {m.lectures}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                              m.status === 'completed'
                                ? 'bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/30'
                                : isCurrent
                                  ? 'bg-[#ffd768] text-[#1f1700]'
                                  : 'bg-[#1a2c46] text-slate-400'
                            }`}>
                              {m.statusText}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Examination & Practical Weightings */}
                <div className={`
                  p-4 rounded-xl border mb-4
                  ${isDarkMode ? 'bg-[#0a1728] border-[#1d3659]' : 'bg-[#f0eee8] border-[#e4e2dd]'}
                `}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-serif uppercase tracking-wider font-bold text-[#f5d061]">
                      Examination & Practical Folio Weighting
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Moderated by External Examiners
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    {selectedCourse.assessments.map((a) => (
                      <div
                        key={a.id}
                        className={`p-3 rounded-lg border ${
                          isDarkMode ? 'bg-[#0f2139] border-[#203c64]' : 'bg-white border-[#e4e2dd]'
                        }`}
                      >
                        <div className="font-serif text-xl font-bold text-[#fde089]">
                          {a.weight}%
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">
                          {a.title}
                        </div>
                        <span className="text-[10px] text-[#f5d061] block mt-1">
                          {a.deadlineText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Ribbon: Downloads & AI Academic Tutor Query */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={onExtractFolio}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#051426] hover:bg-[#0c223d] text-slate-200 text-xs font-semibold border border-[#223f66] transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-[#f5d061]" />
                      <span>Complete Reading Docket (PDF)</span>
                    </button>
                    <button
                      onClick={() => onQueryAiTutor(selectedCourse.code)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#142845] hover:bg-[#1a3459] text-[#fde089] text-xs font-semibold border border-[#e5c158]/40 transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Query in AI Academic Tutor</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 italic">
                    Last syllabus revision signed on {selectedCourse.lastRevision}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* Card 2: Elective Registration & Add/Drop Registry          */}
          {/* ========================================================== */}
          <div className={`
            rounded-2xl overflow-hidden border transition-all duration-200
            ${isDarkMode 
              ? 'bg-[#0a1526] border-[#1d3557] shadow-[0_8px_24px_rgba(0,0,0,0.5)]' 
              : 'bg-[#fbf9f3] border-[#dcdad4] shadow-[0_4px_16px_rgba(27,49,75,0.08)]'}
          `}>
            {/* Header */}
            <div className={`
              px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b
              ${isDarkMode 
                ? 'bg-[#06101f] border-[#1b3152]' 
                : 'bg-[#031c35] border-[#1b314b] text-white'}
            `}>
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-5 h-5 text-[#f5d061]" />
                <div>
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#fbf9f3] tracking-tight leading-none">
                    Elective Registration & Add/Drop Registry
                  </h2>
                  <span className="text-[11px] text-[#93a9c7] uppercase tracking-widest mt-1 block">
                    Hilary Term 2026 Ballot Window
                  </span>
                </div>
              </div>

              <span className="text-xs text-[#ffd768] bg-[#735c00]/30 border border-[#ffd768]/30 px-3 py-1 rounded-full font-semibold">
                Closes in 4 Days (Friday 17:00)
              </span>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Filter Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'All Faculties' },
                    { id: 'cs', label: 'Honors CS & AI' },
                    { id: 'prereq', label: 'Prerequisites Satisfied (3)' },
                    { id: 'open', label: 'Open Quorum Only' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${activeFilter === filter.id
                          ? 'bg-[#142845] border border-[#e5c158] text-[#fde089] font-bold shadow-sm'
                          : isDarkMode
                            ? 'bg-[#0e1c31] border border-[#1d3557] text-slate-400 hover:text-slate-200'
                            : 'bg-[#eae8e2] text-slate-700 hover:bg-white'}
                      `}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  Showing {filteredElectives.length} Available Courses
                </span>
              </div>

              {/* Elective list */}
              <div className="space-y-3">
                {filteredElectives.map((el) => {
                  const isEnrolled = ballotElectives.some(b => b.id === el.id);
                  const isAudited = auditRegistered[el.id];

                  return (
                    <div
                      key={el.id}
                      className={`
                        p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all
                        ${isDarkMode 
                          ? 'bg-[#0d1a2c] border-[#1d3454] hover:border-[#2b4d79]' 
                          : 'bg-white border-[#e4e2dd] hover:shadow-sm'}
                      `}
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner
                          ${isDarkMode ? 'bg-[#12243d] text-[#f5d061] border border-[#213e68]' : 'bg-[#eae8e2] text-[#735c00]'}
                        `}>
                          <BookOpen className="w-6 h-6" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f5d061]/20 text-[#fde089] border border-[#f5d061]/30">
                              {el.code}
                            </span>
                            <span className="text-xs text-slate-400 truncate">
                              {el.faculty}
                            </span>
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-[#52b788]/20 text-[#52b788]">
                              {el.credits} Credits {el.isAuditOnly && '· Audit'}
                            </span>
                          </div>

                          <h4 className="font-serif text-sm sm:text-base font-bold text-slate-100">
                            {el.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed font-sans">
                            {el.description}
                          </p>

                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-sans flex-wrap">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-[#f5d061]" />
                              {el.lecturer}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#f5d061]" />
                              {el.schedule}
                            </span>
                            <span className="flex items-center gap-1 text-[#52b788] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
                              {el.seatsOpen} of {el.totalSeats} Seats Open
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right button column */}
                      <div className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0">
                        {el.isAuditOnly ? (
                          <button
                            onClick={() => handleToggleAudit(el.id, el.code)}
                            className={`
                              px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 border
                              ${isAudited 
                                ? 'bg-[#52b788]/20 text-[#52b788] border-[#52b788]/40' 
                                : isDarkMode 
                                  ? 'bg-[#152a48] text-slate-200 border-[#223f66] hover:bg-[#1b355a]' 
                                  : 'bg-[#eae8e2] text-slate-800'}
                            `}
                          >
                            <Eye className="w-3.5 h-3.5 text-[#f5d061]" />
                            <span>{isAudited ? 'Audit Enrolled' : 'Register Audit'}</span>
                          </button>
                        ) : (
                          <button
                            disabled={isEnrolled}
                            onClick={() => handleAddElective(el)}
                            className={`
                              px-4 py-2 rounded-xl text-xs font-serif font-bold shadow-md transition-all flex items-center gap-1.5
                              ${isEnrolled
                                ? 'bg-[#1b2b40] text-slate-400 border border-slate-700 cursor-not-allowed'
                                : 'bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] hover:brightness-105 active:scale-95'}
                            `}
                          >
                            {isEnrolled ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
                                <span>Enrolled in Ballot</span>
                              </>
                            ) : (
                              <>
                                <PlusCircle className="w-4 h-4" />
                                <span>Add to Ballot</span>
                              </>
                            )}
                          </button>
                        )}
                        <span className="text-[11px] text-slate-400">
                          Prereq: {el.prereq}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Chronometer, Ballot Slip & Tutors (4 cols)    */}
        {/* ============================================================ */}
        <div className="xl:col-span-4 flex flex-col gap-6 min-w-0">
          {/* Card 1: Curricular Credit Chronometer */}
          <div className={`
            rounded-2xl overflow-hidden border transition-all duration-200
            ${isDarkMode 
              ? 'bg-[#0a1526] border-[#1d3557] shadow-[0_8px_24px_rgba(0,0,0,0.5)]' 
              : 'bg-[#fbf9f3] border-[#dcdad4] shadow-[0_4px_16px_rgba(27,49,75,0.08)]'}
          `}>
            <div className={`
              px-5 py-3.5 flex items-center justify-between border-b
              ${isDarkMode 
                ? 'bg-[#06101f] border-[#1b3152]' 
                : 'bg-[#031c35] border-[#1b314b] text-white'}
            `}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#f5d061]" />
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#fbf9f3] leading-none">
                  Credit Chronometer
                </h3>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5d061]">
                B.A. (Hons) Progress
              </span>
            </div>

            <div className="p-5">
              {/* Circular Gauge Visualization */}
              <div className="flex items-center justify-center py-2 relative">
                <svg className="w-40 h-40 sm:w-44 sm:h-44 -rotate-90 transform" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    className="text-[#13253e]"
                    stroke="currentColor"
                    strokeWidth="9"
                  />
                  {/* Primary Progress Arc (88 / 120 = 73.3%) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    className="text-[#f5d061]"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeDasharray="314.159"
                    strokeDashoffset="84"
                    strokeLinecap="round"
                  />
                  {/* Dynamic Elective Glow Arc */}
                  {ballotElectives.length > 0 && (
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="transparent"
                      className="text-[#52b788]"
                      stroke="currentColor"
                      strokeWidth="9"
                      strokeDasharray="314.159"
                      strokeDashoffset="72"
                      strokeLinecap="round"
                    />
                  )}
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Matriculation
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mt-0.5">
                    88<span className="text-sm font-normal text-slate-400">/120</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fde089] text-[#241a00] font-bold mt-1 shadow-sm">
                    73.3% Complete
                  </span>
                </div>
              </div>

              {/* Requirement Sub-Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#1e3455]/50">
                {CREDIT_BREAKDOWN.map((cat) => (
                  <div
                    key={cat.label}
                    className={`
                      p-2.5 rounded-xl border flex items-center justify-between text-xs
                      ${isDarkMode ? 'bg-[#0d1c31] border-[#1d3557]' : 'bg-[#f0eee8] border-[#e4e2dd]'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-200 font-medium">{cat.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400">
                        {cat.current}/{cat.total} CR
                      </span>
                      {cat.status ? (
                        <span className="text-[10px] px-1.5 rounded font-mono font-bold bg-[#f5d061]/20 text-[#fde089]">
                          {cat.status}
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 rounded font-mono font-bold bg-[#52b788]/20 text-[#52b788]">
                          {cat.percentage}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Ballot Dispatch Slip (Checkout Docket) */}
          <div className={`
            rounded-2xl overflow-hidden border transition-all duration-200 relative
            ${isDarkMode 
              ? 'bg-[#0a1526] border-[#1d3557] shadow-[0_8px_24px_rgba(0,0,0,0.5)]' 
              : 'bg-[#fbf9f3] border-[#dcdad4] shadow-[0_4px_16px_rgba(27,49,75,0.08)]'}
          `}>
            {/* Header */}
            <div className="w-full bg-[#050e1c] p-4 text-[#fbf9f3] flex items-center justify-between border-b border-[#1b3152]">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#f5d061]" />
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-none block">
                    Ballot Dispatch Slip
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                    Docket #MIC-2025-08
                  </span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#80640f] flex items-center justify-center text-[#241a00] shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Zero clash banner */}
              <div className="p-3 rounded-xl bg-[#00381e]/40 border border-[#0f5130] text-[#b0f1c4] flex items-start gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#52b788] flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-tight">
                  <strong className="text-white block">Zero Lecture Schedule Clashes</strong>
                  <span className="text-[11px] text-[#95d5a9]">
                    All tutorial hours verified against Oxford Term Timetable.
                  </span>
                </div>
              </div>

              {/* Course items */}
              <div className="space-y-2">
                {ENROLLED_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className={`
                      p-2.5 rounded-xl border flex items-center justify-between text-xs
                      ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-[#f0eee8] border-[#e4e2dd]'}
                    `}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-serif font-bold text-slate-100 block truncate">
                        {course.code}: {course.title}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {course.typeBadge} Requirement
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#fde089] text-xs">
                      {course.credits}.0 CR
                    </span>
                  </div>
                ))}

                {/* Dynamically Added Electives */}
                {ballotElectives.map((el) => (
                  <div
                    key={el.id}
                    className="p-2.5 rounded-xl bg-[#173050] border border-[#e5c158] flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-150"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-serif font-bold text-[#fde089] block truncate">
                        {el.code}: {el.title}
                      </span>
                      <span className="text-[11px] text-[#52b788] font-medium">
                        Added to Michaelmas Ballot
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#fde089] text-xs">
                        +{el.credits}.0 CR
                      </span>
                      <button
                        onClick={() => handleRemoveElective(el.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Remove from ballot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ruled Summary Line */}
              <div className="py-3 border-t border-b border-[#1e3455] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Total Term Units
                  </span>
                  <div className="text-xs text-[#52b788] font-semibold">
                    Academic Quorum Satisfied
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {totalCredits.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400"> / 20.0 Max</span>
                </div>
              </div>

              {/* Skeuomorphic Wax Seal Button */}
              <button
                onClick={onOpenWaxSeal}
                id="affixSealBtn"
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-b from-[#8f1919] via-[#750e0e] to-[#540707] text-[#fff3f3] p-3 shadow-[0_6px_20px_rgba(117,14,14,0.45),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-1px_3px_rgba(0,0,0,0.5)] hover:brightness-110 active:scale-98 transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#540707] to-[#ba1a1a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-[#fde089]" />
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-sm font-bold leading-tight">
                      Affix Wax Seal & Submit Ballot
                    </div>
                    <div className="text-[10px] text-[#ffdad6] opacity-90">
                      Transmit to Senior Tutor & Bursar
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Card 3: Senior Tutorial Roster */}
          <div className={`
            rounded-2xl overflow-hidden border transition-all duration-200
            ${isDarkMode 
              ? 'bg-[#0a1526] border-[#1d3557] shadow-[0_8px_24px_rgba(0,0,0,0.5)]' 
              : 'bg-[#fbf9f3] border-[#dcdad4] shadow-[0_4px_16px_rgba(27,49,75,0.08)]'}
          `}>
            <div className={`
              px-5 py-3.5 flex items-center justify-between border-b
              ${isDarkMode 
                ? 'bg-[#06101f] border-[#1b3152]' 
                : 'bg-[#031c35] border-[#1b314b] text-white'}
            `}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#f5d061]" />
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#fbf9f3] leading-none">
                  Senior Tutorial Roster
                </h3>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#f5d061]">
                Radcliffe Quad
              </span>
            </div>

            <div className="p-5 space-y-3">
              {TUTORIAL_ROSTER.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`
                    p-3 rounded-xl border flex items-center justify-between text-xs transition-all
                    ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3454]' : 'bg-[#f0eee8] border-[#e4e2dd]'}
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#12243d] border border-[#23426e] text-[#fde089] font-serif font-bold flex items-center justify-center text-xs">
                      {tutor.initials}
                    </div>
                    <div>
                      <span className="font-serif font-bold text-slate-100 block leading-tight">
                        {tutor.name}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        {tutor.college} · {tutor.office}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#f5d061] font-bold block">
                      {tutor.day}
                    </span>
                    <button
                      onClick={() => onBookTutorial(tutor)}
                      className="text-xs text-[#93c5fd] hover:text-[#fde089] hover:underline font-semibold"
                    >
                      Book Slip →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
