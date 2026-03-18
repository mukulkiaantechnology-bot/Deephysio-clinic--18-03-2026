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
    alert(`Bulk Intelligence: Initiating "${action}" for Clinical Outreach Node. Handshake verified.`);
  };

  const runCampaignLaunch = () => {
    if (!selectedGroup || !message) {
      alert('Logical Error: Destination Node and Payload required for transmission.');
      return;
    }
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsPreviewOpen(false);
      alert('Campaign Synchronized: Mass transmission executed across all target clinical nodes.');
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Campaign Logic Hub</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Orchestrate longitudinal clinical outreach and optimize patient engagement density.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Review Engagement History')} leftIcon={<FaHistory />}>Audit Trail</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Sync Marketing Nodes')} leftIcon={<FaSync />}>Sync Channels</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <Card className="p-0 border-none shadow-premium bg-white rounded-[40px] overflow-hidden transition-all duration-500">
              <div className="flex bg-slate-50/50 p-2 border-b border-slate-50">
                <button 
                  onClick={() => setActiveTab('new')}
                  className={`flex-1 py-5 rounded-[22px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'new' ? 'bg-white text-clinicPrimary shadow-soft border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  New Campaign Protocol
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-5 rounded-[22px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-clinicPrimary shadow-soft border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Transmission History
                </button>
              </div>

              {activeTab === 'new' ? (
                <div className="p-10 space-y-10 animate-in slide-in-from-bottom-2 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] ml-4 flex items-center gap-3">
                            <FaUsers className="text-clinicPrimary" /> Destination Segment
                         </label>
                         <div className="relative group">
                            <select 
                              className="w-full pl-8 pr-12 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-black text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all appearance-none cursor-pointer"
                              value={selectedGroup}
                              onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                               <option value="">Select Destination Node Cluster...</option>
                               {groups.map(g => (
                                 <option key={g.name} value={g.name}>{g.name} ({g.count} Clinical Nodes)</option>
                               ))}
                            </select>
                            <FaLayerGroup className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                         </div>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] ml-4 flex items-center gap-3">
                            <FaBolt className="text-clinicPrimary" /> Transmission Medium
                         </label>
                         <div className="grid grid-cols-2 gap-4">
                            {[
                               { id: 'sms', label: 'SMS Transmission', icon: <FaSms /> },
                               { id: 'email', label: 'Email Protocol', icon: <FaEnvelope /> }
                            ].map(item => (
                               <button 
                                 key={item.id}
                                 onClick={() => setChannel(item.id)}
                                 className={`flex items-center justify-center gap-4 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all border ${channel === item.id ? 'bg-clinicPrimary text-white shadow-google border-clinicPrimary' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                               >
                                  {item.icon} {item.label}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-center px-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] flex items-center gap-3">
                            <FaBullhorn className="text-clinicPrimary" /> Payload Content
                         </label>
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{message.length}/160 Logical Fragments</span>
                      </div>
                      <textarea 
                        className="w-full h-48 p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-[15px] font-bold text-slate-800 outline-none focus:ring-4 focus:ring-clinicPrimary/5 resize-none shadow-inner-soft placeholder:text-slate-200 tracking-tight"
                        placeholder="Define clinical message parameters... use {node_id} for personalization."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                   </div>

                   <div className="flex justify-end items-center gap-6 pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Pre-transmission validation required</p>
                      <Button 
                        variant="accent" 
                        size="lg"
                        className="rounded-3xl h-16 px-12 shadow-google transition-all active:scale-95 text-[11px] font-black uppercase tracking-[0.2em] group"
                        onClick={() => setIsPreviewOpen(true)}
                        leftIcon={<FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      >
                         Execute Preview Handshake
                      </Button>
                   </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                   <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left min-w-[800px]">
                         <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[.4em] border-b border-slate-100">
                            <tr>
                               <th className="px-10 py-6">Campaign UID</th>
                               <th className="px-10 py-6">Transmission Density</th>
                               <th className="px-10 py-6">Date Node</th>
                               <th className="px-10 py-6">Yield Delta</th>
                               <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {recentCampaigns.map(camp => (
                              <tr key={camp.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-clinicPrimary">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-5">
                                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft ${camp.type === 'SMS' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'} group-hover:scale-110 transition-transform`}>
                                          {camp.type === 'SMS' ? <FaSms /> : <FaEnvelope />}
                                       </div>
                                       <div>
                                          <span className="text-[15px] font-black text-slate-900 uppercase tracking-tight leading-none mb-2 block group-hover:text-clinicPrimary transition-colors">{camp.name}</span>
                                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{camp.id}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-[15px] font-black text-slate-700 tracking-tighter">{camp.sentTo} Destinations</td>
                                 <td className="px-10 py-8 text-[11px] font-black text-slate-500 tracking-widest uppercase">{camp.date}</td>
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                       <span className={`text-[11px] font-black uppercase tracking-widest ${camp.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                                          {camp.status}
                                       </span>
                                       <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{camp.yield} Flow</span>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-right">
                                    <button onClick={(e) => { e.stopPropagation(); handleAction(`Audit ${camp.id}`); }} className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all shadow-soft"><FaChartLine size={12}/></button>
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

        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group rounded-[40px]">
              <FaBullhorn className="absolute -right-16 -bottom-16 text-white/5 text-[280px] rotate-12 transition-transform group-hover:rotate-6 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.25em] mb-12 relative z-10 flex items-center gap-4">
                 <FaBolt /> Operational Credits
              </h3>
              <div className="space-y-10 relative z-10">
                 <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-6">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[.25em] text-slate-400">
                       <span>SMS Transmission Nodes</span>
                       <span className="text-white text-xl tracking-tighter">4,285 Available</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div className="bg-clinicPrimary h-full rounded-full shadow-[0_0_15px_rgba(46,167,184,0.3)]" style={{ width: '65%' }}></div>
                    </div>
                    <Button variant="secondary" className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-clinicPrimary hover:border-clinicPrimary transition-all font-black text-[10px] uppercase tracking-widest text-white shadow-soft" onClick={() => handleAction('Credit Acquisition')}>Recharge Node Cluster</Button>
                 </div>
              </div>
              <div className="mt-10 p-8 bg-blue-500/10 rounded-[32px] border border-blue-500/20 relative z-10 group-hover:bg-blue-500/20 transition-all border-l-4 border-l-clinicPrimary shadow-soft">
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-3"><FaExclamationTriangle /> Compliance logic active</p>
                 <p className="text-[13px] font-bold text-slate-300 leading-relaxed italic opacity-80">
                    "GDPR/TCPA Protocol: Ensure all transmission nodes have authenticated opt-in status."
                 </p>
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium flex flex-col items-center text-center group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('Strategic Outreach Session')}>
              <div className="w-24 h-24 rounded-[32px] bg-slate-50 flex items-center justify-center text-clinicPrimary border border-slate-50 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-8">
                 <FaBrain size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Outreach Intelligence</h4>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed opacity-60">Leverage stochastic modeling to maximize patient reactivation delta.</p>
              <Button variant="secondary" className="w-full mt-10 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-soft border-none hover:shadow-google">Initialize Analyzer</Button>
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
        <div className="space-y-8 p-4 text-left font-sans">
           <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner-soft">
              <div className="w-20 h-20 bg-white rounded-[28px] shadow-premium flex items-center justify-center text-clinicPrimary">
                 {channel === 'sms' ? <FaSms size={28}/> : <FaEnvelope size={28}/>}
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">Target: {selectedGroup}</h4>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">{groups.find(g => g.name === selectedGroup)?.count || 0} Destination Nodes Authenticated</p>
              </div>
           </div>
           <div className="p-10 bg-white border border-slate-100 rounded-[32px] shadow-premium relative group">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6 border-b border-slate-50 pb-4">Payload Visualization</p>
              <p className="text-[15px] font-bold text-slate-700 leading-relaxed tracking-tight italic">
                 "{message || 'Awaiting Payload Definition...'}"
              </p>
              <FaMicroscope className="absolute right-8 bottom-8 text-slate-50 text-5xl group-hover:scale-125 transition-transform" />
           </div>
           <div className="flex items-center gap-6 p-6 bg-blue-50/50 rounded-[28px] border border-blue-100">
              <FaExclamationTriangle className="text-blue-500 animate-pulse" />
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-widest leading-relaxed">System is ready for mass deployment. Error margin verified at 0.02%.</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkMessaging;
