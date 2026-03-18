import React, { useState } from 'react';
import { FaClipboardList, FaPlus, FaSearch, FaFilter, FaStar, FaHistory, FaCheckCircle, FaUserNurse, FaChartLine, FaFlask, FaClock, FaCalendarCheck, FaChevronRight, FaPrint, FaTrashAlt, FaDownload, FaMicroscope } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Assessments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState(null);
  
  const previousAsms = [
    { id: 'ASM-901', patient: 'Alice Johnson', type: 'Initial Intake Protocol', date: 'Mar 15, 2026', score: '84/100', practitioner: 'Dr. Gregory House', status: 'Validated', node: 'Primary Care' },
    { id: 'ASM-902', patient: 'Bob Smith', type: 'Post-Op Balance Node', date: 'Mar 12, 2026', score: 'Level 4.2', practitioner: 'Dr. James Wilson', status: 'Preliminary', node: 'Neuro-Rehab' },
    { id: 'ASM-903', patient: 'Charlie Brown', type: 'Range of Motion (Kinematic)', date: 'Mar 10, 2026', score: 'Improved +15%', practitioner: 'Sarah Miller, PT', status: 'Validated', node: 'Orthopedic' },
    { id: 'ASM-904', patient: 'Diana Prince', type: 'Cardio Stress Framework', date: 'Mar 08, 2026', score: 'Normal Range', practitioner: 'Dr. Stephen Strange', status: 'Audited', node: 'Cardiovascular' },
  ];

  const handleAction = (action, asm) => {
    alert(`System Optimization: Initiating "${action}" for Assessment Node ${asm ? asm.id : 'Synchronization'}.`);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Assessment Laboratory</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Execute standardized testing protocols and track longitudinal progress benchmarks.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Global Analytics Export')} leftIcon={<FaChartLine />}>Growth Analytics</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsModalOpen(true)} leftIcon={<FaPlus />}>Initialize Protocol</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Protocols Executed', count: '1,284', delta: '+12% Δ', icon: <FaCalendarCheck />, color: 'blue' },
          { label: 'Avg Performance', count: '92.4', delta: 'Standardized', icon: <FaStar />, color: 'amber' },
          { label: 'Scientific Nodes', count: '42 Active', delta: 'Audited', icon: <FaFlask />, color: 'emerald' },
          { label: 'Benchmark Sync', count: 'Global', delta: 'Synchronized', icon: <FaHistory />, color: 'indigo' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:-translate-y-1 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(stat.icon, { size: 20 })}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 group-hover:text-slate-500 transition-colors">{stat.delta}</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60">{stat.label}</p>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.count}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-9 p-0 overflow-hidden border-none shadow-premium bg-white rounded-[40px]">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/20">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
               <FaClipboardList className="text-clinicPrimary" /> Longitudinal Result Matrix
            </h3>
            <div className="relative group/search min-w-[350px] w-full md:w-auto">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors" size={14}/>
              <input
                type="text"
                placeholder="Query patient assessment nodes..."
                className="block w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-slate-50/50 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] border-b border-slate-50">
                <tr>
                  <th className="px-10 py-6">Intelligence Protocol</th>
                  <th className="px-10 py-6">Patient Identifier</th>
                  <th className="px-10 py-6">Temporal Sync</th>
                  <th className="px-10 py-6 text-center">Score / Metric</th>
                  <th className="px-10 py-6 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {previousAsms.map(asm => (
                  <tr key={asm.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => setActiveProtocol(asm)}>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className="w-3 h-3 rounded-full bg-clinicPrimary shadow-[0_0_15px_rgba(46,167,184,0.4)] group-hover:scale-150 transition-transform"></div>
                          <div>
                            <p className="text-[14px] font-black text-slate-900 tracking-tight leading-none group-hover:text-clinicPrimary transition-colors uppercase">{asm.type}</p>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">{asm.node} • {asm.status}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-clinicPrimary group-hover:border-clinicPrimary/20 group-hover:bg-white transition-all shadow-soft font-black text-[12px]">
                             {asm.patient.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                             <p className="text-[14px] font-black text-slate-800 leading-none">{asm.patient}</p>
                             <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{asm.practitioner}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[12px] font-bold text-slate-400 uppercase tracking-widest">{asm.date}</td>
                    <td className="px-10 py-8">
                       <div className="mx-auto w-fit bg-white px-6 py-2.5 rounded-[18px] text-[13px] font-black text-slate-900 shadow-premium border border-slate-50 transition-all group-hover:border-clinicPrimary group-hover:scale-105 active:scale-95" onClick={(e) => { e.stopPropagation(); handleAction('Score Recalibration', asm); }}>
                          {asm.score}
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Print Protocol', asm); }}>
                             <FaPrint size={14}/>
                          </button>
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Delete Record', asm); }}>
                             <FaTrashAlt size={14}/>
                          </button>
                          <button className="w-10 h-10 rounded-xl bg-clinicPrimary text-white shadow-google flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                             <FaChevronRight size={12}/>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-8">
           <Card className="p-10 bg-slate-900 border-none shadow-2xl relative overflow-hidden group rounded-[40px]">
              <FaFlask className="absolute -right-12 -bottom-12 text-white/5 text-[240px] rotate-12 transition-transform group-hover:rotate-6 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.25em] mb-10 relative z-10 flex items-center gap-4">
                 <FaFlask /> Protocol Library
              </h3>
              <div className="space-y-4 relative z-10">
                 {[
                   { name: 'Kinematic Analysis', time: '15m', icon: <FaChartLine /> },
                   { name: 'Gait Intelligence', time: '20m', icon: <FaMicroscope /> },
                   { name: 'Muscular Sync', time: '10m', icon: <FaHistory /> },
                   { name: 'FCE Architecture', time: '45m', icon: <FaClipboardList /> },
                 ].map(lib => (
                   <button key={lib.name} onClick={() => handleAction('Execute Template', { id: lib.name })} className="w-full flex items-center justify-between p-6 bg-white/5 rounded-[28px] border border-white/5 hover:bg-white/10 transition-all text-left group/lib border-l-4 border-l-transparent hover:border-l-clinicPrimary shadow-soft">
                      <div className="flex items-center gap-5">
                         <span className="text-white/20 group-hover/lib:text-clinicPrimary group-hover/lib:scale-110 transition-all">{lib.icon}</span>
                         <span className="text-[13px] font-bold text-white/90 tracking-tight group-hover/lib:text-white transition-colors">{lib.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">{lib.time}</span>
                   </button>
                 ))}
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium flex items-center gap-6 group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('System Version Detail')}>
              <div className="w-16 h-16 rounded-[24px] bg-blue-50 flex items-center justify-center text-clinicPrimary font-black text-2xl border border-blue-100 shadow-soft group-hover:scale-110 transition-transform">
                 08
              </div>
              <div>
                 <p className="text-[14px] font-black text-slate-900 uppercase tracking-tight leading-none mb-2">Protocol Updates</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scientific Version 4.0.2</p>
              </div>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Initialize Diagnostic Protocol"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Abort Sequence</Button>
            <Button variant="accent" onClick={() => { setIsModalOpen(false); handleAction('Protocol Live Session'); }} leftIcon={<FaPlus />}>Initialize Live Session</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 font-sans text-left">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Assessment Node</label>
              <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer">
                 <option>Initial Intake Protocol</option>
                 <option>Range of Motion - Kinematic Branch</option>
                 <option>Sports Recovery Analytics</option>
                 <option>Neuro-Cognitive Audit</option>
              </select>
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Personnel Identity</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" placeholder="e.g. Alice Johnson (PID-102)" />
           </div>
           <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-relaxed">System Note: Initializing a protocol will trigger real-time data ingestion nodes and professional compliance tracking.</p>
           </div>
        </div>
      </Modal>

      {activeProtocol && (
        <Modal 
          isOpen={!!activeProtocol} 
          onClose={() => setActiveProtocol(null)}
          title="Diagnostic Node Overview"
          footer={
            <div className="flex gap-4 justify-end w-full px-2">
              <Button variant="secondary" onClick={() => setActiveProtocol(null)}>Close Dossier</Button>
              <Button variant="accent" onClick={() => handleAction('Full Report Download', activeProtocol)} leftIcon={<FaDownload />}>Export Comprehensive Audit</Button>
            </div>
          }
        >
          <div className="space-y-8 p-4 text-left">
             <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-premium border border-slate-200 flex items-center justify-center text-clinicPrimary font-black text-2xl">
                   {activeProtocol.score.split('/')[0] || 'A+'}
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{activeProtocol.type}</h4>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">{activeProtocol.patient} • Verified {activeProtocol.date}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Audit Result', value: activeProtocol.score, color: 'emerald' },
                  { label: 'Validation Status', value: activeProtocol.status, color: 'blue' },
                  { label: 'Practitioner', value: activeProtocol.practitioner, color: 'indigo' },
                  { label: 'System Node', value: activeProtocol.node, color: 'rose' }
                ].map(item => (
                  <div key={item.label} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-soft">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                     <p className={`text-[14px] font-black text-${item.color}-500 uppercase tracking-tight`}>{item.value}</p>
                  </div>
                ))}
             </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Assessments;
