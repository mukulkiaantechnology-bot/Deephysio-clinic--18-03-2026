import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend 
} from 'recharts';
import { FaUserPlus, FaCalendarCheck, FaUsers, FaCalendarAlt, FaFileInvoiceDollar, FaUserFriends, FaNotesMedical, FaChevronRight, FaChartLine } from 'react-icons/fa';
import Button, { cn } from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const data = [
  { name: 'Mon', appointments: 12, revenue: 1200 },
  { name: 'Tue', appointments: 19, revenue: 1900 },
  { name: 'Wed', appointments: 15, revenue: 1500 },
  { name: 'Thu', appointments: 22, revenue: 2200 },
  { name: 'Fri', appointments: 25, revenue: 2500 },
  { name: 'Sat', appointments: 10, revenue: 1000 },
  { name: 'Sun', appointments: 5, revenue: 500 },
];

const StatCard = ({ title, value, icon, color, trend, path }) => {
  const navigate = useNavigate();
  return (
    <Card 
      onClick={() => path && navigate(path)}
      className={cn(
        "group relative overflow-hidden p-6 sm:p-8 border-none bg-white animate-fade-in text-center sm:text-left flex flex-col items-center sm:items-start",
        path ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8 w-full">
          <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-opacity-10 ${color} shadow-inner-soft`}>
            <span className={`text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</span>
          </div>
          <div className={`hidden sm:block px-3 py-1.5 rounded-xl text-xs font-bold ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} shadow-sm border border-white/50 backdrop-blur-sm`}>
            {trend}
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-80">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{value}</h3>
        </div>
      </div>
      <div className={`absolute -bottom-16 -right-16 w-48 h-48 bg-opacity-[0.05] ${color} rounded-full blur-[60px]`}></div>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  return (
    <div className="space-y-8 animate-fade-in custom-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinic Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, Kiaan Paras 👋 Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Button 
            variant="secondary" 
            className="flex-1 sm:flex-none h-12 px-6 rounded-2xl shadow-premium hover:shadow-google transition-all active:scale-95" 
            leftIcon={<FaChartLine size={14} />}
            onClick={() => navigate('/analytics')}
          >
            Analytics
          </Button>
          <Button 
            variant="accent" 
            className="flex-1 sm:flex-none h-12 px-6 rounded-2xl shadow-google transition-all active:scale-95" 
            leftIcon={<FaCalendarCheck size={14} />}
            onClick={() => navigate('/appointments')}
          >
            Booking
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <StatCard
          title="Today's Appointments"
          value="24"
          icon={<FaCalendarAlt />}
          color="bg-clinicPrimary"
          trend="+4 today"
          path="/appointments"
        />
        <StatCard 
          title="Revenue Today" 
          value="$1,850" 
          icon={<FaFileInvoiceDollar />} 
          color="bg-amber-500" 
          trend="+12% vs avg" 
          path="/billing"
        />
        <StatCard 
          title="Staff Activity" 
          value="94.2%" 
          icon={<FaUsers />} 
          color="bg-indigo-500" 
          trend="Active Now"
          path="/analytics/staff"
        />
        <StatCard 
          title="Pending Payments" 
          value="$3,420" 
          icon={<FaFileInvoiceDollar />} 
          color="bg-rose-500" 
          trend="5 Past Due"
          path="/billing"
        />
        <StatCard 
          title="New Patients" 
          value="6" 
          icon={<FaUserPlus />} 
          color="bg-emerald-500" 
          trend="+2 this week"
          path="/patients"
        />
        <StatCard 
          title="No Shows" 
          value="2" 
          icon={<FaCalendarAlt />} 
          color="bg-slate-500" 
          trend="Follow-up req"
          path="/appointments"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 pb-4 border-none shadow-premium bg-white group cursor-pointer border-2 border-transparent" onClick={() => navigate('/analytics')}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">Appointment Trends</h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">Daily patient visit metrics</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-clinicPrimary animate-pulse shadow-[0_0_8px_rgba(46,167,184,0.5)]"></span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Live Updates</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2EA7B8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2EA7B8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" opacity={0.6} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff', padding: '12px' }}
                />
                <Area type="monotone" dataKey="appointments" stroke="#2EA7B8" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 pb-4 border-none shadow-premium bg-white group cursor-pointer border-2 border-transparent" onClick={() => navigate('/analytics')}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">Revenue Analysis</h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">Weekly financial growth</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" opacity={0.6} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeight: 600}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff', padding: '12px' }}
                />
                <Bar dataKey="revenue" fill="#F59E0B" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 card-clinic p-0 overflow-hidden bg-white border-none shadow-premium group">
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between border-b border-slate-50 bg-slate-50/30 gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">Recent Bookings</h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">Manage pending patient visits</p>
            </div>
            <button 
              onClick={() => navigate('/appointments')}
              className="text-clinicPrimary text-[11px] font-black hover:text-white hover:bg-clinicPrimary uppercase transition-all tracking-widest px-6 py-3 bg-clinicPrimary/5 rounded-xl border border-clinicPrimary/10 w-full sm:w-auto active:scale-95"
            >
              View Schedule
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 font-bold text-[10px] uppercase tracking-[0.15em] border-b border-slate-50">
                  <th className="px-8 py-4">Patient Subject</th>
                  <th className="px-8 py-4">Session Time</th>
                  <th className="px-8 py-4">Practitioner Node</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Alice Johnson', id: 'PID-101', time: '10:30 AM', dr: 'Dr. Sarah Wilson', status: 'Confirmed' },
                  { name: 'James Wilson', id: 'PID-102', time: '11:45 AM', dr: 'Dr. Michael Chen', status: 'Pending' },
                  { name: 'Robert Fox', id: 'PID-103', time: '02:15 PM', dr: 'Dr. Sarah Wilson', status: 'Arrived' },
                  { name: 'Linda Grey', id: 'PID-104', time: '04:00 PM', dr: 'Dr. Michael Chen', status: 'Confirmed' }
                ].map((row, i) => (
                  <tr 
                    key={i} 
                    className="hover:bg-slate-50/50 transition-all group/row cursor-pointer"
                    onClick={() => navigate(`/patients/profile/${row.id}`)}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-clinicPrimary/10 to-clinicPrimary/5 text-clinicPrimary flex items-center justify-center font-bold text-sm shadow-soft border border-clinicPrimary/10 group-hover/row:scale-110 transition-transform">
                          {row.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none group-hover/row:text-clinicPrimary transition-colors">{row.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">ID: {800+i}-PR</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{row.time}</span>
                        <span className="text-[10px] font-medium text-slate-400 mt-1.5 uppercase tracking-widest">Today</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-semibold text-slate-600 italic">{row.dr}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center justify-center w-fit shadow-inner-soft ${
                        row.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        row.status === 'Arrived' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/appointments'); }}
                        className="w-10 h-10 rounded-xl bg-white text-slate-300 hover:text-white hover:bg-clinicPrimary hover:shadow-google hover:border-clinicPrimary border border-slate-100 transition-all duration-300 flex items-center justify-center ml-auto active:scale-90"
                      >
                        <FaChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-clinic p-0 overflow-hidden bg-white border-none shadow-premium relative group">
          <div className="p-8 flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">Clinic Activity</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </div>
          <div className="p-8 space-y-8 relative before:absolute before:left-[47px] before:top-14 before:bottom-14 before:w-0.5 before:bg-slate-50">
            {[
              { type: 'Physio Evolution', patient: 'Samantha Reed', time: '12 mins ago' },
              { type: 'Financial Ledger Update', patient: 'System Sync', time: '45 mins ago' },
              { type: 'New Patient Intake', patient: 'Michael Myers', time: '2 hours ago' },
              { type: 'Insurance Approval', patient: 'AXA Healthcare', time: '3 hours ago' }
            ].map((activity, i) => (
              <div key={i} className="relative pl-14 group/act cursor-pointer" onClick={() => navigate(activity.type.includes('Financial') ? '/billing' : '/patients')}>
                <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-soft z-10 flex items-center justify-center group-hover/act:border-clinicPrimary group-hover/act:scale-110 transition-all">
                   <div className="w-2.5 h-2.5 rounded-full bg-clinicPrimary shadow-[0_0_12px_rgba(46,167,184,0.6)] group-hover/act:scale-125 transition-all"></div>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900 leading-none group-hover/act:text-clinicPrimary transition-colors">{activity.type}</p>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-medium">{activity.patient} protocol updated.</p>
                  <p className="text-[10px] font-bold text-clinicPrimary mt-3.5 uppercase tracking-[0.2em] bg-clinicPrimary/5 inline-block px-3 py-1 rounded-lg">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50/50 border-t border-slate-50">
            <button 
              onClick={() => setIsActivityModalOpen(true)}
              className="w-full py-4 text-[11px] font-black text-slate-400 hover:text-clinicPrimary uppercase tracking-[0.2em] transition-all bg-white border border-slate-100 rounded-xl shadow-premium active:scale-95"
            >
              See Full History
            </button>
          </div>
        </div>
      </div>

      {/* Activity History Modal */}
      <Modal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        title="Full Clinic Activity Log"
      >
        <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar p-2">
          {[
            { type: 'Physio Evolution', patient: 'Samantha Reed', time: '12 mins ago' },
            { type: 'Financial Ledger Update', patient: 'System Sync', time: '45 mins ago' },
            { type: 'New Patient Intake', patient: 'Michael Myers', time: '2 hours ago' },
            { type: 'Insurance Approval', patient: 'AXA Healthcare', time: '3 hours ago' },
            { type: 'Note Finalized', patient: 'Alice Johnson', time: '5 hours ago' },
            { type: 'Appointment Canceled', patient: 'James Wilson', time: '6 hours ago' },
            { type: 'Invoice Paid', patient: 'Emily Brown', time: '1 day ago' },
          ].map((activity, i) => (
            <div key={i} className="relative pl-14 py-2 border-b border-slate-50 last:border-none">
              <div className="absolute left-0 top-3 w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-clinicPrimary"></div>
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-900">{activity.type}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{activity.patient} updated.</p>
                <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
