import { Course, ElectiveCourse, TutorialRosterItem, CreditCategory } from '../types';

export const ENROLLED_COURSES: Course[] = [
  {
    id: 'cs301',
    code: 'CS301',
    typeBadge: 'Core',
    credits: 4,
    title: 'Distributed Consensus & Fault-Tolerant Systems',
    lecturer: 'Prof. Alistair Sterling',
    lecturerRole: 'Fellow of Merton College',
    lecturerOffice: 'Tutorials: Tu 14:00 (Room 3B)',
    lecturerInitials: 'AS',
    department: 'Department of Computer Science · Radcliffe Quad',
    description: 'Rigorous formal study of synchrony models, Paxos safety/liveness proofs, practical Byzantine agreements, and verifiable replicated state machines.',
    examNote: 'Hilary Final',
    classmark: 'Classmark QA76.9.D5 Reference Bay',
    readings: [
      {
        id: 'r1',
        type: 'TOME',
        title: 'The Part-Time Parliament (1998)',
        authors: 'Leslie Lamport · ACM Trans. Comp. Sys.',
        source: 'ACM Transactions',
        callNumber: 'BOD-STACK: 98.412-A',
        statusBadge: 'Reserved on Desk',
        pdfAvailable: false,
      },
      {
        id: 'r2',
        type: 'PAPER',
        title: 'In Search of an Understandable Consensus (Raft)',
        authors: 'Diego Ongaro & John Ousterhout · USENIX ATC',
        source: 'USENIX Annual Technical Conference',
        callNumber: 'BOD-DIG: CS-ON-2014',
        statusBadge: 'Annotated PDF Available',
        pdfAvailable: true,
      }
    ],
    weeklyModules: [
      {
        id: 'w1',
        weekSpan: 'Weeks 1–3',
        title: 'State Machine Replication & Classical Paxos',
        description: 'Synod protocol, ballot rounds, phase 1a/2b invariants, liveness hazards',
        lectures: 'Lectures 1–6',
        status: 'completed',
        statusText: 'Completed & Stamped',
      },
      {
        id: 'w2',
        weekSpan: 'Weeks 4–6',
        title: 'Raft Consensus, Leader Elections & Log Compaction',
        description: 'Term intervals, heartbeat leases, snapshot transfers, disjoint quorum prevention',
        lectures: 'Lectures 7–12',
        status: 'in-progress',
        statusText: 'Week 7 In Progress',
      },
      {
        id: 'w3',
        weekSpan: 'Weeks 7–9',
        title: 'Byzantine Fault Tolerance & Practical BFT',
        description: 'Castro-Liskov protocol, cryptographic view change, equivocation defenses',
        lectures: 'Lectures 13–18',
        status: 'upcoming',
        statusText: 'Upcoming Michaelmas W8',
      },
      {
        id: 'w4',
        weekSpan: 'Weeks 10–12',
        title: 'Distributed Transactions & Spanner TrueTime',
        description: 'Two-Phase Commit, atomic clocks, GPS synchronization uncertainty bounds',
        lectures: 'Lectures 19–24',
        status: 'prep',
        statusText: 'Hilary Prep',
      }
    ],
    assessments: [
      {
        id: 'a1',
        weight: 25,
        title: 'Oral Viva Voce Exam',
        deadlineText: 'Nov 28, 2025',
      },
      {
        id: 'a2',
        weight: 45,
        title: '3x Code Folio Practicals',
        deadlineText: 'Folio 1 & 2 Submitted',
        statusTag: 'Folio 1 & 2 Submitted'
      },
      {
        id: 'a3',
        weight: 30,
        title: 'Schools Written Paper',
        deadlineText: 'Hilary Term Week 0',
      }
    ],
    lastRevision: '12 Oct 2025'
  },
  {
    id: 'math240',
    code: 'MATH240',
    typeBadge: 'Core',
    credits: 4,
    title: 'Spectral Tensors & Manifold Learning',
    lecturer: 'Dr. Evelyn Thorne-Clarke',
    lecturerRole: 'Fellow of St. John\'s College',
    lecturerOffice: 'Tutorials: Thu 10:30 (Room 12)',
    lecturerInitials: 'ET',
    department: 'Mathematical Institute · Andrew Wiles Building',
    description: 'High-dimensional spectral theory, Laplacian Beltrami operators, Riemannian metric decomposition, and multilinear tensor rank decompositions.',
    examNote: 'Problem Set 6',
    classmark: 'Classmark QA312.M3 Bodleian South Reading Room',
    readings: [
      {
        id: 'rm1',
        type: 'TOME',
        title: 'Tensor Decompositions and Applications (2009)',
        authors: 'Tamara G. Kolda & Brett W. Bader · SIAM Review',
        source: 'SIAM Journal',
        callNumber: 'BOD-STACK: 09.843-K',
        statusBadge: 'On Reserve Desk',
        pdfAvailable: true,
      },
      {
        id: 'rm2',
        type: 'PAPER',
        title: 'Diffusion Maps and Spectral Clustering',
        authors: 'Ronald R. Coifman & Stéphane Lafon · ACHA',
        source: 'Applied and Computational Harmonic Analysis',
        callNumber: 'BOD-DIG: MATH-COIF-06',
        statusBadge: 'Annotated PDF Available',
        pdfAvailable: true,
      }
    ],
    weeklyModules: [
      {
        id: 'wm1',
        weekSpan: 'Weeks 1–3',
        title: 'Multilinear Algebra & Tensor Outer Products',
        description: 'CANDECOMP/PARAFAC, Tucker decompositions, rank-$R$ approximations and uniqueness proofs',
        lectures: 'Lectures 1–6',
        status: 'completed',
        statusText: 'Completed & Stamped',
      },
      {
        id: 'wm2',
        weekSpan: 'Weeks 4–6',
        title: 'Graph Laplacians & Heat Kernels on Manifolds',
        description: 'Cheeger constant inequalities, spectral embeddings, Hodge decomposition on simplicial complexes',
        lectures: 'Lectures 7–12',
        status: 'in-progress',
        statusText: 'Week 7 In Progress',
      },
      {
        id: 'wm3',
        weekSpan: 'Weeks 7–9',
        title: 'Persistent Homology & Topological Data Analysis',
        description: 'Barcodes, Vietoris-Rips filtration sequences, bottleneck and Wasserstein stability theorems',
        lectures: 'Lectures 13–18',
        status: 'upcoming',
        statusText: 'Upcoming Michaelmas W8',
      },
      {
        id: 'wm4',
        weekSpan: 'Weeks 10–12',
        title: 'Optimization on Matrix Manifolds',
        description: 'Stiefel and Grassmann manifolds, Riemannian gradient descent, geodesics',
        lectures: 'Lectures 19–24',
        status: 'prep',
        statusText: 'Hilary Prep',
      }
    ],
    assessments: [
      {
        id: 'ma1',
        weight: 30,
        title: 'Weekly Problem Sets (6 of 8)',
        deadlineText: 'Set 6 Due Friday 17:00',
        statusTag: 'Current: 94.2% Marks'
      },
      {
        id: 'ma2',
        weight: 30,
        title: 'Computational Spectral Folio',
        deadlineText: 'Hilary Week 1',
      },
      {
        id: 'ma3',
        weight: 40,
        title: 'Mathematical Institute Written Paper',
        deadlineText: 'Trinity Term Examination',
      }
    ],
    lastRevision: '08 Oct 2025'
  },
  {
    id: 'ai412',
    code: 'AI412',
    typeBadge: 'Elective',
    credits: 4,
    title: 'Machine Learning Architectures & Transformer Dynamics',
    lecturer: 'Prof. Julian H. Vance',
    lecturerRole: 'Fellow of Balliol College',
    lecturerOffice: 'Tutorials: Wed 15:00 (Turing Lab)',
    lecturerInitials: 'JV',
    department: 'Oxford Robotics Institute & Turing Computing Wing',
    description: 'Attention mechanisms, expressive capacity of deep representations, self-supervised inductive biases, and mechanistic interpretability of neural models.',
    examNote: 'Lab 4 Review',
    classmark: 'Classmark QA76.87.V3 Radcliffe Science Library',
    readings: [
      {
        id: 'ra1',
        type: 'PAPER',
        title: 'Attention Is All You Need (2017)',
        authors: 'Vaswani et al. · Advances in Neural Information Processing Systems',
        source: 'NeurIPS',
        callNumber: 'BOD-DIG: AI-VAS-17',
        statusBadge: 'Annotated PDF Available',
        pdfAvailable: true,
      },
      {
        id: 'ra2',
        type: 'PAPER',
        title: 'A Mathematical Framework for Transformer Circuits',
        authors: 'Anthropic Research · Transformer Circuits Thread',
        source: 'Research Monograph',
        callNumber: 'BOD-DIG: AI-CIRC-22',
        statusBadge: 'Pre-Print Open Access',
        pdfAvailable: true,
      }
    ],
    weeklyModules: [
      {
        id: 'wa1',
        weekSpan: 'Weeks 1–3',
        title: 'Attention Geometry & Softmax Curvature',
        description: 'Dot-product scaled attention, query-key subspace projections, positional embeddings',
        lectures: 'Lectures 1–6',
        status: 'completed',
        statusText: 'Completed & Stamped',
      },
      {
        id: 'wa2',
        weekSpan: 'Weeks 4–6',
        title: 'Residual Stream Dynamics & Induction Heads',
        description: 'Two-layer circuit composition, in-context learning mechanics, KV cache routing',
        lectures: 'Lectures 7–12',
        status: 'in-progress',
        statusText: 'Week 7 In Progress',
      },
      {
        id: 'wa3',
        weekSpan: 'Weeks 7–9',
        title: 'Scaling Laws & Efficient Parameter Tuning',
        description: 'Chinchilla compute-optimal frontiers, LoRA rank constraints, FlashAttention memory IO',
        lectures: 'Lectures 13–18',
        status: 'upcoming',
        statusText: 'Upcoming Michaelmas W8',
      },
      {
        id: 'wa4',
        weekSpan: 'Weeks 10–12',
        title: 'Mechanistic Interpretability & Superposition',
        description: 'Sparse autoencoders, polysemanticity dissection, causal activation patching',
        lectures: 'Lectures 19–24',
        status: 'prep',
        statusText: 'Hilary Prep',
      }
    ],
    assessments: [
      {
        id: 'aa1',
        weight: 50,
        title: 'Turing Lab Implementation Folios',
        deadlineText: 'Lab 4 Due Nov 21',
        statusTag: '3 of 5 Completed'
      },
      {
        id: 'aa2',
        weight: 20,
        title: 'Mechanistic Paper Critique',
        deadlineText: 'Dec 05, 2025',
      },
      {
        id: 'aa3',
        weight: 30,
        title: 'Michaelmas Capstone Viva',
        deadlineText: 'Hilary Term Week 0',
      }
    ],
    lastRevision: '14 Oct 2025'
  },
  {
    id: 'phil210',
    code: 'PHIL210',
    typeBadge: 'Breadth',
    credits: 4,
    title: 'Epistemology & Artificial Agency',
    lecturer: 'Archivist Thomas Pemberton',
    lecturerRole: 'Lecturer in Philosophy, All Souls',
    lecturerOffice: 'Tutorials: Mon 16:00 (Codrington Library)',
    lecturerInitials: 'TP',
    department: 'Faculty of Philosophy · Radcliffe Humanities',
    description: 'Philosophical analysis of synthetic belief, intentionality in statistical models, epistemic opacity, moral status of autonomous systems, and counterfactual agency.',
    examNote: 'Essay Draft #2',
    classmark: 'Classmark BD161.P4 All Souls Library',
    readings: [
      {
        id: 'rp1',
        type: 'TOME',
        title: 'Computing Machinery and Intelligence (1950)',
        authors: 'A. M. Turing · Mind: A Quarterly Review of Psychology and Philosophy',
        source: 'Mind Journal Archive',
        callNumber: 'BOD-STACK: BD-TUR-50',
        statusBadge: 'Original Holding Desk',
        pdfAvailable: true,
      },
      {
        id: 'rp2',
        type: 'PAPER',
        title: 'The Extended Mind & Synthetic Cognition',
        authors: 'Andy Clark & David Chalmers · Analysis',
        source: 'Analysis 58(1)',
        callNumber: 'BOD-DIG: PHIL-CLARK-98',
        statusBadge: 'Annotated PDF Available',
        pdfAvailable: true,
      }
    ],
    weeklyModules: [
      {
        id: 'wp1',
        weekSpan: 'Weeks 1–3',
        title: 'Foundations of Knowledge & Statistical Justification',
        description: 'Gettier problems, safety vs sensitivity, warrant in inductive representations',
        lectures: 'Lectures 1–6',
        status: 'completed',
        statusText: 'Completed & Stamped',
      },
      {
        id: 'wp2',
        weekSpan: 'Weeks 4–6',
        title: 'Intentionality, Semantics & The Chinese Room Revisited',
        description: 'Searle critique, grounded meaning vs token manipulation, syntactic functionalism',
        lectures: 'Lectures 7–12',
        status: 'in-progress',
        statusText: 'Week 7 In Progress',
      },
      {
        id: 'wp3',
        weekSpan: 'Weeks 7–9',
        title: 'Epistemic Opacity & Explainability Rights',
        description: 'High-dimensional black box inscrutability, hermeneutic injustice, algorithmic due process',
        lectures: 'Lectures 13–18',
        status: 'upcoming',
        statusText: 'Upcoming Michaelmas W8',
      },
      {
        id: 'wp4',
        weekSpan: 'Weeks 10–12',
        title: 'Synthetic Moral Status & Agency Delegation',
        description: 'Responsibility gaps in distributed autonomous systems, consequentialist culpability',
        lectures: 'Lectures 19–24',
        status: 'prep',
        statusText: 'Hilary Prep',
      }
    ],
    assessments: [
      {
        id: 'pa1',
        weight: 40,
        title: 'Tutorial Essay Portfolio (4 Essays)',
        deadlineText: 'Essay 2 Draft Pending Review',
        statusTag: 'Essay 1: Alpha (First)'
      },
      {
        id: 'pa2',
        weight: 20,
        title: 'Socratic Disputation',
        deadlineText: 'Dec 02, 2025',
      },
      {
        id: 'pa3',
        weight: 40,
        title: 'Schools Philosophy Honors Paper',
        deadlineText: 'Trinity Term Examination',
      }
    ],
    lastRevision: '05 Oct 2025'
  }
];

