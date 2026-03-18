import React, { useState } from 'react';
import { FaClock, FaUser, FaPhone, FaCalendarPlus, FaFilter, FaSearch, FaEllipsisV, FaCheckCircle, FaArrowRight, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Waitlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [waitlistEntries, setWaitlistEntries] = useState([
    { id: 'WL-101', patient: 'Emma Watson', requestedService: 'Physio Evolution', preferredDays: 'Mon, Wed', addedDate: '15 Mar 2026', status: 'Priority' },
    { id: 'WL-102', patient: 'James Bond', requestedService: 'Bio-Metric Massage', preferredDays: 'Weekends', addedDate: '16 Mar 2026', status: 'Normal' },
    { id: 'WL-103', patient: 'Sarah Parker', requestedService: 'Assessment Protocol', preferredDays: 'Any morning', addedDate: '14 Mar 2026', status: 'Priority' },
    { id: 'WL-104', patient: 'Robert Downey', requestedService: 'Neural Rehab', preferredDays: 'Fri afternoon', addedDate: '17 Mar 2026', status: 'Normal' },
  ]);

  const filteredEntries = waitlistEntries.filter(e => 
    e.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.requestedService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, entry) => {
    alert(`Node Execution: Initiating ${action} for ${entry ? entry.patient : 'new subject'}. Protocol synchronized.`);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Waitlist Intelligence</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Synchronize subject queues for optimized slot reclamation.</p>
        </div>
        <Button 
          variant="accent" 
          size="lg"
          className="rounded-[24px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.2em] w-full lg:w-auto relative z-10"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<FaCalendarPlus size={14}/>}
        >
          Add to Queue
        </Button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-50">
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/20">
              <div className="relative flex-1 group w-full">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                <input 
                  type="text" 
                  placeholder="Search queue by subject or service node..." 
                  className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-5 border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google hover:bg-white transition-all bg-slate-50 shadow-soft active:scale-90" onClick={() => alert('Search Parameters: Initializing queue filter nodes...')}>
                <FaFilter size={16}/>
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left table-fixed min-w-[900px]">
                <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
                  <tr>
                    <th className="px-10 py-6 w-[25%]">Subject Node</th>
                    <th className="px-10 py-6 w-[20%]">Proposed Service</th>
                    <th className="px-10 py-6 w-[20%]">Temporal Sync</th>
                    <th className="px-10 py-6 w-[15%] text-center">Priority</th>
                    <th className="px-10 py-6 w-[20%] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredEntries.length > 0 ? filteredEntries.map(entry => (
                    <tr key={entry.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => handleAction('Node Inspection', entry)}>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-clinicPrimary group-hover:scale-110 group-hover:rotate-6 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500">
                            {entry.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{entry.patient}</p>
                            <div className="flex items-center gap-2 mt-2">
                               <FaPhone size={8} className="text-slate-300"/>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">+44 700 000 000</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] px-3 py-1 bg-slate-100/50 rounded-lg group-hover:bg-clinicPrimary/5 group-hover:text-clinicPrimary transition-all">{entry.requestedService}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="space-y-1.5">
                           <p className="text-[12px] font-bold text-slate-600">{entry.preferredDays}</p>
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Added: {entry.addedDate}</p>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className={`mx-auto w-fit px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-soft ${
                          entry.status === 'Priority' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {entry.status}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                           <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" title="Book Instant Slot" onClick={(e) => { e.stopPropagation(); handleAction('Instant Slot Reconciliation', entry); }}>
                              <FaCheckCircle size={14}/>
                           </button>
                           <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Context Audit', entry); }}>
                              <FaEllipsisV size={14}/>
                           </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan="5" className="px-10 py-32 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">Zero Queue Nodes Detected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Queue Nodes 1 of 1</p>
                <div className="flex gap-4">
                   <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Back</button>
                   <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Forward</button>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 border-none shadow-premium bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-clinicPrimary relative z-10">Queue Analytics</h3>
            <div className="space-y-10 relative z-10">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Verified Queue Depth</p>
                  <p className="text-4xl font-black tracking-tighter leading-none">{waitlistEntries.length + 20}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest shadow-emerald-500/20 shadow-lg px-2 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10">↑ 5 Delta</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Avg Latency Node</p>
                  <p className="text-4xl font-black tracking-tighter leading-none">3.2 <span className="text-sm font-bold text-slate-600">Days</span></p>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reclamation Success</p>
                  <span className="text-[13px] font-black text-clinicPrimary">68%</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 shadow-inner-soft">
                   <div className="bg-clinicPrimary h-full shadow-[0_0_15px_rgba(46,167,184,0.5)] transition-all duration-1000" style={{ width: '68%' }}></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-[0.15em] opacity-60">Optimized for slot restoration.</p>
              </div>
            </div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white flex flex-col items-center justify-center text-center py-12 hover:shadow-google transition-all group cursor-pointer" onClick={() => alert('Automation Node: SMS synchronization active for all priority subjects.')}>
             <div className="w-16 h-16 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft">
                <FaClock className="text-clinicPrimary" size={24}/>
             </div>
             <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 leading-tight">Automation Pilot Active</h4>
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed px-4 opacity-70">Secured SMS nodes dispatched instantly upon cancellation detection.</p>
             <div className="mt-8 flex items-center gap-3 text-[10px] font-black text-clinicPrimary uppercase tracking-[0.2em]">
                Manage Protocol <FaArrowRight size={8} className="group-hover:translate-x-2 transition-transform" />
             </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Queue Node"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Discard</Button>
            <Button variant="accent" onClick={() => { setIsAddModalOpen(false); alert('System: Subject successfully added to longitudinal queue.'); }} leftIcon={<FaPlus />}>Authorize Entry</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 font-sans">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Identification</label>
              <div className="relative group/input">
                 <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                 <input type="text" className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="Lookup subject identity..." />
              </div>
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proposed Clinical Protocol</label>
                 <select className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                    <option>Physio Evolution</option>
                    <option>Bio-Metric Pulse</option>
                    <option>Assigned Rehab</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Priority</label>
                 <select className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                    <option>Normal (Routine)</option>
                    <option>Priority (Accelerated)</option>
                    <option>Urgent (Immediate Sync)</option>
                 </select>
              </div>
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Prefereces (Available Slots)</label>
              <input type="text" className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="e.g. Mornings, Weekends, Mon-Wed..." />
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Waitlist;
