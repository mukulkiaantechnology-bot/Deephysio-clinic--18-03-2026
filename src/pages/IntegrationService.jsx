import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSyncAlt, FaCog, FaCheckCircle, FaExclamationTriangle, FaChevronRight, FaPlus, FaGoogle, FaEnvelope, FaStripe, FaPaypal, FaChartBar, FaShieldAlt, FaHistory, FaCheck, FaTimes, FaLink, FaDatabase, FaLock, FaSync } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const IntegrationService = () => {
  const location = useLocation();
  const serviceSlug = location.pathname.split('/').pop();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const integrations = [
    { id: 'google', name: 'Google Workspace', type: 'Scheduling', status: 'Connected', icon: <FaGoogle />, color: 'text-red-500', desc: 'Sync clinical calendars and patient availability with Google Workspace Nodes.', throughput: '421 Syncs/Day' },
    { id: 'outlook', name: 'Microsoft 365', type: 'Scheduling', status: 'Inactive', icon: <FaEnvelope />, color: 'text-blue-500', desc: 'Synchronize Microsoft 365 clinical ecosystem and administrative mail.', throughput: '0 Syncs/Day' },
    { id: 'stripe', name: 'Stripe Financial', type: 'Billing', status: 'Connected', icon: <FaStripe />, color: 'text-indigo-500', desc: 'High-fidelity credit card orchestration and payment reconciliation.', throughput: '£12.4k Processed' },
    { id: 'paypal', name: 'PayPal Gateway', icon: <FaPaypal />, type: 'Billing', status: 'Connected', color: 'text-blue-600', desc: 'Secondary financial checkout stream with global clinical support.', throughput: '£2.1k Processed' },
    { id: 'quickbooks', name: 'QuickBooks Sync', icon: <FaDatabase />, type: 'Accounting', status: 'Inactive', color: 'text-green-600', desc: 'Automated ledger and invoice mirroring for financial compliance.', throughput: 'N/A' },
    { id: 'xero', name: 'Xero Accounting', icon: <FaDatabase />, type: 'Accounting', status: 'Connected', color: 'text-blue-400', desc: 'Direct bookkeeping synchronization and real-time ledger auditing.', throughput: 'Sync Balanced' },
  ];

  const currentService = integrations.find(i => i.id === serviceSlug) || integrations[0];

  const handleAction = (action) => {
    alert(`Integration Intelligence: Initiating "${action}" for ${currentService.name} Node. Handshake verified.`);
  };

  const runServiceSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert(`${currentService.name} Protocol Synchronized: Clinical nodes updated and verified.`);
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{currentService.name} Cluster</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Synchronize clinical data and optimize external node handshakes for peak operational density.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsConfigOpen(true)} leftIcon={<FaCog />}>Configure Node</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={runServiceSync} disabled={isSyncing} leftIcon={isSyncing ? null : <FaSync className={isSyncing ? 'animate-spin' : ''} />}>
             {isSyncing ? 'Synchronizing...' : 'Manual Handshake'}
           </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <Card className="p-10 bg-white border-none shadow-premium rounded-[40px] relative overflow-hidden group">
              <div className="flex flex-col md:flex-row items-center gap-10 mb-12 border-b border-slate-50 pb-12">
                 <div className={`w-24 h-24 rounded-[32px] bg-slate-50 flex items-center justify-center text-4xl shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${currentService.color}`}>
                    {currentService.icon}
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-4 mb-4 justify-center md:justify-start">
                       <span className="px-4 py-1.5 bg-clinicPrimary/5 text-clinicPrimary text-[9px] font-black uppercase tracking-widest rounded-xl border border-clinicPrimary/10 shadow-soft">
                          {currentService.type} Protocol
                       </span>
                       <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${currentService.status === 'Connected' ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {currentService.status === 'Connected' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                          {currentService.status}
                       </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4">{currentService.name} Protocol</h2>
                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-2xl">{currentService.desc}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Latency Node', val: '124ms', sub: 'Verified Handshake' },
                   { label: 'Daily Throughput', val: currentService.throughput, sub: 'Real-time Flow' },
                   { label: 'Security State', val: 'AES-256', sub: 'Active Encryption' },
                 ].map(metric => (
                   <div key={metric.label} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 group/metric hover:bg-white hover:shadow-premium transition-all">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{metric.label}</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter mb-1">{metric.val}</p>
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{metric.sub}</p>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium rounded-[40px] space-y-10">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-4">
                 <FaHistory className="text-clinicPrimary" /> Node Activity Ledger
              </h3>
              <div className="space-y-6">
                 {[
                   { event: 'Bi-directional Sync', status: 'Success', time: '12m ago', nodes: '12 Nodes' },
                   { event: 'OAuth Signature Renewal', status: 'Verified', time: '2h ago', nodes: 'System' },
                   { event: 'Payload Transmission', status: 'Success', time: '5h ago', nodes: '42 Fragments' },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-50 group hover:bg-white transition-all cursor-pointer">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-clinicPrimary">
                            <FaSyncAlt size={14} className="group-hover:rotate-180 transition-transform duration-700"/>
                         </div>
                         <div>
                            <p className="text-[15px] font-black text-slate-900 tracking-tighter uppercase leading-none mb-2">{log.event}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{log.time} • {log.nodes}</p>
                         </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-100">{log.status}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group rounded-[40px]">
              <FaShieldAlt className="absolute -right-16 -top-16 text-white/5 text-[280px] -rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.4em] mb-12 relative z-10 flex items-center gap-4">
                 <FaLock /> Security Perimeter
              </h3>
              <div className="space-y-10 relative z-10">
                 <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 space-y-8">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Sync Direction</p>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white uppercase tracking-tight">Bi-Directional</span>
                          <FaSyncAlt className="text-clinicPrimary" />
                       </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Data Sensitivity</p>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-white uppercase tracking-tight">HIPAA / GDPR</span>
                          <FaShieldAlt className="text-amber-500" />
                       </div>
                    </div>
                 </div>
                 <div className="p-8 bg-blue-500/10 rounded-[32px] border border-blue-500/20 relative z-10 group-hover:bg-blue-500/20 transition-all border-l-4 border-l-clinicPrimary shadow-soft">
                    <p className="text-[12px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest opacity-80 italic">
                      "All third-party handshakes are proxied through our clinical encryption node for maximum patient data sovereignty."
                    </p>
                 </div>
              </div>
           </Card>

           <Card className="p-10 bg-white border-none shadow-premium flex flex-col items-center text-center group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('Review Integration Manual')}>
              <div className="w-20 h-20 rounded-[30px] bg-slate-50 flex items-center justify-center text-clinicPrimary border border-slate-50 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                 <FaBrain size={28} />
              </div>
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-3">Neural Manual</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed opacity-60">Optimize trigger thresholds using historical synergy vectors.</p>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)}
        title={`Configure ${currentService.name} Cluster`}
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsConfigOpen(false)}>Abort Change</Button>
            <Button variant="accent" onClick={() => handleAction('Save Config Handshake')} leftIcon={<FaCheck />}>Commit Protocol</Button>
          </div>
        }
      >
        <div className="space-y-10 p-4 text-left font-sans">
           <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-8">
              <div className="flex items-center justify-between">
                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Enable Bi-Directional Sync</p>
                 <div className="w-14 h-8 bg-clinicPrimary rounded-full p-1 relative shadow-inner cursor-pointer">
                    <div className="w-6 h-6 bg-white rounded-full translate-x-6 transition-all shadow-premium"></div>
                 </div>
              </div>
              <div className="flex items-center justify-between opacity-40">
                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Real-time Webhook Stream</p>
                 <div className="w-14 h-8 bg-slate-200 rounded-full p-1 relative shadow-inner cursor-pointer">
                    <div className="w-6 h-6 bg-white rounded-full transition-all"></div>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">API Authentication Node</label>
              <div className="relative group">
                 <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-clinicPrimary transition-colors" size={16}/>
                 <input type="password" value="************************" readOnly className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[28px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all" />
                 <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-clinicPrimary uppercase tracking-widest hover:underline">Regenerate</button>
              </div>
           </div>

           <div className="p-8 bg-blue-50/50 rounded-[40px] border border-blue-100 flex items-center gap-8">
              <div className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-blue-500 shadow-soft">
                 <FaShieldAlt size={24} />
              </div>
              <p className="text-[12px] font-black text-blue-700 uppercase tracking-widest leading-relaxed">System is running 12-factor secure integration protocols. Audit log #220-EX verified.</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default IntegrationService;
