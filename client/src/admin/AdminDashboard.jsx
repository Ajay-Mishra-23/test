import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Building, Ticket, AlertCircle, Award, Zap,
  ExternalLink, LogOut, Sun, Moon, Bell, Check, X, Clock, Edit, Trash2, 
  Plus, CheckCircle2, RotateCcw, ArrowUpRight, Play, Briefcase, IndianRupee,
  ShieldCheck, ChevronDown
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout, onSwitchToStudentView }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- RECRUITMENT DATA ---
  const [recruitmentFilter, setRecruitmentFilter] = useState('all');
  const [selectedCommitteeFilter, setSelectedCommitteeFilter] = useState('all');
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: 'Kabir Verma',
      rollNo: '23CS1089',
      cgpa: 8.42,
      committee: 'Hostel & Mess Committee',
      minCgpa: 7,
      applied: 'Oct 21, 2026',
      status: 'Slot Booked',
      byAuto: true,
      interviewSlot: 'Today, Oct 26 • 4:20 PM - 4:40 PM',
      score: ''
    },
    {
      id: 2,
      name: 'Ananya Deshmukh',
      rollNo: '23CS1012',
      cgpa: 9.1,
      committee: 'SAC Technical Committee',
      minCgpa: 7.5,
      applied: 'Oct 23, 2026',
      status: 'Slot Booked',
      byAuto: true,
      interviewSlot: 'Today, Oct 26 • 3:40 PM - 4:00 PM',
      score: ''
    },
    {
      id: 3,
      name: 'Ishita Rawat',
      rollNo: '23ME1008',
      cgpa: 8.0,
      committee: 'Hostel & Mess Committee',
      minCgpa: 7,
      applied: 'Oct 24, 2026',
      status: 'Slot Booked',
      byAuto: true,
      interviewSlot: 'Tomorrow, Oct 27 • 11:00 AM - 11:20 AM',
      score: ''
    },
    {
      id: 4,
      name: 'Tanmay Saxena',
      rollNo: '23IT1023',
      cgpa: 8.5,
      committee: 'SAC Technical Committee',
      minCgpa: 7.5,
      applied: 'Oct 26, 2026',
      status: 'Slot Booked',
      byAuto: true,
      interviewSlot: 'Tomorrow, Oct 27 • 2:30 PM - 2:50 PM',
      score: ''
    },
    {
      id: 5,
      name: 'Meera Nair',
      rollNo: '23CS1101',
      cgpa: 6.9,
      committee: 'Hostel & Mess Committee',
      minCgpa: 7,
      applied: 'Oct 26, 2026',
      status: 'Rejected',
      byAuto: true,
      rejectionReason: 'CGPA 6.9 is below the minimum 7',
      interviewSlot: '—',
      score: '—'
    },
    {
      id: 6,
      name: 'Riddhiman Ghosh',
      rollNo: '23EC1044',
      cgpa: 8.8,
      committee: 'Cultural & Fiesta Council',
      minCgpa: 6.5,
      applied: 'Oct 26, 2026',
      status: 'Slot Booked',
      byAuto: true,
      interviewSlot: 'Wed, Oct 28 • 3:40 PM - 4:00 PM',
      score: ''
    }
  ]);

  // --- COMMITTEES DATA ---
  const [committees, setCommittees] = useState([
    {
      id: 'sac-tech',
      name: 'SAC Technical Committee',
      category: 'Flagship Body',
      status: 'HIRING OPEN',
      description: 'Oversees college technical symposiums, hackathons, and web infrastructure.',
      role: 'Web & Infrastructure Lead',
      head: 'Aarav Sharma (B.Tech CS 4th Yr)',
      minCgpa: 7.5,
      eligibility: 'All Branches',
      vacancies: 4,
      deadline: 'Oct 29, 2026',
      applicants: '2 (0 selected)'
    },
    {
      id: 'hostel-mess',
      name: 'Hostel & Mess Committee',
      category: 'Governance',
      status: 'HIRING OPEN',
      description: 'Liaison with food vendors, cafeteria management, and hostel maintenance oversight.',
      role: 'Quality & Inventory Auditor',
      head: 'Neha Patel (B.Tech ME 3rd Yr)',
      minCgpa: 7,
      eligibility: 'Hostel Residents Only',
      vacancies: 6,
      deadline: 'Oct 27, 2026',
      applicants: '3 (0 selected)'
    },
    {
      id: 'cultural-fiesta',
      name: 'Cultural & Fiesta Council',
      category: 'Events & Arts',
      status: 'HIRING OPEN',
      description: 'Coordinates annual cultural fest Fiesta, Garba nights, and literary events.',
      role: 'Stage & Operations Coordinator',
      head: 'Rohan Gupta (B.Tech EC 4th Yr)',
      minCgpa: 6.5,
      eligibility: 'All Branches',
      vacancies: 8,
      deadline: 'Nov 05, 2026',
      applicants: '1 (0 selected)'
    }
  ]);

  // --- SUPER 50 DATA ---
  const [cohortSize, setCohortSize] = useState(50);
  const [assessmentWeight, setAssessmentWeight] = useState(60);
  const [interviewWeight, setInterviewWeight] = useState(40);
  const [super50Students, setSuper50Students] = useState([
    { id: 1, name: 'Ananya Deshmukh', roll: '23CS1012 • CSE', assessment: 98, interview: 9.8, status: 'Confirmed' },
    { id: 2, name: 'Riddhiman Ghosh', roll: '23EC1044 • ECE', assessment: 96, interview: 9.5, status: 'Confirmed' },
    { id: 3, name: 'Tanmay Saxena', roll: '23IT1023 • IT', assessment: 95, interview: 9.4, status: 'Confirmed' },
    { id: 4, name: 'Kabir Verma', roll: '23CS1089 • CSE', assessment: 94, interview: 9.4, status: 'Confirmed' },
    { id: 5, name: 'Ishita Rawat', roll: '23ME1008 • ME', assessment: 92, interview: 9.2, status: 'Confirmed' },
    { id: 6, name: 'Dev Malhotra', roll: '23EC1120 • ECE', assessment: 81, interview: 7.9, status: 'Confirmed' }
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newAssessment, setNewAssessment] = useState('');
  const [newInterview, setNewInterview] = useState('');

  // --- GRIEVANCES DATA ---
  const [grievanceFilter, setGrievanceFilter] = useState('open');
  const [grievances, setGrievances] = useState([
    {
      id: 'TKT-1094',
      committee: 'Hostel & Mess Committee',
      status: 'IN PROGRESS',
      timeLeft: '25h 51m left',
      title: 'Mess quality feedback: uneven breakfast distribution',
      description: 'Morning breakfast running out 30 minutes before official closing time.',
      raisedBy: 'Kabir Verma (23CS1089)',
      date: 'Oct 25, 2026'
    },
    {
      id: 'TKT-1101',
      committee: 'SAC Technical Committee',
      status: 'IN PROGRESS',
      timeLeft: '42h 51m left',
      title: 'Wi-Fi down in Innovation Block lab 2',
      description: 'No network since morning, projects are blocked.',
      raisedBy: 'Sanya Kapoor (23ME1055)',
      date: 'Oct 26, 2026'
    }
  ]);

  // --- EVENTS & PAYMENTS DATA ---
  const [events, setEvents] = useState([
    {
      id: 'garba-2026',
      title: 'Grand Campus Dandiya & Garba Night 2026',
      tag: 'Garba Special',
      seatsLeft: 42,
      date: 'Oct 26, 2026 • 6:30 PM Onwards • Main College Amphitheatre',
      booked: 158,
      total: 200,
      price: 150,
      revenue: 150
    },
    {
      id: 'fiesta-hack',
      title: 'Fiesta 2026: 24-Hour Inter-College Hackathon',
      tag: 'Fiesta Flagship',
      seatsLeft: 14,
      date: 'Nov 12-13, 2026 • 10:00 AM • SAC Tech Lab & Innovation Block',
      booked: 26,
      total: 40,
      price: 300,
      revenue: 0
    }
  ]);
  const [paymentQueue] = useState([
    {
      student: 'Kabir Verma',
      rollNo: '23CS1089',
      event: 'Grand Campus Dandiya & Garba Night 2026',
      amount: '₹150',
      time: 'Oct 22, 6:53 PM',
      status: 'Verified',
      isAuto: true
    }
  ]);
  const [issuedPasses] = useState([
    {
      passId: 'GNB-2026-CS89',
      student: 'Kabir Verma (23CS1089)',
      event: 'Grand Campus Dandiya & Garba Night 2026',
      price: '₹150'
    }
  ]);

  // --- AUTOMATION RULES STATE ---
  const [rules, setRules] = useState({
    autoScreening: true,
    slotAllocation: true,
    autoSelection: true,
    paymentVerification: true,
    slaEscalation: true,
    autoCloseHiring: true
  });
  const [slaHours, setSlaHours] = useState(48);
  const [selectionThreshold, setSelectionThreshold] = useState(7);
  const [interviewSlots, setInterviewSlots] = useState([
    { id: 1, text: 'Today, Oct 26 • 4:20 PM - 4:40 PM', booked: true },
    { id: 2, text: 'Tomorrow, Oct 27 • 11:00 AM - 11:20 AM', booked: true },
    { id: 3, text: 'Tomorrow, Oct 27 • 2:30 PM - 2:50 PM', booked: true },
    { id: 4, text: 'Wed, Oct 28 • 3:40 PM - 4:00 PM', booked: true },
    { id: 5, text: 'Wed, Oct 28 • 4:20 PM - 4:40 PM', booked: false }
  ]);
  const [customSlot, setCustomSlot] = useState('');

  // --- RECENT AUTOMATION LOGS ---
  const [automationLogs] = useState([
    { type: 'ADMIN', text: 'Hiring opened for SAC Technical Committee', time: 'Oct 26, 6:58 PM' },
    { type: 'ADMIN', text: 'Hiring closed for SAC Technical Committee', time: 'Oct 26, 6:58 PM' },
    { type: 'ADMIN', text: 'TKT-1082 resolved', time: 'Oct 26, 6:58 PM' },
    { type: 'AUTO', text: 'Riddhiman Ghosh → Wed, Oct 28 • 3:40 PM - 4:00 PM (Cultural & Fiesta Council)', time: 'Oct 26, 6:53 PM' },
    { type: 'AUTO', text: 'Tanmay Saxena → Tomorrow, Oct 27 • 2:30 PM - 2:50 PM (SAC Technical Committee)', time: 'Oct 26, 6:53 PM' },
    { type: 'AUTO', text: 'Riddhiman Ghosh shortlisted for Cultural & Fiesta Council (CGPA 8.8 ≥ 6.5)', time: 'Oct 26, 6:53 PM' },
    { type: 'AUTO', text: 'Meera Nair rejected for Hostel & Mess Committee (CGPA 6.9 is below the minimum 7)', time: 'Oct 26, 6:53 PM' },
    { type: 'AUTO', text: 'Tanmay Saxena shortlisted for SAC Technical Committee (CGPA 8.5 ≥ 7.5)', time: 'Oct 26, 6:53 PM' }
  ]);

  // Modals
  const [isNewCommitteeOpen, setIsNewCommitteeOpen] = useState(false);
  const [newCommForm, setNewCommForm] = useState({
    name: '', role: '', head: '', minCgpa: 7.0, category: 'Governance', vacancies: 4, deadline: 'Nov 15, 2026', eligibility: 'All Branches'
  });
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    title: '', tag: 'Special Event', date: 'Nov 20, 2026 • 6:00 PM', price: 150, total: 100
  });

  // Calculate composite score
  const calculateComposite = (assessment, interview) => {
    const a = parseFloat(assessment) || 0;
    const i = (parseFloat(interview) || 0) * 10;
    const wA = parseFloat(assessmentWeight) / 100;
    const wI = parseFloat(interviewWeight) / 100;
    const score = (a * wA) + (i * wI);
    return score.toFixed(1) + '%';
  };

  // Handlers
  const handleScoreChange = (id, val) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, score: val } : a));
    const scoreNum = parseFloat(val);
    if (!isNaN(scoreNum) && rules.autoSelection) {
      if (scoreNum >= selectionThreshold) {
        showToast(`Auto-selection rule triggered: Score ${scoreNum} ≥ ${selectionThreshold}. Student selected!`);
      }
    }
  };

  const handleSelectApplicant = (id) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'Selected' } : a));
    showToast('Applicant status changed to Selected');
  };

  const handleRejectApplicant = (id) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
    showToast('Applicant status changed to Rejected');
  };

  const handleReconsider = (id) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'Slot Booked', rejectionReason: null } : a));
    showToast('Applicant reconsidered and slot retained.');
  };

  const handleToggleRule = (key) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('Automation rule updated.');
  };

  const handleResolveGrievance = (id) => {
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, status: 'RESOLVED' } : g));
    showToast(`Ticket ${id} marked as Resolved.`);
  };

  const handleEscalateGrievance = (id) => {
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, status: 'ESCALATED TO WARDEN' } : g));
    showToast(`Ticket ${id} escalated to Chief Warden!`);
  };

  const handleAddSlot = () => {
    if (!customSlot.trim()) return;
    setInterviewSlots(prev => [...prev, { id: Date.now(), text: customSlot.trim(), booked: false }]);
    setCustomSlot('');
    showToast('New interview slot added.');
  };

  const handleDeleteSlot = (id) => {
    setInterviewSlots(prev => prev.filter(s => s.id !== id));
    showToast('Interview slot removed.');
  };

  const handleCreateCommittee = (e) => {
    e.preventDefault();
    const newComm = {
      id: 'comm-' + Date.now(),
      name: newCommForm.name,
      category: newCommForm.category,
      status: 'HIRING OPEN',
      description: 'Newly created campus committee.',
      role: newCommForm.role,
      head: newCommForm.head,
      minCgpa: parseFloat(newCommForm.minCgpa),
      eligibility: newCommForm.eligibility,
      vacancies: parseInt(newCommForm.vacancies),
      deadline: newCommForm.deadline,
      applicants: '0 (0 selected)'
    };
    setCommittees(prev => [...prev, newComm]);
    setIsNewCommitteeOpen(false);
    showToast(`Committee "${newCommForm.name}" created successfully.`);
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEv = {
      id: 'ev-' + Date.now(),
      title: newEventForm.title,
      tag: newEventForm.tag,
      seatsLeft: parseInt(newEventForm.total),
      date: newEventForm.date,
      booked: 0,
      total: parseInt(newEventForm.total),
      price: parseInt(newEventForm.price),
      revenue: 0
    };
    setEvents(prev => [...prev, newEv]);
    setIsNewEventOpen(false);
    showToast(`Event "${newEventForm.title}" published!`);
  };

  const handleAddSuper50 = () => {
    if (!newStudentName.trim()) return;
    const newEntry = {
      id: super50Students.length + 1,
      name: newStudentName.trim(),
      roll: '23CS' + Math.floor(1000 + Math.random() * 900) + ' • CSE',
      assessment: parseFloat(newAssessment) || 85,
      interview: parseFloat(newInterview) || 8.5,
      status: 'Confirmed'
    };
    setSuper50Students(prev => [...prev, newEntry]);
    setNewStudentName('');
    setNewAssessment('');
    setNewInterview('');
    showToast('Student added and ranked in Super 50 cohort.');
  };

  // Nav Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recruitment', label: 'Recruitment', icon: Users },
    { id: 'committees', label: 'Committees', icon: Building },
    { id: 'events', label: 'Events & Payments', icon: Ticket },
    { id: 'grievances', label: 'Grievances', icon: AlertCircle, badge: '3' },
    { id: 'super50', label: 'Super 50', icon: Award },
    { id: 'automation', label: 'Automation', icon: Zap }
  ];

  return (
    <div className="flex min-h-screen bg-[#0d0f10] text-[#e1e7ec] font-sans antialiased">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#16191b] border border-[#2a3036] text-emerald-400 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Zap className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#0d0f10] border-r border-[#1e2327] flex flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div>
          {/* Logo & Brand */}
          <div className="p-5 flex items-center gap-3 border-b border-[#1a1f23]">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-black text-sm shadow-sm">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">CampusSync</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  ADMIN
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Governance control panel
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1 mt-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#14261f] text-emerald-400 border border-emerald-500/30' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16191b]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold bg-[#262c31] text-zinc-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1a1f23] space-y-3">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#14181a] border border-[#22272a]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
              {(user?.name || 'Admin').substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-zinc-400 truncate">{user?.email || 'admin@campus.edu'}</div>
            </div>
          </div>
          
          <button
            onClick={onSwitchToStudentView}
            className="w-full flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white px-2 py-1.5 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open student view</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 px-2 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0d0f10]">
        
        {/* Top Header */}
        <header className="h-16 border-b border-[#1e2327] px-8 flex items-center justify-between bg-[#0d0f10]">
          <div className="text-xs text-zinc-400">
            Admin / <span className="font-bold text-white capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161a1d] border border-[#262d33] text-xs font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Automation running</span>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#16191b] transition"
              title="Toggle theme"
            >
              <Sun className="w-4 h-4" />
            </button>

            <button 
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#16191b] transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Body */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">

          {/* ================= TAB 1: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-white">Admin Control Center</h1>
                  {user?.name && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Welcome, {user.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Everything students do lands here. Routine decisions are handled by automation; you only handle exceptions.
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#141718] border border-[#22272a] p-5 rounded-2xl flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Applications to review</div>
                    <div className="text-3xl font-extrabold text-white mt-1">0</div>
                    <div className="text-[11px] text-zinc-400 mt-1">5 awaiting interview score</div>
                  </div>
                  <div className="p-2 text-sky-400">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#141718] border border-[#22272a] p-5 rounded-2xl flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Open vacancies</div>
                    <div className="text-3xl font-extrabold text-white mt-1">18</div>
                    <div className="text-[11px] text-zinc-400 mt-1">3 committees hiring</div>
                  </div>
                  <div className="p-2 text-emerald-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#141718] border border-[#22272a] p-5 rounded-2xl flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Pending payments</div>
                    <div className="text-3xl font-extrabold text-white mt-1">0</div>
                    <div className="text-[11px] text-zinc-400 mt-1">₹150 collected</div>
                  </div>
                  <div className="p-2 text-amber-400 font-bold text-lg">
                    ₹
                  </div>
                </div>

                <div className="bg-[#141718] border border-[#22272a] p-5 rounded-2xl flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium text-zinc-400">Active grievances</div>
                    <div className="text-3xl font-extrabold text-white mt-1">3</div>
                    <div className="text-[11px] text-zinc-400 mt-1">1 escalated</div>
                  </div>
                  <div className="p-2 text-rose-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Automation Status Strip */}
              <div className="bg-[#141718] border border-[#22272a] p-4 rounded-2xl">
                <div className="text-xs text-zinc-400 font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Automation status</span>
                  <span className="text-zinc-400 font-normal">• 5 automatic actions logged</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Auto-screening: ON',
                    'Slot allocation: ON',
                    'Auto-selection: ON',
                    'Payment & pass: ON',
                    'SLA escalation: ON',
                    'Auto-close hiring: ON'
                  ].map((ruleText, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#11261f] text-emerald-400 border border-emerald-500/30"
                    >
                      <Zap className="w-3 h-3 fill-current" /> {ruleText}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2 Column Split: Activity Feed & Needs Attention */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left: Live Activity Feed */}
                <div className="lg:col-span-2 bg-[#141718] border border-[#22272a] rounded-2xl p-5">
                  <h2 className="text-sm font-bold text-white mb-4">Live activity feed</h2>
                  <div className="divide-y divide-[#1f2428] space-y-3">
                    {automationLogs.slice(3).map((log, i) => (
                      <div key={i} className="pt-3 first:pt-0 flex items-start gap-3 text-xs">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 mt-0.5 shrink-0">
                          {log.type}
                        </span>
                        <div className="flex-1">
                          <p className="text-zinc-200 leading-relaxed">{log.text}</p>
                          <span className="text-[10px] text-zinc-400 mt-0.5 block">{log.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Needs Your Attention */}
                <div className="bg-[#141718] border border-[#22272a] rounded-2xl p-5 flex flex-col">
                  <h2 className="text-sm font-bold text-white mb-4">Needs your attention</h2>
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-zinc-400 text-xs">
                    <p>Nothing needs attention.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= TAB 2: RECRUITMENT ================= */}
          {activeTab === 'recruitment' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Recruitment & Interviews</h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Applications are screened, scheduled and (after interview score) selected automatically. Override any step manually here.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => showToast('Screened 0 pending candidates.')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2c333a] transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Screen pending</span>
                  </button>
                  <button 
                    onClick={() => showToast('Allocated free slots automatically.')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2c333a] transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Allocate slots</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <select 
                  value={selectedCommitteeFilter}
                  onChange={(e) => setSelectedCommitteeFilter(e.target.value)}
                  className="bg-[#141718] border border-[#262c31] text-xs text-zinc-200 rounded-xl px-3 py-2 outline-none"
                >
                  <option value="all">All committees</option>
                  <option value="Hostel & Mess Committee">Hostel & Mess Committee</option>
                  <option value="SAC Technical Committee">SAC Technical Committee</option>
                  <option value="Cultural & Fiesta Council">Cultural & Fiesta Council</option>
                </select>

                <div className="flex flex-wrap items-center gap-1.5 bg-[#141718] p-1 rounded-xl border border-[#22272a]">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'applied', label: 'Applied (0)' },
                    { id: 'shortlisted', label: 'Shortlisted (0)' },
                    { id: 'slot-booked', label: 'Slot Booked (5)' },
                    { id: 'selected', label: 'Selected (0)' },
                    { id: 'rejected', label: 'Rejected (1)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setRecruitmentFilter(tab.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                        recruitmentFilter === tab.id 
                          ? 'bg-emerald-500 text-zinc-950 font-bold' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-[#111315] text-[11px] font-semibold text-zinc-400 border-b border-[#22272a]">
                      <tr>
                        <th className="py-3.5 px-5">Student</th>
                        <th className="py-3.5 px-5">Committee</th>
                        <th className="py-3.5 px-5">Applied</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5">Interview slot</th>
                        <th className="py-3.5 px-5">Score /10</th>
                        <th className="py-3.5 px-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2327]">
                      {applicants
                        .filter(app => selectedCommitteeFilter === 'all' || app.committee === selectedCommitteeFilter)
                        .filter(app => {
                          if (recruitmentFilter === 'all') return true;
                          if (recruitmentFilter === 'slot-booked') return app.status === 'Slot Booked';
                          if (recruitmentFilter === 'rejected') return app.status === 'Rejected';
                          if (recruitmentFilter === 'selected') return app.status === 'Selected';
                          return true;
                        })
                        .map(candidate => (
                        <tr key={candidate.id} className="hover:bg-[#181c1f]/50 transition">
                          <td className="py-4 px-5">
                            <div className="font-bold text-white">{candidate.name}</div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">{candidate.rollNo} • CGPA {candidate.cgpa}</div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="text-zinc-200">{candidate.committee}</div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">min CGPA {candidate.minCgpa}</div>
                          </td>
                          <td className="py-4 px-5 text-zinc-400">
                            {candidate.applied}
                          </td>
                          <td className="py-4 px-5">
                            {candidate.status === 'Slot Booked' && (
                              <div>
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  Slot Booked
                                </span>
                                <div className="text-[10px] text-zinc-400 mt-0.5">by AUTO</div>
                              </div>
                            )}
                            {candidate.status === 'Rejected' && (
                              <div>
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                  Rejected
                                </span>
                                <div className="text-[10px] text-zinc-400 mt-0.5">by AUTO</div>
                                {candidate.rejectionReason && (
                                  <div className="text-[10px] text-rose-400/90 mt-0.5">{candidate.rejectionReason}</div>
                                )}
                              </div>
                            )}
                            {candidate.status === 'Selected' && (
                              <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Selected
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5">
                            {candidate.status !== 'Rejected' ? (
                              <select 
                                value={candidate.interviewSlot}
                                onChange={(e) => {
                                  setApplicants(prev => prev.map(a => a.id === candidate.id ? { ...a, interviewSlot: e.target.value } : a));
                                  showToast('Interview slot updated.');
                                }}
                                className="bg-[#1b2024] border border-[#2a3137] text-xs text-zinc-200 rounded-lg px-2.5 py-1.5 outline-none"
                              >
                                <option value={candidate.interviewSlot}>{candidate.interviewSlot}</option>
                                <option value="Today, Oct 26 • 3:40 PM - 4:00 PM">Today, Oct 26 • 3:40 PM - 4:00 PM</option>
                                <option value="Tomorrow, Oct 27 • 11:00 AM - 11:20 AM">Tomorrow, Oct 27 • 11:00 AM - 11:20 AM</option>
                                <option value="Tomorrow, Oct 27 • 2:30 PM - 2:50 PM">Tomorrow, Oct 27 • 2:30 PM - 2:50 PM</option>
                                <option value="Wed, Oct 28 • 3:40 PM - 4:00 PM">Wed, Oct 28 • 3:40 PM - 4:00 PM</option>
                              </select>
                            ) : (
                              <span className="text-zinc-400">—</span>
                            )}
                          </td>
                          <td className="py-4 px-5">
                            {candidate.status !== 'Rejected' ? (
                              <input 
                                type="text"
                                placeholder="0-10"
                                value={candidate.score}
                                onChange={(e) => handleScoreChange(candidate.id, e.target.value)}
                                className="w-16 bg-[#1b2024] border border-[#2a3137] rounded-lg px-2.5 py-1 text-center text-xs text-zinc-100 outline-none focus:border-emerald-500"
                              />
                            ) : (
                              <span className="text-zinc-400">—</span>
                            )}
                          </td>
                          <td className="py-4 px-5">
                            {candidate.status === 'Rejected' ? (
                              <button
                                onClick={() => handleReconsider(candidate.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22282d] hover:bg-[#2b3339] text-zinc-300 border border-[#353d44] transition"
                              >
                                Reconsider
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleSelectApplicant(candidate.id)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  <span>Select</span>
                                </button>
                                <button
                                  onClick={() => handleRejectApplicant(candidate.id)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1c2125] hover:bg-[#242a2f] text-zinc-300 border border-[#2a3036] transition"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: COMMITTEES ================= */}
          {activeTab === 'committees' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Committees & Hiring</h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Create committees, set CGPA / branch cutoffs and vacancies. Hiring closes automatically on deadline or when vacancies reach zero.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewCommitteeOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition shadow-sm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New committee</span>
                </button>
              </div>

              {/* 3 Committee Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {committees.map(comm => (
                  <div key={comm.id} className="bg-[#141718] border border-[#22272a] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-950/70 text-sky-400 border border-sky-800/50">
                          {comm.category}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">
                          {comm.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{comm.name}</h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed min-h-[36px]">
                        {comm.description}
                      </p>

                      {/* Specs */}
                      <div className="mt-5 space-y-2 text-xs border-t border-[#1f2428] pt-4">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Role</span>
                          <span className="font-semibold text-zinc-200">{comm.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Head</span>
                          <span className="font-semibold text-zinc-200">{comm.head}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Min CGPA</span>
                          <span className="font-semibold text-zinc-200">{comm.minCgpa}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Eligibility</span>
                          <span className="font-semibold text-zinc-200">{comm.eligibility}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Vacancies</span>
                          <span className="font-semibold text-zinc-200">{comm.vacancies}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Deadline</span>
                          <span className="font-semibold text-zinc-200">{comm.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Applicants</span>
                          <span className="font-semibold text-zinc-200">{comm.applicants}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-[#1f2428] flex items-center gap-2">
                      <button 
                        onClick={() => showToast(`Edit modal opened for ${comm.name}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2b3238] rounded-xl transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          const nextStatus = comm.status === 'HIRING OPEN' ? 'HIRING CLOSED' : 'HIRING OPEN';
                          setCommittees(prev => prev.map(c => c.id === comm.id ? { ...c, status: nextStatus } : c));
                          showToast(`${comm.name} status changed to ${nextStatus}.`);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2b3238] rounded-xl transition"
                      >
                        <span>{comm.status === 'HIRING OPEN' ? 'Close' : 'Open'}</span>
                      </button>

                      <button 
                        onClick={() => {
                          setCommittees(prev => prev.filter(c => c.id !== comm.id));
                          showToast(`${comm.name} deleted.`);
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/40 rounded-xl transition"
                        title="Delete committee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: SUPER 50 ================= */}
          {activeTab === 'super50' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Super 50 Selection Engine</h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter assessment and interview scores. Composite score, ranks and Confirmed / Waitlisted status are recalculated automatically and appear live on every student's leaderboard.
                </p>
              </div>

              {/* Weight Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#141718] border border-[#22272a] p-4 rounded-2xl">
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1.5">Cohort size (top N confirmed)</label>
                  <input 
                    type="number"
                    value={cohortSize}
                    onChange={(e) => setCohortSize(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1.5">Assessment weight %</label>
                  <input 
                    type="number"
                    value={assessmentWeight}
                    onChange={(e) => setAssessmentWeight(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium block mb-1.5">Interview weight %</label>
                  <input 
                    type="number"
                    value={interviewWeight}
                    onChange={(e) => setInterviewWeight(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Super 50 Table */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-[#111315] text-[11px] font-semibold text-zinc-400 border-b border-[#22272a]">
                    <tr>
                      <th className="py-3.5 px-6">Rank</th>
                      <th className="py-3.5 px-6">Student</th>
                      <th className="py-3.5 px-6">Assessment /100</th>
                      <th className="py-3.5 px-6">Interview /10</th>
                      <th className="py-3.5 px-6">Composite</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2327]">
                    {super50Students.map((st, index) => (
                      <tr key={st.id} className="hover:bg-[#181c1f]/50 transition">
                        <td className="py-4 px-6 font-bold text-white">#{index + 1}</td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-white">{st.name}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">{st.roll}</div>
                        </td>
                        <td className="py-4 px-6">
                          <input 
                            type="number"
                            value={st.assessment}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSuper50Students(prev => prev.map(s => s.id === st.id ? { ...s, assessment: val } : s));
                            }}
                            className="w-20 bg-[#1b2024] border border-[#2a3036] rounded-lg px-3 py-1.5 text-xs text-center text-white outline-none"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <input 
                            type="number"
                            step="0.1"
                            value={st.interview}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSuper50Students(prev => prev.map(s => s.id === st.id ? { ...s, interview: val } : s));
                            }}
                            className="w-20 bg-[#1b2024] border border-[#2a3036] rounded-lg px-3 py-1.5 text-xs text-center text-white outline-none"
                          />
                        </td>
                        <td className="py-4 px-6 font-bold text-emerald-400">
                          {calculateComposite(st.assessment, st.interview)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {st.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button 
                            onClick={() => {
                              setSuper50Students(prev => prev.filter(s => s.id !== st.id));
                              showToast(`${st.name} removed from cohort.`);
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Student Bar */}
              <div className="bg-[#141718] border border-[#22272a] p-4 rounded-2xl flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                  <input 
                    type="text"
                    placeholder="Enter student name to add..."
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="w-full md:w-36">
                  <input 
                    type="number"
                    placeholder="Assessment /100"
                    value={newAssessment}
                    onChange={(e) => setNewAssessment(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <div className="w-full md:w-32">
                  <input 
                    type="number"
                    step="0.1"
                    placeholder="Interview /10"
                    value={newInterview}
                    onChange={(e) => setNewInterview(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
                <button
                  onClick={handleAddSuper50}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add & rank</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 5: GRIEVANCES ================= */}
          {activeTab === 'grievances' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Grievance Desk</h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Tickets auto-escalate to the Chief Warden after 48h (when auto-escalation is ON). Resolve with a note, the student is notified instantly.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-[#141718] p-1 rounded-xl border border-[#22272a] w-fit">
                {['open', 'all', 'in-progress', 'escalated', 'resolved'].map(f => (
                  <button
                    key={f}
                    onClick={() => setGrievanceFilter(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
                      grievanceFilter === f
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {f.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Grievance Ticket Cards */}
              <div className="space-y-4">
                {grievances.map(ticket => (
                  <div key={ticket.id} className="bg-[#141718] border border-[#22272a] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-zinc-400 font-bold">{ticket.id}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-950/70 text-sky-400 border border-sky-800/50">
                          {ticket.committee}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {ticket.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white">{ticket.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">{ticket.description}</p>
                      <div className="text-[11px] text-zinc-400">
                        Raised by {ticket.raisedBy} • {ticket.date}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{ticket.timeLeft}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleResolveGrievance(ticket.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Resolve</span>
                        </button>
                        <button 
                          onClick={() => handleEscalateGrievance(ticket.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1d2327] hover:bg-[#252c32] text-zinc-300 border border-[#2c333a] transition"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>Escalate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: EVENTS & PAYMENTS ================= */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Events, Payments & Passes</h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    With auto-payment ON every payment is verified and the QR pass is issued instantly. Turn it OFF in Automation to approve manually.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewEventOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 transition shadow-sm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>New event</span>
                </button>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(ev => {
                  const percent = Math.min(100, Math.round((ev.booked / ev.total) * 100));
                  return (
                    <div key={ev.id} className="bg-[#141718] border border-[#22272a] rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-950/70 text-sky-400 border border-sky-800/50">
                            {ev.tag}
                          </span>
                          <span className="text-xs font-semibold text-emerald-400">
                            {ev.seatsLeft} left
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white">{ev.title}</h3>
                        <p className="text-xs text-zinc-400 mt-1">{ev.date}</p>

                        {/* Progress Bar */}
                        <div className="mt-5 space-y-2">
                          <div className="w-full bg-[#20262b] h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {ev.booked}/{ev.total} booked • ₹{ev.price} • revenue ₹{ev.revenue}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#1f2428] flex items-center justify-between">
                        <button 
                          onClick={() => showToast(`Edit event: ${ev.title}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2b3238] rounded-xl transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button 
                          onClick={() => {
                            setEvents(prev => prev.filter(e => e.id !== ev.id));
                            showToast('Event deleted.');
                          }}
                          className="p-2 text-rose-400 hover:text-rose-300 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Queue */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl overflow-hidden shadow-xs">
                <div className="p-4 border-b border-[#22272a]">
                  <h3 className="font-bold text-sm text-white">Payment queue</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-[#111315] text-[11px] font-semibold text-zinc-400 border-b border-[#22272a]">
                      <tr>
                        <th className="py-3 px-5">Student</th>
                        <th className="py-3 px-5">Event</th>
                        <th className="py-3 px-5">Amount</th>
                        <th className="py-3 px-5">Time</th>
                        <th className="py-3 px-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2327]">
                      {paymentQueue.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3.5 px-5 font-bold text-white">{item.student} <span className="text-zinc-400 font-normal">{item.rollNo}</span></td>
                          <td className="py-3.5 px-5 text-zinc-300">{item.event}</td>
                          <td className="py-3.5 px-5 font-bold text-white">{item.amount}</td>
                          <td className="py-3.5 px-5 text-zinc-400">{item.time}</td>
                          <td className="py-3.5 px-5 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {item.status}
                            </span>
                            {item.isAuto && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-400 border border-teal-800">
                                AUTO
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Issued Passes */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl overflow-hidden shadow-xs">
                <div className="p-4 border-b border-[#22272a]">
                  <h3 className="font-bold text-sm text-white">Issued passes (1)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-[#111315] text-[11px] font-semibold text-zinc-400 border-b border-[#22272a]">
                      <tr>
                        <th className="py-3 px-5">Pass ID</th>
                        <th className="py-3 px-5">Student</th>
                        <th className="py-3 px-5">Event</th>
                        <th className="py-3 px-5">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2327]">
                      {issuedPasses.map((p, idx) => (
                        <tr key={idx}>
                          <td className="py-3.5 px-5 font-mono text-emerald-400 font-bold">{p.passId}</td>
                          <td className="py-3.5 px-5 text-white">{p.student}</td>
                          <td className="py-3.5 px-5 text-zinc-300">{p.event}</td>
                          <td className="py-3.5 px-5 font-bold text-white">{p.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: AUTOMATION ================= */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Automation Center</h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Switch rules on or off, tune thresholds and manage interview slots. Changes apply instantly to the student side.
                  </p>
                </div>
                <button
                  onClick={() => showToast('All automated background rules executed successfully.')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1a2024] hover:bg-[#22292f] text-zinc-200 border border-[#2c333a] transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>Run all rules now</span>
                </button>
              </div>

              {/* 6 Automation Rule Switch Cards */}
              <div className="space-y-3">
                {[
                  { key: 'autoScreening', title: 'Auto-screening', desc: 'Checks CGPA, branch and hostel eligibility the moment a student applies. Pass → Shortlisted, fail → Rejected with reason.' },
                  { key: 'slotAllocation', title: 'Interview slot allocation', desc: 'Gives every shortlisted student the next free interview slot (no double booking, no clash for the same student).' },
                  { key: 'autoSelection', title: 'Auto-selection after interview', desc: 'When you enter an interview score: ≥ threshold → Selected (vacancy -1), below → Rejected. Student is notified.' },
                  { key: 'paymentVerification', title: 'Payment verification & pass', desc: 'Verifies event payments and issues the QR pass instantly. Turn OFF to approve payments manually.' },
                  { key: 'slaEscalation', title: 'Grievance SLA escalation', desc: 'Tickets not resolved within the SLA hours are escalated to the Chief Warden and both sides are notified.' },
                  { key: 'autoCloseHiring', title: 'Auto-close hiring', desc: 'Closes a committee on its deadline or when vacancies hit zero.' }
                ].map(rule => (
                  <div key={rule.key} className="bg-[#141718] border border-[#22272a] rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">{rule.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{rule.desc}</div>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggleRule(rule.key)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 shrink-0 ${
                        rules[rule.key] ? 'bg-emerald-500' : 'bg-[#2b3238]'
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        rules[rule.key] ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Config Inputs: SLA & Threshold */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#141718] border border-[#22272a] p-4 rounded-2xl">
                  <label className="text-xs text-zinc-300 font-semibold block mb-1">Grievance SLA (hours)</label>
                  <input 
                    type="number"
                    value={slaHours}
                    onChange={(e) => setSlaHours(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                  <span className="text-[10px] text-zinc-400 mt-1 block">Applies to new tickets</span>
                </div>

                <div className="bg-[#141718] border border-[#22272a] p-4 rounded-2xl">
                  <label className="text-xs text-zinc-300 font-semibold block mb-1">Selection threshold (interview score /10)</label>
                  <input 
                    type="number"
                    value={selectionThreshold}
                    onChange={(e) => setSelectionThreshold(e.target.value)}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                  <span className="text-[10px] text-zinc-400 mt-1 block">Used by auto-selection</span>
                </div>
              </div>

              {/* Interview Slots Section */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">Interview slots ({interviewSlots.length})</h3>
                  <button 
                    onClick={() => showToast('Generated next 3 days slots.')}
                    className="flex items-center gap-1 text-xs font-semibold text-zinc-300 bg-[#1e2428] hover:bg-[#252d33] px-3 py-1.5 rounded-xl border border-[#2b333a] transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Generate next 3 days</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {interviewSlots.map(slot => (
                    <div key={slot.id} className="flex items-center justify-between p-3 rounded-xl bg-[#1b2024] border border-[#262c32] text-xs">
                      <span className="text-zinc-200">{slot.text}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          slot.booked 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {slot.booked ? '1/1 booked' : '0/1 booked'}
                        </span>
                        <button 
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Slot */}
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="text"
                    placeholder="Custom slot e.g. Mon, Oct 27 • 5:00 PM - 5:20 PM"
                    value={customSlot}
                    onChange={(e) => setCustomSlot(e.target.value)}
                    className="flex-1 bg-[#1b2024] border border-[#2a3036] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                  <button
                    onClick={handleAddSlot}
                    className="flex items-center gap-1 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-xl text-xs transition"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Recent Automation Log */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl p-5">
                <h3 className="font-bold text-sm text-white mb-4">Recent automation log</h3>
                <div className="divide-y divide-[#1e2327]">
                  {automationLogs.map((log, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          log.type === 'ADMIN'
                            ? 'bg-sky-950 text-sky-400 border border-sky-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-zinc-200">{log.text}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Demo Data */}
              <div className="bg-[#141718] border border-[#22272a] rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Reset demo data</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Restores the original sample students, committees, events and tickets.</p>
                </div>
                <button
                  onClick={() => showToast('Demo data reset to initial values.')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- MODAL: NEW COMMITTEE --- */}
      {isNewCommitteeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141718] border border-[#2b3137] rounded-2xl p-6 max-w-md w-full shadow-2xl text-xs">
            <h3 className="font-bold text-base text-white">Create New Committee</h3>
            <p className="text-zinc-400 mt-1 mb-4">Add a new campus governance body or student council.</p>
            <form onSubmit={handleCreateCommittee} className="space-y-3">
              <div>
                <label className="text-zinc-300 font-medium block mb-1">Committee Name</label>
                <input 
                  required
                  value={newCommForm.name} 
                  onChange={e => setNewCommForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Literary & Debating Society"
                  className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Target Role</label>
                  <input 
                    required
                    value={newCommForm.role} 
                    onChange={e => setNewCommForm(p => ({ ...p, role: e.target.value }))}
                    placeholder="e.g. Content Lead"
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Min CGPA</label>
                  <input 
                    type="number"
                    step="0.1"
                    required
                    value={newCommForm.minCgpa} 
                    onChange={e => setNewCommForm(p => ({ ...p, minCgpa: e.target.value }))}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
              </div>
              <div>
                <label className="text-zinc-300 font-medium block mb-1">Committee Head</label>
                <input 
                  required
                  value={newCommForm.head} 
                  onChange={e => setNewCommForm(p => ({ ...p, head: e.target.value }))}
                  placeholder="e.g. Rahul Sharma (4th Yr)"
                  className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Vacancies</label>
                  <input 
                    type="number"
                    required
                    value={newCommForm.vacancies} 
                    onChange={e => setNewCommForm(p => ({ ...p, vacancies: e.target.value }))}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Deadline</label>
                  <input 
                    required
                    value={newCommForm.deadline} 
                    onChange={e => setNewCommForm(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsNewCommitteeOpen(false)} 
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold"
                >
                  Publish Committee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: NEW EVENT --- */}
      {isNewEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#141718] border border-[#2b3137] rounded-2xl p-6 max-w-md w-full shadow-2xl text-xs">
            <h3 className="font-bold text-base text-white">Create New Event</h3>
            <p className="text-zinc-400 mt-1 mb-4">Publish a new ticketed event for students.</p>
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-zinc-300 font-medium block mb-1">Event Title</label>
                <input 
                  required
                  value={newEventForm.title} 
                  onChange={e => setNewEventForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Annual DJ Night 2026"
                  className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Price (₹)</label>
                  <input 
                    type="number"
                    required
                    value={newEventForm.price} 
                    onChange={e => setNewEventForm(p => ({ ...p, price: e.target.value }))}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
                <div>
                  <label className="text-zinc-300 font-medium block mb-1">Total Passes</label>
                  <input 
                    type="number"
                    required
                    value={newEventForm.total} 
                    onChange={e => setNewEventForm(p => ({ ...p, total: e.target.value }))}
                    className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                  />
                </div>
              </div>
              <div>
                <label className="text-zinc-300 font-medium block mb-1">Date & Venue</label>
                <input 
                  required
                  value={newEventForm.date} 
                  onChange={e => setNewEventForm(p => ({ ...p, date: e.target.value }))}
                  className="w-full bg-[#1b2024] border border-[#2a3036] rounded-xl p-2.5 text-white" 
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsNewEventOpen(false)} 
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
