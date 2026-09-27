import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';

interface AttendanceScreenProps {
  isDarkMode: boolean;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ isDarkMode }) => {
  const [filter, setFilter] = useState<'all' | 'lectures' | 'tutorials' | 'labs'>('all');

  const attendanceLog = [
    {
      id: 1,
      date: 'Today, 09:00',
      course: 'CS301',
      title: 'Distributed Consensus & Fault Tolerance',
      type: 'Lecture',
      hall: 'Computing Laboratory, Lecture Theatre A',
      status: 'Present',
      stampedBy: 'Prof. Alistair Sterling',
    },
    {
      id: 2,
      date: 'Yesterday, 14:00',
      course: 'MATH240',
      title: 'Spectral Tensors & Manifold Learning',
      type: 'Lecture',
      hall: 'Andrew Wiles Building, Hall 2',
      status: 'Present',
      stampedBy: 'Dr. Evelyn Thorne-Clarke',
    },
    {
      id: 3,
      date: 'Wed Nov 12, 15:00',
      course: 'AI412',
      title: 'Machine Learning Architectures',
      type: 'Tutorial',
      hall: 'Balliol College · Turing Lab',
      status: 'Present',
      stampedBy: 'Prof. Julian H. Vance',
    },
    {
      id: 4,
      date: 'Tue Nov 11, 11:00',
      course: 'PHIL210',
      title: 'Epistemology & Artificial Agency',
      type: 'Tutorial',
      hall: 'All Souls · Codrington Library',
      status: 'Present',
      stampedBy: 'Archivist Thomas Pemberton',
    },
    {
      id: 5,
      date: 'Mon Nov 10, 16:00',
      course: 'CS301',
      title: 'Raft Compaction & Snapshotting',
      type: 'Lab',
      hall: 'Radcliffe Science Laboratory',
      status: 'Excused',
      stampedBy: 'College Senior Tutor',
    },
  ];

  const filteredLog = attendanceLog.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'lectures') return item.type === 'Lecture';
    if (filter === 'tutorials') return item.type === 'Tutorial';
    if (filter === 'labs') return item.type === 'Lab';
    return true;
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Header Plaque */}
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
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20">
                  Michaelmas Roll Call Ledger
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Quorum Attendance Stamped (96.4%)
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
                Daily Attendance & Collegiate Roll Call Register
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
                Official presence verification for Examination Schools, Tutorial Fellows, and Laboratory sessions.
              </p>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#0b1b30] border border-[#213b61] text-right font-mono">
            <span className="text-[10px] text-[#ffd768] uppercase font-bold block">Term Roll Standing</span>
            <span className="font-serif text-xl font-bold text-white">27 / 28 Stamped</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {(['all', 'lectures', 'tutorials', 'labs'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all
                ${filter === t
                  ? 'bg-[#142845] border border-[#e5c158] text-[#fde089] font-bold shadow-sm'
                  : isDarkMode
                    ? 'bg-[#0d1a2c] border border-[#1d3557] text-slate-400 hover:text-slate-200'
                    : 'bg-[#eae8e2] text-slate-700 hover:bg-white'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredLog.length} Session Records
        </span>
      </div>

      {/* Attendance Ledger Table / Fluid Cards */}
      <div className={`
        rounded-2xl border overflow-hidden
        ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
      `}>
        <div className="divide-y divide-[#1b3152]">
          {filteredLog.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#0e1d33] transition-colors"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0
                  ${item.status === 'Present' 
                    ? 'bg-[#00381e] text-[#52b788] border border-[#0f5130]' 
                    : 'bg-[#422006] text-[#fcd34d] border border-[#78350f]'}
                `}>
                  {item.course}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
                    <span className="font-bold text-[#fde089]">{item.date}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 font-semibold">{item.type}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-slate-100 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {item.hall} · Verified by {item.stampedBy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  item.status === 'Present'
                    ? 'bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/40'
                    : 'bg-[#fcd34d]/20 text-[#fcd34d] border border-[#fcd34d]/40'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.status} & Stamped
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
