import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  User,
  Printer
} from 'lucide-react';
import { ENROLLED_COURSES } from '../data/mockData';
import { INDIAN_COLLEGE_COURSES, INDIAN_SCHOOL_COURSES } from '../data/indianCurriculumData';
import { StudentProfile } from '../types';
import { INDIAN_COLLEGE_STUDENT } from '../data/indianStudentData';

interface OverviewScreenProps {
  isDarkMode: boolean;
  onNavigateToCourses: () => void;
  student?: StudentProfile;
  onNavigateToProfile?: () => void;
  onNavigateToDiff?: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  isDarkMode,
  onNavigateToCourses,
  student = INDIAN_COLLEGE_STUDENT,
  onNavigateToProfile,
  onNavigateToDiff,
}) => {
  const isIndianCollege = student.id.includes('iit');
  const isIndianSchool = student.id.includes('cbse');

  const activeCourses = isIndianCollege 
    ? INDIAN_COLLEGE_COURSES 
    : isIndianSchool 
    ? INDIAN_SCHOOL_COURSES 
    : ENROLLED_COURSES;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Overview Plaque Header */}
      <section className={`
        relative w-full rounded-2xl p-5 sm:p-7 overflow-hidden border
        ${isDarkMode 
          ? 'bg-gradient-to-r from-[#031122] via-[#0b1c33] to-[#08182c] border-[#1d3658] text-[#f8fafc] shadow-xl' 
          : 'bg-gradient-to-r from-[#031427] via-[#0a233f] to-[#0e2744] border-[#1b314b] text-white shadow-lg'}
      `}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#091a2e] border border-[#223d63] shadow-md flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#b38814] flex items-center justify-center text-[#211700]">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20 font-bold">
                  {student.institution.split('/')[0]}
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {student.standing}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
                {student.name} · Student Scholar Folio
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
                {student.program} · {student.residentialHouse} · {student.yearOfStudy}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {onNavigateToProfile && (
              <button
                onClick={onNavigateToProfile}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#10243d] hover:bg-[#163050] text-[#fde089] text-xs font-serif font-bold border border-[#23426e] transition-all shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>View Full Profile</span>
              </button>
            )}

            <button
              onClick={onNavigateToCourses}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow-md hover:brightness-105 transition-all"
            >
              <span>View Curriculum</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: isIndianSchool ? 'CBSE Core Papers' : 'Degree Credits Quorum', 
            val: `${student.completedCredits} / ${student.totalDegreeCredits}`, 
            sub: isIndianSchool ? 'Class 12 Board Cohort' : `${Math.round((student.completedCredits / student.totalDegreeCredits) * 100)}% Degree Quorum`, 
            badge: 'On Track', 
            color: 'text-[#f5d061]' 
          },
          { 
            label: isIndianSchool ? 'Pre-Board Score' : 'Active Term Units', 
            val: isIndianSchool ? '96.8%' : `${student.enrolledCredits}.0 CR`, 
            sub: isIndianSchool ? 'Rank 1 in Senior Science' : `${activeCourses.length} Registered Courses`, 
            badge: 'Active', 
            color: 'text-emerald-400' 
          },
          { 
            label: 'Cumulative Performance', 
            val: student.gpa.split('(')[0], 
            sub: student.standing.split('·')[0], 
            badge: 'Merit List', 
            color: 'text-sky-400' 
          },
          { 
            label: 'Attendance Register', 
            val: student.attendanceRate.split(' ')[0], 
            sub: student.attendanceRate.split(' ').slice(1).join(' '), 
            badge: 'Verified', 
            color: 'text-[#fde089]' 
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className={`
              p-4 rounded-xl border transition-all
              ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
            `}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>{kpi.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#142845] text-[#fde089]">
                {kpi.badge}
              </span>
            </div>
            <div className={`font-serif text-2xl font-bold ${kpi.color}`}>
              {kpi.val}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout for Overview details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Enrolled Courses Quick Summary (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className={`
            p-5 sm:p-6 rounded-2xl border
            ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
          `}>
            <div className="flex items-center justify-between pb-4 border-b border-[#1b3152] mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#f5d061]" />
                <h3 className="font-serif text-base font-bold text-slate-100">
                  {student.currentTerm} · Active General Subjects
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">In Session</span>
            </div>

            <div className="space-y-3">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className={`
                    p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3
                    ${isDarkMode ? 'bg-[#0d1b2e] border-[#1d3557]' : 'bg-white border-[#e4e2dd]'}
                  `}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fde089] mb-0.5">
                      <span>{course.code}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{course.typeBadge}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-emerald-400 font-normal">Active Quorum</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-slate-100">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {course.lecturer} ({course.lecturerRole})
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#fde089] block">
                        {course.credits}.0 CR
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {course.examNote.split(':')[0]}
                      </span>
                    </div>
                    <button
                      onClick={onNavigateToCourses}
                      className="p-2 rounded-lg bg-[#142845] hover:bg-[#1a3459] text-slate-200 transition-colors"
                      title="Open Course Syllabus"
                    >
                      <ArrowUpRight className="w-4 h-4 text-[#f5d061]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Academic Milestones & Timetable link (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`
            p-5 rounded-2xl border
            ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
          `}>
            <div className="flex items-center gap-2 pb-3 border-b border-[#1b3152] mb-3">
              <Calendar className="w-4 h-4 text-[#f5d061]" />
              <h3 className="font-serif text-sm font-bold text-slate-100">
                Academic Session Milestones
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0d1a2c] border border-[#1b3352]">
                <div className="flex items-center justify-between text-[#fde089] font-bold mb-1">
                  <span>{isIndianCollege ? 'Minor Exam 2 & Lab Viva' : isIndianSchool ? 'CBSE Pre-Board Exam 1' : 'Week 7 Code Review'}</span>
                  <span>Nov 24</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {isIndianCollege ? 'Data Structures & Algorithms lab practical assessments.' : isIndianSchool ? 'Class 12 Physics & Chemistry Board preparatory paper.' : 'CS301 lab submission.'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0d1a2c] border border-[#1b3352]">
                <div className="flex items-center justify-between text-[#fde089] font-bold mb-1">
                  <span>Timetable Revision Released</span>
                  <span>V2 Active</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Audit changes between Timetable V1 and V2 for room reassignments.
                </p>
                {onNavigateToDiff && (
                  <button 
                    onClick={onNavigateToDiff}
                    className="mt-2 text-[11px] text-[#52b788] hover:underline font-bold flex items-center gap-1"
                  >
                    Open Timetable Diff & Audit →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CURRENT STUDENT OFFICIAL PROFILE & IDENTITY DOSSIER            */}
      {/* ============================================================== */}
      <section className={`
        rounded-2xl border p-5 sm:p-7 space-y-5 transition-all
        ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
      `}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1b3152] gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#f5d061]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-100">
                Current Student Identity & Academic Dossier
              </h3>
              <p className="text-xs text-slate-400">
                Official Matriculation Registry Record · {student.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#10233d] text-[#fde089] border border-[#23426e]">
              RFID {student.matriculationNo} · Verified Active
            </span>
          </div>
        </div>

        {/* Profile Details Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Avatar & Standing Badges (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-5 rounded-xl bg-[#091424] border border-[#1b2f4d] space-y-3">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#b88c14] via-[#ffd768] to-[#996d00] shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
              <img 
                src={student.photoUrl} 
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden w-24 h-24 rounded-full bg-[#1b314b] text-[#ffe088] font-bold text-2xl items-center justify-center">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute bottom-1 right-1 p-1 rounded-full bg-[#52b788] text-[#00210f] border-2 border-[#091424]" title="Active Registered Scholar">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-slate-100">
                {student.name}
              </h4>
              <p className="text-xs text-[#fde089] font-mono mt-0.5">
                Folio #{student.folioNo} · Roll No. {student.matriculationNo}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {student.program}
              </p>
              <span className="inline-block text-[11px] px-2.5 py-0.5 mt-2 rounded-full bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/40 font-semibold">
                {student.standing}
              </span>
            </div>

            <div className="w-full pt-3 border-t border-[#1b3152] grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-[#0d1c31] border border-[#1d3557]">
                <span className="text-[10px] text-slate-400 uppercase block">Hostel / House</span>
                <span className="font-serif font-bold text-slate-200 truncate block">
                  {student.residentialHouse.split('·')[0]}
                </span>
              </div>
              <div className="p-2 rounded bg-[#0d1c31] border border-[#1d3557]">
                <span className="text-[10px] text-slate-400 uppercase block">Cohort Rank</span>
                <span className="font-serif font-bold text-sky-400 truncate block">
                  {student.rank.split('in')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Right Information Fields (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Faculty & Department
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {student.faculty}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Advisor / Class Teacher
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {student.advisor}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Residential Hall & Campus Wing
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {student.residentialHouse}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Official Student Email
                </span>
                <p className="font-mono text-slate-200 leading-relaxed truncate">
                  {student.email}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Cumulative Academic Standing
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {student.gpa}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#091424] border border-[#1b2f4d]">
                <span className="text-[10px] text-[#f5d061] uppercase tracking-wider font-bold block mb-1">
                  Biometric Attendance Quorum
                </span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {student.attendanceRate}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1a2e] border border-[#1e3b63] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-serif font-bold text-slate-100 block">
                  Official Bonafide & Transcript Dossier
                </span>
                <span className="text-slate-400 text-[11px]">
                  Endorsed by Dean of Academic Affairs & Controller of Examinations.
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onNavigateToProfile && (
                  <button
                    onClick={onNavigateToProfile}
                    className="px-3.5 py-2 rounded-xl bg-[#142845] hover:bg-[#1a3459] text-slate-200 text-xs font-semibold border border-[#233f66] transition-all flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-[#f5d061]" />
                    <span>Open Profile</span>
                  </button>
                )}

                <button
                  onClick={() => alert(`Official Transcript Dossier printed for ${student.name} (${student.matriculationNo}).`)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Extract Transcript</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

