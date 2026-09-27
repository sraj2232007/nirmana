import React, { useState, useEffect } from 'react';
import { Sidebar, PortalType } from './components/Sidebar';
import { Header } from './components/Header';
import { CourseRegistrationScreen } from './components/CourseRegistrationScreen';
import { OverviewScreen } from './components/OverviewScreen';
import { AttendanceScreen } from './components/AttendanceScreen';
import { AssignmentsScreen } from './components/AssignmentsScreen';
import { BursarScreen } from './components/BursarScreen';
import { AiTutorScreen } from './components/AiTutorScreen';
import { TimetableDiffScreen } from './components/TimetableDiffScreen';
import { StudentProfileScreen } from './components/StudentProfileScreen';
import { ExtractFolioModal } from './components/modals/ExtractFolioModal';
import { WaxSealModal } from './components/modals/WaxSealModal';
import { BookSlipModal } from './components/modals/BookSlipModal';
import { ReadingDocketModal } from './components/modals/ReadingDocketModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { ENROLLED_COURSES } from './data/mockData';
import { INDIAN_COLLEGE_STUDENT } from './data/indianStudentData';
import { ElectiveCourse, ReadingItem, TutorialRosterItem, StudentProfile } from './types';

export default function App() {
  const [activePortal, setActivePortal] = useState<PortalType>('courses');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Dark mode theme as requested
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active student identity: defaults to Indian College (B.Tech CSE at IIT Delhi)
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(INDIAN_COLLEGE_STUDENT);

  // Ballot state lifted for modals
  const [ballotElectives, setBallotElectives] = useState<ElectiveCourse[]>([]);

  // Modals state
  const [isExtractFolioOpen, setIsExtractFolioOpen] = useState<boolean>(false);
  const [isWaxSealOpen, setIsWaxSealOpen] = useState<boolean>(false);
  const [isBookSlipOpen, setIsBookSlipOpen] = useState<boolean>(false);
  const [isStudentProfileOpen, setIsStudentProfileOpen] = useState<boolean>(false);
  const [selectedTutor, setSelectedTutor] = useState<TutorialRosterItem | null>(null);

  const [isReadingDocketOpen, setIsReadingDocketOpen] = useState<boolean>(false);
  const [selectedReading, setSelectedReading] = useState<ReadingItem | null>(null);
  const [selectedReadingCourseTitle, setSelectedReadingCourseTitle] = useState<string>('');
  const [aiTutorInitialQuery, setAiTutorInitialQuery] = useState<string>('');

  const baseCredits = ENROLLED_COURSES.reduce((acc, c) => acc + c.credits, 0);
  const electiveCredits = ballotElectives.reduce((acc, c) => acc + c.credits, 0);
  const liveTotalCredits = baseCredits + electiveCredits;

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#080f1a';
      document.body.style.color = '#f1f5f9';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#fbf9f3';
      document.body.style.color = '#1b1c18';
    }
  }, [isDarkMode]);

  const handleBookTutorial = (tutor: TutorialRosterItem) => {
    setSelectedTutor(tutor);
    setIsBookSlipOpen(true);
  };

  const handleViewReading = (reading: ReadingItem, courseTitle: string) => {
    setSelectedReading(reading);
    setSelectedReadingCourseTitle(courseTitle);
    setIsReadingDocketOpen(true);
  };

  const handleQueryAiTutor = (courseCode: string) => {
    setAiTutorInitialQuery(`Explain the key theoretical invariants, lab experiments, and exam expectations for ${courseCode}.`);
    setActivePortal('ai-tutor');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-[#080f1a] text-[#f1f5f9]' : 'bg-[#fbf9f3] text-[#1b1c18]'
    }`}>
      {/* Collegiate Sidebar */}
      <Sidebar
        activePortal={activePortal}
        onSelectPortal={setActivePortal}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        student={currentStudent}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          student={currentStudent}
          onOpenStudentProfile={() => setIsStudentProfileOpen(true)}
          onSelectStudent={setCurrentStudent}
          onNavigateToTab={(tab) => setActivePortal(tab as PortalType)}
        />

        {/* Viewport Content Container */}
        <main className="flex-1 w-full pt-24 px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
          {activePortal === 'profile' && (
            <StudentProfileScreen
              currentStudent={currentStudent}
              onSelectStudent={setCurrentStudent}
              isDarkMode={isDarkMode}
              onNavigateToDiff={() => setActivePortal('timetable-diff')}
              onNavigateToCourses={() => setActivePortal('courses')}
            />
          )}

          {activePortal === 'courses' && (
            <CourseRegistrationScreen
              isDarkMode={isDarkMode}
              onExtractFolio={() => setIsExtractFolioOpen(true)}
              onOpenWaxSeal={() => setIsWaxSealOpen(true)}
              onBookTutorial={handleBookTutorial}
              onViewReading={handleViewReading}
              onQueryAiTutor={handleQueryAiTutor}
              searchQuery={searchQuery}
              ballotElectives={ballotElectives}
              setBallotElectives={setBallotElectives}
              onNavigateToDiff={() => setActivePortal('timetable-diff')}
              student={currentStudent}
            />
          )}

          {activePortal === 'timetable-diff' && (
            <TimetableDiffScreen isDarkMode={isDarkMode} />
          )}

          {activePortal === 'overview' && (
            <OverviewScreen
              isDarkMode={isDarkMode}
              onNavigateToCourses={() => setActivePortal('courses')}
              student={currentStudent}
              onNavigateToProfile={() => setActivePortal('profile')}
              onNavigateToDiff={() => setActivePortal('timetable-diff')}
            />
          )}

          {activePortal === 'attendance' && (
            <AttendanceScreen isDarkMode={isDarkMode} />
          )}

          {activePortal === 'assignments' && (
            <AssignmentsScreen isDarkMode={isDarkMode} />
          )}

          {activePortal === 'bursar' && (
            <BursarScreen isDarkMode={isDarkMode} />
          )}

          {activePortal === 'ai-tutor' && (
            <AiTutorScreen
              isDarkMode={isDarkMode}
              initialQuery={aiTutorInitialQuery}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <StudentProfileModal
        isOpen={isStudentProfileOpen}
        onClose={() => setIsStudentProfileOpen(false)}
        student={currentStudent}
        isDarkMode={isDarkMode}
        onNavigateToTab={(tabId) => setActivePortal(tabId as PortalType)}
      />

      <ExtractFolioModal
        isOpen={isExtractFolioOpen}
        onClose={() => setIsExtractFolioOpen(false)}
        enrolledCourses={ENROLLED_COURSES}
        totalCredits={liveTotalCredits}
        isDarkMode={isDarkMode}
      />

      <WaxSealModal
        isOpen={isWaxSealOpen}
        onClose={() => setIsWaxSealOpen(false)}
        totalCredits={liveTotalCredits}
        courseCount={ENROLLED_COURSES.length + ballotElectives.length}
        addedCourses={ballotElectives}
        isDarkMode={isDarkMode}
      />

      <BookSlipModal
        isOpen={isBookSlipOpen}
        onClose={() => setIsBookSlipOpen(false)}
        tutor={selectedTutor}
        isDarkMode={isDarkMode}
      />

      <ReadingDocketModal
        isOpen={isReadingDocketOpen}
        onClose={() => setIsReadingDocketOpen(false)}
        reading={selectedReading}
        courseTitle={selectedReadingCourseTitle}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
