import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Download, Printer, Receipt } from 'lucide-react';

interface BursarScreenProps {
  isDarkMode: boolean;
}

export const BursarScreen: React.FC<BursarScreenProps> = ({ isDarkMode }) => {
  const [isPaid, setIsPaid] = useState(false);

  const battelsItems = [
    { id: 1, desc: 'Michaelmas Term Academic Tuition (Computing & Mathematical Sciences)', ref: 'TUI-2025-M1', amount: '£4,625.00', status: 'Settled' },
    { id: 2, desc: 'Merton College Radcliffe Quad Senior Scholar Residential Battels', ref: 'RES-MRT-702', amount: '£2,140.00', status: 'Settled' },
    { id: 3, desc: 'Bodleian Special Collections Archive & Stacks Preservation Fee', ref: 'BOD-SUB-99', amount: '£185.00', status: 'Settled' },
    { id: 4, desc: 'Formal Hall Dining & Collegiate Commons Quota', ref: 'FML-HAL-44', amount: '£320.00', status: 'Pending' },
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
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20">
                  Collegiate Bursary Docket #BUR-2025-88
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Merton College Bursar Clearance
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
                Fee & Bursar Collegiate Battels Ledger
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
                Itemized term accounts, tuition verification, and bursary disbursements for Helena Vance.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-[#0b1b30] border border-[#213b61] text-right font-mono">
            <span className="text-[10px] text-[#ffd768] uppercase font-bold block">Outstanding Balance</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-white">
              {isPaid ? '£0.00' : '£320.00'}
            </span>
          </div>
        </div>
      </section>

      {/* Battels Ledger Table */}
      <div className={`
        rounded-2xl border overflow-hidden
        ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
      `}>
        <div className="p-5 border-b border-[#1b3152] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#f5d061]" />
            <h3 className="font-serif text-base font-bold text-slate-100">
              Michaelmas 2025 Itemized Battels
            </h3>
          </div>
          <button
            onClick={() => alert("Downloading stamped PDF receipt for Merton College Battels...")}
            className="flex items-center gap-1.5 text-xs text-[#fde089] hover:underline font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Download Statement (PDF)</span>
          </button>
        </div>

        <div className="divide-y divide-[#1b3152]">
          {battelsItems.map((item) => {
            const currentStatus = (item.status === 'Pending' && isPaid) ? 'Settled' : item.status;
            return (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#fde089] mb-0.5">
                    <span>{item.ref}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-slate-100">
                    {item.desc}
                  </h4>
                </div>

                <div className="flex items-center gap-5 self-end sm:self-auto flex-shrink-0">
                  <span className="font-serif font-bold text-base text-slate-100 font-mono">
                    {item.amount}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    currentStatus === 'Settled'
                      ? 'bg-[#52b788]/20 text-[#52b788] border border-[#52b788]/40'
                      : 'bg-[#fcd34d]/20 text-[#fcd34d] border border-[#fcd34d]/40'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {currentStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Payment dispatch footer */}
        <div className="p-5 bg-[#071221] border-t border-[#1b3152] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 italic">
            Oxford Collegiate Billing System · Authorized by Bursary Fellow
          </span>

          {!isPaid ? (
            <button
              onClick={() => {
                setIsPaid(true);
                alert("Battels payment of £320.00 confirmed: Official collegiate receipt issued.");
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-serif font-bold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Settle Outstanding Balance (£320.00)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-[#52b788] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>All Michaelmas Battels Fully Settled</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