export const ELECTIVE_REGISTRY: ElectiveCourse[] = [
  {
    id: 'el-neur320',
    code: 'NEUR320',
    faculty: 'Faculty of Physiology & Neurosciences',
    credits: 4,
    title: 'Biological Neural Networks & Synaptic Plasticity',
    description: 'Biophysical Hodgkin-Huxley models, spike-timing dependent plasticity (STDP), cortical column mapping, and neuromorphic compute analog simulations.',
    lecturer: 'Prof. Katherine Wu',
    schedule: 'Mon/Thu 11:00',
    seatsOpen: 6,
    totalSeats: 35,
    prereq: 'AI412 or CS201',
    category: 'Natural Sciences'
  },
  {
    id: 'el-cyber405',
    code: 'CYBER405',
    faculty: 'Oxford Internet Institute / CompSci',
    credits: 4,
    title: 'Cryptographic Protocols & Zero-Knowledge Proofs',
    description: 'Elliptic curve pairings, zk-SNARKs & STARKs, polynomial commitment schemes, homomorphic secret sharing, and lattice-based quantum resistance.',
    lecturer: 'Dr. M. G. Rozental',
    schedule: 'Wed/Fri 14:00',
    seatsOpen: 12,
    totalSeats: 30,
    prereq: 'MATH240',
    category: 'CS & AI'
  },
  {
    id: 'el-hist102',
    code: 'HIST102',
    faculty: 'Faculty of History',
    credits: 2,
    title: 'Medieval Papal Diplomacy, Chanceries & Statecraft',
    description: 'Analysis of 12th-century curial registers, papal bull forgery detection, and diplomatic correspondence networks across Western Christendom.',
    lecturer: 'Canon R. V. Dunstan',
    schedule: 'Thu 16:30',
    seatsOpen: 18,
    totalSeats: 25,
    prereq: 'Open to All Years',
    isAuditOnly: true,
    category: 'Humanities'
  },
  {
    id: 'el-phys304',
    code: 'PHYS304',
    faculty: 'Clarendon Laboratory / Physics',
    credits: 4,
    title: 'Quantum Decoherence & Open Systems Dynamics',
    description: 'Density matrix formulations, Lindblad master equation, quantum state tomography, and environmental noise suppression in superconducting circuits.',
    lecturer: 'Prof. Edward Davies',
    schedule: 'Tue/Fri 09:30',
    seatsOpen: 8,
    totalSeats: 20,
    prereq: 'MATH240 & PHYS201',
    category: 'Natural Sciences'
  }
];

