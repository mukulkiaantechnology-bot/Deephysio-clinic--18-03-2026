import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaUser, FaPhone, FaCalendarPlus, FaFilter, FaSearch, FaEllipsisV, FaCheckCircle, FaArrowRight, FaChevronLeft, FaChevronRight, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Waitlist = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    patient: '',
    requestedService: 'Physio Evolution',
    preferredDays: '',
    status: 'Normal'
  });
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const [waitlistEntries, setWaitlistEntries] = useState(() => {
    const saved = localStorage.getItem('deephysio_waitlist');
    return saved ? JSON.parse(saved) : [
      { id: 'WL-101', patient: 'Emma Watson', requestedService: 'Physio Evolution', preferredDays: 'Mon, Wed', addedDate: '15 Mar 2026', status: 'Priority' },
      { id: 'WL-102', patient: 'James Bond', requestedService: 'Bio-Metric Massage', preferredDays: 'Weekends', addedDate: '16 Mar 2026', status: 'Normal' },
      { id: 'WL-103', patient: 'Sarah Parker', requestedService: 'Assessment Protocol', preferredDays: 'Any morning', addedDate: '14 Mar 2026', status: 'Priority' },
      { id: 'WL-104', patient: 'Robert Downey', requestedService: 'Neural Rehab', preferredDays: 'Fri afternoon', addedDate: '17 Mar 2026', status: 'Normal' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('deephysio_waitlist', JSON.stringify(waitlistEntries));
  }, [waitlistEntries]);

  const filteredEntries = waitlistEntries.filter(e => 
    e.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.requestedService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEntry = () => {
    if (!newEntry.patient) {
      showToast('Subject Identification required for queue entry.', 'error');
      return;
    }
    const id = `WL-${Math.floor(Math.random() * 900) + 100}`;
    const addedDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    setWaitlistEntries([...waitlistEntries, { ...newEntry, id, addedDate }]);
    setIsAddModalOpen(false);
    setNewEntry({ patient: '', requestedService: 'Physio Evolution', preferredDays: '', status: 'Normal' });
    showToast(`${newEntry.patient} successfully added to the clinical queue. Node ${id} active.`);
  };

  const handleReclaimSlot = (entry) => {
    setWaitlistEntries(waitlistEntries.filter(e => e.id !== entry.id));
    showToast(`Slot Reclaimed for ${entry.patient}. Redirecting to Appointment Node...`);
    setTimeout(() => navigate('/appointments/book'), 1500);
  };

  const handleRemoveEntry = (id) => {
    setWaitlistEntries(waitlistEntries.filter(e => e.id !== id));
    showToast('Queue entry successfully purged from system.', 'error');
  };

  const handleAction = (action, entry) => {
    // alert(`Node Execution: Initiating ${action} for ${entry ? entry.patient : 'new subject'}. Protocol synchronized.`);
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans relative">
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-premium border flex items-center gap-4 min-w-[320px] ${
              toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {toast.type === 'success' ? <FaCheck size={12}/> : <FaTrash size={12}/>}
            </div>
            <p className="text-[13px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Waitlist Intelligence</h1>
          <p className="text-slate-500 font-bold mt-2 sm:mt-3 uppercase tracking-widest text-[10px] sm:text-[11px] opacity-80">Synchronize subject queues for optimized slot reclamation.</p>
        </div>
        <button 
          className="rounded-2xl sm:rounded-[24px] h-12 sm:h-14 px-6 sm:px-10 shadow-google active:scale-95 transition-all text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] w-full md:w-auto relative z-10 bg-gradient-to-br from-clinicPrimary to-clinicPrimary-dark text-white flex items-center justify-center gap-2"
          onClick={() => { console.log('Opening form...'); setIsAddModalOpen(true); }}
        >
          <FaCalendarPlus size={14}/>
          ADD TO QUEUE
        </button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] shadow-premium overflow-hidden border border-slate-50">
            <div className="p-4 sm:p-5 lg:p-6 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 bg-slate-50/20">
              <div className="relative flex-1 group w-full">
                <FaSearch className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                <input 
                  type="text" 
                  placeholder="Search queue by subject or service node..." 
                  className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border border-slate-100 rounded-[16px] sm:rounded-[24px] text-[12px] sm:text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left table-auto min-w-[800px]">
                <thead className="bg-slate-50/50 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                  <tr>
                    <th className="px-4 sm:px-8 py-4 sm:py-6">Subject Node</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6">Proposed Service</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6">Temporal Sync</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-center">Priority</th>
                    <th className="px-4 sm:px-8 py-4 sm:py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredEntries.length > 0 ? filteredEntries.map(entry => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => handleAction('Node Inspection', entry)}>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="flex items-center gap-3 sm:gap-5">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-clinicPrimary group-hover:scale-110 group-hover:rotate-6 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500">
                            {entry.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-[13px] sm:text-[14px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{entry.patient}</p>
                            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                               <FaPhone size={8} className="text-slate-300"/>
                               <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">+44 700 000 000</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] px-2 sm:px-3 py-1 bg-slate-100/50 rounded-lg group-hover:bg-clinicPrimary/5 group-hover:text-clinicPrimary transition-all">{entry.requestedService}</span>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className="space-y-1 sm:space-y-1.5">
                           <p className="text-[11px] sm:text-[12px] font-bold text-slate-600">{entry.preferredDays}</p>
                           <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase tracking-widest">Added: {entry.addedDate}</p>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6">
                        <div className={`mx-auto w-fit px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] border shadow-soft ${
                          entry.status === 'Priority' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {entry.status}
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-6 text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3">
                           <button 
                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-100 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                             title="Slot Reclamation (Book Now)" 
                             onClick={(e) => { e.stopPropagation(); handleReclaimSlot(entry); }}
                           >
                              <FaCheckCircle size={14}/>
                           </button>
                           <button 
                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                             title="Audit Subject Profile"
                             onClick={(e) => { e.stopPropagation(); navigate('/patients/profile'); }}
                           >
                              <FaEllipsisV size={14}/>
                           </button>
                           <button 
                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-100 text-rose-300 hover:text-rose-50 hover:bg-rose-50 hover:border-rose-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" 
                             title="Purge Entry"
                             onClick={(e) => { e.stopPropagation(); handleRemoveEntry(entry.id); }}
                           >
                              <FaTrash size={12}/>
                           </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan="5" className="px-4 py-20 sm:py-32 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">Zero Queue Nodes Detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 sm:p-5 lg:p-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Queue Nodes 1 of 1</p>
                <div className="flex gap-4">
                   <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Back</button>
                   <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Forward</button>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-5 lg:p-6 border-none shadow-premium bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
            <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-6 sm:mb-8 text-clinicPrimary relative z-10">Queue Analytics</h3>
            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div className="flex justify-between items-end border-b border-white/5 pb-4 sm:pb-6">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 sm:mb-3">Verified Queue Depth</p>
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter leading-none">{waitlistEntries.length + 20}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] sm:text-[10px] font-black text-emerald-500 uppercase tracking-widest shadow-emerald-500/20 shadow-lg px-2 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10">↑ 5 Delta</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-4 sm:pb-6">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 sm:mb-3">Avg Latency Node</p>
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter leading-none">3.2 <span className="text-xs sm:text-sm font-bold text-slate-600">Days</span></p>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reclamation Success</p>
                  <span className="text-[12px] sm:text-[13px] font-black text-clinicPrimary">68%</span>
                </div>
                <div className="w-full bg-white/5 h-2 sm:h-2.5 rounded-full overflow-hidden border border-white/5 shadow-inner-soft">
                   <div className="bg-clinicPrimary h-full shadow-[0_0_15px_rgba(46,167,184,0.5)] transition-all duration-1000" style={{ width: '68%' }}></div>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-3 sm:mt-4 uppercase tracking-[0.15em] opacity-60">Optimized for slot restoration.</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 lg:p-6 border-none shadow-premium bg-white flex flex-col items-center justify-center text-center py-6 sm:py-8 hover:shadow-google transition-all group cursor-pointer" onClick={() => navigate('/appointments/settings')}>
             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft">
                <FaClock className="text-clinicPrimary" size={20}/>
             </div>
             <h4 className="text-[12px] sm:text-[13px] font-black text-slate-900 uppercase tracking-[0.2em] mb-3 sm:mb-4 leading-tight">Automation Pilot Active</h4>
             <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed px-2 sm:px-4 opacity-70">Secured SMS nodes dispatched instantly upon cancellation detection.</p>
             <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black text-clinicPrimary uppercase tracking-[0.2em]">
                Manage Protocol <FaArrowRight size={8} className="group-hover:translate-x-2 transition-transform" />
             </div>
          </Card>
        </div>
      </div>

      {/* Inline Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-100"
            >
              <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Register New Queue Node</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"><FaPlus className="rotate-45"/></button>
              </div>

              <div className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Identification</label>
                  <div className="relative group/input">
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                    <input 
                      type="text" 
                      className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" 
                      placeholder="Lookup subject identity..." 
                      value={newEntry.patient}
                      onChange={(e) => setNewEntry({...newEntry, patient: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposed Clinical Protocol</label>
                    <select 
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer"
                      value={newEntry.requestedService}
                      onChange={(e) => setNewEntry({...newEntry, requestedService: e.target.value})}
                    >
                      <option>Physio Evolution</option>
                      <option>Bio-Metric Pulse</option>
                      <option>Assigned Rehab</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Priority</label>
                    <select 
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer"
                      value={newEntry.status === 'Normal' ? 'Normal (Routine)' : newEntry.status === 'Priority' ? 'Priority (Accelerated)' : 'Urgent (Immediate Sync)'}
                      onChange={(e) => setNewEntry({...newEntry, status: e.target.value.split(' ')[0]})}
                    >
                      <option>Normal (Routine)</option>
                      <option>Priority (Accelerated)</option>
                      <option>Urgent (Immediate Sync)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Prefereces (Available Slots)</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" 
                    placeholder="e.g. Mornings, Weekends, Mon-Wed..." 
                    value={newEntry.preferredDays}
                    onChange={(e) => setNewEntry({...newEntry, preferredDays: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-4">
                <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Discard Selection</Button>
                <Button variant="accent" onClick={handleAddEntry} leftIcon={<FaPlus />}>Authorize Entry</Button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
};

export default Waitlist;
