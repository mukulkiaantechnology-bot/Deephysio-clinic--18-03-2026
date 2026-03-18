import React, { useState } from 'react';
import { FaFileSignature, FaCheckCircle, FaClock, FaExclamationCircle, FaSearch, FaFilter, FaPlus, FaCloudDownloadAlt, FaShieldAlt, FaHistory, FaCheck, FaTimes, FaExternalLinkAlt, FaTrashAlt, FaPrint, FaSignature, FaLock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const FormConsent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeConsent, setActiveConsent] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const forms = [
    { id: 'CON-101', name: 'General Treatment Protocol', version: 'v2.4.1', signed: 1204, pending: 12, status: 'Active Node', compliance: '99.2%', risk: 'Low' },
    { id: 'CON-102', name: 'Surgical Intervention Framework', version: 'v1.1.0', signed: 84, pending: 2, status: 'Active Node', compliance: '97.6%', risk: 'Moderate' },
    { id: 'CON-103', name: 'Data Sovereignty (GDPR-X)', version: 'v3.0.2', signed: 2402, pending: 45, status: 'Audited Node', compliance: '100%', risk: 'Critical' },
    { id: 'CON-104', name: 'Telehealth Strategy Consent', version: 'v1.0.5', signed: 450, pending: 18, status: 'Active Node', compliance: '95.9%', risk: 'Low' },
  ];

  const handleAction = (action, item) => {
    alert(`Security Protocol: Initiating "${action}" for Consent Node ${item ? item.id : 'Cluster'}. System audit synchronized.`);
  };

  const runSmartAudit = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      alert('Security Audit Complete: All clinical consent frameworks are synchronized with jurisdictional legal nodes. Compliance index: 98.4%.');
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Consent Authorization Core</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Legally binding signature workflows and clinical compliance auditing.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-10 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Global Audit Export')} leftIcon={<FaHistory />}>Audit Logs</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsModalOpen(true)} leftIcon={<FaPlus />}>Draft Protocol</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Validated Protocols', count: '12,402', delta: '+4.2% Δ', icon: <FaCheckCircle />, color: 'emerald' },
          { label: 'Pending Signature', count: '142', delta: 'Requires Node Sync', icon: <FaClock />, color: 'amber' },
          { label: 'Active Frameworks', count: '24', delta: 'v4.0.2 Protocol', icon: <FaShieldAlt />, color: 'blue' },
          { label: 'Compliance Index', count: '98.4%', delta: 'Optimum Yield', icon: <FaLock />, color: 'indigo' }
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
               <FaFileSignature className="text-clinicPrimary" /> Document Repository Node
            </h3>
            <div className="relative group/search min-w-[350px] w-full md:w-auto">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors" size={14}/>
              <input
                type="text"
                placeholder="Filter legal nodes by protocol name..."
                className="block w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[950px]">
              <thead className="bg-slate-50/50 text-slate-400 font-black text-[10px] uppercase tracking-[0.25em] border-b border-slate-50">
                <tr>
                  <th className="px-10 py-6">Protocol Subject</th>
                  <th className="px-10 py-6">Revision</th>
                  <th className="px-10 py-6 text-center">Validated Tags</th>
                  <th className="px-10 py-6 text-center">Yield Result</th>
                  <th className="px-10 py-6">Compliance Node</th>
                  <th className="px-10 py-6 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {forms.map(form => (
                  <tr key={form.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-clinicPrimary" onClick={() => setActiveConsent(form)}>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-white shadow-premium text-clinicPrimary flex items-center justify-center border border-slate-50 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                             <FaFileSignature size={20}/>
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-slate-900 tracking-tight leading-none group-hover:text-clinicPrimary transition-colors uppercase">{form.name}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{form.id} • RISK: <span className={form.risk === 'Critical' ? 'text-rose-500' : 'text-slate-400'}>{form.risk}</span></p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[12px] font-bold text-slate-400 uppercase tracking-widest">{form.version}</td>
                    <td className="px-10 py-8 text-center text-[15px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors">{form.signed}</td>
                    <td className="px-10 py-8 text-center">
                       <span className={`text-[13px] font-black ${form.pending > 20 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>{form.pending} PENDING</span>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-300 shadow-soft ${form.status === 'Active Node' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-500 border-blue-100'}`}>{form.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Download Batch PDF', form); }}>
                             <FaCloudDownloadAlt size={14}/>
                          </button>
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 hover:border-indigo-100 hover:shadow-google transition-all flex items-center justify-center active:scale-90" onClick={(e) => { e.stopPropagation(); handleAction('Modify Protocol revision', form); }}>
                             <FaFilter size={14}/>
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
          <Card className="p-10 bg-slate-900 border-none shadow-2xl flex flex-col items-center text-center group relative overflow-hidden rounded-[40px]">
             <div className="relative z-10 w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                <FaShieldAlt className={`${isValidating ? 'text-emerald-400 animate-spin-slow' : 'text-clinicPrimary'}`} size={32}/>
             </div>
             <div className="relative z-10">
                <h3 className="text-xl font-black text-white tracking-tighter uppercase mb-3">Logic Intelligence</h3>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-10 opacity-60">Deploy autonomous legal logic to validate clinical consent frameworks.</p>
                <Button 
                  variant="accent" 
                  className="w-full h-14 rounded-[20px] shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
                  onClick={runSmartAudit}
                  disabled={isValidating}
                >
                  {isValidating ? 'Synchronizing Node...' : 'Initialize Smart Audit'}
                </Button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
          </Card>
          
          <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-google transition-all rounded-[40px]">
             <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 flex items-center gap-4">
                <FaCloudDownloadAlt className="text-clinicPrimary" /> Core Operations
             </h4>
             <div className="space-y-4">
                {[
                  { label: 'Export Global Archive', icon: <FaCloudDownloadAlt /> },
                  { label: 'Bulk Protocol Lock', icon: <FaLock /> },
                  { label: 'System Recovery Log', icon: <FaHistory /> }
                ].map(op => (
                  <button key={op.label} onClick={() => handleAction('Operational Sync', { id: op.label })} className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-[24px] text-[12px] font-black text-slate-600 hover:bg-white hover:shadow-premium border border-transparent hover:border-slate-100 transition-all group/btn active:scale-95">
                     <span className="flex items-center gap-4 uppercase tracking-tight leading-none text-left">
                       <span className="text-slate-300 group-hover/btn:text-clinicPrimary transition-colors">{op.icon}</span>
                       {op.label}
                     </span>
                     <FaCheck className="text-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                ))}
             </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Draft Legal Framework Protocol"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Discard Framework</Button>
            <Button variant="accent" onClick={() => { setIsModalOpen(false); handleAction('Finalize Protocol Draft'); }} leftIcon={<FaPlus />}>Authorize Draft</Button>
          </div>
        }
      >
        <div className="space-y-8 p-4 text-left">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Institutional Alias</label>
              <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200" placeholder="e.g. Neurological Data Consent Model 2026" />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Substantive Regulatory Node</label>
              <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all cursor-pointer">
                 <option>GDPR-X Compliance Framework</option>
                 <option>Clinical Care Ethics Node</option>
                 <option>Financial Asset Sovereignty</option>
                 <option>Custom Strategic Protocol</option>
              </select>
           </div>
           <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 shadow-soft">
              <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.2em] leading-relaxed">Legal Warning: New protocols require secondary verification by the Institutional Compliance Officer before synchronization.</p>
           </div>
        </div>
      </Modal>

      {activeConsent && (
        <Modal 
          isOpen={!!activeConsent} 
          onClose={() => setActiveConsent(null)}
          title="Consent Node Auditor"
          footer={
            <div className="flex gap-4 justify-end w-full px-2">
              <Button variant="secondary" onClick={() => setActiveConsent(null)}>Abort Audit</Button>
              <Button variant="accent" onClick={() => handleAction('Protocol Verification', activeConsent)} leftIcon={<FaCheckCircle />}>Verify Node Integrity</Button>
            </div>
          }
        >
          <div className="space-y-8 p-4 text-left font-sans">
             <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner-soft">
                <div className="w-24 h-24 bg-white rounded-[32px] shadow-premium flex items-center justify-center text-clinicPrimary font-black text-3xl border border-slate-50 rotate-3 transform hover:rotate-0 transition-transform duration-500">
                   {activeConsent.compliance.split('%')[0]}
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">{activeConsent.name}</h4>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{activeConsent.id} • REVISION {activeConsent.version}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Validated Nodes', value: activeConsent.signed, icon: <FaCheckCircle />, color: 'emerald' },
                  { label: 'Neural Risk', value: activeConsent.risk, icon: <FaExclamationCircle />, color: 'rose' },
                  { label: 'Audit Status', value: activeConsent.status, icon: <FaShieldAlt />, color: 'blue' },
                  { label: 'Temporal Node', value: 'SYNCHRONIZED', icon: <FaClock />, color: 'indigo' }
                ].map(item => (
                  <div key={item.label} className="p-6 bg-white border border-slate-50 rounded-[28px] shadow-soft group/card hover:shadow-google transition-all cursor-pointer">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                       <span className={`text-${item.color}-500 opacity-60`}>{item.icon}</span> 
                       {item.label}
                     </p>
                     <p className={`text-[15px] font-black text-slate-800 uppercase tracking-tight`}>{item.value}</p>
                  </div>
                ))}
             </div>
             <div className="p-8 bg-slate-900 rounded-[32px] flex items-center justify-between group cursor-pointer" onClick={() => handleAction('Deep Signature Audit', activeConsent)}>
                <div>
                   <p className="text-[12px] font-bold text-white uppercase tracking-tight mb-1">Authenticated Signature Logic</p>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">MD5/SHA-256 Hash Verified</p>
                </div>
                <FaSignature className="text-clinicPrimary group-hover:scale-125 transition-transform" size={24}/>
             </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FormConsent;