export const TUTORIAL_ROSTER: TutorialRosterItem[] = [
  {
    id: 'tut-1',
    name: 'Prof. Alistair Sterling',
    initials: 'AS',
    college: 'Merton',
    office: 'Office 3B',
    timeSlot: '14:00 – 15:30',
    day: 'Tues 14:00',
  },
  {
    id: 'tut-2',
    name: 'Dr. Evelyn Thorne-Clarke',
    initials: 'ET',
    college: 'St. John\'s',
    office: 'Room 12',
    timeSlot: '10:30 – 12:00',
    day: 'Thu 10:30',
  },
  {
    id: 'tut-3',
    name: 'Prof. Julian H. Vance',
    initials: 'JV',
    college: 'Balliol',
    office: 'Turing Lab',
    timeSlot: '15:00 – 16:30',
    day: 'Wed 15:00',
  }
];

export const CREDIT_BREAKDOWN: CreditCategory[] = [
  {
    label: 'Core Computer Science',
    current: 48,
    total: 52,
    percentage: 92,
    color: '#0284c7'
  },
  {
    label: 'Mathematics & Formal Logic',
    current: 24,
    total: 24,
    percentage: 100,
    status: 'Complete',
    color: '#d4af37'
  },
  {
    label: 'Breadth & Humanities',
    current: 16,
    total: 24,
    percentage: 66,
    color: '#64748b'
  },
  {
    label: 'Senior Honors Thesis',
    current: 0,
    total: 20,
    percentage: 0,
    status: 'Trinity \'26',
    color: '#a855f7'
  }
];

