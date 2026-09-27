import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download, 
  ArrowLeftRight, 
  Edit3, 
  Save, 
  Sparkles,
  Building,
  Clock,
  FileText
} from 'lucide-react';
import { StudentProfile } from '../types';
import { 
  INDIAN_COLLEGE_STUDENT, 
  INDIAN_HIGHER_SECONDARY_STUDENT, 
  OXFORD_STUDENT 
} from '../data/indianStudentData';

interface StudentProfileScreenProps {
  currentStudent: StudentProfile;
  onSelectStudent: (student: StudentProfile) => void;
  isDarkMode: boolean;
  onNavigateToDiff?: () => void;
  onNavigateToCourses?: () => void;
}

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({
  currentStudent,
  onSelectStudent,
  isDarkMode,
  onNavigateToDiff,
  onNavigateToCourses,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(currentStudent.email);
  const [hostel, setHostel] = useState(currentStudent.residentialHouse);
  const [emergencyContact, setEmergencyContact] = useState(currentStudent.emergencyContact);
  const [saveToast, setSaveToast] = useState(false);

  // Sync state if currentStudent changes
  React.useEffect(() => {
    setEmail(currentStudent.email);
    setHostel(currentStudent.residentialHouse);
    setEmergencyContact(currentStudent.emergencyContact);
  }, [currentStudent]);

  const handleSave = () => {
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const isIndianCollege = currentStudent.id === INDIAN_COLLEGE_STUDENT.id;
  const isIndianSchool = currentStudent.id === INDIAN_HIGHER_SECONDARY_STUDENT.id;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Profile Switcher */}
      <section className={`
        relative w-full rounded-2xl p-6 sm:p-8 overflow-hidden border
        ${isDarkMode 
          ? 'bg-gradient-to-r from-[#031122] via-[#091a30] to-[#061527] border-[#1d3658] text-[#f8fafc] shadow-xl' 
          : 'bg-gradient-to-r from-[#041930] via-[#0b2545] to-[#102d50] border-[#1b314b] text-white shadow-lg'}
      `}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20 font-bold">
                Official Student Identity Ledger
              </span>
              <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Biometric Identity Verified · Active Standing
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
              Current Student Dossier & Academic Record
            </h1>
            <p className="text-xs sm:text-sm text-[#b5c7e0] mt-1 max-w-2xl">
              Inspect current matriculation details, roll number, semester GPA, biometric attendance quorum, and enrolled subjects across Indian schools & colleges.
            </p>

            {/* Profile Quick-Switch Tabs */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-xs font-serif font-bold text-[#fde089] uppercase tracking-wider mr-1">
                Active Scholar:
              </span>

              <button
                onClick={() => onSelectStudent(INDIAN_COLLEGE_STUDENT)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isIndianCollege 
                    ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-md ring-1 ring-[#e5c158]/50' 
                    : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#52b788]" />
                <span className="font-serif">Aarav Sharma</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[#52b788]">
                  IIT / B.Tech CSE
                </span>
              </button>

              <button
                onClick={() => onSelectStudent(INDIAN_HIGHER_SECONDARY_STUDENT)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  isIndianSchool 
                    ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-md ring-1 ring-[#e5c158]/50' 
                    : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span className="font-serif">Ananya Iyer</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[#38bdf8]">
                  CBSE Class 12 Science
                </span>
              </button>

              <button
                onClick={() => onSelectStudent(OXFORD_STUDENT)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                  currentStudent.id === OXFORD_STUDENT.id 
                    ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-md ring-1 ring-[#e5c158]/50' 
                    : 'bg-[#091524] border-[#1d3350] text-slate-300 hover:text-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#d97706]" />
                <span className="font-serif">Helena Vance</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[#d97706]">
                  Oxford Scholar
                </span>
              </button>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-row lg:flex-col gap-2.5 flex-wrap">
            <button
              onClick={() => {
                alert(`Printing Official Student Identity Card for ${currentStudent.name} (${currentStudent.matriculationNo})`);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#142845] hover:bg-[#1a3459] text-slate-200 text-xs font-semibold border border-[#233f66] transition-all"
            >
              <Printer className="w-4 h-4 text-[#f5d061]" />
              <span>Print Student ID Card</span>
            </button>

            <button
              onClick={() => {
                alert(`Generated Institutional Bonafide Certificate for ${currentStudent.name}, ${currentStudent.institution}`);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#142845] hover:bg-[#1a3459] text-slate-200 text-xs font-semibold border border-[#233f66] transition-all"
            >
              <Download className="w-4 h-4 text-[#52b788]" />
              <span>Bonafide Certificate</span>
            </button>

            {onNavigateToDiff && (
              <button
                onClick={onNavigateToDiff}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow hover:brightness-105 transition-all"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Audit Timetable Changes</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Toast notification on saving */}
      {saveToast && (
        <div className="p-3.5 rounded-xl bg-[#0e3b26] border border-[#1b6b47] text-[#9df2c6] text-xs font-medium flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#52b788]" />
            <span>Student profile contact records successfully updated in collegiate database.</span>
          </div>
          <button onClick={() => setSaveToast(false)} className="text-slate-300 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Student Identity Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Student ID & Contact Record (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official University Card */}
          <div className={`
            rounded-2xl border overflow-hidden p-6 shadow-xl relative
            ${isDarkMode ? 'bg-[#0a1526] border-[#1e385e]' : 'bg-white border-slate-200'}
          `}>
            {/* Holographic Watermark ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd768] via-[#52b788] to-[#0284c7]" />

            <div className="flex items-center justify-between border-b pb-4 mb-5 border-[#1b3152]/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#996d00] flex items-center justify-center text-[#211600] font-bold text-xs shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-[#f6d56d] block leading-tight">
                    {isIndianCollege ? 'INDIAN INSTITUTE OF TECHNOLOGY' : isIndianSchool ? 'CENTRAL BOARD OF SECONDARY EDUCATION' : 'UNIVERSITY OF OXFORD'}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Official Student Identity Card · {currentStudent.folioNo}
                  </span>
                </div>
              </div>

              <div className="px-2 py-0.5 rounded-full bg-[#52b788]/20 border border-[#52b788]/40 text-[#52b788] text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Active
              </div>
            </div>

            {/* Photo & Core Bio */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5">
              <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-[#b88c14] via-[#ffd768] to-[#996d00] shadow-md flex-shrink-0">
                <img 
                  src={currentStudent.photoUrl} 
                  alt={currentStudent.name}
                  className="w-24 h-24 rounded-xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-24 h-24 rounded-xl bg-[#1b314b] text-[#ffe088] font-bold text-2xl items-center justify-center">
                  {currentStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="text-center sm:text-left min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#ffd768]/20 text-[#fde089] border border-[#ffd768]/30 font-bold">
                    Roll: {currentStudent.matriculationNo}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                  {currentStudent.name}
                </h2>
                <p className="text-xs text-[#9bb2d4] font-medium">
                  {currentStudent.program}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentStudent.yearOfStudy}
                </p>
                <p className="text-[10px] text-[#52b788] font-mono">
                  {currentStudent.standing}
                </p>
              </div>
            </div>

            {/* Student Information Fields */}
            <div className="space-y-3 pt-3 border-t border-[#1b3152]/60 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#f5d061]" /> Institution:
                </span>
                <span className="font-medium text-slate-200 text-right truncate max-w-[220px]">
                  {currentStudent.institution}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f5d061]" /> Hostel / Section:
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="px-2 py-0.5 rounded bg-[#132742] border border-[#2b4d7c] text-xs text-white max-w-[200px]"
                  />
                ) : (
                  <span className="font-medium text-slate-200">{hostel}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#f5d061]" /> Student Email:
                </span>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-2 py-0.5 rounded bg-[#132742] border border-[#2b4d7c] text-xs text-white max-w-[200px]"
                  />
                ) : (
                  <span className="font-mono text-slate-300 text-[11px]">{email}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#f5d061]" /> Faculty Advisor:
                </span>
                <span className="font-medium text-slate-200">{currentStudent.advisor}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#f5d061]" /> Emergency Contact:
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="px-2 py-0.5 rounded bg-[#132742] border border-[#2b4d7c] text-xs text-white max-w-[200px]"
                  />
                ) : (
                  <span className="font-medium text-slate-200 text-right truncate max-w-[200px]">
                    {emergencyContact}
                  </span>
                )}
              </div>
            </div>

            {/* Edit / Save controls */}
            <div className="mt-5 pt-3 border-t border-[#1b3152]/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                Security Hash: IIT-DS-{currentStudent.matriculationNo}-SEC
              </span>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#52b788] text-[#00210f] text-xs font-bold shadow hover:brightness-110"
                >
                  <Save className="w-3.5 h-3.5" /> Save Record
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14263f] text-[#f5d061] text-xs font-medium border border-[#223d64] hover:bg-[#1a3355]"
                >
                  <Edit3 className="w-3 h-3" /> Edit Contact Info
                </button>
              )}
            </div>
          </div>

          {/* Biometric Attendance & Quorum Badge */}
          <div className={`
            p-5 rounded-2xl border space-y-3
            ${isDarkMode ? 'bg-[#0a1526] border-[#1e385e]' : 'bg-white border-slate-200'}
          `}>
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#f5d061] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Biometric Attendance Quorum
              </span>
              <span className="text-xs font-mono font-bold text-[#52b788]">
                {currentStudent.attendanceRate}
              </span>
            </div>

            <div className="w-full bg-[#13243a] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#52b788] to-[#74c69d] h-full rounded-full" 
                style={{ width: isIndianSchool ? '98.2%' : '94.8%' }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2 rounded-lg bg-[#0e1d33] border border-[#1b3457]">
                <span className="text-[10px] text-slate-400 block">Lectures</span>
                <span className="text-xs font-bold text-[#52b788]">96%</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1d33] border border-[#1b3457]">
                <span className="text-[10px] text-slate-400 block">Lab Practicals</span>
                <span className="text-xs font-bold text-[#52b788]">100%</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1d33] border border-[#1b3457]">
                <span className="text-[10px] text-slate-400 block">Doubt Clinics</span>
                <span className="text-xs font-bold text-[#fde089]">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Academic Standing, General Subjects & Marks (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Academic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-4 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cumulative Performance</span>
              <span className="font-serif text-xl font-bold text-[#fde089] block mt-1">
                {isIndianCollege ? '9.42 / 10.0' : isIndianSchool ? '96.8%' : '3.94 / 4.0'}
              </span>
              <span className="text-[10px] text-[#52b788] font-medium block">
                {isIndianCollege ? 'CGPA Distinction' : isIndianSchool ? 'Class 12 Topper' : 'First Class'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Department Rank</span>
              <span className="font-serif text-xl font-bold text-sky-400 block mt-1">
                {isIndianCollege ? 'Rank #4' : isIndianSchool ? 'Rank #1' : 'Top 3%'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                {isIndianCollege ? 'In 145 Scholars' : isIndianSchool ? 'Senior Division' : 'Honor Cohort'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Degree Quorum</span>
              <span className="font-serif text-xl font-bold text-slate-100 block mt-1">
                {currentStudent.completedCredits} / {currentStudent.totalDegreeCredits}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                {isIndianCollege ? 'AICTE Credits' : isIndianSchool ? 'CBSE Core Papers' : 'Degree Units'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Active Session</span>
              <span className="font-serif text-xl font-bold text-[#52b788] block mt-1">
                {isIndianCollege ? 'Sem 6' : isIndianSchool ? 'Term 3' : 'Week 7'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                {isIndianCollege ? '22.0 CR Registered' : isIndianSchool ? 'Board Examination' : 'Michaelmas'}
              </span>
            </div>
          </div>

          {/* Subject Marks / Semester SGPA Breakdown */}
          <div className={`
            p-5 rounded-2xl border space-y-4
            ${isDarkMode ? 'bg-[#0a1526] border-[#1e385e]' : 'bg-white border-slate-200'}
          `}>
            <div className="flex items-center justify-between border-b pb-3 border-[#1b3152]/60">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#f5d061]" />
                <h3 className="font-serif font-bold text-sm text-slate-100">
                  {isIndianCollege ? 'Semester-wise SGPA Progression (B.Tech CSE)' : isIndianSchool ? 'Subject-wise Pre-Board & Assessment Scores' : 'Oxford Tripos Examination Marks'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#52b788]">
                Certified by Controller of Examinations
              </span>
            </div>

            {isIndianCollege && (
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
                {[
                  { sem: 'Sem 1', sgpa: '9.20', badge: 'Passed' },
                  { sem: 'Sem 2', sgpa: '9.35', badge: 'Passed' },
                  { sem: 'Sem 3', sgpa: '9.50', badge: 'Passed' },
                  { sem: 'Sem 4', sgpa: '9.40', badge: 'Passed' },
                  { sem: 'Sem 5', sgpa: '9.60', badge: 'Passed' },
                  { sem: 'Sem 6', sgpa: 'Active', badge: 'In Session' },
                ].map((s) => (
                  <div key={s.sem} className="p-2.5 rounded-xl bg-[#0f2038] border border-[#203a61] text-center">
                    <span className="text-[10px] text-slate-400 font-semibold block">{s.sem}</span>
                    <span className="font-serif text-sm font-bold text-[#fde089] block my-0.5">{s.sgpa}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-[#52b788] font-mono">
                      {s.badge}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isIndianSchool && (
              <div className="space-y-2 pt-1">
                {[
                  { sub: 'Mathematics (Calculus & Integration)', code: 'MATH-XII', score: '99 / 100', grade: 'A1', teacher: 'Mr. R. K. Sharma' },
                  { sub: 'Physics & Electromagnetism', code: 'PHYS-XII', score: '98 / 100', grade: 'A1', teacher: 'Mrs. Sunita Deshmukh' },
                  { sub: 'Computer Science with Python & SQL', code: 'CS-XII', score: '98 / 100', grade: 'A1', teacher: 'Mr. Amit Verma' },
                  { sub: 'Chemistry & Organic Reactions', code: 'CHEM-XII', score: '96 / 100', grade: 'A1', teacher: 'Dr. V. K. Murthy' },
                  { sub: 'English Core & Comprehension', code: 'ENG-XII', score: '93 / 100', grade: 'A1', teacher: 'Mrs. Priya Nair' },
                ].map((m) => (
                  <div key={m.code} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0f2038] border border-[#1e385e] text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#fde089] font-bold">{m.code}</span>
                        <span className="font-medium text-slate-200">{m.sub}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{m.teacher}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-[#52b788] text-sm block">{m.score}</span>
                      <span className="text-[10px] font-mono text-sky-400">Grade {m.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isIndianCollege && !isIndianSchool && (
              <div className="space-y-2 pt-1">
                <div className="p-3 rounded-xl bg-[#0f2038] border border-[#1e385e] flex justify-between text-xs">
                  <span>Part IA Preliminary Examination:</span>
                  <span className="font-bold text-[#fde089]">Distinction (78.2%)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f2038] border border-[#1e385e] flex justify-between text-xs">
                  <span>Part IB Final Honor School:</span>
                  <span className="font-bold text-[#52b788]">First Class (79.5%)</span>
                </div>
              </div>
            )}
          </div>

          {/* Enrolled General Subjects Card */}
          <div className={`
            p-5 rounded-2xl border space-y-3
            ${isDarkMode ? 'bg-[#0a1526] border-[#1e385e]' : 'bg-white border-slate-200'}
          `}>
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#f5d061] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Enrolled Subjects in Active Session
              </span>
              {onNavigateToCourses && (
                <button 
                  onClick={onNavigateToCourses}
                  className="text-xs text-[#52b788] hover:underline font-semibold"
                >
                  View Full Syllabus & Readings →
                </button>
              )}
            </div>

            <div className="space-y-2 text-xs">
              {isIndianCollege ? (
                <>
                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">CS301 · 4.0 CR</span>
                      <p className="font-medium text-slate-100">Data Structures & Algorithms</p>
                      <span className="text-[11px] text-slate-400">Prof. Ramesh K. Narayanan · LT-1 (Aryabhatta Hall)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#52b788]/20 text-[#52b788] text-[10px] font-semibold">Core CSE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">CS302 · 4.0 CR</span>
                      <p className="font-medium text-slate-100">Operating Systems & Concurrency</p>
                      <span className="text-[11px] text-slate-400">Dr. Ananya Sen · LH-3 (Technology Block)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#52b788]/20 text-[#52b788] text-[10px] font-semibold">Core CSE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">CS303 · 4.0 CR</span>
                      <p className="font-medium text-slate-100">Database Management Systems (DBMS)</p>
                      <span className="text-[11px] text-slate-400">Prof. Rajesh Gupta · Computer Lab</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#52b788]/20 text-[#52b788] text-[10px] font-semibold">Core CSE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">EC201 · 3.0 CR</span>
                      <p className="font-medium text-slate-100">Digital Electronics & Logic Design</p>
                      <span className="text-[11px] text-slate-400">Dr. K. S. Rao · APJ Abdul Kalam Block 102</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-semibold">ECE Allied</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">PHYS-XII</span>
                      <p className="font-medium text-slate-100">Physics & Electromagnetism</p>
                      <span className="text-[11px] text-slate-400">Mrs. Sunita Deshmukh · Physics Lab (Science Wing)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#52b788]/20 text-[#52b788] text-[10px] font-semibold">CBSE Science</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">MATH-XII</span>
                      <p className="font-medium text-slate-100">Mathematics & Calculus</p>
                      <span className="text-[11px] text-slate-400">Mr. R. K. Sharma · Room 104 (Ramanujan Block)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#52b788]/20 text-[#52b788] text-[10px] font-semibold">CBSE Science</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1d33] border border-[#1b3457] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-[#fde089] font-bold">CS-XII</span>
                      <p className="font-medium text-slate-100">Computer Science & Python</p>
                      <span className="text-[11px] text-slate-400">Mr. Amit Verma · Computer Lab</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-semibold">Practical Lab</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
