import React from 'react';
import { 
  X, 
  GraduationCap, 
  Award, 
  Mail, 
  MapPin, 
  User, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Phone, 
  FileText, 
  Printer, 
  ExternalLink 
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  isDarkMode: boolean;
  onNavigateToTab?: (tabId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  isDarkMode,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`
        relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]
        ${isDarkMode 
          ? 'bg-[#091424] border-[#223d66] text-[#f1f5f9]' 
          : 'bg-[#fbf9f3] border-[#d8d5cd] text-[#1b1c18]'}
      `}>
        {/* Header */}
        <div className="px-6 py-4 bg-[#050e1c] border-b border-[#1b3152] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#996d00] flex items-center justify-center text-[#211600] font-bold text-xs shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#fde089] leading-tight">
                Matriculated Student Identity Record
              </h3>
              <p className="text-[11px] text-[#93a9c7]">
                Folio #{student.folioNo} · {student.institution}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Scholar ID Badge Banner */}
          <div className={`
            p-5 rounded-2xl border flex flex-col sm:flex-row items-center sm:items-start gap-5
            ${isDarkMode ? 'bg-[#0e1d33] border-[#203c64]' : 'bg-white border-[#e4e2dd]'}
          `}>
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#b88c14] via-[#ffd768] to-[#996d00] shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex-shrink-0">
              <img 
                src={student.photoUrl} 
                alt={student.name}
                className="w-20 h-20 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden w-20 h-20 rounded-full bg-[#1b314b] text-[#ffe088] font-bold text-xl items-center justify-center">
                HV
              </div>
              <div className="absolute bottom-0 right-0 p-1 rounded-full bg-[#52b788] text-[#00210f] border-2 border-[#091424]" title="Active Student Status">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="min-w-0 text-center sm:text-left flex-1 space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#ffd768]/20 text-[#fde089] border border-[#ffd768]/30 font-bold">
                  {student.matriculationNo}
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {student.standing}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-slate-100">
                {student.name}
              </h2>
              <p className="text-xs text-[#9bb2d4] font-medium">
                {student.program} · {student.yearOfStudy}
              </p>
              <p className="text-[11px] text-slate-400">
                {student.faculty} · {student.residentialHouse}
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cumulative GPA</span>
              <span className="font-serif text-lg font-bold text-[#fde089] block mt-0.5">3.94 / 4.00</span>
              <span className="text-[10px] text-[#52b788] font-medium block">78.4% First Class</span>
            </div>

            <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Completed Quorum</span>
              <span className="font-serif text-lg font-bold text-slate-100 block mt-0.5">
                {student.completedCredits} / {student.totalDegreeCredits}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">73.3% Degree CR</span>
            </div>

            <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Enrolled Term Units</span>
              <span className="font-serif text-lg font-bold text-[#52b788] block mt-0.5">
                {student.enrolledCredits}.0 CR
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">4 Michaelmas Folios</span>
            </div>

            <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-[#0d1a2c] border-[#1d3557]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}`}>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cohort Standing</span>
              <span className="font-serif text-lg font-bold text-sky-400 block mt-0.5">Top 3%</span>
              <span className="text-[10px] text-slate-400 font-medium block">Class Honor Roll</span>
            </div>
          </div>

          {/* Academic & Collegiate Dossier Details */}
          <div className={`
            p-4 rounded-xl border space-y-3 text-xs
            ${isDarkMode ? 'bg-[#0b1728] border-[#1b2f4d]' : 'bg-white border-[#e4e2dd]'}
          `}>
            <h4 className="font-serif text-xs font-bold text-[#f5d061] uppercase tracking-wider pb-2 border-b border-[#1b3152]">
              Collegiate Registration & Senior Supervision
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-slate-300">
                <User className="w-4 h-4 text-[#f5d061] flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Academic Supervisor:</span>
                  <span className="font-medium text-slate-200">{student.advisor}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#f5d061] flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">University Email:</span>
                  <span className="font-mono text-slate-200">{student.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Calendar className="w-4 h-4 text-[#f5d061] flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Active Session:</span>
                  <span className="font-medium text-slate-200">{student.currentTerm}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#f5d061] flex-shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Collegiate Contact:</span>
                  <span className="font-medium text-slate-200">{student.emergencyContact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-[#050e1c] border-t border-[#1b3152] flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-400 font-mono italic">
            Collegiate Card Verified · RFID CS-OX-88219
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                alert(`Official Student Transcript printed for ${student.name} (${student.matriculationNo}).`);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#142845] hover:bg-[#1a3459] text-slate-200 text-xs font-semibold border border-[#233f66] transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#f5d061]" />
              <span>Print Student Transcript</span>
            </button>

            {onNavigateToTab && (
              <button
                onClick={() => {
                  onNavigateToTab('overview');
                  onClose();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow hover:brightness-105 transition-all"
              >
                <span>View Full Overview Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
