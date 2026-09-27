import React from 'react';
import { FileText, CheckCircle2, Clock, Upload, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';

interface AssignmentsScreenProps {
  isDarkMode: boolean;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({ isDarkMode }) => {
  const assignments = [
    {
      id: 'as-1',
      course: 'CS301',
      title: 'Practical Folio 2: Multi-Paxos Ballot Protocol Implementation',
      deadline: 'Friday Nov 14, 17:00 BST',
      status: 'Submitted & Stamped',
      score: '96/100 (Alpha Grade)',
      examinerNotes: 'Formal safety invariants verified under network partitions; excellent log compaction proofs.',
      similarity: '1.2% (Turnitin Clearance)',
    },
    {
      id: 'as-2',
      course: 'MATH240',
      title: 'Problem Set 6: Riemannian Metric Optimization on Stiefel Manifolds',
      deadline: 'Due Today 17:00 BST',
      status: 'Submitted Pending Review',
      score: 'Pending External Moderator',
      examinerNotes: 'Handwritten problem sheet & LaTeX proof docket dispatched to St. John\'s Room 12.',
      similarity: 'N/A (Analytical Proof)',
    },
    {
      id: 'as-3',
      course: 'PHIL210',
      title: 'Tutorial Essay #2: Synthetic Intentionality and the Chinese Room in LLMs',
      deadline: 'Nov 21, 2025',
      status: 'Draft #2 In Progress',
      score: 'Tutorial Draft',
      examinerNotes: 'Draft working paper under review with Archivist Pemberton at All Souls.',
      similarity: 'Pre-check Clear',
    },
    {
      id: 'as-4',
      course: 'AI412',
      title: 'Lab 4: Mechanistic Superposition & Sparse Autoencoder Decomposition',
      deadline: 'Nov 28, 2025',
      status: 'Upcoming Lab',
      score: 'Weight: 20%',
      examinerNotes: 'Implementation docket to be executed on Oxford Computing GPU cluster.',
      similarity: 'Open Verification',
    }
  ];

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
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20">
                  Sub-Faculty Folio Repository
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Examination Schools Moderated
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
                Assignments, Problem Sets & Submission Dockets
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
                Archived practical folios, peer disputation essays, and examiner grading transcripts.
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Collegiate Folio submission portal active: Drag & drop your PDF or code tarball archive.")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow-md hover:brightness-105 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>Submit New Folio Docket</span>
          </button>
        </div>
      </section>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            className={`
              p-5 rounded-2xl border transition-all
              ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#26456f]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
            `}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#fde089] mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#142845] border border-[#23426e]">{item.course}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-300 font-sans">{item.deadline}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-400">{item.similarity}</span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                  {item.examinerNotes}
                </p>
              </div>

              <div className="flex items-center gap-4 self-end lg:self-auto flex-shrink-0">
                <div className="text-right">
                  <span className="text-sm font-serif font-bold text-[#fde089] block">
                    {item.score}
                  </span>
                  <span className="text-[11px] text-slate-400 block font-medium">
                    {item.status}
                  </span>
                </div>
                <button
                  onClick={() => alert(`Extracting grade transcript and examiner margin notes for ${item.title}...`)}
                  className="p-2.5 rounded-xl bg-[#132742] hover:bg-[#1a3559] text-[#fde089] border border-[#213e66] transition-colors"
                  title="Download Examiner Notes"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
