import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  Bot, 
  ShieldCheck, 
  Menu, 
  X,
  ArrowLeftRight,
  User
} from 'lucide-react';
import { StudentProfile } from '../types';

export type PortalType = 
  | 'courses'
  | 'timetable-diff'
  | 'profile'
  | 'overview'
  | 'attendance'
  | 'assignments'
  | 'bursar'
  | 'ai-tutor';

interface SidebarProps {
  activePortal: PortalType;
  onSelectPortal: (portal: PortalType) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isDarkMode: boolean;
  student?: StudentProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePortal,
  onSelectPortal,
  mobileOpen,
  onCloseMobile,
  isDarkMode,
  student
}) => {
  const portals: { id: PortalType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'profile', label: 'Student Profile', icon: <User className="w-4 h-4" />, badge: 'ID Dossier' },
    { id: 'overview', label: 'Overview Hub', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'timetable-diff', label: 'Timetable Diff & Audit', icon: <ArrowLeftRight className="w-4 h-4" />, badge: 'V1 vs V2' },
    { id: 'courses', label: 'Curriculum & Syllabi', icon: <BookOpen className="w-4 h-4" />, badge: 'Active' },
    { id: 'attendance', label: 'Biometric Attendance', icon: <Calendar className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignments & Lab', icon: <FileText className="w-4 h-4" /> },
    { id: 'bursar', label: 'Fee & Bursar', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'ai-tutor', label: 'Academic AI Tutor', icon: <Bot className="w-4 h-4" />, badge: 'Socratic' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-72 z-50 flex flex-col justify-between transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isDarkMode 
          ? 'bg-[#050c17] border-r border-[#1a2b45] shadow-[4px_0_24px_rgba(0,0,0,0.6)]' 
          : 'bg-[#031c35] text-white shadow-[4px_0_16px_rgba(3,28,53,0.35)]'}
      `}>
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="px-5 pt-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-[#11233d] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] border border-[#233b5d]/60">
                <img 
                  alt="AcademiaDesk Wax Seal Crest Logo" 
                  className="h-8 w-auto object-contain" 
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UOaeKG84Ki6tpZ7jz8zlB8BSLxFMy6Boc63Ac3KG-3E84jlbLSJoukGAWgXn8oApXcuCVfGCC7mTgnvUSnV6xRXwVaN_YX4mBHDKBZqJV2HUa-F5cU3Djh0jwR9z5Bmb6hKDRpiKE1Z5XWtWv9BiMhJ7MeQBZMfpQrSsmxt3upt3CSAU92CT8u6lrv-ot5aURiFyI4F4I0fmUebVJWl4KBBdxOVTSomLSV0B4by43hnt3IFzx5d_-wi-E"
                  onError={(e) => {
                    // Fallback to golden seal if external asset fails
                    (e.target as HTMLElement).style.display = 'none';
                    const fallback = (e.target as HTMLElement).nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#996d00] items-center justify-center text-[#1c1200] font-bold text-xs">
                  OX
                </div>
              </div>
              <div>
                <span className="font-serif text-lg tracking-wide block font-semibold text-[#f8e398] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  AcademiaDesk
                </span>
                <span className="text-[11px] text-[#93a7c6] uppercase tracking-widest font-semibold block">
                  Collegiate Ledger
                </span>
              </div>
            </div>
            <button 
              onClick={onCloseMobile} 
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Divider rule */}
          <div className="px-5 py-1">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#223a5e] to-transparent shadow-[0_1px_0_rgba(255,255,255,0.06)]" />
          </div>

          {/* Portals Navigation */}
          <div className="px-4 py-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#f0cf6a] px-3 mb-2 block drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
              Academic Portals
            </span>
            <nav className="flex flex-col gap-1.5">
              {portals.map((p) => {
                const isActive = activePortal === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPortal(p.id);
                      onCloseMobile();
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#172c4a] to-[#12243d] text-[#ffe699] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.5)] border border-[#e5c158]/30' 
                        : 'text-[#9ab1d4] hover:bg-[#0e1f37] hover:text-[#f8fafc] border border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#f5d061]' : 'text-[#7e96b8]'}>
                        {p.icon}
                      </span>
                      <span>{p.label}</span>
                    </div>
                    {p.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                        isActive ? 'bg-[#e5c158]/20 text-[#fde047]' : 'bg-[#182944] text-[#869fc4]'
                      }`}>
                        {p.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Current Student Profile Badge at Bottom */}
        <div className="p-3 m-3 rounded-xl bg-gradient-to-b from-[#11243e] to-[#0a182b] border border-[#213b62] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.4)] space-y-2.5">
          {/* Student Identity Lockup */}
          <div 
            onClick={() => onSelectPortal('profile')}
            className="flex items-center gap-2.5 cursor-pointer group"
            title="Click to view full student profile dossier"
          >
            <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#b88c14] via-[#ffd768] to-[#996d00] flex-shrink-0">
              <img 
                src={student?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                alt={student?.name || "Current Student"}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#52b788] border border-[#091424]" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-xs font-serif font-bold text-slate-100 group-hover:text-[#fde089] transition-colors block leading-tight truncate">
                {student?.name || 'Aarav Sharma'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block truncate">
                {student?.matriculationNo} · {student?.residentialHouse.split('·')[0] || 'IIT Delhi'}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-[#1e3455]" />

          {/* Academic Session / Term Card status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#52b788] shadow-[0_0_8px_rgba(82,183,136,0.9)] animate-pulse" />
              </div>
              <div className="min-w-0 max-w-[170px]">
                <span className="text-[11px] font-serif font-bold text-[#fde089] block leading-tight truncate">
                  {student?.currentTerm.split('(')[0] || 'Active Session'}
                </span>
                <span className="text-[10px] text-[#8ea4c4] block font-mono truncate">
                  {student?.standing.split('·')[0] || 'Active Quorum'}
                </span>
              </div>
            </div>
            <div className="p-1 rounded-md bg-[#192f50] text-[#f4d160]" title="Institutional Biometric Registration Verified">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
