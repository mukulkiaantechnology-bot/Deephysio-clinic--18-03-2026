import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { FaDownload, FaFilter, FaCalendarAlt, FaChartPie, FaChartLine, FaUsers, FaArrowUp, FaArrowDown, FaCog, FaMicroscope } from 'react-icons/fa';

const quarterlyData = [
  { name: 'Jan', revenue: 4200, appointments: 240, activePatients: 180 },
  { name: 'Feb', revenue: 3800, appointments: 198, activePatients: 190 },
  { name: 'Mar', revenue: 5100, appointments: 310, activePatients: 210 },
  { name: 'Apr', revenue: 4780, appointments: 250, activePatients: 220 },
  { name: 'May', revenue: 5890, appointments: 290, activePatients: 230 },
  { name: 'Jun', revenue: 6390, appointments: 320, activePatients: 250 },
];

const monthlyData = [
  { name: 'Week 1', revenue: 1200, appointments: 60, activePatients: 240 },
  { name: 'Week 2', revenue: 1500, appointments: 75, activePatients: 242 },
  { name: 'Week 3', revenue: 1800, appointments: 85, activePatients: 245 },
  { name: 'Week 4', revenue: 1890, appointments: 100, activePatients: 250 },
];

const annualData = [
  { name: '2023', revenue: 45000, appointments: 2200, activePatients: 380 },
  { name: '2024', revenue: 52000, appointments: 2500, activePatients: 410 },
  { name: '2025', revenue: 58000, appointments: 2800, activePatients: 425 },
  { name: '2026', revenue: 65000, appointments: 3200, activePatients: 428 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('quarterly');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const currentData = activeTab === 'monthly' ? monthlyData : activeTab === 'annual' ? annualData : quarterlyData;

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Period,Revenue,Appointments,Patients\n" + currentData.map(d => `${d.name},${d.revenue},${d.appointments},${d.activePatients}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_${activeTab}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStats = () => {
    if (activeTab === 'monthly') {
      return [
        { label: 'Growth Gradient', value: '+4.2%', delta: 'Stable Velocity', icon: <FaChartLine />, color: 'emerald' },
        { label: 'Patient Density', value: '25 Active', delta: '+2.1% Week', icon: <FaUsers />, color: 'blue' },
        { label: 'Clinical Ops', value: '97.5%', delta: 'Optimized', icon: <FaMicroscope />, color: 'clinicPrimary' },
        { label: 'System Sync', value: 'Nominal', delta: 'Audited 10m ago', icon: <FaCog />, color: 'amber' }
      ];
    }
    if (activeTab === 'annual') {
      return [
        { label: 'Growth Gradient', value: '+18.5%', delta: 'Peak Velocity', icon: <FaChartLine />, color: 'emerald' },
        { label: 'Patient Density', value: '428 Total', delta: 'Year Match', icon: <FaUsers />, color: 'blue' },
        { label: 'Clinical Ops', value: '98.5%', delta: 'Optimized', icon: <FaMicroscope />, color: 'clinicPrimary' },
        { label: 'System Sync', value: 'Nominal', delta: 'Audited 2d ago', icon: <FaCog />, color: 'amber' }
      ];
    }
    return [
      { label: 'Growth Gradient', value: '+12.4%', delta: 'High Velocity', icon: <FaChartLine />, color: 'emerald' },
      { label: 'Patient Density', value: '428 Active', delta: '+4.2% Month', icon: <FaUsers />, color: 'blue' },
      { label: 'Clinical Ops', value: '98.2%', delta: 'Optimized', icon: <FaMicroscope />, color: 'clinicPrimary' },
      { label: 'System Sync', value: 'Nominal', delta: 'Audited 2m ago', icon: <FaCog />, color: 'amber' }
    ];
  };

  const stats = getStats();

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar">
      <Card className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Intelligence Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Audit operational trajectories and synchronize clinical performance benchmarks.</p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 mr-4">
             {['Monthly', 'Quarterly', 'Annual'].map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'bg-white shadow-premium text-clinicPrimary' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
          <Button variant="secondary" leftIcon={<FaFilter />} onClick={() => setIsFilterModalOpen(true)}>Analytical Filter</Button>
          <Button variant="accent" leftIcon={<FaDownload />} onClick={handleExport}>Export Report</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className="p-8 border-none shadow-premium bg-white group hover:shadow-glass hover:-translate-y-1 transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl bg-${stat.color === 'clinicPrimary' ? 'blue-50' : stat.color + '-50'} text-${stat.color === 'clinicPrimary' ? 'blue-500' : stat.color + '-500'} transition-transform group-hover:scale-110`}>
                   {stat.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-slate-500 transition-colors">{stat.delta}</span>
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
             <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 p-10 border-none shadow-premium bg-white group">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <FaChartLine className="text-clinicPrimary" /> Revenue Trajectory Analysis
             </h3>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-clinicPrimary"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gross Yield</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Baseline</span>
                </div>
             </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 'bold'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 'bold'}} dx={-15} />
                <Tooltip 
                  cursor={{ stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-4 p-10 border-none shadow-premium bg-white group overflow-hidden">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
             <FaChartPie className="text-clinicPrimary" /> Strategic Distribution
          </h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                   data={[
                    { name: 'Physio Protocols', value: 45 },
                    { name: 'Bio Assessments', value: 25 },
                    { name: 'Sports Therapy', value: 20 },
                    { name: 'Rehab Logic', value: 10 },
                  ]}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1 opacity-50">Total Mix</p>
               <p className="text-2xl font-bold text-slate-900 tracking-tight">100%</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
             {[
               { label: 'Physio Protocols', value: '45%', color: COLORS[0] },
               { label: 'Bio Assessments', value: '25%', color: COLORS[1] },
             ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[12px] font-bold text-slate-600">{item.label}</span>
                   </div>
                   <span className="text-[12px] font-black text-slate-900">{item.value}</span>
                </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-2 p-10 border-none shadow-premium bg-white">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
             <FaUsers className="text-clinicPrimary" /> Practitioner Performance Grid
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Dr. Sarah', appts: 120, revenue: 12000 },
                { name: 'Dr. Mike', appts: 98, revenue: 8500 },
                { name: 'Dr. John', appts: 115, revenue: 10200 },
                { name: 'Dr. Anna', appts: 80, revenue: 6400 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 'bold'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 'bold'}} dx={-15} />
                <Tooltip 
                   cursor={{ fill: '#F1F5F9', opacity: 0.4 }}
                   contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '20px' }}
                />
                <Bar dataKey="appts" fill="#3B82F6" radius={[10, 10, 0, 0]} barSize={24} />
                <AreaChart data={currentData}>
                   <Area dataKey="revenue" fill="#F59E0B" />
                </AreaChart>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-10 border-none shadow-premium bg-slate-900 relative overflow-hidden group">
          <h3 className="text-[11px] font-bold text-clinicPrimary uppercase tracking-[0.2em] mb-10 flex items-center gap-3 relative z-10">
             <FaChartLine /> Retention Diagnostics
          </h3>
          <div className="space-y-10 relative z-10">
            {[
              { label: 'Longitudinal Retention', value: '78%', color: 'clinicPrimary', trend: '+12%', icon: <FaArrowUp /> },
              { label: 'Active Compliance', value: '94%', color: 'emerald-500', trend: '+5%', icon: <FaArrowUp /> },
              { label: 'Neural Attrition', value: '4.2%', color: 'rose-500', trend: '-2%', icon: <FaArrowDown /> },
            ].map(stat => (
              <div key={stat.label} className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-bold ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-1`}>{stat.icon} {stat.trend}</span>
                     <span className="text-lg font-black text-white tracking-tighter">{stat.value}</span>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden shadow-inner-soft border border-white/5">
                  <div className={`bg-${stat.color === 'clinicPrimary' ? 'clinicPrimary' : stat.color} h-full rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-clinicPrimary`} style={{ width: stat.value }}></div>
                </div>
              </div>
            ))}

            <div className="p-6 bg-white/5 rounded-[24px] border border-white/5 mt-12 text-center group-hover:bg-white/10 transition-all border-l-2 border-l-clinicPrimary">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-3">Aggregated Yield Result</p>
               <p className="text-3xl font-black text-white tracking-tighter">+12.4% Δ</p>
               <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em] mt-3">Statistical Optimum</p>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-clinicPrimary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
        </Card>
      </div>

      {/* Filter Modal */}
      <Modal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        title="Analytical Parameter Filter"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsFilterModalOpen(false)}>Discard</Button>
            <Button variant="accent" onClick={() => setIsFilterModalOpen(false)}>Apply Filter</Button>
          </div>
        }
      >
        <div className="space-y-6 p-2 font-sans">
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Clinic Location</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                 <option>All Locations</option>
                 <option>London Central</option>
                 <option>Manchester Suite</option>
              </select>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date Start</label>
                 <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" value="2026-01-01" readOnly/>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date End</label>
                 <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" value="2026-03-18" readOnly/>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Practitioner Segment</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                 <option>All Staff</option>
                 <option>Senior Physio</option>
                 <option>Junior Staff</option>
              </select>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Analytics;
