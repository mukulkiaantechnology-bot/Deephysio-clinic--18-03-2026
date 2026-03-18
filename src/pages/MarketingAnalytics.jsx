import React, { useState } from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaCalendarAlt, FaBullhorn, FaMousePointer, FaUserPlus, FaUsers, FaFilter, FaDownload, FaSync, FaMicroscope, FaBrain, FaRegCompass, FaBolt, FaLayerGroup } from 'react-icons/fa';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const MarketingAnalytics = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isSyncing, setIsSyncing] = useState(false);

  const data = [
    { name: 'Jan', campaigns: 12, leads: 400, conv: 240 },
    { name: 'Feb', campaigns: 15, leads: 300, conv: 198 },
    { name: 'Mar', campaigns: 18, leads: 500, conv: 380 },
    { name: 'Apr', campaigns: 20, leads: 600, conv: 420 },
    { name: 'May', campaigns: 25, leads: 800, conv: 510 },
  ];

  const channelData = [
    { name: 'Google Ads', value: 1240, color: '#0B98A1' },
    { name: 'Facebook', value: 850, color: '#4F46E5' },
    { name: 'Direct Mail', value: 420, color: '#F59E0B' },
    { name: 'Referral', value: 310, color: '#10B981' },
  ];

  const handleAction = (action) => {
    alert(`Analytics Intelligence: Initiating "${action}" for Clinical ROI Domain. Handshake verified.`);
  };

  const runDataSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Analytics Synchronized: Multi-channel ROI paths verified across 12,400 clinical interaction nodes.');
    }, 2000);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Campaign Intelligence Ledger</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Measure longitudinal ROI and conversion velocity across global clinical outreach channels.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={runDataSync} disabled={isSyncing} leftIcon={isSyncing ? null : <FaSync className={isSyncing ? 'animate-spin' : ''} />}>
             {isSyncing ? 'Indexing...' : 'Sync Intelligence'}
           </Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => handleAction('Export ROI Manifest')} leftIcon={<FaDownload />}>Export XL Manifest</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Cloud Leads', val: '2,421', icon: <FaUserPlus />, color: 'blue', delta: '+12.4%' },
          { label: 'Response Velocity', val: '8.4%', icon: <FaMousePointer />, color: 'indigo', delta: '+2.1%' },
          { label: 'Conversion Delta', val: '24.2%', icon: <FaUsers />, color: 'emerald', delta: '+5.8%' },
          { label: 'Marketing ROI', val: '4.8x', icon: <FaChartLine />, color: 'clinic', delta: '+0.5x' },
        ].map(stat => (
          <Card key={stat.label} className="p-8 bg-white border-none shadow-premium flex flex-col justify-center relative overflow-hidden group hover:shadow-google hover:-translate-y-1 transition-all rounded-[32px] cursor-pointer">
             <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none">{stat.label}</span>
                <div className={`p-4 rounded-2xl text-white shadow-google group-hover:scale-110 transition-transform ${stat.color === 'blue' ? 'bg-blue-500' : stat.color === 'indigo' ? 'bg-indigo-500' : stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-clinicPrimary'}`}>
                   {stat.icon}
                </div>
             </div>
             <h3 className="text-3xl font-black text-slate-900 leading-none relative z-10 tracking-tighter">{stat.val}</h3>
             <div className="flex items-center gap-2 mt-4 relative z-10">
                <FaArrowUp className="text-emerald-500" size={10}/>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{stat.delta} vs PREV PERIOD</span>
             </div>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl group-hover:bg-slate-100 transition-all duration-700"></div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 p-10 border-none shadow-premium bg-white group overflow-hidden rounded-[40px]">
           <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                 <FaRegCompass className="text-clinicPrimary" /> Conversion Funnel Trajectory
              </h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-clinicPrimary shadow-[0_0_10px_rgba(46,167,184,0.3)]"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Leads</span></div>
                 <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Patients</span></div>
              </div>
           </div>
           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B98A1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0B98A1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                    />
                    <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', padding: '20px' }} 
                       cursor={{ stroke: '#0B98A1', strokeWidth: 2, strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="leads" stroke="#0B98A1" strokeWidth={5} fillOpacity={1} fill="url(#colorLeads)" />
                    <Area type="monotone" dataKey="conv" stroke="#CBD5E1" strokeWidth={3} fillOpacity={0} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <div className="lg:col-span-4 space-y-10">
           <Card className="p-10 bg-slate-900 text-white border-none shadow-premium relative overflow-hidden group rounded-[40px] flex-1">
              <FaLayerGroup className="absolute -right-12 -top-12 text-white/5 text-[220px] -rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
              <h3 className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.4em] mb-12 relative z-10">Interaction Channels</h3>
              <div className="space-y-8 relative z-10">
                 {channelData.map(ch => (
                   <div key={ch.name} className="group/ch cursor-pointer">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] leading-none mb-3">
                         <span className="text-slate-500 group-hover/ch:text-white transition-colors">{ch.name}</span>
                         <span className="tracking-tighter">{((ch.value / 2820) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 shadow-inner-soft">
                         <div className="h-full rounded-full transition-all duration-1000 group-hover/ch:shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ width: `${(ch.value / 2820) * 100}%`, backgroundColor: ch.color }}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <Button variant="secondary" className="w-full mt-10 h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-clinicPrimary hover:border-clinicPrimary transition-all font-black text-[10px] uppercase tracking-widest text-white shadow-soft" onClick={() => handleAction('Review Channel Delta')}>Deep Node Audit</Button>
           </Card>
           
           <Card className="p-10 bg-white border-none shadow-premium flex flex-col items-center text-center group hover:-translate-y-1 transition-all rounded-[40px] cursor-pointer" onClick={() => handleAction('Neural ROI Forecasting')}>
              <div className="w-20 h-20 rounded-[30px] bg-slate-50 flex items-center justify-center text-clinicPrimary border border-slate-50 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6">
                 <FaBrain size={28} />
              </div>
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-3">Forecasting Engine</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed opacity-60">Predictive ROI modeling active for Q3 2026 trajectories.</p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketingAnalytics;
