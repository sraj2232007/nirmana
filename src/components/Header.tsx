import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Bell, 
  Menu, 
  Sun, 
  Moon, 
  FileCheck, 
  AlertCircle,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  User,
  Award,
  BookOpen,
  Check
} from 'lucide-react';
import { StudentProfile } from '../types';
import { 
  INDIAN_COLLEGE_STUDENT, 
  INDIAN_HIGHER_SECONDARY_STUDENT, 
  OXFORD_STUDENT 
} from '../data/indianStudentData';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  student?: StudentProfile;
  onOpenStudentProfile?: () => void;
  onSelectStudent?: (student: StudentProfile) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onToggleDarkMode,
  student = INDIAN_COLLEGE_STUDENT,
  onOpenStudentProfile,
  onSelectStudent,
  onNavigateToTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isIndianStudent = student.id.includes('iit') || student.id.includes('cbse');

  const notifications = [
    {
      id: 1,
      title: isIndianStudent ? 'Biometric Attendance Synced' : 'Michaelmas Syllabus Signed',
      time: 'Today 09:30',
      desc: isIndianStudent 
        ? `${student.name}: 94.8% minimum quorum recorded. No shortage warning.` 
        : 'Dean of Computing endorsed CS301 & MATH240 folio registers.',
      read: false,
    },
    {
      id: 2,
      title: isIndianStudent ? 'Lab Viva Schedule Released' : 'Tutorial Slot Confirmed',
      time: 'Tomorrow 14:00',
      desc: isIndianStudent 
        ? 'Data Structures & Algorithms Practical Viva in Computer Lab 3.' 
        : 'Prof. Alistair Sterling · Merton College Office 3B.',
      read: false,
    },
    {
      id: 3,
      title: isIndianStudent ? 'Mid-Semester Timetable Updated' : 'Hilary Ballot Window Active',
      time: 'Version 2 Published',
      desc: isIndianStudent 
        ? 'Room reassignment detected for Practical Lab. Use Timetable Diff to audit.' 
        : 'Add/Drop open for Hilary 2026 courses (Quorum up to 20 CR).',
      read: true,
    },
  ];

  return (
    <header className={`
      fixed top-0 left-0 lg:left-72 right-0 h-20 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200
      ${isDarkMode 
        ? 'bg-[#080f1a]/90 backdrop-blur-md border-b border-[#1b2b42] shadow-[0_4px_16px_rgba(0,0,0,0.5)]' 
        : 'bg-[#fbf9f3]/95 backdrop-blur-md border-b border-[#e4e2dd] shadow-[0_4px_12px_rgba(27,49,75,0.06)]'}
    `}>
      {/* Left zone: Mobile toggle & Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-slate-300 hover:text-white hover:bg-[#15253e]' 
              : 'text-slate-700 hover:bg-slate-200'
          }`}
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full flex items-center">
          <Search className={`absolute left-3.5 w-4 h-4 pointer-events-none ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search curriculum, lecture archives, receipts..."
            className={`
              w-full pl-10 pr-4 py-2 text-sm rounded-xl transition-all duration-200 focus:outline-none
              ${isDarkMode 
                ? 'bg-[#0f1d32] border border-[#213757] text-[#f1f5f9] placeholder:text-[#6f86a6] focus:border-[#e5c158] focus:ring-1 focus:ring-[#e5c158]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]' 
                : 'bg-[#eae8e2] border border-[#c4c6ce] text-[#1b1c18] placeholder:text-slate-500 focus:border-[#735c00] focus:ring-1 focus:ring-[#735c00]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]'}
            `}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right zone: Time, Theme toggle, Notifications, User profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Oxford BST or Indian IST Clock */}
        <div className={`
          hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-semibold
          ${isDarkMode 
            ? 'bg-[#0e1b2f] border-[#1d3352] text-[#e2e8f0] shadow-inner' 
            : 'bg-[#f0eee8] border-[#e4e2dd] text-[#1b1c18]'}
        `}>
          <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-[#f5d061]' : 'text-[#735c00]'}`} />
          <span className="font-mono tabular-nums">{isIndianStudent ? '03:15 PM' : '10:42 AM'}</span>
          <span className={`text-[10px] uppercase tracking-wider ${isDarkMode ? 'text-[#8ea4c4]' : 'text-slate-500'}`}>
            {isIndianStudent ? 'IST (New Delhi)' : 'BST (Oxford)'}
          </span>
        </div>

        {/* Theme mode toggle: Oxford Midnight (Dark) vs Scholar's Parchment */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? "Switch to Scholar's Parchment (Light)" : "Switch to Oxford Midnight (Dark)"}
          className={`
            p-2 rounded-lg border transition-all duration-200 flex items-center gap-1.5 text-xs font-medium
            ${isDarkMode 
              ? 'bg-[#0f1e34] border-[#223b5f] text-[#fcd34d] hover:bg-[#152a48] shadow-sm' 
              : 'bg-[#f0eee8] border-[#d8d5cd] text-[#735c00] hover:bg-[#e4e2dd]'}
          `}
        >
          {isDarkMode ? (
            <>
              <Moon className="w-4 h-4 fill-[#fcd34d]/20 text-[#fcd34d]" />
              <span className="hidden xl:inline text-[11px] font-sans text-slate-300">Midnight</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-[#735c00]" />
              <span className="hidden xl:inline text-[11px] font-sans text-slate-700">Parchment</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Academic Notifications"
            className={`
              relative p-2 rounded-lg border transition-colors
              ${isDarkMode 
                ? 'bg-[#0f1e34] border-[#223b5f] text-[#f3d069] hover:bg-[#152a48]' 
                : 'bg-[#f0eee8] border-[#d8d5cd] text-[#735c00] hover:bg-[#e4e2dd]'}
            `}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#080f1a]" />
          </button>

          {/* Notifications dropdown popover */}
          {showNotifications && (
            <div className={`
              absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border p-3 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150
              ${isDarkMode 
                ? 'bg-[#0c182b] border-[#233c61] text-[#f8fafc]' 
                : 'bg-white border-slate-200 text-slate-900'}
            `}>
              <div className="flex items-center justify-between pb-2 border-b border-[#213757]/60 mb-2">
                <span className="font-serif font-bold text-sm text-[#f6d56d]">Collegiate Gazette Notices</span>
                <span className="text-[10px] text-slate-400 font-mono">3 Unread</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      isDarkMode ? 'bg-[#12233e] hover:bg-[#182e50]' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-[#f5d061] mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#213757]/50 text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#f5d061] hover:underline font-semibold"
                >
                  Dismiss all notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className={`h-8 w-px ${isDarkMode ? 'bg-[#1f3555]' : 'bg-slate-300'}`} />

        {/* Helena Vance profile lockup */}
        <div className="relative">
          <div 
            onClick={() => {
              if (onOpenStudentProfile) {
                onOpenStudentProfile();
              } else {
                setShowProfileMenu(!showProfileMenu);
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
            role="button"
            tabIndex={0}
            title="Click to view current student identity dossier"
          >
            <div className="text-right hidden sm:block">
              <span className={`text-sm font-serif font-semibold block leading-tight group-hover:text-[#f5d061] transition-colors ${
                isDarkMode ? 'text-[#f8fafc]' : 'text-[#031c35]'
              }`}>
                {student?.name || 'Helena Vance'}
              </span>
              <span className={`text-[11px] block mt-0.5 ${
                isDarkMode ? 'text-[#90a6c6]' : 'text-slate-500'
              }`}>
                {student ? `${student.program.split(' ')[0]} · ${student.yearOfStudy.split(' ')[0]} ${student.yearOfStudy.split(' ')[1] || ''}` : 'CS & AI · Year 3'}
              </span>
            </div>

            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#b88c14] via-[#ffd768] to-[#996d00] shadow-[0_2px_6px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform">
              <img 
                alt={student?.name || "Helena Vance avatar"} 
                className="w-8 h-8 rounded-full object-cover" 
                src={student?.photoUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBiuAGEyPWcCfR7Vp1oWPtSR3XidzvHwBwa6LWrElkWT3Dk2LO5XPBCY1A-a5kyNNLJM2sjvqhmetX4t3rXjWIL87UuSix_0dHjMelV7JjFhONrK5vcQVfqZYNvgmG0D3I1gM_lnz1Iv5-nRkusDIb6559RMiU7fPb8phNb9FTFyGeiME4uLyiHF3a1fi1zl7vfNsQky6WWKhEBJl8X91Su6sUpPGr-tK3lwTvJsdV5nNJlOgTdyVNC"}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden w-8 h-8 rounded-full bg-[#1b314b] text-[#ffe088] font-bold text-xs items-center justify-center">
                HV
              </div>
            </div>
          </div>

          {/* Quick Profile Menu Popover */}
          {showProfileMenu && (
            <div className={`
              absolute right-0 mt-2 w-80 rounded-2xl border p-4 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150
              ${isDarkMode 
                ? 'bg-[#0a1526] border-[#233c61] text-[#f8fafc]' 
                : 'bg-white border-slate-200 text-slate-900'}
            `}>
              <div className="flex items-center gap-3 pb-3 border-b border-[#213757]/60">
                <img 
                  src={student?.photoUrl} 
                  alt={student?.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#e5c158]"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm text-[#f6d56d] truncate">
                      {student?.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#52b788] flex-shrink-0" />
                  </div>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    {student?.matriculationNo}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {student?.residentialHouse}
                  </span>
                </div>
              </div>

              <div className="py-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1b3152]/40">
                  <span className="text-slate-400">Current Standing:</span>
                  <span className="text-[#52b788] font-semibold">{student?.standing.split('·')[0]}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b3152]/40">
                  <span className="text-slate-400">Academic Quorum:</span>
                  <span className="font-mono text-[#fde089]">{student?.enrolledCredits}.0 CR Enrolled</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Degree Progress:</span>
                  <span className="font-mono">{student?.completedCredits} / {student?.totalDegreeCredits} CR</span>
                </div>
              </div>

              {/* Student Switcher in Dropdown */}
              <div className="pt-2 border-t border-[#213757]/50">
                <span className="text-[10px] uppercase font-serif font-bold text-[#fde089] tracking-wider block mb-1.5">
                  Switch Active Scholar:
                </span>
                <div className="grid grid-cols-1 gap-1.5 mb-2.5">
                  <button
                    onClick={() => {
                      if (onSelectStudent) onSelectStudent(INDIAN_COLLEGE_STUDENT);
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      student?.id === INDIAN_COLLEGE_STUDENT.id 
                        ? 'bg-[#1b3457] border border-[#e5c158] text-[#fde089]' 
                        : 'bg-[#0f1f33] hover:bg-[#152a45] text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Aarav Sharma</span>
                      <span className="text-[10px] text-slate-400">IIT Delhi · B.Tech CSE (Sem 6)</span>
                    </div>
                    {student?.id === INDIAN_COLLEGE_STUDENT.id && (
                      <Check className="w-3.5 h-3.5 text-[#52b788]" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectStudent) onSelectStudent(INDIAN_HIGHER_SECONDARY_STUDENT);
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      student?.id === INDIAN_HIGHER_SECONDARY_STUDENT.id 
                        ? 'bg-[#1b3457] border border-[#e5c158] text-[#fde089]' 
                        : 'bg-[#0f1f33] hover:bg-[#152a45] text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Ananya Iyer</span>
                      <span className="text-[10px] text-slate-400">CBSE Class 12 Science (Topper 96.8%)</span>
                    </div>
                    {student?.id === INDIAN_HIGHER_SECONDARY_STUDENT.id && (
                      <Check className="w-3.5 h-3.5 text-[#52b788]" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectStudent) onSelectStudent(OXFORD_STUDENT);
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                      student?.id === OXFORD_STUDENT.id 
                        ? 'bg-[#1b3457] border border-[#e5c158] text-[#fde089]' 
                        : 'bg-[#0f1f33] hover:bg-[#152a45] text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block">Helena Vance</span>
                      <span className="text-[10px] text-slate-400">University of Oxford · Year 3</span>
                    </div>
                    {student?.id === OXFORD_STUDENT.id && (
                      <Check className="w-3.5 h-3.5 text-[#52b788]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#213757]/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onNavigateToTab) {
                      onNavigateToTab('profile');
                    } else if (onOpenStudentProfile) {
                      onOpenStudentProfile();
                    }
                  }}
                  className="w-full py-2 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow hover:brightness-105 transition-all flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Open Full Student Identity Dossier</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
