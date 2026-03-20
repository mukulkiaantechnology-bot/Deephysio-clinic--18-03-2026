import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaUser, FaPhone, FaCalendarPlus, FaFilter, FaSearch, FaEllipsisV, FaCheckCircle, FaArrowRight, FaChevronLeft, FaChevronRight, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

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
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 animate-fade-in custom-scrollbar font-sans pb-10 relative">
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-sm border flex items-center gap-3 min-w-[300px] ${
              toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {toast.type === 'success' ? <FaCheck size={10}/> : <FaTrash size={10}/>}
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <PageHeader 
        title="Waitlist Intelligence"
        subtitle="Synchronize subject queues for optimized slot reclamation."
        icon={<FaClock />}
        actions={
          <Button 
            variant="accent" 
            className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-google"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<FaCalendarPlus size={12}/>}
          >
            Add to Queue
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-none overflow-hidden border border-slate-100">
            <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 bg-slate-50/50">
              <div className="relative flex-1 group w-full">
                <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-clinicPrimary transition-colors" size={12}/>
                <input 
                  type="text" 
                  placeholder="Search queue by subject or service node..." 
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors placeholder:text-slate-400" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left table-auto">
                <thead className="bg-slate-50/80 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Subject Node</th>
                    <th className="px-4 py-3 whitespace-nowrap">Proposed Service</th>
                    <th className="px-4 py-3 whitespace-nowrap">Temporal Sync</th>
                    <th className="px-4 py-3 text-center whitespace-nowrap">Priority</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.length > 0 ? filteredEntries.map(entry => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-clinicPrimary" onClick={() => handleAction('Node Inspection', entry)}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-clinicPrimary group-hover:bg-clinicPrimary group-hover:text-white transition-colors shrink-0 font-bold text-xs">
                            {entry.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-[12px] sm:text-[13px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none tracking-tight">{entry.patient}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                               <FaPhone size={8} className="text-slate-400"/>
                               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">+44 700 000 000</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-100/50 rounded group-hover:bg-clinicPrimary/5 group-hover:text-clinicPrimary transition-colors">{entry.requestedService}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="space-y-0.5">
                           <p className="text-[11px] font-bold text-slate-700">{entry.preferredDays}</p>
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Added: {entry.addedDate}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`mx-auto w-fit px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border shadow-sm ${
                          entry.status === 'Priority' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {entry.status}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                           <button 
                             className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 text-emerald-500 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-colors flex items-center justify-center shrink-0" 
                             title="Slot Reclamation (Book Now)" 
                             onClick={(e) => { e.stopPropagation(); handleReclaimSlot(entry); }}
                           >
                              <FaCheckCircle size={10}/>
                           </button>
                           <button 
                             className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary/30 transition-colors flex items-center justify-center shrink-0" 
                             title="Audit Subject Profile"
                             onClick={(e) => { e.stopPropagation(); navigate('/patients/profile'); }}
                           >
                              <FaEllipsisV size={10}/>
                           </button>
                           <button 
                             className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-200 text-rose-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center shrink-0" 
                             title="Purge Entry"
                             onClick={(e) => { e.stopPropagation(); handleRemoveEntry(entry.id); }}
                           >
                              <FaTrash size={10}/>
                           </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan="5" className="px-4 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Zero Queue Nodes Detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-3 sm:p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Listing Queue Nodes 1 of 1</p>
                <div className="flex gap-2">
                   <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30 px-2 py-1" disabled>Back</button>
                   <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30 px-2 py-1" disabled>Forward</button>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <Card hover={false} className="p-4 sm:p-5 border border-slate-800 shadow-sm bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-clinicPrimary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-5 text-clinicPrimary relative z-10">Queue Analytics</h3>
            <div className="space-y-4 sm:space-y-5 relative z-10">
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Verified Queue Depth</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">{waitlistEntries.length + 20}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest px-1.5 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">↑ 5 Delta</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Avg Latency Node</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">3.2 <span className="text-xs font-bold text-slate-500">Days</span></p>
                </div>
              </div>
              <div className="pt-1">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reclamation Success</p>
                  <span className="text-[11px] font-black text-clinicPrimary">68%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-clinicPrimary h-full shadow-[0_0_10px_rgba(46,167,184,0.5)] transition-all duration-1000" style={{ width: '68%' }}></div>
                </div>
                <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase tracking-widest opacity-80">Optimized for slot restoration.</p>
              </div>
            </div>
          </Card>

          <Card hover={false} className="p-4 sm:p-5 border border-slate-100 shadow-none bg-white flex flex-col items-center justify-center text-center hover:shadow-sm transition-colors group cursor-pointer" onClick={() => navigate('/appointments/settings')}>
             <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-clinicPrimary/5 group-hover:text-clinicPrimary group-hover:border-clinicPrimary/20 transition-colors">
                <FaClock className="text-slate-400 group-hover:text-clinicPrimary transition-colors" size={14}/>
             </div>
             <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-2 leading-tight">Automation Pilot Active</h4>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed px-2 opacity-80">Secured SMS nodes dispatched instantly upon cancellation detection.</p>
             <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-clinicPrimary uppercase tracking-widest">
                Manage Protocol <FaArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
             </div>
          </Card>
        </div>
      </div>

      {/* Inline Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-premium overflow-hidden border border-slate-100"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Register New Queue Node</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><FaPlus className="rotate-45"/></button>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject Identification</label>
                  <div className="relative group/input">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors" size={12}/>
                    <input 
                      type="text" 
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                      placeholder="Lookup subject identity..." 
                      value={newEntry.patient}
                      onChange={(e) => setNewEntry({...newEntry, patient: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Proposed Clinical Protocol</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors cursor-pointer"
                      value={newEntry.requestedService}
                      onChange={(e) => setNewEntry({...newEntry, requestedService: e.target.value})}
                    >
                      <option>Physio Evolution</option>
                      <option>Bio-Metric Pulse</option>
                      <option>Assigned Rehab</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporal Priority</label>
                    <select 
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors cursor-pointer"
                      value={newEntry.status === 'Normal' ? 'Normal (Routine)' : newEntry.status === 'Priority' ? 'Priority (Accelerated)' : 'Urgent (Immediate Sync)'}
                      onChange={(e) => setNewEntry({...newEntry, status: e.target.value.split(' ')[0]})}
                    >
                      <option>Normal (Routine)</option>
                      <option>Priority (Accelerated)</option>
                      <option>Urgent (Immediate Sync)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporal Prefereces (Available Slots)</label>
                  <input 
                    type="text" 
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                    placeholder="e.g. Mornings, Weekends, Mon-Wed..." 
                    value={newEntry.preferredDays}
                    onChange={(e) => setNewEntry({...newEntry, preferredDays: e.target.value})}
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                <Button variant="secondary" className="px-4 py-2 h-9 text-[10px] shadow-sm bg-white" onClick={() => setIsAddModalOpen(false)}>Discard Selection</Button>
                <Button variant="accent" className="px-4 py-2 h-9 text-[10px] shadow-sm" onClick={handleAddEntry} leftIcon={<FaPlus size={10} />}>Authorize Entry</Button>
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
