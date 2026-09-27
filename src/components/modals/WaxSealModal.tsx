import React, { useState } from 'react';
import { X, Check, Award, Shield, FileCheck, ArrowRight, Printer } from 'lucide-react';

interface WaxSealModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCredits: number;
  courseCount: number;
  addedCourses: { code: string; title: string; credits: number }[];
  isDarkMode: boolean;
}

export const WaxSealModal: React.FC<WaxSealModalProps> = ({
  isOpen,
  onClose,
  totalCredits,
  courseCount,
  addedCourses,
  isDarkMode,
}) => {
  const [isAffixing, setIsAffixing] = useState(false);
  const [isAffixed, setIsAffixed] = useState(false);

  if (!isOpen) return null;

  const handleAffix = () => {
    setIsAffixing(true);
    setTimeout(() => {
      setIsAffixing(false);
      setIsAffixed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`
        relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col
        ${isDarkMode 
          ? 'bg-[#091322] border-[#223d66] text-[#f1f5f9]' 
          : 'bg-[#fbf9f3] border-[#d8d5cd] text-[#1b1c18]'}
      `}>
        {/* Header */}
        <div className="px-5 py-4 bg-[#050d18] border-b border-[#1b3152] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#540707] to-[#ba1a1a] flex items-center justify-center text-[#ffe088] shadow-md border border-[#ffb4ab]/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#fde089] leading-tight">
                Senior Tutor Collegiate Ballot Dispatch
              </h3>
              <p className="text-[11px] text-[#93a9c7]">
                Docket #MIC-2025-08 · Radcliffe Quad Chancery
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
        <div className="p-6 text-center space-y-5">
          {!isAffixed ? (
            <>
              {/* Wax Seal Medallion Graphic Preview */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className={`
                  relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300
                  bg-gradient-to-b from-[#a31a1a] via-[#750e0e] to-[#480505]
                  shadow-[0_8px_24px_rgba(117,14,14,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.7)]
                  border-4 border-[#b92b2b]/40
                  ${isAffixing ? 'scale-90 rotate-12 blur-[0.5px]' : 'scale-100'}
                `}>
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#ffb4ab]/40 flex flex-col items-center justify-center text-[#ffdad6]">
                    <span className="font-serif text-[10px] tracking-widest uppercase font-bold text-[#fde089]">
                      OXFORD
                    </span>
                    <Shield className="w-6 h-6 my-0.5 text-[#ffdad6]" />
                    <span className="text-[9px] font-mono font-semibold">SIGILLUM</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-serif italic">
                  Press below to press the collegiate seal into sealing wax and commit your term register.
                </p>
              </div>

              {/* Ballot Summary Plaque */}
              <div className="p-4 rounded-xl bg-[#0e1d33] border border-[#1e385e] text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#213b62]">
                  <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                    Matriculated Candidate
                  </span>
                  <span className="font-serif font-bold text-[#fde089]">Helena Vance (Yr 3)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Registered Units</span>
                  <span className="font-mono font-bold text-[#52b788] text-sm">{totalCredits.toFixed(1)} / 20.0 CR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lecture Schedule Verification</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 0 Clashes Found
                  </span>
                </div>
                {addedCourses.length > 0 && (
                  <div className="pt-2 border-t border-[#213b62]">
                    <span className="text-[10px] text-[#fcd34d] block font-semibold mb-1">
                      New Electives on Ballot:
                    </span>
                    {addedCourses.map((c) => (
                      <div key={c.code} className="flex justify-between text-[11px] text-slate-300">
                        <span>{c.code}: {c.title}</span>
                        <span className="font-mono text-[#fde089]">+{c.credits}.0 CR</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Affix button */}
              <button
                disabled={isAffixing}
                onClick={handleAffix}
                className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-b from-[#8f1919] via-[#750e0e] to-[#540707] text-[#fff3f3] p-3.5 shadow-[0_6px_20px_rgba(117,14,14,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-serif font-bold text-sm"
              >
                {isAffixing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white/80 border-t-transparent animate-spin" />
                    <span>Affixing Red Wax Impression...</span>
                  </div>
                ) : (
                  <>
                    <Award className="w-5 h-5 text-[#fde089]" />
                    <span>Affix Wax Seal & Transmit to Senior Tutor</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#fde68a]">
                  Curricular Ballot Dispatched & Sealed
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Docket <strong>#MIC-2025-08</strong> has been logged in the Radcliffe Quad Senior Tutor's Registry. Bursar clearance verified with 0 timetable conflicts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0f2139] border border-[#21406c] text-xs font-mono text-left space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">DISPATCH REF:</span>
                  <span className="text-[#fde089]">OX-SEN-TUTOR-88219</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TIMESTAMP:</span>
                  <span>Michaelmas W7 · 10:42 BST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FOLIO CREDITS:</span>
                  <span className="text-emerald-400 font-bold">{totalCredits.toFixed(1)} Units Stamped</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    alert("Receipt docket printed to PDF.");
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#152a48] hover:bg-[#1d375f] text-slate-200 text-xs font-semibold transition-all border border-[#23426e]"
                >
                  <Printer className="w-4 h-4 text-[#f5d061]" />
                  <span>Print Receipt Slip</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-bold shadow-md hover:brightness-105 transition-all"
                >
                  Return to Ledger
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
