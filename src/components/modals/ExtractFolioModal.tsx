import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { Course } from '../../types';

interface ExtractFolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrolledCourses: Course[];
  totalCredits: number;
  isDarkMode: boolean;
}

export const ExtractFolioModal: React.FC<ExtractFolioModalProps> = ({
  isOpen,
  onClose,
  enrolledCourses,
  totalCredits,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`
        relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col
        ${isDarkMode 
          ? 'bg-[#0a1424] border-[#22395d] text-[#f1f5f9]' 
          : 'bg-[#fbf9f3] border-[#d8d5cd] text-[#1b1c18]'}
      `}>
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#050e1c] border-b border-[#1f3557] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#996d00] flex items-center justify-center text-[#211600] font-bold text-xs shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#fde089] leading-tight">
                Bound Academic Curriculum Folio (PDF)
              </h3>
              <p className="text-xs text-[#9bb2d4]">
                Docket #MIC-2025-08 · Matriculation Folio #CS-2023-V9
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

        {/* Document Parchment Viewport */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Header of official certificate */}
          <div className="text-center pb-4 border-b border-[#243e66]/50">
            <div className="inline-block px-3 py-1 rounded-full bg-[#e5c158]/20 border border-[#e5c158]/40 text-[#fde089] text-[11px] font-serif uppercase tracking-widest font-semibold mb-2">
              University of Oxford · Faculty of Computing & Mathematical Sciences
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#fde68a]">
              Official Michaelmas Term Curriculum Register
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Registered Candidate: <strong className="text-slate-200">Helena Vance (Year 3)</strong> · Merton College & Radcliffe Quad
            </p>
          </div>

          {/* Verification Badge */}
          <div className="p-3.5 rounded-xl bg-[#0e213b] border border-[#23426e] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#52b788]" />
              <div className="text-xs">
                <span className="font-semibold text-[#f8fafc] block">Dean Endorsement & Sub-Faculty Certification</span>
                <span className="text-[#8ba3c7]">Certified under Bodleian Reference Standards QA76.9.D5</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#f5d061]">{totalCredits.toFixed(1)} / 20.0 CR</span>
              <span className="text-[10px] text-slate-400 block">Quorum Satisfied</span>
            </div>
          </div>

          {/* Course list table in folio */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#f6d56d] uppercase tracking-wider mb-3">
              Enrolled Term Modules & Reading Registers
            </h4>
            <div className="space-y-2">
              {enrolledCourses.map((c, idx) => (
                <div 
                  key={c.id} 
                  className="p-3 rounded-lg bg-[#0d1c31] border border-[#1e3455] flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-[#fde089]">{c.code}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-300 font-semibold truncate">{c.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {c.lecturer} ({c.lecturerRole}) · {c.weeklyModules.length} Modules Registered
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-mono font-bold text-[#fde68a]">{c.credits}.0 CR</span>
                    <span className="text-[10px] text-emerald-400 block">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Seal Block */}
          <div className="pt-4 border-t border-[#243e66]/50 grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <div className="h-10 border-b border-dashed border-slate-600 flex items-end pb-1 font-serif italic text-sm text-[#fde089]">
                Prof. Alistair Sterling, D.Phil.
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Dean of Computing Studies</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-600 flex items-end pb-1 font-serif italic text-sm text-[#fde089]">
                Helena Vance (CS & AI)
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Matriculated Scholar Signature</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-[#06101f] border-t border-[#1f3557] flex items-center justify-between">
          <span className="text-xs text-slate-400 italic">
            Signed on 12 Oct 2025 · Verified Hash: 0x9AF4...82CD
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert("Simulating printer dispatch: Oxford Collegiate Curriculum Register sent to system printer.");
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#142845] hover:bg-[#1a3459] text-slate-200 text-xs font-semibold transition-all border border-[#233f66]"
            >
              <Printer className="w-4 h-4 text-[#f5d061]" />
              <span>Print Folio</span>
            </button>
            <button
              onClick={() => {
                alert("Bound Curriculum Folio PDF downloaded: Helena_Vance_Michaelmas_2025_Folio.pdf");
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
