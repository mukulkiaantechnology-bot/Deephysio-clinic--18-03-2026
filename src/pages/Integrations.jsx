import React, { useState } from 'react';
import { FaGoogle, FaStripe, FaPaypal, FaMicrosoft, FaCheckCircle, FaExclamationTriangle, FaHistory, FaPlus, FaLink, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Integrations = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [connectingId, setConnectingId] = useState(null);
  const [connectedIds, setConnectedIds] = useState(['google']);

  const [integrationList, setIntegrationList] = useState([
    { id: 'google', name: 'Google Workspace', icon: <FaGoogle />, desc: 'Sync clinical calendars with Google Nodes.', status: 'Connected', color: 'blue' },
    { id: 'stripe', name: 'Stripe Financial', icon: <FaStripe />, desc: 'High-fidelity credit card orchestration.', status: 'Protocol Ready', color: 'purple' },
    { id: 'paypal', name: 'PayPal Gateway', icon: <FaPaypal />, desc: 'Secondary financial checkout stream.', status: 'Protocol Ready', color: 'indigo' },
    { id: 'outlook', name: 'Outlook Exchange', icon: <FaMicrosoft />, desc: 'Microsoft ecosystem synchronization.', status: 'Node Pending', color: 'blue' },
    { id: 'quickbooks', name: 'QuickBooks Sync', icon: <FaDatabase />, desc: 'Automated ledger & invoice mirroring.', status: 'Staging', color: 'emerald' },
    { id: 'xero', name: 'Xero Accounting', icon: <FaDatabase />, desc: 'Direct bookkeeping synchronization.', status: 'Protocol Ready', color: 'sky' },
  ]);

  const handleConnect = (id, name) => {
    if (connectedIds.includes(id)) {
      alert(`${name} is already authenticated.`);
      return;
    }
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      setConnectedIds([...connectedIds, id]);
      alert(`Connection to ${name} established via secure OAuth node.`);
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Ecosystem Integration Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Audit clinical connectivity nodes and optimize cross-platform data synchronization.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <Button 
             variant="secondary" 
             size="lg" 
             className="rounded-2xl h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all active:scale-95" 
             leftIcon={<FaHistory />}
             onClick={() => alert('Accessing integration historical synchronization logs...')}
           >
             History
           </Button>
           <Button 
             variant="accent" 
             size="lg" 
             className="rounded-2xl h-14 px-8 shadow-lg active:scale-95 transition-all" 
             leftIcon={<FaPlus />}
             onClick={() => setIsAddModalOpen(true)}
           >
             Add Integration
           </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Deploy New Integration Node"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel Action</Button>
            <Button variant="accent" onClick={() => alert('Scanning available ecosystem partners...')}>Scan Network</Button>
          </div>
        }
      >
        <div className="space-y-8 p-2">
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Search our clinical ecosystem to find and deploy new integration nodes for your practice management system.</p>
            <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" placeholder="Enter partner name (e.g. Mailchimp, Slack)..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['EHR/EMR', 'Financial', 'Marketing', 'System'].map(cat => (
              <div key={cat} className="p-4 bg-white border border-slate-100 rounded-xl hover:border-clinicPrimary hover:shadow-project transition-all cursor-pointer flex items-center justify-between group">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{cat}</span>
                <FaChevronRight className="text-slate-200 group-hover:text-clinicPrimary" />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrationList.map((item) => {
          const isConnected = connectedIds.includes(item.id);
          const isConnecting = connectingId === item.id;

          return (
            <Card key={item.id} className="p-8 border-none shadow-premium bg-white group hover:shadow-google hover:-translate-y-2 transition-all cursor-pointer flex flex-col relative overflow-hidden active:scale-[0.98]">
              <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-500 flex items-center justify-center text-xl mb-6 shadow-sm border border-slate-100/50 group-hover:bg-${item.color}-500 group-hover:text-white transition-all duration-500 group-hover:scale-110`}>
                {item.icon}
              </div>
              <h3 className="text-[15px] font-bold text-slate-900 mb-2 tracking-tight uppercase group-hover:text-clinicPrimary transition-colors">{item.name}</h3>
              <p className="text-[12px] text-slate-400 font-medium mb-8 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{item.desc}</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleConnect(item.id, item.name); }}
                disabled={isConnecting}
                className={`mt-auto w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                isConnected
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                  : item.status.includes('Pending') || item.status.includes('Staging')
                    ? 'bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed opacity-60'
                    : 'bg-clinicPrimary text-white shadow-lg hover:scale-[1.02] active:scale-95'
              }`}>
                {isConnecting ? (
                  <span className="flex items-center gap-2">Connecting...</span>
                ) : isConnected ? (
                  <><FaCheckCircle size={10}/> Connected</>
                ) : (
                  <><FaLink size={10}/> {item.status}</>
                )}
              </button>
              <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-${item.color}-50/50 rounded-full blur-2xl group-hover:bg-${item.color}-500/10 transition-all duration-700`}></div>
            </Card>
          );
        })}
      </div>

      <Card 
        onClick={() => alert('Performing Protocol Sensitivity Audit... Clean Protocol Found.')}
        className="p-8 bg-amber-50/30 border border-amber-100/50 text-amber-900 flex flex-col md:flex-row items-center gap-8 shadow-sm group hover:bg-amber-50/50 transition-all cursor-pointer border-none shadow-premium"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-inner group-hover:rotate-12 transition-transform">
           <FaShieldAlt size={22}/>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-[11px] font-bold text-amber-800 uppercase tracking-[0.25em] mb-2">Protocol Sensitivity Perimeter</h4>
          <p className="text-[12px] font-medium text-amber-700/80 leading-relaxed uppercase tracking-widest">
            External nodes require secondary OAuth signatures. Connecting third-party services may transmit HIPAA-governed clinical nodes based on individual protocol configurations.
          </p>
        </div>
        <div className="px-6 py-2 bg-amber-100 rounded-lg text-[10px] font-black text-amber-800 uppercase tracking-widest border border-amber-200 group-hover:bg-amber-200 transition-colors">Audit Security</div>
      </Card>
    </div>
  );
};

export default Integrations;
