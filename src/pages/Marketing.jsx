import React, { useState } from 'react';
import { FaRocket, FaEnvelope, FaBolt, FaUsers, FaArrowRight, FaBullhorn, FaHistory, FaCalendarAlt, FaLayerGroup, FaChartLine, FaFilter } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentTarget, setDeploymentTarget] = useState(null);

  const handleDeploy = (name) => {
    setDeploymentTarget(name);
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentTarget(null);
      alert(`Strategy "${name}" has been successfully deployed to the clinical network.`);
    }, 2000);
  };

  const trajectories = {
    active: [
      { id: 1, name: 'Spring Wellness Protocol', impact: '4,200 Nodes', date: '15 Mar 2026', velocity: '22.4%', sync: '850' },
      { id: 2, name: 'Senior Mobility Campaign', impact: '1,850 Nodes', date: '10 Mar 2026', velocity: '18.9%', sync: '420' },
    ],
    scheduled: [
      { id: 3, name: 'Summer Recovery Launch', impact: 'TBD', date: '01 Jun 2026', velocity: '0%', sync: '0' },
    ],
    archived: [
      { id: 4, name: 'Winter Health Drive', impact: '5,000 Nodes', date: '05 Jan 2026', velocity: '31.2%', sync: '1,200' },
    ]
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campaign Intelligence Lab</h1>
          <p className="text-slate-500 font-medium mt-1">Audit longitudinal acquisition trajectories and optimize patient engagement frameworks.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <Button 
             variant="secondary" 
             size="lg" 
             className="rounded-2xl h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 active:scale-95 transition-all" 
             leftIcon={<FaHistory />}
             onClick={() => alert('Accessing Longitudinal Audit Logs...')}
           >
             Audit Trail
           </Button>
           <Button 
             variant="accent" 
             size="lg" 
             className="rounded-2xl h-14 px-8 shadow-lg active:scale-95 transition-all" 
             leftIcon={isDeploying ? null : <FaBullhorn />}
             onClick={() => handleDeploy('Global Outreach')}
             disabled={isDeploying}
           >
             {isDeploying && deploymentTarget === 'Global Outreach' ? 'Deploying...' : 'Deploy Campaign'}
           </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Engagement Nodes', title: 'Email Orchestration', sub: 'Broadcast newsletters & clinical tips.', icon: <FaEnvelope />, color: 'blue', link: 'Launch Stream' },
          { label: 'Strategic Clusters', title: 'Patient Segmentation', sub: 'Group nodes by treatment density.', icon: <FaFilter />, color: 'emerald', link: 'Audit Clusters' },
          { label: 'Automated Pilots', title: 'Neural Automation', sub: 'Trigger engagement by clinical events.', icon: <FaBolt />, color: 'amber', link: 'Edit Protocols' }
        ].map((node, i) => (
          <Card 
            key={i} 
            onClick={() => handleDeploy(node.title)}
            className="p-10 border-none shadow-premium bg-white group hover:shadow-google hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]"
          >
            <div className={`w-16 h-16 rounded-[24px] bg-${node.color}-50 text-${node.color}-500 flex items-center justify-center mb-8 shadow-sm group-hover:bg-${node.color}-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
               {React.cloneElement(node.icon, { size: 24 })}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{node.label}</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-clinicPrimary transition-colors tracking-tight">{node.title}</h3>
            <p className="text-[12px] text-slate-500 font-medium mb-8 leading-relaxed">{node.sub}</p>
            <div className="mt-auto flex items-center gap-3 text-[11px] font-bold text-clinicPrimary uppercase tracking-widest">
               {node.link} <FaArrowRight size={10} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${node.color}-50/50 rounded-full blur-2xl group-hover:bg-${node.color}-500/10 transition-all duration-700`}></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 p-10 border-none shadow-premium bg-white group overflow-hidden">
           <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
              <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                 <FaRocket className="text-clinicPrimary" /> Active Operational Trajectories
              </h3>
              <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100 shadow-inner-soft">
                 {['active', 'scheduled', 'archived'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)} 
                      className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-clinicPrimary shadow-soft border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                       {tab}
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              {trajectories[activeTab].map(item => (
                <div 
                  key={item.id} 
                  className="p-6 bg-slate-50 rounded-[28px] border border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white hover:shadow-google hover:-translate-y-1 transition-all group/item cursor-pointer"
                  onClick={() => alert(`Reviewing details for: ${item.name}`)}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-clinicPrimary shadow-premium group-hover/item:bg-clinicPrimary group-hover/item:text-white transition-all duration-500">
                      <FaChartLine size={20} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 tracking-tight uppercase group-hover/item:text-clinicPrimary transition-colors">{item.name}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Impact: {item.impact} • {item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                     <div className="text-right">
                        <p className={`text-[16px] font-black ${activeTab === 'archived' ? 'text-slate-400' : 'text-emerald-500'} tracking-tight`}>{item.velocity}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Open Velocity</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[16px] font-black text-slate-900 tracking-tight">{item.sync}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Interaction Sync</p>
                     </div>
                     <FaChevronRight className="text-slate-200 group-hover/item:text-clinicPrimary group-hover/item:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              {trajectories[activeTab].length === 0 && (
                <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">No entries found for this category.</div>
              )}
           </div>
        </Card>

        <Card className="lg:col-span-4 p-10 border-none shadow-premium bg-slate-900 text-white relative overflow-hidden group flex flex-col justify-center items-center text-center">
           <FaLayerGroup className="absolute -right-12 -top-12 text-white/5 text-[220px] -rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
           <div className="w-24 h-24 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-glass">
              <FaBullhorn className="text-clinicPrimary text-4xl" />
           </div>
           <h3 className="text-2xl font-bold mb-4 tracking-tight relative z-10 uppercase">Scale Your Engagement</h3>
           <p className="text-[13px] text-slate-400 font-medium mb-10 leading-relaxed max-w-xs relative z-10 opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
              Deploy sophisticated engagement frameworks to optimize patient retention and scale clinic operations.
           </p>
           <Button 
             variant="accent" 
             size="lg" 
             className="rounded-2xl h-14 px-10 shadow-lg relative z-10 w-full active:scale-95 transition-all"
             onClick={() => handleDeploy('Sophisticated Engagement Framework')}
             disabled={isDeploying}
           >
              {isDeploying && deploymentTarget === 'Sophisticated Engagement Framework' ? 'Deploying...' : 'Deploy New Strategy'}
           </Button>
           <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none"></div>
        </Card>
      </div>
    </div>
  );
};

const FaChevronRight = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default Marketing;
