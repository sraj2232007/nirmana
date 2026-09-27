import React from 'react';
import { X, BookOpen, Bookmark, Download, ExternalLink, FileText } from 'lucide-react';
import { ReadingItem } from '../../types';

interface ReadingDocketModalProps {
  isOpen: boolean;
  onClose: () => void;
  reading: ReadingItem | null;
  courseTitle: string;
  isDarkMode: boolean;
}

export const ReadingDocketModal: React.FC<ReadingDocketModalProps> = ({
  isOpen,
  onClose,
  reading,
  courseTitle,
  isDarkMode,
}) => {
  if (!isOpen || !reading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`
        relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]
        ${isDarkMode 
          ? 'bg-[#091424] border-[#223d66] text-[#f1f5f9]' 
          : 'bg-[#fbf9f3] border-[#d8d5cd] text-[#1b1c18]'}
      `}>
        {/* Header */}
        <div className="px-5 py-4 bg-[#050d18] border-b border-[#1b3152] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#142947] border border-[#23426e] flex items-center justify-center text-[#ffe088]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#fde089] leading-tight">
                Bodleian Curatorial Docket
              </h3>
              <p className="text-[11px] text-[#93a9c7]">
                {reading.callNumber} · {courseTitle}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 rounded-xl bg-[#0f2139] border border-[#213e68]">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#fde089] uppercase tracking-wider mb-1">
              <span>{reading.type}</span>
              <span>·</span>
              <span>{reading.callNumber}</span>
              <span>·</span>
              <span className="text-emerald-400">{reading.statusBadge}</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-100">
              {reading.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {reading.authors}
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-serif">
            <p>
              <strong>Curatorial Synopsis:</strong> This foundational treatise establishes the core invariant models for state machine replication across unreliable asynchronous networks. Critical focus is given to the Synod protocol, ballot sequences, and quorums necessary to guarantee non-conflicting value consensus.
            </p>
            <p>
              <strong>Oxford Tutorial Seminar Notes:</strong> Pay strict analytical attention to section 3 regarding phase 1b and 2a ballot constraints. Contrast Lamport’s classical synod with modern leader election and heartbeat lease mechanisms.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b1728] border border-[#1b2f4d] flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Physical Bodleian Shelf Holding:</span>
              <span className="font-mono text-[#fde089] font-semibold">{reading.callNumber} (Radcliffe Quad)</span>
            </div>
            <span className="px-2 py-1 rounded bg-[#172e4f] text-[#fcd34d] font-semibold text-[11px]">
              Available on Open Shelf
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#050d18] border-t border-[#1b3152] flex items-center justify-between">
          <span className="text-xs text-slate-400 italic">
            Digital Holding digitized under Oxford Academic License
          </span>
          <button
            onClick={() => {
              alert(`Annotated Reader opened for "${reading.title}".`);
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-bold hover:brightness-105 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Open Annotated Reader</span>
          </button>
        </div>
      </div>
    </div>
  );
};
