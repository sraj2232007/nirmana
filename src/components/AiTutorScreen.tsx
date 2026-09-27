import React, { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, User, RotateCcw } from 'lucide-react';

interface AiTutorScreenProps {
  isDarkMode: boolean;
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  citations?: string[];
  time: string;
}

export const AiTutorScreen: React.FC<AiTutorScreenProps> = ({
  isDarkMode,
  initialQuery = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Greetings, Scholar Vance. I am your Socratic Collegiate Tutor for Michaelmas Term 2025. I am synchronized with your active syllabus folios: CS301 (Distributed Consensus), MATH240 (Spectral Tensors), AI412 (ML Architectures), and PHIL210 (Epistemology). What concept shall we dissect for your upcoming tutorial?',
      citations: ['Oxford Bodleian Holdings', 'CS301 Lamport Synod Invariants', 'MATH240 Laplacians'],
      time: '10:40 BST',
    },
    {
      id: 'm2',
      sender: 'user',
      text: initialQuery || 'Can you explain why Paxos requires two phases to achieve consensus, whereas Raft simplifies leader elections into terms?',
      time: '10:41 BST',
    },
    {
      id: 'm3',
      sender: 'ai',
      text: 'A foundational question that Prof. Sterling often probes during viva voce examinations!\n\nIn classical Lamport Paxos (The Part-Time Parliament, 1998):\n1. Phase 1 (Prepare/Promise): A proposer must discover whether any value has already been chosen or accepted by a majority quorum. This guarantees the safety invariant: no two disjoint quorums can decide conflicting values.\n2. Phase 2 (Accept/Commit): Once the proposer confirms no conflicting value exists (or adopts the highest-numbered accepted value), it commands acceptors to vote.\n\nRaft (Ongaro & Ousterhout, 2014) decomposes this state space by introducing strong leadership: leader election happens via randomized heartbeat leases within monotonic terms. In Raft, log entries flow strictly one way from leader to followers, eliminating the need for arbitrary proposers to discover past uncommitted consensus states independently. Hence, Raft trades Lamport’s symmetric purity for operational comprehensibility.',
      citations: ['Leslie Lamport (1998) BOD-STACK: 98.412-A', 'Diego Ongaro & John Ousterhout (USENIX 2014) BOD-DIG: CS-ON-2014'],
      time: '10:42 BST',
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'Explain Synod protocol ballot invariants',
    'How do Riemannian metrics deform on Stiefel manifolds?',
    'What is the Chinese Room rebuttal for Transformer circuits?',
    'Summarize Week 7 Raft compaction requirements',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: '10:43 BST',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      const tutorReplies: Record<string, string> = {
        default: `Examining your query against the Michaelmas syllabus: Notice how the mathematical invariant ensures non-equivocation across fault models. In your tutorial with Merton College, be prepared to prove that no quorum intersection can produce disjoint states under asynchronous network delay $\\Delta$.`,
      };

      const replyText = tutorReplies.default;

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        citations: ['Faculty of Computing & Mathematical Sciences', 'Bodleian Curatorial Docket'],
        time: '10:43 BST',
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* Header Plaque */}
      <section className={`
        relative w-full rounded-2xl p-5 sm:p-7 overflow-hidden border
        ${isDarkMode 
          ? 'bg-gradient-to-r from-[#031122] via-[#0b1c33] to-[#08182c] border-[#1d3658] text-[#f8fafc] shadow-xl' 
          : 'bg-gradient-to-r from-[#031427] via-[#0a233f] to-[#0e2744] border-[#1b314b] text-white shadow-lg'}
      `}>
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[#091a2e] border border-[#223d63] shadow-md flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#b38814] flex items-center justify-center text-[#211700]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20">
                Socratic Scholar Engine
              </span>
              <span className="text-xs text-[#52b788] font-medium">
                Grounded in Oxford Bodleian Curriculum Dockets
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
              Academic AI Tutor & Socratic Syllabus Disputation
            </h1>
            <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
              Interactive curriculum dialogues, formal proof walkthroughs, and preparatory viva questions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <div className={`
        rounded-2xl border flex flex-col h-[650px] overflow-hidden
        ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
      `}>
        {/* Messages scroll area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-3 sm:gap-4 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm
                  ${isAi 
                    ? 'bg-gradient-to-br from-[#ffd768] to-[#b38814] text-[#211700]' 
                    : 'bg-[#152e4d] text-[#fde089] border border-[#2b598d]'}
                `}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-1.5 max-w-[85%] sm:max-w-[90%]">
                  <div className={`
                    p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line border
                    ${isAi
                      ? isDarkMode
                        ? 'bg-[#0e1d33] border-[#1e3b63] text-slate-100 font-serif'
                        : 'bg-white border-[#e4e2dd] text-slate-800'
                      : 'bg-gradient-to-r from-[#173050] to-[#12253f] border-[#e5c158]/50 text-white font-sans'}
                  `}>
                    {m.text}
                  </div>

                  {m.citations && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">Citations:</span>
                      {m.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091524] text-[#fde089] border border-slate-700/60"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block font-mono">
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-[#07111e] border-t border-[#1b3152] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#f5d061]" /> Topics:
          </span>
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] px-3 py-1 rounded-full bg-[#0d1d33] hover:bg-[#142a47] text-slate-300 hover:text-[#fde089] border border-[#1e385d] whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-[#091322] border-t border-[#1b3152]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask your Oxford Socratic AI Tutor about safety proofs, algorithms, or readings..."
              className="flex-1 p-3 rounded-xl bg-[#0f2139] border border-[#213e68] text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#e5c158]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-b from-[#ffd768] via-[#e2b73b] to-[#b38814] text-[#1c1400] text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Dispute</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
