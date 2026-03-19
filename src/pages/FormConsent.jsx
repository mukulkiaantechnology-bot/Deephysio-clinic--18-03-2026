import React, { useState } from 'react';
import { 
  FaFileSignature, FaCheckCircle, FaClock, FaExclamationCircle, FaSearch, 
  FaFilter, FaPlus, FaCloudDownloadAlt, FaShieldAlt, FaHistory, FaCheck, 
  FaTimes, FaExternalLinkAlt, FaTrashAlt, FaPrint, FaSignature, FaLock,
  FaFileInvoice, FaLaptopMedical, FaUserSecret, FaBriefcaseMedical, FaChevronRight
} from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const FormConsent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeConsent, setActiveConsent] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const forms = [
    { 
        id: 'CON-001', 
        name: 'General Clinical Consent', 
        category: 'Legal Core',
        version: 'v4.2.1', 
        status: 'Active', 
        compliance: '100%', 
        risk: 'Low',
        sections: [
            { title: 'Treatment Agreement', content: 'Consent to physical assessment and manual therapy procedures.' },
            { title: 'Privacy Policy', content: 'GDPR-compliant data handling and clinical record sovereignty.' }
        ]
    },
    { 
        id: 'CON-002', 
        name: 'Telehealth Strategy Protocol', 
        category: 'Virtual Mesh',
        version: 'v2.1.0', 
        status: 'Active', 
        compliance: '98.5%', 
        risk: 'Moderate',
        sections: [
            { title: 'Online Limitations', content: 'Acknowledgment of diagnostic limitations in remote assessment nodes.' },
            { title: 'Emergency Disclaimer', content: 'Protocol for acute incidents during virtual clinical sessions.' },
            { title: 'Privacy Risks', content: 'Encryption standards and digital signal security awareness.' }
        ]
    },
    { 
        id: 'CON-003', 
        name: 'Clinical Risk Disclosure', 
        category: 'Safety Node',
        version: 'v3.0.5', 
        status: 'Under Review', 
        compliance: '95%', 
        risk: 'High',
        sections: [
            { title: 'General Risks', content: 'Post-treatment soreness, bruising, or temporary symptom exacerbation.' },
            { title: 'Specific Procedures', content: 'Informed consent for high-velocity thrust techniques (HVT).' }
        ]
    }
  ];

  const handleAction = (action, item) => {
    alert(`Security Protocol: Initiating "${action}" for Consent Node ${item ? item.id : 'Cluster'}.`);
  };

  const runSmartAudit = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      alert('Security Audit Complete: Clinical consent frameworks synchronized with global legal nodes.');
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      {/* Header section */}
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Consent Authorization</h1>
          <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-[11px] opacity-70">LEGALLY BINDING CLINICAL SIGNATURE WORKFLOWS & COMPLIANCE NODES</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[20px] h-14 px-10 border-none shadow-premium hover:shadow-google transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Global Audit Export')} leftIcon={<FaHistory />}>Audit Logs</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[20px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsModalOpen(true)} leftIcon={<FaPlus />}>Draft Protocol</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Validated Protocols', count: '1,242', icon: <FaCheckCircle />, color: 'emerald' },
          { label: 'Pending Signature', count: '18', icon: <FaClock />, color: 'amber' },
          { label: 'Active Frameworks', count: '12', icon: <FaShieldAlt />, color: 'blue' },
          { label: 'Compliance Index', count: '100%', icon: <FaLock />, color: 'indigo' }
        ].map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:-translate-y-1 transition-all rounded-[32px]">
             <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(stat.icon, { size: 18 })}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Protocol v4.0</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60">{stat.label}</p>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.count}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-9 p-0 overflow-hidden border-none shadow-premium bg-white rounded-[40px]">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/10">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
               <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Document Repository Node
            </h3>
            <div className="relative group/search min-w-[350px] w-full md:w-auto">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors" size={14}/>
              <input
                type="text"
                placeholder="Filter legal nodes..."
                className="block w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200"
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
                  <th className="px-10 py-6 text-center">Threat Risk</th>
                  <th className="px-10 py-6">Compliance Node</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {forms.map(form => (
                  <tr key={form.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer" onClick={() => setActiveConsent(form)}>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-6">
                          <div className={`w-14 h-14 rounded-2xl bg-white shadow-premium flex items-center justify-center border border-slate-50 group-hover:scale-110 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500 ${form.category === 'Virtual Mesh' ? 'text-blue-500' : 'text-clinicPrimary'}`}>
                             {form.category === 'Virtual Mesh' ? <FaLaptopMedical size={20}/> : <FaFileSignature size={20}/>}
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-slate-900 tracking-tight leading-none group-hover:text-clinicPrimary transition-colors uppercase">{form.name}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{form.id} • {form.category}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[12px] font-black text-slate-400 uppercase tracking-widest">{form.version}</td>
                    <td className="px-10 py-8 text-center">
                        <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                            form.risk === 'High' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                        }`}>{form.risk} Level</span>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-300 shadow-soft ${form.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-500 border-amber-100'}`}>{form.status}</span>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                          <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-blue-500 hover:shadow-google transition-all flex items-center justify-center"><FaPrint size={14}/></button>
                          <button className="w-12 h-12 rounded-xl bg-clinicPrimary text-white shadow-google flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                             <FaChevronRight size={14}/>
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
             <div className="relative z-10 w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center mb-10 border border-white/10 shadow-glass transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                <FaShieldAlt className={`${isValidating ? 'text-emerald-400 animate-pulse' : 'text-clinicPrimary'}`} size={32}/>
             </div>
             <div className="relative z-10">
                <h3 className="text-xl font-black text-white tracking-widest uppercase mb-4 opacity-90">Auth Intel</h3>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-10 opacity-60">Deploy autonomous logic to validate clinical consent frameworks.</p>
                <Button 
                  variant="accent" 
                  className="w-full h-14 rounded-[20px] shadow-google text-[11px] font-black uppercase tracking-widest"
                  onClick={runSmartAudit}
                  disabled={isValidating}
                >
                  {isValidating ? 'Initialising Sync...' : 'Smart Audit'}
                </Button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
          </Card>
        </div>
      </div>

      {activeConsent && (
        <Modal 
          isOpen={!!activeConsent} 
          onClose={() => setActiveConsent(null)}
          title="Consent Node Detail Audit"
          footer={
            <div className="flex gap-4 justify-end w-full px-2">
              <Button variant="secondary" onClick={() => setActiveConsent(null)}>Abort Audit</Button>
              <Button variant="accent" onClick={() => { handleAction('Protocol Verification', activeConsent); setActiveConsent(null); }} leftIcon={<FaCheckCircle />}>Verify Integrity</Button>
            </div>
          }
        >
          <div className="space-y-8 p-4 text-left font-sans transition-all">
             <div className="flex items-center gap-8 p-8 bg-slate-50 rounded-[40px] border border-slate-100 border-dashed">
                <div className="w-20 h-20 bg-white rounded-[24px] shadow-premium flex items-center justify-center text-clinicPrimary font-black text-3xl">
                   {activeConsent.compliance.split('%')[0]}
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{activeConsent.name}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeConsent.id} • REVISION {activeConsent.version}</p>
                </div>
             </div>
             
             <div className="space-y-6">
                <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Substantive Clauses</h5>
                <div className="grid grid-cols-1 gap-4">
                    {activeConsent.sections.map((section, idx) => (
                        <div key={idx} className="p-6 bg-white border border-slate-100 rounded-[28px] shadow-soft hover:shadow-premium transition-all">
                            <h6 className="text-[13px] font-black text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> {section.title}
                            </h6>
                            <p className="text-[12px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest opacity-80">{section.content}</p>
                        </div>
                    ))}
                </div>
             </div>

             <div className="p-8 bg-slate-900 rounded-[32px] flex items-center justify-between group cursor-pointer" onClick={() => handleAction('Deep Signature Audit', activeConsent)}>
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-clinicPrimary"><FaSignature size={20}/></div>
                   <div>
                    <p className="text-[12px] font-black text-white uppercase tracking-tight mb-1">Authenticated Signature Logic</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">v4.4 Protocol Encryption Activated</p>
                   </div>
                </div>
                <FaLock className="text-white/20" size={18}/>
             </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FormConsent;
