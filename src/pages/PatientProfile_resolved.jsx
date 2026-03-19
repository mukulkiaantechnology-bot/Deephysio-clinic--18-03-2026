import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaNotesMedical, FaCalendarAlt, FaFileInvoiceDollar, FaWpforms, 
  FaFolderOpen, FaArrowLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaPlus, FaEdit, FaPrint, FaTrash, FaCheckCircle, FaBriefcaseMedical, 
  FaClock, FaHistory, FaDownload, FaEllipsisV, FaUserShield, FaStethoscope,
  FaChevronRight, FaFilter, FaSearch, FaCheckDouble, FaChartLine, FaRunning, FaBullseye, FaSmile, FaUserGraduate
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const PatientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Try to load patient from localStorage
    const saved = JSON.parse(localStorage.getItem('deephysio_patients') || '[]');
    const found = saved.find(p => p.id === id) || {
        id: 'DP-001',
        name: 'James Wilson',
        preferredName: 'James',
        age: 34,
        gender: 'Male',
        pronouns: 'He/Him',
        occupation: 'Senior Software Engineer',
        contact: '+44 7700 900077',
        email: 'james.w@medical-node.com',
        address: '123 Baker Street, London, NW1 6XE',
        nextAppt: '18 Mar 2026',
        status: 'Active',
        balance: '£120.00',
        bloodGroup: 'A+',
        allergies: 'Penicillin',
        emergencyContact: {
            name: 'Sarah Wilson',
            phone: '+44 7700 900123',
            relation: 'Spouse'
        }
    };
    setPatient(found);
  }, [id]);

  if (!patient) return <div className="p-20 text-center font-black animate-pulse text-slate-300 uppercase tracking-widest">Initialising Biometric Nexus...</div>;

  const tabs = [
    { name: 'Overview', icon: <FaUser /> },
    { name: 'Clinical Notes', icon: <FaNotesMedical /> },
    { name: 'Appointments', icon: <FaCalendarAlt /> },
    { name: 'Billing', icon: <FaFileInvoiceDollar /> },
    { name: 'Forms', icon: <FaWpforms /> },
    { name: 'Documents', icon: <FaFolderOpen /> }
  ];

  const handleAction = (action) => {
    alert(`Node Execution: Initiating ${action} protocol for subject ${patient.name}.`);
  };

  const getInitializeButtonName = (tab) => {
    switch (tab) {
      case 'Clinical Notes': return 'Add Clinical Note';
      case 'Appointments': return 'New Appointment';
      case 'Billing': return 'Create Invoice';
      case 'Forms': return 'New Form / Consent';
      case 'Documents': return 'Upload Document';
      default: return 'Initialize Record Node';
    }
  };

  const handleInitializeClick = (tab) => {
    switch (tab) {
      case 'Clinical Notes': navigate(`/notes/intake/${id}`); break;
      case 'Appointments': navigate('/appointments/book'); break;
      case 'Billing': navigate('/billing'); break;
      case 'Forms': navigate(`/notes/intake/${id}`); break;
      case 'Documents': navigate('/notes/attachments'); break;
      default: alert(`Initializing new ${tab} entry`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-4 sm:space-y-6 animate-fade-in font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card hover={false} className="p-4 sm:p-5 border border-slate-100 shadow-none bg-white relative overflow-hidden">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-clinicPrimary rounded-full"></div>
                  Bio-Metric Profile
                </h4>
                <div className="space-y-2 relative z-10">
                  {[
                    { label: 'Record Identifier', value: patient.id },
                    { label: 'Preferred Name', value: patient.preferredName },
                    { label: 'Biological Age', value: `${patient.age} Years` },
                    { label: 'Gender / Pronouns', value: `${patient.gender} (${patient.pronouns || 'N/A'})` },
                    { label: 'Occupation Node', value: patient.occupation || 'Unspecified' },
                    { label: 'Blood Group Node', value: patient.bloodGroup || 'O+', highlight: true }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 sm:p-4 bg-slate-50/50 rounded-lg border border-slate-100 transition-colors hover:bg-white hover:border-clinicPrimary/30">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                      <span className={`text-[11px] font-bold tracking-tight ${item.highlight ? 'text-rose-500' : 'text-slate-900'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl"></div>
              </Card>

              <Card hover={false} className="p-4 sm:p-5 border border-slate-100 shadow-none bg-white">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                   Connectivity Nodes
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-emerald-50 border border-emerald-100 transition-colors hover:bg-emerald-100/50 cursor-pointer rounded-xl" onClick={() => handleAction('Communication Pipe (SMS)')}>
                    <div className="w-8 h-8 bg-white text-emerald-500 rounded-lg flex items-center justify-center text-sm shadow-sm"><FaPhoneAlt /></div>
                    <div>
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5 leading-none">Mobile Protocol</p>
                      <p className="text-[11px] font-black text-slate-800 tracking-tight">{patientData.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 border border-blue-100 transition-colors hover:bg-blue-100/50 cursor-pointer rounded-xl" onClick={() => handleAction('Communication Pipe (Email)')}>
                    <div className="w-8 h-8 bg-white text-blue-500 rounded-lg flex items-center justify-center text-sm shadow-sm"><FaEnvelope /></div>
                    <div>
                      <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mb-0.5 leading-none">Electronic Ledger</p>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl"></div>
              </Card>

              {/* Financial Balance Card */}
              <Card className="p-10 border-none shadow-premium bg-slate-900 text-white overflow-hidden relative group rounded-[40px]">
                <div className="relative z-10 h-full flex flex-col">
                  <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] mb-8">Financial Audit</h4>
                  <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 shadow-glass mb-8 group-hover:bg-white/10 transition-all duration-500">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 leading-none opacity-60">Verified Balance Due</p>
                    <h5 className="text-4xl font-black tracking-tighter text-white">{patient.balance}</h5>
                  </div>
                  <Button 
                    variant="accent" 
                    onClick={() => navigate('/billing/payments')}
                    className="w-full h-10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors mt-auto shadow-none"
                  >
                    Authorize Payment
                  </Button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-clinicPrimary/20 rounded-full blur-3xl transition-colors duration-1000"></div>
              </Card>
            </div>
            
            <Card hover={false} className="p-4 sm:p-5 border border-slate-100 shadow-none bg-white">
               <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-amber-400 rounded-full"></div>
                     Clinical Progress Timeline
                  </h4>
                  <button className="text-[9px] font-black text-clinicPrimary uppercase tracking-widest hover:underline" onClick={() => navigate('/patients/history')}>See Full Chronology</button>
               </div>
               <div className="space-y-3">
                  {[
                    { label: 'SOAP Assessment - Lumbar Focus', date: 'Yesterday at 14:00', type: 'Clinical', icon: <FaStethoscope />, status: 'Completed', color: 'emerald', path: `/notes/soap/${id}` },
                    { label: 'RMDQ Disability Scan', date: 'March 10, 2026', type: 'Assessment', icon: <FaChartLine />, status: 'Verified', color: 'blue', path: `/notes/rmdq/${id}` },
                    { label: 'Home Exercise Program (HEP)', date: 'Just Now', type: 'Protocol', icon: <FaRunning />, status: 'Active', color: 'clinicPrimary', path: `/notes/hep/${id}` },
                    { label: 'Clinical Treatment Plan', date: 'Today', type: 'Strategy', icon: <FaBullseye />, status: 'Initialised', color: 'amber', path: `/notes/plan/${id}` },
                    { label: 'Final Discharge Summary', date: 'Upcoming', type: 'Closure', icon: <FaUserGraduate />, status: 'Pending', color: 'emerald', path: `/notes/discharge/${id}` }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-clinicPrimary/30 hover:bg-white transition-colors cursor-pointer group/item" onClick={() => navigate(item.path)}>
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-white rounded-lg border border-slate-100 shadow-sm flex items-center justify-center text-${item.color}-500 group-hover/item:text-clinicPrimary transition-colors`}>{item.icon}</div>
                          <div>
                            <p className="text-[12px] font-bold text-slate-900 tracking-tight leading-none group-hover/item:text-clinicPrimary transition-colors">{item.label}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <FaClock size={8} /> {item.date}
                               </p>
                               <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                               <p className="text-[9px] font-black text-clinicPrimary uppercase tracking-widest">{item.type} Node</p>
                            </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 mt-3 sm:mt-0">
                          <span className={`px-3 py-1 bg-white border border-slate-100 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm ${item.status === 'Verified' || item.status === 'Settled' || item.status === 'Completed' ? 'text-emerald-500' : 'text-slate-400'}`}>{item.status}</span>
                          <FaChevronRight className="text-slate-300 group-hover/item:text-clinicPrimary transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </div>
        );
      case 'Clinical Notes':
        return (
          <div className="space-y-6 animate-fade-in font-sans">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary"><FaSearch size={14}/></div>
                    <input type="text" placeholder="Search clinical ledger..." className="bg-transparent border-none outline-none text-[13px] font-bold text-slate-700 w-64 placeholder:text-slate-300" />
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white hover:text-clinicPrimary transition-all"><FaFilter size={10}/> Filters</button>
                    <Button variant="accent" size="sm" className="rounded-xl px-6 h-10 text-[10px] uppercase font-black tracking-widest" leftIcon={<FaPlus/>} onClick={() => navigate(`/notes/soap/${id}`)}>Add SOAP Note</Button>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {[
                    { id: 'CN-101', type: 'SOAP Note', title: 'Session #3 - Lumbar Focus', date: 'Yesterday at 15:45', author: 'Dr. Sarah Thompson', status: 'Finalized' },
                    { id: 'CN-102', type: 'Assessment', title: 'Initial Neuro Scan', date: '12 MAR 2026', author: 'Dr. Alan Grant', status: 'Draft' },
                    { id: 'CN-103', type: 'Progress Note', title: 'Interim Review Protocol', date: '08 MAR 2026', author: 'Dr. Sarah Thompson', status: 'Finalized' }
                ].map(note => (
                    <div key={note.id} className="p-8 bg-white rounded-[32px] shadow-premium hover:shadow-google group transition-all cursor-pointer border border-transparent hover:border-clinicPrimary/10" onClick={() => navigate(`/notes/soap/${id}`)}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex flex-col items-center justify-center text-clinicPrimary group-hover:bg-clinicPrimary group-hover:text-white transition-all">
                                    <FaNotesMedical size={20} />
                                    <span className="text-[8px] font-black mt-1 uppercase">v1.2</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-3 py-1 bg-clinicPrimary/5 rounded-lg text-[9px] font-black text-clinicPrimary uppercase tracking-widest`}>{note.type}</span>
                                        <span className="text-[11px] font-black text-slate-300 tracking-tighter">{note.id}</span>
                                    </div>
                                    <h4 className="text-[16px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors tracking-tight">{note.title}</h4>
                                    <p className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-2">
                                        <FaUser size={10} className="opacity-40" /> {note.author} • {note.date}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right hidden md:block">
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${note.status === 'Finalized' ? 'text-emerald-500' : 'text-amber-500'}`}>{note.status}</p>
                                    <p className="text-[9px] font-bold text-slate-300 mt-1 uppercase">Cloud Archived</p>
                                </div>
                                <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-clinicPrimary hover:text-white transition-all active:scale-95" onClick={(e) => { e.stopPropagation(); navigate(`/notes/soap/${id}`); }}><FaChevronRight/></button>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        );
      case 'Forms':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in font-sans">
             {[
                { title: 'Digital Intake Form', category: 'Patient Entrance', color: 'clinicPrimary', icon: <FaCheckDouble/>, count: 1, path: `/notes/intake/${id}` },
                { title: 'Clinical Consent Node', category: 'Legal Protocol', color: 'blue', icon: <FaUserShield/>, count: 2, path: '/forms/consent' },
                { title: 'Telehealth Agreement', category: 'Virtual Mesh', color: 'emerald', icon: <FaMapMarkerAlt/>, count: 1, path: '/referrals' },
                { title: 'Outcome Measurement (RMDQ)', category: 'Analytics', color: 'amber', icon: <FaStethoscope/>, count: 0, path: `/notes/rmdq/${id}` },
                { title: 'Client Feedback / Survey', category: 'Sentiment Audit', color: 'rose', icon: <FaSmile/>, count: 0, path: `/notes/survey/${id}` }
             ].map((f, idx) => (
                <Card key={idx} className="p-10 border-none shadow-premium bg-white group hover:-translate-y-2 transition-all rounded-[32px] relative overflow-hidden cursor-pointer" onClick={() => f.path && navigate(f.path)}>
                    <div className={`w-16 h-16 rounded-[24px] bg-${f.color}-50 text-${f.color}-500 flex items-center justify-center shadow-soft mb-8 group-hover:scale-110 transition-transform`}>{f.icon}</div>
                    <h4 className="text-[16px] font-black text-slate-900 tracking-tight mb-2">{f.title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-8">{f.category}</p>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{f.count} Signed</span>
                        <button className="text-[10px] font-black text-clinicPrimary uppercase tracking-[0.2em] flex items-center gap-2 group-hover:translate-x-1 transition-all">Initialize <FaPlus size={8}/></button>
                    </div>
                    <div className={`absolute top-0 right-0 w-2 h-full bg-${f.color}-500/20`}></div>
                </Card>
             ))}
          </div>
        );
      case 'Appointments':
        return (
          <div className="space-y-8 animate-fade-in font-sans">
             <div className="flex items-center justify-between bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-google flex items-center justify-center text-clinicPrimary"><FaCalendarAlt size={20}/></div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Next Scheduled Session</p>
                        <h4 className="text-[18px] font-black text-slate-900 tracking-tight leading-none uppercase">{patient.nextAppt} <span className="text-slate-300 ml-3">@ 14:30</span></h4>
                    </div>
                </div>
                <Button variant="accent" size="sm" className="rounded-xl px-8" onClick={() => navigate('/appointments/book')}>Reschedule</Button>
             </div>
             
             <div className="space-y-4">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Session History Grid</h3>
                {[
                    { date: '12 MAR 2026', type: 'Initial Evaluation', duration: '60m', status: 'Completed' },
                    { date: '15 MAR 2026', type: 'Follow-up Treatment', duration: '45m', status: 'Cancelled' }
                ].map((apt, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white rounded-[24px] border border-slate-50 shadow-soft hover:shadow-premium transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-[12px]">{i+1}</div>
                            <div>
                                <p className="text-[13px] font-bold text-slate-900 leading-none mb-2">{apt.type}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{apt.date} • {apt.duration}</p>
                            </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${apt.status === 'Completed' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'}`}>{apt.status}</span>
                    </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="p-10 border border-slate-100 shadow-none bg-white rounded-xl flex flex-col items-center justify-center text-center animate-fade-in relative overflow-hidden group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-clinicPrimary/5 transition-colors relative z-10">
              <span className="text-2xl text-clinicPrimary opacity-80 group-hover:opacity-100">{tabs.find(t => t.name === activeTab).icon}</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 relative z-10 tracking-tight uppercase tracking-widest">{activeTab} Ledger</h3>
            <p className="text-slate-500 max-w-xs font-medium px-4 relative z-10 text-[11px] leading-relaxed">System scan complete. No secondary nodes detected for {patientData.name} in this partition.</p>
            <Button variant="accent" className="mt-6 px-6 h-10 shadow-none relative z-10 rounded-lg uppercase tracking-widest font-black text-[10px]" leftIcon={<FaPlus />} onClick={() => handleInitializeClick(activeTab)}>
              {getInitializeButtonName(activeTab)}
            </Button>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-3xl transition-colors duration-1000 group-hover:bg-clinicPrimary/10"></div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 md:p-6 lg:p-8 animate-fade-in custom-scrollbar overflow-x-hidden font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <button 
            onClick={() => navigate('/patients')}
            className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:bg-slate-50 transition-colors"
          >
            <FaArrowLeft size={12}/>
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
            <div className="w-16 h-16 rounded-xl bg-slate-900 text-clinicPrimary flex items-center shrink-0 justify-center font-black text-2xl shadow-sm relative overflow-hidden group/avatar">
               <span className="relative z-10 cursor-pointer" onClick={() => handleAction('Bio-Identity Management')}>JW</span>
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
            </div>
            <div className="w-full flex flex-col justify-center min-h-[64px]">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 w-full">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{patientData.name}</h1>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center justify-center gap-2 shrink-0">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                   {patientData.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-slate-900 text-[9px] font-black text-white px-2 py-1 rounded tracking-widest shadow-sm">{patientData.id}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hidden sm:block">•</span>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                       <FaCalendarAlt size={10} className="text-clinicPrimary opacity-40" /> Registered Node: 12 JAN 24
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full lg:w-auto">
          <button className="h-10 w-10 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-100 transition-colors flex items-center justify-center shadow-none" onClick={() => window.print()}><FaPrint size={14}/></button>
          <button className="h-10 w-10 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 transition-colors flex items-center justify-center shadow-none" onClick={() => navigate('/patients/add')}><FaEdit size={14}/></button>
          <Button 
            variant="accent" 
            className="flex-1 sm:flex-none sm:w-auto px-5 h-10 shadow-none sm:ml-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors" 
            leftIcon={<FaPlus className="shrink-0" size={10} />}
            onClick={() => navigate('/appointments/book')}
          >
            Protocol Reservation
          </Button>
        </div>
      </div>

      <div className="flex items-center border-b border-slate-100 overflow-x-auto custom-scrollbar no-scrollbar -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-5 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap group ${
              activeTab === tab.name 
                ? 'border-clinicPrimary text-clinicPrimary' 
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'
            }`}
          >
            <span className={`text-sm transition-colors ${activeTab === tab.name ? 'text-clinicPrimary' : 'text-slate-400'}`}>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {renderTabContent()}
      </div>

      {/* Payment Modal Ref (Moved from original) */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Authorize Security Payment Node"
        footer={
           <div className="flex gap-2 justify-end w-full">
             <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>Abort</Button>
             <Button variant="accent" onClick={() => { setIsPaymentModalOpen(false); navigate('/billing/payments'); }}>Confirm Transaction</Button>
           </div>
        }
      >
        <div className="p-4 sm:p-5 space-y-6 font-sans">
           <div className="flex justify-between items-center p-5 bg-slate-900 rounded-xl border border-white/5 shadow-none">
              <div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Total Authorization Required</p>
                 <h2 className="text-xl font-black text-white tracking-tighter">{patientData.balance}</h2>
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 text-clinicPrimary">
                 <FaFileInvoiceDollar size={16} />
              </div>
           </div>
           <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method Partition</label>
              <div className="grid grid-cols-2 gap-3">
                 {['Stored Credit Node', 'Instant Bank Sync', 'Clinical Subsidy', 'Hardware Terminal'].map(method => (
                    <button key={method} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:border-clinicPrimary hover:bg-white transition-colors text-left">
                       {method}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientProfile;