export const CURRENT_STUDENT: import('../types').StudentProfile = {
  id: 'stu-ox-2023-88219',
  name: 'Helena Vance',
  matriculationNo: 'OX-2023-88219',
  folioNo: 'CS-2023-V9',
  yearOfStudy: 'Year 3 (Finalist)',
  program: 'B.A. (Hons) Computer Science & Artificial Intelligence',
  faculty: 'Faculty of Computing & Mathematical Sciences',
  institution: 'University of Oxford',
  residentialHouse: 'Merton College · Radcliffe Quad (Room 3B)',
  email: 'helena.vance@merton.ox.ac.uk',
  advisor: 'Prof. Alistair Sterling, Fellow of Merton College',
  standing: 'Dean Endorsed · First Class Honors Standing',
  currentTerm: 'Michaelmas Term 2025 (Week 7 in Session)',
  gpa: '3.94 / 4.00 (78.4% First Class Composite)',
  rank: 'Top 3% of Collegiate Cohort',
  photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiuAGEyPWcCfR7Vp1oWPtSR3XidzvHwBwa6LWrElkWT3Dk2LO5XPBCY1A-a5kyNNLJM2sjvqhmetX4t3rXjWIL87UuSix_0dHjMelV7JjFhONrK5vcQVfqZYNvgmG0D3I1gM_lnz1Iv5-nRkusDIb6559RMiU7fPb8phNb9FTFyGeiME4uLyiHF3a1fi1zl7vfNsQky6WWKhEBJl8X91Su6sUpPGr-tK3lwTvJsdV5nNJlOgTdyVNC',
  enrolledCredits: 16,
  completedCredits: 88,
  totalDegreeCredits: 120,
  attendanceRate: '96.4% Roll Call Quorum',
  emergencyContact: 'Collegiate Welfare Office & Radcliffe Quad Lodge (+44 1865 276310)',
};
