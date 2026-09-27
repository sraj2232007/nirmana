import React, { useState, useMemo } from 'react';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  MinusCircle, 
  Shuffle, 
  Filter, 
  Sparkles, 
  Upload, 
  RotateCcw, 
  HelpCircle, 
  FileText, 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  ShieldCheck, 
  Check, 
  X,
  ChevronDown,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { 
  SAMPLE_TIMETABLE_V1_CSV, 
  SAMPLE_TIMETABLE_V2_CSV, 
  INDIAN_COLLEGE_V1_CSV,
  INDIAN_COLLEGE_V2_CSV,
  INDIAN_SCHOOL_V1_CSV,
  INDIAN_SCHOOL_V2_CSV,
  OXFORD_V1_CSV,
  OXFORD_V2_CSV,
  parseCsvTimetable 
} from '../data/sampleTimetables';
import { 
  compareTimetableSessions, 
  DiffOptions 
} from '../utils/timetableDiff';
import { 
  SessionComparisonItem, 
  TimetableFilterState, 
  TimetableSession 
} from '../types/timetable';

interface TimetableDiffScreenProps {
  isDarkMode: boolean;
}

export const TimetableDiffScreen: React.FC<TimetableDiffScreenProps> = ({ isDarkMode }) => {
  // Preset state: default to Indian College
  const [activePreset, setActivePreset] = useState<'indian-college' | 'indian-school' | 'collegiate' | 'custom'>('indian-college');

  // Raw CSV states (Default to Indian College subjects)
  const [csvV1, setCsvV1] = useState<string>(INDIAN_COLLEGE_V1_CSV);
  const [csvV2, setCsvV2] = useState<string>(INDIAN_COLLEGE_V2_CSV);

  // User options
  const [enableAiInterpretation, setEnableAiInterpretation] = useState<boolean>(true);
  const [userConfirmations, setUserConfirmations] = useState<Record<string, 'confirmed' | 'rejected'>>({});

  // View & Filter states
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [changeTypeFilter, setChangeTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Switch preset handlers
  const handleSelectPreset = (preset: 'indian-college' | 'indian-school' | 'collegiate') => {
    setActivePreset(preset);
    setUserConfirmations({});
    setCourseFilter('all');
    setSectionFilter('all');
    setChangeTypeFilter('all');
    if (preset === 'indian-college') {
      setCsvV1(INDIAN_COLLEGE_V1_CSV);
      setCsvV2(INDIAN_COLLEGE_V2_CSV);
    } else if (preset === 'indian-school') {
      setCsvV1(INDIAN_SCHOOL_V1_CSV);
      setCsvV2(INDIAN_SCHOOL_V2_CSV);
    } else {
      setCsvV1(OXFORD_V1_CSV);
      setCsvV2(OXFORD_V2_CSV);
    }
  };

  // Parse sessions
  const sessionsV1 = useMemo(() => parseCsvTimetable(csvV1), [csvV1]);
  const sessionsV2 = useMemo(() => parseCsvTimetable(csvV2), [csvV2]);

  // Run deterministic diff engine
  const { items, summary } = useMemo(() => {
    return compareTimetableSessions(sessionsV1, sessionsV2, {
      enableAiLabelInterpretation: enableAiInterpretation,
      userConfirmations,
    });
  }, [sessionsV1, sessionsV2, enableAiInterpretation, userConfirmations]);

  // Extract unique courses & sections for Feature 2: Filtering
  const availableCourses = useMemo(() => {
    const set = new Set<string>();
    [...sessionsV1, ...sessionsV2].forEach(s => set.add(s.courseCode));
    return Array.from(set).sort();
  }, [sessionsV1, sessionsV2]);

  const availableSections = useMemo(() => {
    const set = new Set<string>();
    [...sessionsV1, ...sessionsV2].forEach(s => set.add(s.section));
    return Array.from(set).sort();
  }, [sessionsV1, sessionsV2]);

  // Filter items based on Course, Section, Change Type, and Search Query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Course filter
      if (courseFilter !== 'all' && item.courseCode !== courseFilter) {
        return false;
      }

      // Section filter
      if (sectionFilter !== 'all' && item.section !== sectionFilter && !item.section.includes(sectionFilter)) {
        return false;
      }

      // Change type filter
      if (changeTypeFilter === 'added' && item.changeType !== 'added') return false;
      if (changeTypeFilter === 'removed' && item.changeType !== 'removed') return false;
      if (changeTypeFilter === 'changed' && item.changeType !== 'changed') return false;
      if (changeTypeFilter === 'room' && !item.isRoomChange) return false;
      if (changeTypeFilter === 'rescheduled' && !item.isRescheduled) return false;
      if (changeTypeFilter === 'unchanged' && item.changeType !== 'unchanged') return false;
      if (changeTypeFilter === 'uncertain' && !item.isUncertain) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = item.courseCode.toLowerCase().includes(query);
        const matchesName = item.courseName.toLowerCase().includes(query);
        const matchesSec = item.section.toLowerCase().includes(query);
        const matchesOldRoom = item.oldSession?.room.toLowerCase().includes(query) || false;
        const matchesNewRoom = item.newSession?.room.toLowerCase().includes(query) || false;
        const matchesDiff = item.differences.some(d => 
          d.oldValue.toLowerCase().includes(query) || d.newValue.toLowerCase().includes(query)
        );
        if (!matchesCode && !matchesName && !matchesSec && !matchesOldRoom && !matchesNewRoom && !matchesDiff) {
          return false;
        }
      }

      return true;
    });
  }, [items, courseFilter, sectionFilter, changeTypeFilter, searchQuery]);

  // Handlers for Student Challenge: Confirming uncertain matches
  const handleConfirmMatch = (item: SessionComparisonItem) => {
    if (!item.oldSession || !item.newSession) return;
    const pairKey = `${item.oldSession.id}__vs__${item.newSession.id}`;
    setUserConfirmations(prev => ({ ...prev, [pairKey]: 'confirmed' }));
  };

  const handleRejectMatch = (item: SessionComparisonItem) => {
    if (!item.oldSession || !item.newSession) return;
    const pairKey = `${item.oldSession.id}__vs__${item.newSession.id}`;
    setUserConfirmations(prev => ({ ...prev, [pairKey]: 'rejected' }));
  };

  const handleResetConfirmations = () => {
    setUserConfirmations({});
  };

  // Upload handler for custom CSV files
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'v1' | 'v2') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (target === 'v1') setCsvV1(text);
      else setCsvV2(text);
    };
    reader.readAsText(file);
  };

  const handleLoadDemo = () => {
    setCsvV1(SAMPLE_TIMETABLE_V1_CSV);
    setCsvV2(SAMPLE_TIMETABLE_V2_CSV);
    setUserConfirmations({});
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      {/* ============================================================== */}
      {/* HEADER PLAQUE                                                  */}
      {/* ============================================================== */}
      <section className={`
        relative w-full rounded-2xl p-5 sm:p-7 overflow-hidden border
        ${isDarkMode 
          ? 'bg-gradient-to-r from-[#031122] via-[#0b1c33] to-[#08182c] border-[#1d3658] text-[#f8fafc] shadow-xl' 
          : 'bg-gradient-to-r from-[#031427] via-[#0a233f] to-[#0e2744] border-[#1b314b] text-white shadow-lg'}
      `}>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#091a2e] border border-[#223d63] shadow-md flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffd768] to-[#b38814] flex items-center justify-center text-[#211700]">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffe088] bg-[#735c00]/40 px-2.5 py-0.5 rounded-full border border-[#ffe088]/20">
                  Collegiate Timetable Auditor
                </span>
                <span className="text-xs text-[#52b788] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Ordinary Code Comparison · Two-Hour Layout Supported
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#fbf9f3] tracking-tight mt-1.5 leading-tight">
                Timetable Version Comparison & Session Diff
              </h1>
              <p className="text-xs sm:text-sm text-[#b5c7e0] mt-0.5">
                Detects room modifications, rescheduled hours, additions, and cancellations while gracefully ignoring reordered rows.
              </p>

              {/* Subject Presets Pills */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[11px] font-serif font-bold text-[#fde089] uppercase tracking-wider">
                  Curriculum Preset:
                </span>
                <button
                  onClick={() => handleSelectPreset('indian-college')}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    activePreset === 'indian-college'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#52b788]" />
                  <span>Indian College (B.Tech / Degree)</span>
                  <span className="text-[10px] font-mono text-[#52b788]">(DSA, OS, DBMS, Digital Electronics)</span>
                </button>

                <button
                  onClick={() => handleSelectPreset('indian-school')}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    activePreset === 'indian-school'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Indian School (CBSE Class 12)</span>
                  <span className="text-[10px] font-mono text-[#38bdf8]">(Physics, Chem, Math, CS Python)</span>
                </button>

                <button
                  onClick={() => handleSelectPreset('collegiate')}
                  className={`px-3 py-1 rounded-full text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                    activePreset === 'collegiate'
                      ? 'bg-[#1b3457] border-[#e5c158] text-[#fde089] shadow-sm ring-1 ring-[#e5c158]/50'
                      : 'bg-[#091524] border-[#1d3350] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#f5d061]" />
                  <span>Collegiate Oxford Syllabus</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowUploadModal(!showUploadModal)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#10243d] hover:bg-[#163050] text-[#fde089] text-xs font-serif font-bold border border-[#23426e] transition-all shadow-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Versions (CSV)</span>
            </button>

            <button
              onClick={() => handleSelectPreset(activePreset === 'custom' ? 'indian-college' : activePreset)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0d1c31] hover:bg-[#132742] text-slate-300 text-xs font-sans font-semibold border border-[#1e385d] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#f5d061]" />
              <span>Reset Current Preset</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CSV UPLOAD DRAWER (Expandable)                                 */}
      {/* ============================================================== */}
      {showUploadModal && (
        <div className={`
          p-5 rounded-2xl border space-y-4 animate-in slide-in-from-top-3 duration-200
          ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
        `}>
          <div className="flex items-center justify-between pb-3 border-b border-[#1b3152]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#f5d061]" />
              <h3 className="font-serif text-sm font-bold text-slate-100">
                Upload Two Spreadsheet Versions (Standard CSV Timetable Format)
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Columns: Course Code, Course Name, Section, Day, Start Time, End Time, Room, Instructor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Version 1 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#fde089]">
                  Version 1: Baseline / Original Timetable
                </span>
                <label className="text-[11px] text-[#93c5fd] hover:underline cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Upload File
                  <input type="file" accept=".csv,.txt" onChange={(e) => handleFileUpload(e, 'v1')} className="hidden" />
                </label>
              </div>
              <textarea
                rows={5}
                value={csvV1}
                onChange={(e) => setCsvV1(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#07111e] border border-[#1b3152] font-mono text-[11px] text-slate-300 focus:outline-none focus:border-[#e5c158]"
              />
            </div>

            {/* Version 2 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#52b788]">
                  Version 2: Revised / Updated Timetable
                </span>
                <label className="text-[11px] text-[#93c5fd] hover:underline cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Upload File
                  <input type="file" accept=".csv,.txt" onChange={(e) => handleFileUpload(e, 'v2')} className="hidden" />
                </label>
              </div>
              <textarea
                rows={5}
                value={csvV2}
                onChange={(e) => setCsvV2(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#07111e] border border-[#1b3152] font-mono text-[11px] text-slate-300 focus:outline-none focus:border-[#e5c158]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUMMARY KPI METRICS BAR                                        */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Changed Sessions */}
        <div 
          onClick={() => setChangeTypeFilter('changed')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'changed'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Changed Sessions</div>
          <div className="font-serif text-2xl font-bold text-[#fde089] mt-0.5">{summary.changedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {summary.roomChangeCount} room · {summary.rescheduledCount} sched
          </div>
        </div>

        {/* Room Changes */}
        <div 
          onClick={() => setChangeTypeFilter('room')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'room'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Room Changes</div>
          <div className="font-serif text-2xl font-bold text-sky-400 mt-0.5">{summary.roomChangeCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Relocated venue</div>
        </div>

        {/* Rescheduled Classes */}
        <div 
          onClick={() => setChangeTypeFilter('rescheduled')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'rescheduled'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Rescheduled</div>
          <div className="font-serif text-2xl font-bold text-amber-400 mt-0.5">{summary.rescheduledCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Day/time adjusted</div>
        </div>

        {/* Added Sessions */}
        <div 
          onClick={() => setChangeTypeFilter('added')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'added'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Added Sessions</div>
          <div className="font-serif text-2xl font-bold text-[#52b788] mt-0.5">+{summary.addedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">New in Version 2</div>
        </div>

        {/* Removed Sessions */}
        <div 
          onClick={() => setChangeTypeFilter('removed')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'removed'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Removed Sessions</div>
          <div className="font-serif text-2xl font-bold text-rose-400 mt-0.5">-{summary.removedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cancelled / Dropped</div>
        </div>

        {/* Reordered Rows Ignored */}
        <div 
          onClick={() => setChangeTypeFilter('unchanged')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            changeTypeFilter === 'unchanged'
              ? 'bg-[#192b45] border-[#e5c158] ring-1 ring-[#e5c158]'
              : isDarkMode ? 'bg-[#0a1526] border-[#1d3557] hover:border-[#284873]' : 'bg-white border-[#dcdad4]'
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Reordered Rows</div>
          <div className="font-serif text-2xl font-bold text-slate-300 mt-0.5">{summary.reorderedIgnoredCount}</div>
          <div className="text-[10px] text-[#52b788] mt-0.5 font-medium">Cleanly Ignored</div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FEATURE 2: FILTER CONTROLS & AI NORMALIZATION TOGGLE           */}
      {/* ============================================================== */}
      <div className={`
        p-4 sm:p-5 rounded-2xl border space-y-4
        ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
      `}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Filter Controls for Course & Section */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Filter by Course */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-serif font-semibold">Course:</span>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className={`
                  text-xs py-1.5 px-3 rounded-xl border focus:outline-none focus:border-[#e5c158] transition-colors
                  ${isDarkMode ? 'bg-[#0f1d32] border-[#22395d] text-[#f1f5f9]' : 'bg-white border-slate-300 text-slate-900'}
                `}
              >
                <option value="all">All Courses ({availableCourses.length})</option>
                {availableCourses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filter by Section */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-serif font-semibold">Section:</span>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className={`
                  text-xs py-1.5 px-3 rounded-xl border focus:outline-none focus:border-[#e5c158] transition-colors
                  ${isDarkMode ? 'bg-[#0f1d32] border-[#22395d] text-[#f1f5f9]' : 'bg-white border-slate-300 text-slate-900'}
                `}
              >
                <option value="all">All Sections ({availableSections.length})</option>
                {availableSections.map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-serif font-semibold">Status:</span>
              <select
                value={changeTypeFilter}
                onChange={(e) => setChangeTypeFilter(e.target.value)}
                className={`
                  text-xs py-1.5 px-3 rounded-xl border focus:outline-none focus:border-[#e5c158] transition-colors
                  ${isDarkMode ? 'bg-[#0f1d32] border-[#22395d] text-[#f1f5f9]' : 'bg-white border-slate-300 text-slate-900'}
                `}
              >
                <option value="all">All Statuses ({items.length})</option>
                <option value="changed">Changed Sessions ({summary.changedCount})</option>
                <option value="room">Room Changes Only ({summary.roomChangeCount})</option>
                <option value="rescheduled">Rescheduled Only ({summary.rescheduledCount})</option>
                <option value="added">Added Sessions (+{summary.addedCount})</option>
                <option value="removed">Removed Sessions (-{summary.removedCount})</option>
                <option value="unchanged">Unchanged & Reordered ({summary.unchangedCount})</option>
                {summary.uncertainCount > 0 && (
                  <option value="uncertain">Uncertain Matches ({summary.uncertainCount})</option>
                )}
              </select>
            </div>

            {/* Reset Filters button if active */}
            {(courseFilter !== 'all' || sectionFilter !== 'all' || changeTypeFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setCourseFilter('all');
                  setSectionFilter('all');
                  setChangeTypeFilter('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#fde089] hover:underline font-semibold px-2 py-1"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Right: Where AI Helps - Optional Interpretation of Inconsistent Labels */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEnableAiInterpretation(!enableAiInterpretation)}
              className={`
                px-3.5 py-2 rounded-xl text-xs font-serif font-bold border transition-all flex items-center gap-2
                ${enableAiInterpretation
                  ? 'bg-gradient-to-r from-[#173050] to-[#11243e] border-[#e5c158] text-[#fde089] shadow-sm'
                  : 'bg-[#0e1d33] border-[#1d375a] text-slate-400 hover:text-slate-200'}
              `}
              title="Optional AI Interpretation: Disambiguates inconsistent room labels such as 'Computer Lab' and 'Comp. Laboratory'"
            >
              <Sparkles className="w-4 h-4 text-[#f5d061]" />
              <span>AI Label Interpretation: {enableAiInterpretation ? 'Active' : 'Disabled'}</span>
            </button>
          </div>
        </div>

        {/* Live Active Filter Notice Banner */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1b3152]/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span>Filtering:</span>
            <span className="font-mono text-[#fde089]">
              {courseFilter === 'all' ? 'All Courses' : courseFilter} · {sectionFilter === 'all' ? 'All Sections' : sectionFilter} · {changeTypeFilter}
            </span>
          </div>
          <span className="font-mono">
            Displaying {filteredItems.length} of {items.length} sessions
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STUDENT CHALLENGE: UNCERTAIN MATCH RESOLVER CARDS              */}
      {/* ============================================================== */}
      {summary.uncertainCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#231535] border border-[#7e3b9c]/60 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-[#d8b4fe]" />
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#f3e8ff]">
                  Student Challenge: Uncertain Session Matches Awaiting Confirmation
                </h3>
                <p className="text-xs text-[#d8b4fe]/80">
                  Rows moved or section labels drifted. Please confirm if these corresponding entries represent the same rescheduled session.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#581c87] text-[#f3e8ff]">
              {summary.uncertainCount} Pending
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {items.filter(i => i.isUncertain).map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-[#170e24] border border-[#6b21a8]/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-[#fde089]">{item.courseCode}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-200 font-serif">{item.courseName}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {item.uncertaintyReason}
                  </div>
                  <div className="text-[11px] text-[#c084fc] font-mono">
                    Version 1: "{item.oldSession?.section}" ({item.oldSession?.day} {item.oldSession?.startTime}) → Version 2: "{item.newSession?.section}" ({item.newSession?.day} {item.newSession?.startTime})
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end md:self-auto flex-shrink-0">
                  <button
                    onClick={() => handleConfirmMatch(item)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-serif font-bold shadow transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Match</span>
                  </button>
                  <button
                    onClick={() => handleRejectMatch(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2e1945] hover:bg-[#3d225c] text-rose-300 text-xs font-serif font-bold border border-rose-500/30 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Keep Separate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN SESSIONS COMPARISON LIST                                  */}
      {/* ============================================================== */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className={`
            p-12 text-center rounded-2xl border space-y-3
            ${isDarkMode ? 'bg-[#0a1526] border-[#1d3557]' : 'bg-[#fbf9f3] border-[#dcdad4]'}
          `}>
            <CheckCircle2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="font-serif text-base font-bold text-slate-300">
              No Sessions Match the Selected Filters
            </h3>
            <p className="text-xs text-slate-400">
              Try adjusting your course, section, or change status filters above.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isChanged = item.changeType === 'changed';
            const isAdded = item.changeType === 'added';
            const isRemoved = item.changeType === 'removed';
            const isUnchanged = item.changeType === 'unchanged';

            return (
              <div
                key={item.id}
                className={`
                  p-4 sm:p-5 rounded-2xl border transition-all duration-150 relative overflow-hidden
                  ${isChanged && !item.isUncertain
                    ? isDarkMode 
                      ? 'bg-[#0f1f36] border-[#294a78]' 
                      : 'bg-white border-[#c9b380] shadow-sm'
                    : isAdded
                      ? isDarkMode ? 'bg-[#062116] border-[#135939]' : 'bg-emerald-50 border-emerald-300'
                      : isRemoved
                        ? isDarkMode ? 'bg-[#260e12] border-[#6b1e28]' : 'bg-rose-50 border-rose-200'
                        : isDarkMode ? 'bg-[#091424] border-[#182c47]' : 'bg-[#f5f3ed] border-[#e4e2dd]'}
                `}
              >
                {/* Left vertical border indicator */}
                <div className={`
                  absolute left-0 top-0 bottom-0 w-1.5
                  ${isChanged ? 'bg-[#e5c158]' : isAdded ? 'bg-[#52b788]' : isRemoved ? 'bg-rose-500' : 'bg-slate-600'}
                `} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-2">
                  {/* Left info */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* Header tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#142845] text-[#fde089] border border-[#223f66]">
                        {item.courseCode}
                      </span>
                      <span className="text-xs font-serif font-bold text-slate-200">
                        {item.section}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-300 font-sans truncate">
                        {item.courseName}
                      </span>

                      {/* Change Category Badges */}
                      {item.isRoomChange && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-600/50 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Room Change
                        </span>
                      )}
                      {item.isRescheduled && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Rescheduled Class
                        </span>
                      )}
                      {item.isInstructorChange && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-600/50 flex items-center gap-1">
                          <User className="w-3 h-3" /> Instructor Update
                        </span>
                      )}
                      {isAdded && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 flex items-center gap-1">
                          <PlusCircle className="w-3 h-3" /> Added in V2
                        </span>
                      )}
                      {isRemoved && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-600/50 flex items-center gap-1">
                          <MinusCircle className="w-3 h-3" /> Removed in V2
                        </span>
                      )}
                      {isUnchanged && item.wasReordered && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                          <Shuffle className="w-3 h-3 text-[#52b788]" /> Row Moved (Ignored)
                        </span>
                      )}
                    </div>

                    {/* Diff comparison field by field */}
                    {item.differences.length > 0 ? (
                      <div className="space-y-1 pt-1">
                        {item.differences.map((diff, i) => (
                          <div key={i} className="text-xs flex items-center gap-2 flex-wrap font-sans">
                            <span className="text-slate-400 font-serif">{diff.fieldLabel}:</span>
                            <span className="line-through text-rose-400/90 font-mono bg-rose-950/40 px-1.5 py-0.2 rounded border border-rose-900/40">
                              {diff.oldValue}
                            </span>
                            <span className="text-slate-400">→</span>
                            <span className="text-[#52b788] font-bold font-mono bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-900/40">
                              {diff.newValue}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 font-sans flex items-center gap-3">
                        <span>{item.newSession?.day} {item.newSession?.startTime}–{item.newSession?.endTime}</span>
                        <span>·</span>
                        <span>{item.newSession?.room}</span>
                        <span>·</span>
                        <span>{item.newSession?.instructor}</span>
                      </div>
                    )}

                    {/* AI interpretation note if applied */}
                    {item.aiInterpretationNote && (
                      <div className="text-[11px] text-[#f5d061] flex items-center gap-1.5 font-serif italic pt-1">
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{item.aiInterpretationNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Right side: Row metadata & verification status */}
                  <div className="flex items-center gap-4 self-end lg:self-auto flex-shrink-0 text-right">
                    <div className="text-xs font-mono text-slate-400">
                      {item.oldRowIndex !== undefined && item.newRowIndex !== undefined ? (
                        <span>Row {item.oldRowIndex} → Row {item.newRowIndex}</span>
                      ) : item.newRowIndex !== undefined ? (
                        <span>New Row {item.newRowIndex}</span>
                      ) : (
                        <span>Former Row {item.oldRowIndex}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
