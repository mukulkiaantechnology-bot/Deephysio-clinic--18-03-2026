import React, { useState } from 'react';
import { FaUserTag, FaPlus, FaFilter, FaSearch, FaUsers, FaChartPie, FaChevronRight, FaArrowUp, FaArrowDown, FaHistory, FaCheckCircle, FaExclamationCircle, FaUserCircle, FaSync, FaShieldAlt, FaLayerGroup, FaBolt, FaMicroscope } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const MarketingSegments = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSegmentId, setSelectedSegmentId] = useState(1);

  const segments = [
    { id: 1, name: 'Active Post-Op Hub', count: 420, growth: '+12.4%', status: 'Dynamic', health: 94, category: 'Clinical' },
    { id: 2, name: 'Inactive > 6 Months', count: 124, growth: '-2.1%', status: 'Manual', health: 42, category: 'Reactivation' },
    { id: 3, name: 'High Value Nodes', count: 85, growth: '+5.8%', status: 'Dynamic', health: 88, category: 'Strategic' },
    { id: 4, name: 'Referral Alpha sources', count: 12, growth: '0.0%', status: 'Static', health: 100, category: 'Acquisition' },
  ];

  const handleAction = (action, item) => {
    alert(`Audience Intelligence: Initiating "${action}" for ${item ? `Segment ${item.id}` : 'Cluster'}. Handshake verified.`);
  };

  const runSegmentSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Audience Protocol Synchronized: 4200 clinical nodes sorted into 12 active segments.');
    }, 2000);
  };

  const selectedSegment = segments.find(s => s.id === selectedSegmentId) || segments[0];

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Audience Segmentation Cluster</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Organize patient nodes into high-fidelity actionable segments for clinical outreach.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={runSegmentSync} disabled={isSyncing} leftIcon={isSyncing ? null : <FaSync className={isSyncing ? 'animate-spin' : ''} />}>
             {isSyncing ? 'Syncing...' : 'Sync Audience'}
           </Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsCreateOpen(true)} leftIcon={<FaPlus />}>Deploy Segment</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Analytics Sidebar */}
        <div className="lg:col-span-3 space-y-10">
           <Card className="p-10 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group rounded-[40px]">
              <FaChartPie className="absolute -right-12 -bottom-12 text-white/5 text-[220px] rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.4em] mb-12 relative z-10">Audience Integrity</h3>
              <div className="space-y-10 relative z-10">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reachability Delta</p>
                       <p className="text-3xl font-black tracking-tighter">94.2%</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-clinicPrimary shadow-glass">
                       <FaBolt size={20}/>
                    </div>
                 </div>
                 <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-clinicPrimary h-full rounded-full shadow-[0_0_15px_rgba(46,167,184,0.3)]" style={{ width: '94%' }}></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Growth</p>
                       <p className="text-xl font-black text-emerald-400 tracking-tighter">+12.4%</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Segs</p>
                       <p className="text-xl font-black text-white tracking-tighter">12</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium rounded-[40px] space-y-10">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">Heuristic Filters</h4>
              <div className="space-y-3">
                 {['Temporal Visit Data', 'Total Billing Density', 'Clinical Pathway', 'Geographic Node'].map(f => (
                   <button key={f} className="w-full text-left p-5 hover:bg-slate-50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-clinicPrimary transition-all flex items-center justify-between border border-transparent hover:border-slate-100 group">
                      {f} <FaChevronRight size={10} className="text-slate-200 group-hover:text-clinicPrimary group-hover:translate-x-1 transition-all"/>
                   </button>
                 ))}
              </div>
              <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100">
                 <p className="text-[10px] font-black text-blue-500 uppercase tracking-[.3em] mb-3 flex items-center gap-3"><FaShieldAlt /> Regulatory Logic</p>
                 <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Ensure all Dynamic Segments comply with standard GDPR/TCPA protocols.</p>
              </div>
           </Card>
        </div>

        {/* Segments Table */}
        <Card className="lg:col-span-9 p-0 bg-white border-none shadow-premium rounded-[40px] overflow-hidden">
           <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center gap-8 bg-slate-50/20">
              <div className="relative flex-1 group w-full">
                 <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Query audience segments by metadata..." 
                   className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-black shadow-inner-soft outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all placeholder:text-slate-200" 
                 />
              </div>
              <button onClick={() => handleAction('Advanced Filter Handshake')} className="h-16 w-16 flex items-center justify-center border border-slate-100 rounded-[24px] text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all bg-white shadow-soft"><FaFilter size={18}/></button>
           </div>

           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left min-w-[900px]">
                 <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[.4em]">
                    <tr>
                       <th className="px-10 py-6">Segment Identification</th>
                       <th className="px-10 py-6">Node Density</th>
                       <th className="px-10 py-6">Growth Delta</th>
                       <th className="px-10 py-6">Protocol Type</th>
                       <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {segments.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(seg => (
                       <tr 
                         key={seg.id} 
                         onClick={() => setSelectedSegmentId(seg.id)}
                         className={`transition-all duration-500 group cursor-pointer border-l-8 ${selectedSegmentId === seg.id ? 'bg-clinicPrimary/5 border-l-clinicPrimary' : 'hover:bg-slate-50 border-l-transparent'}`}
                       >
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft transition-all duration-500 scale-110 ${selectedSegmentId === seg.id ? 'bg-clinicPrimary text-white shadow-google' : 'bg-slate-50 text-slate-300'}`}>
                                   <FaLayerGroup size={18}/>
                                </div>
                                <div>
                                   <span className="text-[15px] font-black text-slate-900 tracking-tighter uppercase leading-none block mb-2">{seg.name}</span>
                                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{seg.category} Cluster</span>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-3">
                                <FaUsers className="text-slate-100" size={16}/>
                                <span className="text-[17px] font-black text-slate-700 tracking-tighter tracking-tight">{seg.count} Nodes</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-2">
                                {seg.growth.startsWith('+') ? <FaArrowUp className="text-emerald-500" size={10}/> : <FaArrowDown className="text-rose-500" size={10}/>}
                                <span className={`text-[13px] font-black tracking-tight ${seg.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{seg.growth}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <span className={`text-[9px] font-black px-4 py-1.5 rounded-xl border tracking-widest uppercase ${seg.status === 'Dynamic' ? 'bg-clinicPrimary/5 text-clinicPrimary border-clinicPrimary/20 shadow-soft' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{seg.status}</span>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <Button variant="secondary" className="h-12 px-6 rounded-2xl font-black text-[9px] uppercase tracking-widest border-none shadow-soft hover:shadow-google transition-all" onClick={(e) => { e.stopPropagation(); handleAction('Sync Leads', seg); }}>Sync Transmission</Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Card>
      </div>

      <Modal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)}
        title="Deploy Audience Segment Node"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsCreateOpen(false)}>Abort Protocol</Button>
            <Button variant="accent" onClick={() => handleAction('Execute Segment Deployment')} leftIcon={<FaCheckCircle />}>Deploy Segment</Button>
          </div>
        }
      >
        <div className="space-y-10 p-4 text-left font-sans">
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Segment Label</label>
              <div className="relative group">
                 <FaUserTag className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-clinicPrimary transition-colors" size={16}/>
                 <input type="text" placeholder="e.g. Longitudinal Recovery Cluster Beta" className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[28px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" />
              </div>
           </div>
           
           <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Logical Heuristics</label>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Treatment Date Node', active: true },
                   { label: 'Financial Threshold', active: false },
                   { label: 'Condition Spectrum', active: true },
                   { label: 'Response Propensity', active: false }
                 ].map(h => (
                    <button key={h.label} className={`p-6 rounded-[32px] border text-left flex items-center justify-between transition-all active:scale-95 ${h.active ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-google' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                       <span className="text-[11px] font-black uppercase tracking-widest">{h.label}</span>
                       <div className={`w-3 h-3 rounded-full ${h.active ? 'bg-white' : 'bg-slate-100'}`}></div>
                    </button>
                 ))}
              </div>
           </div>

           <div className="p-10 bg-slate-900 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="relative z-10 flex items-center gap-8">
                 <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center text-clinicPrimary shadow-premium">
                    <FaMicroscope size={28} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-3">Audience Projection</h4>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] leading-relaxed">Estimated Node Density: 1,420 ± 5% validation error.</p>
                 </div>
              </div>
              <FaLayerGroup className="absolute right-[-40px] bottom-[-40px] text-white/5 text-[150px] rotate-12" />
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarketingSegments;
