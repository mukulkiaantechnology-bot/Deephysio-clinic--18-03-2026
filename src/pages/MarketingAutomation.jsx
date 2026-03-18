import React, { useState } from 'react';
import { FaRobot, FaPlus, FaClock, FaCheckCircle, FaExclamationCircle, FaPlay, FaPause, FaSyncAlt, FaLayerGroup, FaBolt, FaMicroscope, FaBrain, FaChartLine, FaHistory, FaUserCircle, FaExclamationTriangle, FaChevronRight } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const MarketingAutomation = () => {
  const [workflows, setWorkflows] = useState([
    { id: 1, name: 'Post-Assessment Nurture', trigger: 'Initial Consultation', steps: 4, active: true, throughput: '1.2k', success: '94%' },
    { id: 2, name: 'Birthday Greetings Alpha', trigger: 'Patient Birthday', steps: 1, active: true, throughput: '850', success: '99%' },
    { id: 3, name: 'Re-engagement Sequence', trigger: '90 Days Inactivity', steps: 3, active: false, throughput: '420', success: 'N/A' },
    { id: 4, name: 'Review Request Delta', trigger: 'Visit Complete', steps: 2, active: true, throughput: '2.1k', success: '86%' },
  ]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const handleAction = (action, item) => {
    alert(`Automation Intelligence: Initiating "${action}" for ${item ? `Workflow ${item.id}` : 'Cluster'}. Handshake verified.`);
  };

  const toggleWorkflow = (id) => {
    setWorkflows(workflows.map(w => w.id === id ? { ...w, active: !w.active } : w));
    const wf = workflows.find(w => w.id === id);
    alert(`Logic Update: Workflow "${wf.name}" ${!wf.active ? 'Activated' : 'Paused'} in the clinical domain.`);
  };

  const runEngineSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Automation Engine Synchronized: 12,421 scheduled transmissions verified and optimized for peak GMT load.');
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Autonomous Follow-up Clusters</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Build and deploy sophisticated, automated clinical follow-up sequences to maximize patient lifecycle value.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={runEngineSync} disabled={isSyncing} leftIcon={isSyncing ? null : <FaSyncAlt className={isSyncing ? 'animate-spin' : ''} />}>
             {isSyncing ? 'Optimizing...' : 'Engine Sync'}
           </Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => { setSelectedWorkflow(null); setIsEditorOpen(true); }} leftIcon={<FaPlus />}>Deploy Logic</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workflows.map(wf => (
                <Card key={wf.id} className="p-10 border-none shadow-premium bg-white hover:shadow-google transition-all group overflow-hidden relative cursor-pointer active:scale-[0.98] rounded-[40px] border-t-4 border-t-transparent hover:border-t-clinicPrimary">
                   <div className={`absolute top-0 right-0 w-40 h-40 ${wf.active ? 'bg-emerald-50/50' : 'bg-slate-50/50'} rounded-bl-full -mr-20 -mt-20 transition-all duration-700 group-hover:scale-125`}></div>
                   
                   <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${wf.active ? 'bg-clinicPrimary text-white shadow-google' : 'bg-slate-100 text-slate-300'}`}>
                         <FaRobot size={24}/>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={(e) => { e.stopPropagation(); handleAction('Clone Logic', wf); }} className="w-10 h-10 bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center shadow-soft"><FaSyncAlt size={12}/></button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); toggleWorkflow(wf.id); }} 
                           className={`w-10 h-10 bg-white border border-slate-100 rounded-xl transition-all flex items-center justify-center shadow-soft ${wf.active ? 'text-amber-500 hover:text-amber-600' : 'text-emerald-500 hover:text-emerald-600'}`}
                         >
                            {wf.active ? <FaPause size={12}/> : <FaPlay size={12}/>}
                         </button>
                      </div>
                   </div>

                   <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3 relative z-10 group-hover:text-clinicPrimary transition-colors">{wf.name}</h3>
                   <div className="flex items-center gap-2 mb-10 relative z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">Trigger: {wf.trigger}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-6 mb-10 relative z-10">
                      <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Success Rate</p>
                         <p className="text-xl font-black text-slate-900 tracking-tight">{wf.success}</p>
                      </div>
                      <div className={`p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex flex-col justify-center ${wf.active ? 'border-emerald-100' : 'border-slate-100'}`}>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">State</p>
                         <span className={`text-[12px] font-black uppercase tracking-widest ${wf.active ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {wf.active ? 'Synchronized' : 'Standby'}
                         </span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-8 border-t border-slate-50 relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-2xl bg-slate-100 border-4 border-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-soft">{i}</div>
                            ))}
                         </div>
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">+{wf.steps - 3} Logical Fragments</span>
                      </div>
                      <FaChevronRight className="text-slate-200 group-hover:text-clinicPrimary group-hover:translate-x-1 transition-all" />
                   </div>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group rounded-[40px]">
              <FaClock className="absolute -right-16 -top-16 text-white/5 text-[280px] -rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.4em] mb-12 relative z-10 flex items-center gap-4">
                 <FaBolt /> Logic Engine Status
              </h3>
              <div className="space-y-10 relative z-10">
                 <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-8">
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Task Cloud</p>
                          <p className="text-3xl font-black text-white tracking-tighter">1,240</p>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-glass">
                          <FaChartLine size={20}/>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Throughput (24h)</p>
                          <p className="text-3xl font-black text-white tracking-tighter">8,421</p>
                       </div>
                    </div>
                 </div>

                 <div className="p-8 bg-blue-500/10 rounded-[32px] border border-blue-500/20 relative z-10 group-hover:bg-blue-500/20 transition-all border-l-4 border-l-clinicPrimary shadow-soft">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-3"><FaExclamationTriangle /> Neural Logic Active</p>
                    <p className="text-[12px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest opacity-80 italic">
                      "Automation protocols are calibrated for maximum GMT engagement."
                    </p>
                 </div>
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium flex flex-col items-center text-center group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('Run Predictive Audit')}>
              <div className="w-24 h-24 rounded-[32px] bg-slate-50 flex items-center justify-center text-clinicPrimary border border-slate-50 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-8">
                 <FaBrain size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">Neural Optimizer</h4>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed opacity-60">Optimize trigger thresholds using historical patient engagement vectors.</p>
              <Button variant="secondary" className="w-full mt-10 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-soft border-none hover:shadow-google">Analyze Flow</Button>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)}
        title={selectedWorkflow ? "Optimize Automation Logic" : "Deploy Logic Prototype"}
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsEditorOpen(false)}>Abort Protocol</Button>
            <Button variant="accent" onClick={() => handleAction('Execute Logic Deploy')} leftIcon={<FaCheckCircle />}>Handshake & Sync</Button>
          </div>
        }
      >
        <div className="space-y-10 p-4 text-left font-sans">
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Protocol Label</label>
              <div className="relative group">
                 <FaLayerGroup className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-clinicPrimary transition-colors" size={16}/>
                 <input type="text" placeholder="e.g. Post-Op Stabilization Nurture Alpha" defaultValue={selectedWorkflow?.name} className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[28px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Inbound Trigger Node</label>
                 <select className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-black text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all appearance-none cursor-pointer" defaultValue={selectedWorkflow?.trigger}>
                    <option>Initial Consultation</option>
                    <option>Visit Complete</option>
                    <option>90 Days Inactivity</option>
                    <option>Patient Birthday</option>
                 </select>
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Temporal Delay Fragment</label>
                 <div className="flex gap-3">
                    <input type="number" defaultValue="2" className="w-20 px-4 py-5 bg-slate-50 border border-slate-100 rounded-[20px] text-[15px] font-bold text-slate-700 text-center outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                    <select className="flex-1 px-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-black text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all appearance-none cursor-pointer">
                       <option>Minutes</option>
                       <option>Hours</option>
                       <option>Days</option>
                       <option>Weeks</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="p-10 bg-slate-50 border border-slate-100 rounded-[40px] relative group">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8 border-b border-slate-200 pb-4">Logic Flow Visualization</p>
              <div className="space-y-6">
                 {[1, 2].map(i => (
                    <div key={i} className="flex items-center gap-6">
                       <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 shadow-soft flex items-center justify-center text-[10px] font-black text-clinicPrimary">{i}</div>
                       <div className="flex-1 p-5 bg-white border border-slate-100 rounded-2xl shadow-soft">
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Execute Transmission Node: {i === 1 ? 'SMS Handshake' : 'Email Protocol'}</p>
                       </div>
                    </div>
                 ))}
                 <button onClick={() => handleAction('Add Logic Step')} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-clinicPrimary hover:text-clinicPrimary transition-all">+ Inject Logic Fragment</button>
              </div>
              <FaMicroscope className="absolute right-8 bottom-8 text-slate-200 text-5xl opacity-20 pointer-events-none" />
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarketingAutomation;
