import React, { useState } from 'react';
import { 
  FaUser, FaNotesMedical, FaCalendarAlt, FaFileInvoiceDollar, FaWpforms, 
  FaFolderOpen, FaArrowLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaPlus, FaEdit, FaPrint, FaTrash, FaCheckCircle, FaBriefcaseMedical, FaClock, FaHistory, FaDownload, FaEllipsisV
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const patientData = {
    id: 'DP-001-NW',
    name: 'James Wilson',
    age: 34,
    gender: 'Male',
    contact: '+44 7700 900077',
    email: 'james.w@medical-node.com',
    address: '123 Baker Street, London, NW1 6XE',
    nextAppt: '18 Mar 2026',
    status: 'Active',
    balance: '£120.00',
    bloodGroup: 'A+',
    allergies: 'Penicillin'
  };

  const tabs = [
    { name: 'Overview', icon: <FaUser /> },
    { name: 'Clinical Notes', icon: <FaNotesMedical /> },
    { name: 'Appointments', icon: <FaCalendarAlt /> },
    { name: 'Billing', icon: <FaFileInvoiceDollar /> },
    { name: 'Forms', icon: <FaWpforms /> },
    { name: 'Documents', icon: <FaFolderOpen /> }
  ];

  const handleAction = (action) => {
    alert(`Node Execution: Initiating ${action} protocol for subject ${patientData.name}.`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="space-y-10 animate-fade-in font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-google transition-all relative overflow-hidden">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                  Bio-Metric Profile
                </h4>
                <div className="space-y-6 relative z-10">
                  {[
                    { label: 'Record Identifier', value: patientData.id },
                    { label: 'Biological Age', value: `${patientData.age} Years` },
                    { label: 'Assigned Gender', value: patientData.gender },
                    { label: 'Blood Group Node', value: patientData.bloodGroup, highlight: true }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 shadow-inner-soft hover:bg-white hover:shadow-premium transition-all">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</span>
                      <span className={`text-[13px] font-bold tracking-tight ${item.highlight ? 'text-rose-500' : 'text-slate-900'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-clinicPrimary/5 rounded-full blur-3xl"></div>
              </Card>

              <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-google transition-all">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                   Connectivity Nodes
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-5 p-6 bg-emerald-50/30 rounded-[28px] border border-emerald-100/50 transition-all hover:bg-emerald-50 cursor-pointer active:scale-95 shadow-soft" onClick={() => handleAction('Communication Pipe (SMS)')}>
                    <div className="w-12 h-12 bg-white shadow-premium text-emerald-500 rounded-2xl flex items-center justify-center text-lg"><FaPhoneAlt /></div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5 leading-none">Mobile Protocol</p>
                      <p className="text-[14px] font-black text-slate-800 tracking-tight">{patientData.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 p-6 bg-blue-50/30 rounded-[28px] border border-blue-100/50 transition-all hover:bg-blue-50 cursor-pointer active:scale-95 shadow-soft" onClick={() => handleAction('Communication Pipe (Email)')}>
                    <div className="w-12 h-12 bg-white shadow-premium text-blue-500 rounded-2xl flex items-center justify-center text-lg"><FaEnvelope /></div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 leading-none">Electronic Ledger</p>
                      <p className="text-[14px] font-black text-slate-800 tracking-tight truncate max-w-[150px]">{patientData.email}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-10 border-none shadow-premium bg-slate-900 text-white overflow-hidden relative group">
                <div className="relative z-10 h-full flex flex-col">
                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Financial Audit</h4>
                  <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 shadow-glass mb-8 group-hover:bg-white/10 transition-all duration-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 leading-none opacity-60">Verified Balance Due</p>
                    <h5 className="text-4xl font-black tracking-tighter text-white">{patientData.balance}</h5>
                  </div>
                  <Button 
                    variant="accent" 
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full shadow-google h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all mt-auto"
                  >
                    Authorize Payment Node
                  </Button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clinicPrimary/20 rounded-full blur-[40px] group-hover:bg-clinicPrimary/30 transition-all duration-1000"></div>
              </Card>
            </div>
            
            <Card className="p-10 border-none shadow-premium bg-white">
               <div className="flex items-center justify-between mb-10">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                     <div className="w-1.5 h-6 bg-amber-400 rounded-full"></div>
                     Clinical Progress Timeline
                  </h4>
                  <button className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest hover:underline" onClick={() => handleAction('Full History Audit')}>See Full Chronology</button>
               </div>
               <div className="space-y-6">
                  {[
                    { label: 'Follow-up Treatment Protocol', date: 'Yesterday at 14:00', type: 'Clinical', icon: <FaNotesMedical />, status: 'Verified', color: 'emerald' },
                    { label: 'Service Invoice Finalized', date: 'March 10, 2026', type: 'Billing', icon: <FaFileInvoiceDollar />, status: 'Settled', color: 'blue' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-50 shadow-inner-soft rounded-[28px] border border-slate-100 hover:bg-white hover:shadow-google hover:-translate-y-1 transition-all group/item cursor-pointer" onClick={() => handleAction(`Node Audit: ${item.label}`)}>
                       <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 bg-white rounded-2xl shadow-premium flex items-center justify-center text-${item.color}-500 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all`}>{item.icon}</div>
                          <div>
                            <p className="text-[14px] font-bold text-slate-900 tracking-tight leading-none group-hover/item:text-clinicPrimary transition-colors">{item.label}</p>
                            <div className="flex items-center gap-3 mt-2.5">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] flex items-center gap-2">
                                  <FaClock size={8} /> {item.date}
                               </p>
                               <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                               <p className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest">{item.type} Node</p>
                            </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-6 mt-4 sm:mt-0">
                          <span className={`px-4 py-1.5 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-soft ${item.status === 'Verified' || item.status === 'Settled' ? 'text-emerald-500' : 'text-slate-400'}`}>{item.status}</span>
                          <FaChevronRight className="text-slate-200 group-hover/item:text-clinicPrimary group-hover/item:translate-x-2 transition-all" />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </div>
        );
      default:
        return (
          <div className="p-32 border-none shadow-premium bg-white rounded-[40px] flex flex-col items-center justify-center text-center animate-fade-in relative overflow-hidden group">
            <div className="w-28 h-28 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8 shadow-inner-soft border border-slate-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
              <span className="text-5xl text-clinicPrimary opacity-80 group-hover:opacity-100">{tabs.find(t => t.name === activeTab).icon}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 relative z-10 tracking-tight uppercase tracking-widest">{activeTab} Ledger</h3>
            <p className="text-slate-400 max-w-sm font-bold px-4 relative z-10 uppercase text-[11px] tracking-[0.2em] leading-relaxed">System scan complete. No secondary nodes detected for {patientData.name} in this partition.</p>
            <Button variant="accent" className="mt-12 px-12 h-14 shadow-google relative z-10 rounded-[24px] uppercase tracking-widest font-black text-[11px]" leftIcon={<FaPlus />} onClick={() => handleAction(`Registering New ${activeTab} Entry`)}>
              Initialize Record Node
            </Button>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-clinicPrimary/5 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-clinicPrimary/10"></div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar overflow-x-hidden font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-50">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
          <button 
            onClick={() => navigate('/patients')}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
          >
            <FaArrowLeft size={16}/>
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 w-full">
            <div className="w-24 h-24 rounded-[32px] bg-slate-900 text-clinicPrimary flex items-center shrink-0 justify-center font-black text-4xl shadow-2xl relative overflow-hidden group/avatar">
               <span className="relative z-10 group-hover:scale-110 transition-transform cursor-pointer" onClick={() => handleAction('Bio-Identity Management')}>JW</span>
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
               <div className="absolute top-0 right-0 w-10 h-10 bg-white/5 -mr-5 -mt-5 rounded-full"></div>
            </div>
            <div className="w-full flex flex-col justify-center h-24">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">{patientData.name}</h1>
                <span className="px-5 py-1.5 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] border border-emerald-100 flex items-center justify-center gap-3 shrink-0 shadow-soft">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                   {patientData.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6">
                 <div className="flex items-center gap-3">
                    <span className="bg-slate-900 text-[10px] font-black text-white px-3 py-1 rounded-lg tracking-widest shadow-lg">{patientData.id}</span>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest hidden sm:block">•</span>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <FaCalendarAlt size={10} className="text-clinicPrimary opacity-40" /> Registered Node: 12 JAN 24
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 w-full lg:w-auto">
          <button className="h-14 w-14 rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-emerald-500 hover:border-emerald-100 hover:bg-emerald-50 transition-all flex items-center justify-center active:scale-90 shadow-premium" onClick={() => handleAction('Print Medical Dossier')}><FaPrint size={18}/></button>
          <button className="h-14 w-14 rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:border-blue-100 hover:bg-blue-50 transition-all flex items-center justify-center active:scale-90 shadow-premium" onClick={() => handleAction('Modify Record Node')}><FaEdit size={18}/></button>
          <Button 
            variant="accent" 
            className="flex-1 sm:flex-none sm:w-auto px-10 h-14 shadow-google sm:ml-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-[24px] active:scale-95 transition-all" 
            leftIcon={<FaPlus className="shrink-0" />}
            onClick={() => handleAction('Clinical Booking Protocol')}
          >
            Protocol Reservation
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-50 overflow-x-auto custom-scrollbar no-scrollbar pt-6 bg-slate-50/20 px-4 rounded-t-[32px]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-4 px-8 py-6 text-[11px] font-black uppercase tracking-[0.25em] border-b-4 transition-all duration-500 whitespace-nowrap group relative ${
              activeTab === tab.name 
                ? 'border-clinicPrimary text-clinicPrimary' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className={`text-xl transition-all duration-300 ${activeTab === tab.name ? 'scale-125 -translate-y-1 text-clinicPrimary' : 'group-hover:translate-y-[-2px]'}`}>{tab.icon}</span>
            {tab.name}
            {activeTab === tab.name && (
               <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-12 h-1 bg-clinicPrimary rounded-t-full shadow-[0_0_15px_rgba(46,167,184,0.8)]" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-10 p-2 sm:p-4">
        {renderTabContent()}
      </div>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Authorize Security Payment Node"
        footer={
           <div className="flex gap-4 justify-end w-full">
             <Button variant="secondary" onClick={() => setIsPaymentModalOpen(false)}>Abort Protocol</Button>
             <Button variant="accent" onClick={() => { setIsPaymentModalOpen(false); alert('Payment Node Authorized. Secure Transmission Successful.'); }}>Confirm Transaction</Button>
           </div>
        }
      >
        <div className="p-8 space-y-8 font-sans">
           <div className="flex justify-between items-center p-8 bg-slate-900 rounded-[32px] border border-white/5 shadow-glass">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 leading-none">Total Authorization Required</p>
                 <h2 className="text-3xl font-black text-white tracking-tighter">{patientData.balance}</h2>
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-clinicPrimary">
                 <FaFileInvoiceDollar size={24} />
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method Partition</label>
              <div className="grid grid-cols-2 gap-4">
                 {['Stored Credit Node', 'Instant Bank Sync', 'Clinical Subsidy', 'Hardware Terminal'].map(method => (
                    <button key={method} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-[12px] font-bold text-slate-600 hover:border-clinicPrimary hover:bg-white hover:shadow-premium transition-all text-left active:scale-95">
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

const FaChevronRight = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default PatientProfile;
