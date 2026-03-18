import React, { useState } from 'react';
import { FaNotesMedical, FaCheckCircle, FaExclamationTriangle, FaSearch, FaPlus, FaFilter, FaFileMedicalAlt, FaHeartbeat, FaPills, FaUserShield, FaNotesMedical as FaMedicalHistory, FaMicroscope, FaExclamationCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HealthHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const records = [
    { id: 1, type: 'Pathological Node', value: 'Diabetes Type 2', date: 'Jan 2024', severity: 'Monitored State', impact: 'Moderate' },
    { id: 2, type: 'Immune Alert', value: 'Penicillin Compound', date: 'Critical Restriction', severity: 'Active Alert', impact: 'High' },
    { id: 3, type: 'Surgical Procedure', value: 'ACL Reconstruction', date: 'Oct 2021', severity: 'Healed Node', impact: 'Low' },
    { id: 4, type: 'Pharmaceutical Sync', value: 'Metformin HCl', date: 'Daily Protocol', severity: 'Optimized', impact: 'Standard' },
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Active Alert': return 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-500/10';
      case 'Monitored State': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10';
      case 'Optimized': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/10';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Intelligence</h1>
          <p className="text-slate-500 font-medium mt-1">Audit chronic conditions, pathological alerts, and historical clinical interventions.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <Button variant="secondary" size="lg" className="rounded-2xl h-14 px-8 border-none shadow-premium hover:shadow-glass hover:-translate-y-1" leftIcon={<FaMicroscope />}>Audit Diagnostics</Button>
           <Button variant="accent" size="lg" className="rounded-2xl h-14 px-8 shadow-lg " leftIcon={<FaPlus />}>Log Clinical Entry</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Critical Pathologies', count: '2 Alerts', status: 'Requires Review', icon: <FaExclamationCircle />, color: 'rose' },
          { label: 'Active Protocols', count: '8 Medications', status: 'Synchronized', icon: <FaPills />, color: 'blue' },
          { label: 'Clinical Integrity', count: '100% Valid', status: 'Audited Status', icon: <FaUserShield />, color: 'emerald' },
          { label: 'Health Index', count: 'Optimum', status: 'Stable Trend', icon: <FaHeartbeat />, color: 'clinicPrimary' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:shadow-glass hover:-translate-y-1 transition-all">
             <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-${stat.color === 'clinicPrimary' ? 'blue-50' : stat.color + '-50'} text-${stat.color === 'clinicPrimary' ? 'blue-500' : stat.color + '-500'} transition-all group-hover:scale-110`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 opacity-60">{stat.label}</p>
                   <p className="text-[13px] font-bold text-slate-900 tracking-tight">{stat.count}</p>
                </div>
             </div>
             <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-slate-600 transition-colors w-full block text-center">{stat.status}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-9 p-0 overflow-hidden border-none shadow-premium bg-white">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white relative overflow-hidden group">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
               <FaMedicalHistory className="text-clinicPrimary" /> Longitudinal Health Data
            </h3>
            <div className="relative group/search min-w-[350px]">
              <span className="absolute inset-y-0 left-5 flex items-center text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors">
                <FaSearch size={14}/>
              </span>
              <input
                type="text"
                placeholder="Filter medical history nodes..."
                className="block w-full pl-14 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="px-10 py-6">Intelligence Class</th>
                  <th className="px-10 py-6">Analytical Description</th>
                  <th className="px-10 py-6">Temporal Node / Flow</th>
                  <th className="px-10 py-6 text-center">Threat Severity</th>
                  <th className="px-10 py-6 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-clinicPrimary">
                    <td className="px-10 py-8">
                       <span className="px-4 py-1.5 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-100 group-hover:bg-white group-hover:border-clinicPrimary group-hover:text-clinicPrimary transition-all">{record.type}</span>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[15px] font-bold text-slate-900 tracking-tight group-hover:text-clinicPrimary transition-colors">{record.value}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Impact Level: {record.impact}</p>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em]">{record.date}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className={`mx-auto w-fit px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 shadow-sm ${getSeverityStyle(record.severity)}`}>
                          {record.severity}
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass"><FaFilter size={12}/></Button>
                          <Button variant="secondary" size="icon" className="h-10 w-10 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass"><FaPlus size={12}/></Button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="lg:col-span-3">
           <Card className="p-10 bg-slate-900 border-none shadow-2xl flex flex-col items-center text-center group relative overflow-hidden h-full">
              <div className="relative z-10 w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-2xl transform group-hover:rotate-12 transition-transform duration-700">
                 <FaFileMedicalAlt className="text-clinicPrimary" size={32}/>
              </div>
              <div className="relative z-10">
                 <h3 className="text-xl font-bold text-white tracking-tight mb-4">Integrity Verification</h3>
                 <p className="text-[13px] text-slate-400 font-medium leading-relaxed mb-10">Historical medical data has been authenticated against clinical benchmarks by MD-certified nodes.</p>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner-soft group-hover:bg-white/10 transition-colors mb-8">
                    <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-[.25em] flex items-center justify-center gap-3">
                       <FaCheckCircle size={14} className="animate-pulse" /> Validated Status
                    </p>
                 </div>
                 <Button variant="accent" className="w-full h-14 rounded-2xl shadow-lg  transform active:scale-95 transition-all font-bold">Resync Intelligence</Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none opacity-50 group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;
