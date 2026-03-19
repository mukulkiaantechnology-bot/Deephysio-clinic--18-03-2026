import React, { useState } from 'react';
import { 
  FaNotesMedical, FaCheckCircle, FaExclamationTriangle, FaSearch, FaPlus, 
  FaFilter, FaFileMedicalAlt, FaHeartbeat, FaPills, FaUserShield, 
  FaNotesMedical as FaMedicalHistory, FaMicroscope, FaExclamationCircle,
  FaSkullCrossbones, FaMoon, FaThermometerHalf, FaBolt, FaAccessibleIcon, FaBriefcaseMedical
} from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HealthHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [redFlags, setRedFlags] = useState({
    weightLoss: false,
    nightPain: true, // Example active flag
    fever: false,
    bowelBladder: false,
    neuroWeakness: false,
    trauma: false
  });
  
  const records = [
    { id: 1, type: 'Pathological Node', value: 'Diabetes Type 2', date: 'Jan 2024', severity: 'Monitored State', impact: 'Moderate' },
    { id: 2, type: 'Immune Alert', value: 'Penicillin Compound', date: 'Critical Restriction', severity: 'Active Alert', impact: 'High' },
    { id: 3, type: 'Surgical Procedure', value: 'ACL Reconstruction', date: 'Oct 2021', severity: 'Healed Node', impact: 'Low' },
    { id: 4, type: 'Pharmaceutical Sync', value: 'Metformin HCl', date: 'Daily Protocol', severity: 'Optimized', impact: 'Standard' },
  ];

  const redFlagDetails = [
    { id: 'weightLoss', label: 'Unexplained Weight Loss', icon: <FaSkullCrossbones />, description: 'Sudden loss of 5kg+ in <3 months' },
    { id: 'nightPain', label: 'Constant Night Pain', icon: <FaMoon />, description: 'Pain that prevents sleep / non-mechanical' },
    { id: 'fever', label: 'Fever / Systemic Malaise', icon: <FaThermometerHalf />, description: 'Signs of infection or inflammatory condition' },
    { id: 'bowelBladder', label: 'Bowel/Bladder Dysfunction', icon: <FaBolt />, description: 'Cauda Equina / Neurological emergency' },
    { id: 'neuroWeakness', label: 'Severe Neurological Weakness', icon: <FaAccessibleIcon />, description: 'Foot drop, saddle anaesthesia, etc.' },
    { id: 'trauma', label: 'Recent Significant Trauma', icon: <FaBriefcaseMedical />, description: 'Falls, MVA, or high-velocity impact' },
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Active Alert': return 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-500/10';
      case 'Monitored State': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10';
      case 'Optimized': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/10';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const toggleRedFlag = (id) => {
    setRedFlags(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      {/* Header section with Red Flag Alert Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col justify-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase mb-4">Clinical Intelligence</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] opacity-70">Audit chronic conditions, pathological alerts, and historical clinical interventions.</p>
        </div>
        <div className="lg:col-span-4 flex items-center justify-end gap-4">
            <Button variant="secondary" size="lg" className="rounded-[20px] h-14 px-8 border-none shadow-premium hover:shadow-google transition-all text-[11px] font-black uppercase tracking-widest" leftIcon={<FaMicroscope />}>Audit Node</Button>
            <Button variant="accent" size="lg" className="rounded-[20px] h-14 px-8 shadow-google text-[11px] font-black uppercase tracking-widest" leftIcon={<FaPlus />}>Manual Entry</Button>
        </div>
      </div>

      {/* Red Flag Screening Section - HIGH PRIORITY */}
      <Card className="p-10 border-2 border-rose-100 shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between border-b border-rose-50 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-[24px] bg-rose-500 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(244,63,94,0.3)] group-hover:rotate-12 transition-all">
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] leading-none mb-2">Red Flag Screening Grid</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mandatory clinical safety clearance partition</p>
                    </div>
                </div>
                {Object.values(redFlags).some(v => v) && (
                    <span className="px-5 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg flex items-center gap-2">
                        <FaSkullCrossbones size={10} /> Active Danger Node Detected
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redFlagDetails.map(flag => (
                    <div 
                        key={flag.id} 
                        onClick={() => toggleRedFlag(flag.id)}
                        className={`p-6 rounded-[28px] border transition-all cursor-pointer group/flag flex items-start gap-5 ${
                            redFlags[flag.id] 
                            ? 'bg-rose-50 border-rose-200 shadow-inner' 
                            : 'bg-white border-slate-100 hover:border-rose-100 hover:bg-rose-50/20'
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            redFlags[flag.id] ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-50 text-slate-300 group-hover/flag:text-rose-400'
                        }`}>
                            {flag.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className={`text-[12px] font-black uppercase tracking-tight mb-1.5 ${redFlags[flag.id] ? 'text-rose-600' : 'text-slate-900'}`}>{flag.label}</h4>
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase opacity-70 tracking-widest">{flag.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            redFlags[flag.id] ? 'bg-rose-500 border-rose-500 text-white' : 'bg-transparent border-slate-100'
                        }`}>
                            {redFlags[flag.id] && <FaCheckCircle size={10}/>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: 'Critical Pathologies', count: Object.values(redFlags).filter(v=>v).length + ' Alerts', status: 'System Overload', icon: <FaExclamationCircle />, color: 'rose' },
          { label: 'Active Protocols', count: '8 Medications', status: 'In Sync', icon: <FaPills />, color: 'blue' },
          { label: 'Clinical Integrity', count: '94% Valid', status: 'Audit Pending', icon: <FaUserShield />, color: 'emerald' },
          { label: 'Health Index', count: 'Fluctuating', status: 'Variable Trend', icon: <FaHeartbeat />, color: 'clinicPrimary' }
        ].map((stat, i) => (
          <Card key={i} className={`p-8 border-none shadow-premium bg-white group hover:shadow-google hover:-translate-y-1 transition-all ${stat.color === 'rose' && Object.values(redFlags).some(v=>v) ? 'border-l-4 border-rose-500 bg-rose-50/20' : ''}`}>
             <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl bg-${stat.color === 'clinicPrimary' ? 'blue-50' : stat.color + '-50'} text-${stat.color === 'clinicPrimary' ? 'blue-500' : stat.color + '-500'} group-hover:scale-110 transition-transform`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none opacity-60">{stat.label}</p>
                   <p className="text-[14px] font-black text-slate-900 tracking-tight">{stat.count}</p>
                </div>
             </div>
             <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border w-full block text-center transition-all ${
                stat.color === 'rose' && Object.values(redFlags).some(v=>v) ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-50 border-slate-100 text-slate-400'
             }`}>{stat.status}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-9 p-0 overflow-hidden border-none shadow-premium bg-white rounded-[40px]">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
               <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Longitudinal Medical Ledger
            </h3>
            <div className="relative group/search flex-1 max-w-[400px]">
              <span className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors">
                <FaSearch size={14}/>
              </span>
              <input
                type="text"
                placeholder="Filter bio-history nodes..."
                className="block w-full pl-16 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft placeholder:text-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] border-b border-slate-50">
                  <th className="px-10 py-6">Intelligence Class</th>
                  <th className="px-10 py-6">Analytical Description</th>
                  <th className="px-10 py-6">Temporal Node</th>
                  <th className="px-10 py-6 text-center">Threat Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer">
                    <td className="px-10 py-8">
                       <span className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 group-hover:bg-clinicPrimary/5 group-hover:border-clinicPrimary/20 group-hover:text-clinicPrimary transition-all">{record.type}</span>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[15px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors tracking-tight leading-none">{record.value}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Functional Impact: {record.impact}</p>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{record.date}</span>
                    </td>
                    <td className="px-10 py-8 text-center uppercase">
                       <div className={`mx-auto w-fit px-4 py-2 rounded-xl text-[10px] font-black tracking-widest border transition-all duration-300 shadow-soft ${getSeverityStyle(record.severity)}`}>
                          {record.severity}
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                          <Button variant="secondary" size="icon" className="h-10 w-10 border border-slate-100 shadow-premium active:scale-90"><FaFilter size={12}/></Button>
                          <Button variant="secondary" size="icon" className="h-10 w-10 border border-slate-100 shadow-premium active:scale-90"><FaPlus size={12}/></Button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-3 p-10 bg-slate-900 border-none shadow-2xl flex flex-col items-center text-center group relative overflow-hidden rounded-[40px]">
           <div className="relative z-10 w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-glass group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <FaFileMedicalAlt className="text-clinicPrimary" size={32}/>
           </div>
           <div className="relative z-10">
              <h3 className="text-xl font-black text-white tracking-widest uppercase mb-4 opacity-90">Integrity Check</h3>
              <p className="text-[11px] text-slate-400 font-bold leading-relaxed mb-10 uppercase tracking-widest opacity-60">Verified clinical benchmark clearance nodes enabled.</p>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md mb-10">
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[.25em] flex items-center justify-center gap-3">
                    <FaCheckCircle size={14} className="animate-pulse" /> Finalised v2.0
                 </p>
              </div>
              <Button variant="accent" className="w-full h-14 rounded-2xl shadow-google font-black text-[11px] uppercase tracking-widest active:scale-95 transition-all">Audit Vault</Button>
           </div>
           <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
        </Card>
      </div>
    </div>
  );
};

export default HealthHistory;
