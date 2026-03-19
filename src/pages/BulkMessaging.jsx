import React, { useState } from 'react';
import { FaUsers, FaSms, FaEnvelope, FaPaperPlane, FaSearch, FaHistory, FaCheckCircle, FaFilter, FaLayerGroup, FaBolt, FaChartLine, FaDownload, FaSync, FaExclamationTriangle, FaBullhorn, FaMicroscope, FaBrain } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const BulkMessaging = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [channel, setChannel] = useState('sms');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, visible: true, type });
    setTimeout(() => setToast({ message: '', visible: false, type: 'success' }), 3500);
  };

  const groups = [
    { name: 'All Patients', count: 1240, segment: 'Global Domain' },
    { name: 'Post-Op (Rehab)', count: 85, segment: 'Clinical Priority' },
    { name: 'Pending Initial Assessment', count: 24, segment: 'Intake Queue' },
    { name: 'Insurance Waiting', count: 42, segment: 'Billing Standby' },
  ];

  const recentCampaigns = [
    { id: 'CAMP-902', name: 'Winter Wellness Sync', type: 'Email', sentTo: '1.2k', date: 'Jan 15, 2026', status: 'Completed', yield: '14%' },
    { id: 'CAMP-905', name: 'Post-Op Protocol Delta', type: 'SMS', sentTo: '85', date: 'Feb 02, 2026', status: 'Completed', yield: '92%' },
    { id: 'CAMP-910', name: 'Waitlist Node Optimization', type: 'SMS', sentTo: '24', date: 'Feb 18, 2026', status: 'In Progress', yield: 'N/A' },
  ];

  const handleAction = (action) => {
    showToast(`${action} initiated successfully.`);
  };

  const handlePreviewClick = () => {
    if (!selectedGroup && !message.trim()) {
      setValidationError('Both Destination Segment and Payload Content are required.');
      return;
    }
    if (!selectedGroup) {
      setValidationError('Please select a Destination Segment.');
      return;
    }
    if (!message.trim()) {
      setValidationError('Payload Content cannot be empty.');
      return;
    }
    setValidationError('');
    setIsPreviewOpen(true);
  };

  const runCampaignLaunch = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsPreviewOpen(false);
      setSelectedGroup('');
      setMessage('');
      showToast('Campaign Transmitted Successfully to all target nodes!');
    }, 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-5 lg:px-6 animate-fade-in font-sans relative">
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999]">
          <div className={`px-6 py-3 rounded-xl shadow-sm border flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-slate-900 text-white border-white/10'
              : 'bg-rose-600 text-white border-rose-400/20'
          }`}>
            <FaCheckCircle className="text-clinicPrimary shrink-0 size={12}" />
            <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}
      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 border border-slate-100 shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Campaign Logic Hub</h1>
          <p className="text-slate-500 font-bold mt-1.5 uppercase tracking-widest text-[9px] sm:text-[10px] opacity-80">Orchestrate longitudinal clinical outreach and optimize patient engagement density.</p>
        </div>
        <div className="flex gap-2 sm:gap-3 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" className="flex-1 lg:flex-none rounded-lg h-9 sm:h-10 px-4 sm:px-5 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-[9px] lg:text-[10px] font-black uppercase tracking-widest" onClick={() => handleAction('Review Engagement History')} leftIcon={<FaHistory size={10}/>}>Audit Trail</Button>
           <Button variant="accent" className="flex-1 lg:flex-none rounded-lg h-9 sm:h-10 px-4 sm:px-5 shadow-sm active:scale-95 transition-all text-[9px] lg:text-[10px] font-black uppercase tracking-widest" onClick={() => handleAction('Sync Marketing Nodes')} leftIcon={<FaSync size={10}/>}>Sync Channels</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
           <Card hover={false} className="p-0 border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500">
              <div className="flex bg-slate-50/50 p-1 sm:p-1.5 border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('new')}
                  className={`flex-1 py-2 sm:py-2.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'new' ? 'bg-white text-clinicPrimary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                >
                  New Campaign Protocol
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-2 sm:py-2.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'history' ? 'bg-white text-clinicPrimary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                >
                  Transmission History
                </button>
              </div>

              {activeTab === 'new' ? (
                <div className="p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <FaUsers className="text-clinicPrimary" size={10} /> Destination Segment
                         </label>
                         <div className="relative group">
                            <select 
                              className="w-full pl-3 sm:pl-4 pr-8 py-2 md:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors appearance-none cursor-pointer"
                              value={selectedGroup}
                              onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                               <option value="">Select Destination Node Cluster...</option>
                               {groups.map(g => (
                                 <option key={g.name} value={g.name}>{g.name} ({g.count} Clinical Nodes)</option>
                               ))}
                            </select>
                            <FaLayerGroup className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12}/>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <FaBolt className="text-clinicPrimary" size={10} /> Transmission Medium
                         </label>
                         <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {[
                               { id: 'sms', label: 'SMS Transmit', icon: <FaSms size={12}/> },
                               { id: 'email', label: 'Email Protocol', icon: <FaEnvelope size={12}/> }
                            ].map(item => (
                               <button 
                                 key={item.id}
                                 onClick={() => setChannel(item.id)}
                                 className={`flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors border shadow-sm ${channel === item.id ? 'bg-clinicPrimary text-white shadow-sm border-clinicPrimary' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                               >
                                  {item.icon} {item.label}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <div className="flex justify-between items-center ml-1">
                         <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <FaBullhorn className="text-clinicPrimary" size={10} /> Payload Content
                         </label>
                         <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest">{message.length}/160 Logical Fragments</span>
                      </div>
                      <textarea 
                        className="w-full h-24 sm:h-32 p-3 sm:p-4 bg-white border border-slate-200 rounded-xl text-[12px] sm:text-[13px] font-bold text-slate-800 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary resize-none shadow-sm placeholder:text-slate-400 tracking-tight"
                        placeholder="Define clinical message parameters... use {node_id} for personalization."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                   </div>

                   {/* Validation Error */}
                   {validationError && (
                     <div className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-3 bg-rose-50 border border-rose-100 rounded-lg shadow-sm">
                       <FaExclamationTriangle className="text-rose-500 shrink-0" size={12}/>
                       <p className="text-[9px] sm:text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none mt-0.5">{validationError}</p>
                     </div>
                   )}
                   <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest italic hidden sm:block">Pre-transmission validation required</p>
                      <Button 
                        variant="accent" 
                        className="rounded-lg h-9 sm:h-10 px-4 sm:px-6 shadow-sm transition-transform active:scale-95 text-[9px] sm:text-[10px] font-black uppercase tracking-widest group w-full sm:w-auto"
                        onClick={handlePreviewClick}
                        leftIcon={<FaPaperPlane size={10} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      >
                         Execute Preview Handshake
                      </Button>
                   </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                   <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left table-auto">
                         <thead className="bg-slate-50/80 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
                            <tr>
                               <th className="px-4 p-3 whitespace-nowrap">Campaign UID</th>
                               <th className="px-4 p-3 whitespace-nowrap">Transmission Density</th>
                               <th className="px-4 p-3 whitespace-nowrap">Date Node</th>
                               <th className="px-4 p-3 whitespace-nowrap">Yield Delta</th>
                               <th className="px-4 p-3 text-right whitespace-nowrap">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {recentCampaigns.map(camp => (
                              <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-clinicPrimary">
                                 <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border border-slate-200 ${camp.type === 'SMS' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'}`}>
                                          {camp.type === 'SMS' ? <FaSms size={10}/> : <FaEnvelope size={10}/>}
                                       </div>
                                       <div>
                                          <span className="text-[12px] sm:text-[13px] font-black text-slate-900 tracking-tight leading-none block mb-0.5 group-hover:text-clinicPrimary transition-colors">{camp.name}</span>
                                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{camp.id}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 text-[12px] sm:text-[13px] font-bold text-slate-700 tracking-tight whitespace-nowrap">{camp.sentTo} Destinations</td>
                                 <td className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">{camp.date}</td>
                                 <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                       <span className={`text-[9px] font-black uppercase tracking-widest ${camp.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                          {camp.status}
                                       </span>
                                       <span className="text-[8px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">{camp.yield} Flow</span>
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 text-right whitespace-nowrap">
                                    <button onClick={(e) => { e.stopPropagation(); handleAction(`Audit ${camp.id}`); }} className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary/30 transition-colors shadow-sm ml-auto shrink-0"><FaChartLine size={10}/></button>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              )}
           </Card>
        </div>

        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
           <Card hover={false} className="p-4 sm:p-5 lg:p-6 bg-slate-900 text-white border border-slate-800 shadow-sm relative overflow-hidden group rounded-xl sm:rounded-2xl">
              <FaBullhorn className="absolute -right-8 -bottom-8 text-white/5 text-[120px] rotate-12 transition-transform pointer-events-none"/>
              <h3 className="text-[9px] sm:text-[10px] font-black text-clinicPrimary uppercase tracking-widest mb-5 sm:mb-6 relative z-10 flex items-center gap-2">
                 <FaBolt size={10}/> Operational Credits
              </h3>
              <div className="space-y-4 sm:space-y-6 relative z-10">
                 <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                       <span>SMS Transmission Nodes</span>
                       <span className="text-white text-sm sm:text-base tracking-tighter">4,285 Available</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="bg-clinicPrimary h-full rounded-full shadow-[0_0_10px_rgba(46,167,184,0.3)]" style={{ width: '65%' }}></div>
                    </div>
                    <Button variant="secondary" className="w-full h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-clinicPrimary hover:border-clinicPrimary hover:text-white transition-colors font-black text-[9px] uppercase tracking-widest text-white shadow-sm" onClick={() => handleAction('Credit Acquisition')}>Recharge Node Cluster</Button>
                 </div>
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 relative z-10 group-hover:bg-blue-500/15 transition-colors border-l-4 border-l-clinicPrimary shadow-sm">
                 <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2"><FaExclamationTriangle size={10}/> Compliance logic active</p>
                 <p className="text-[10px] sm:text-[11px] font-bold text-slate-300 leading-relaxed italic opacity-80">
                    "GDPR/TCPA Protocol: Ensure all transmission nodes have authenticated opt-in status."
                 </p>
              </div>
           </Card>

           <Card hover={false} className="p-4 sm:p-5 lg:p-6 bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center group transition-colors rounded-xl sm:rounded-2xl cursor-pointer" onClick={() => handleAction('Strategic Outreach Session')}>
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-clinicPrimary border border-slate-100 shadow-sm group-hover:bg-clinicPrimary/5 group-hover:border-clinicPrimary/20 transition-colors mb-4">
                 <FaBrain size={20} />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tighter leading-none mb-2.5">Outreach Intelligence</h4>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed opacity-80 mb-5 sm:mb-6">Leverage stochastic modeling to maximize patient reactivation delta.</p>
              <Button variant="secondary" className="w-full h-9 rounded-lg font-black uppercase tracking-widest text-[9px] shadow-sm bg-white hover:bg-slate-50 border border-slate-200">Initialize Analyzer</Button>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => !isSyncing && setIsPreviewOpen(false)}
        title="Transmission Preview Handshake"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsPreviewOpen(false)} disabled={isSyncing}>Abort Command</Button>
            <Button variant="accent" onClick={runCampaignLaunch} disabled={isSyncing} leftIcon={isSyncing ? null : <FaPaperPlane />}>
              {isSyncing ? 'Executing Sync...' : 'Launch Global Transmission'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 sm:space-y-5 p-0 sm:p-2 text-left font-sans">
           <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-slate-50/50 rounded-xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center text-clinicPrimary shrink-0">
                 {channel === 'sms' ? <FaSms size={16}/> : <FaEnvelope size={16}/>}
              </div>
              <div>
                 <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tighter leading-none mb-1.5">Target: {selectedGroup}</h4>
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{groups.find(g => g.name === selectedGroup)?.count || 0} Destination Nodes Authenticated</p>
              </div>
           </div>
           <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-xl shadow-sm relative group overflow-hidden">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Payload Visualization</p>
              <div className="text-[12px] sm:text-[13px] font-bold text-slate-700 leading-relaxed tracking-tight italic relative z-10 whitespace-pre-wrap">
                 "{message || 'Awaiting Payload Definition...'}"
              </div>
              <FaMicroscope className="absolute -right-4 -bottom-4 text-slate-50 text-7xl opacity-50 pointer-events-none" />
           </div>
           <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm">
              <FaExclamationTriangle className="text-blue-500 shrink-0 size={12}"/>
              <p className="text-[10px] sm:text-[11px] font-bold text-blue-700 leading-snug">System is ready for mass deployment. Error margin verified at 0.02%.</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkMessaging;
