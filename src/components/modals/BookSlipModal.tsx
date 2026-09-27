import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Send } from 'lucide-react';
import { TutorialRosterItem } from '../../types';

interface BookSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: TutorialRosterItem | null;
  isDarkMode: boolean;
}

export const BookSlipModal: React.FC<BookSlipModalProps> = ({
  isOpen,
  onClose,
  tutor,
  isDarkMode,
}) => {
  const [topic, setTopic] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(tutor?.timeSlot || '14:00 – 14:45');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen || !tutor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
      alert(`Tutorial appointment registered with ${tutor.name} (${tutor.college}). Tutorial slip dispatched.`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`
        relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col
        ${isDarkMode 
          ? 'bg-[#091322] border-[#223d66] text-[#f1f5f9]' 
          : 'bg-[#fbf9f3] border-[#d8d5cd] text-[#1b1c18]'}
      `}>
        {/* Header */}
        <div className="px-5 py-4 bg-[#050d18] border-b border-[#1b3152] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#162e50] border border-[#2b4c79] flex items-center justify-center text-[#ffe088] font-bold text-xs">
              {tutor.initials}
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#fde089] leading-tight">
                Senior Tutorial Booking Slip
              </h3>
              <p className="text-[11px] text-[#93a9c7]">
                {tutor.name} · {tutor.college} College
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-[#0f2139] border border-[#203c64] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#f5d061]" />
              <span>Location: <strong>{tutor.college} · {tutor.office}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#f5d061]" />
              <span>Next Regular Slot: <strong>{tutor.day}</strong></span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#fcd34d] mb-1.5">
              Select Tutorial Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['14:00 – 14:45', '14:45 – 15:30'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    selectedSlot === slot
                      ? 'bg-[#18345b] border-[#e5c158] text-[#fde089] shadow-sm'
                      : 'bg-[#0d1a2c] border-[#1d3350] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#fcd34d] mb-1.5">
              Discussion Focus / Draft Folio Excerpt
            </label>
            <textarea
              required
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Reviewing Paxos ballot round invariants and safety proofs vs Raft leader lease guarantees..."
              className="w-full p-3 rounded-xl bg-[#0d1b2e] border border-[#223d64] text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#e5c158]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isBooked}
              className="w-full py-2.5 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              {isBooked ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Tutorial Slip Sealed!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Tutorial Booking Slip</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
