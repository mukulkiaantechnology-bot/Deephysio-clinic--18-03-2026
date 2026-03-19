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
        "group relative overflow-hidden p-4 sm:p-5 animate-fade-in flex flex-col items-start shadow-none border border-slate-100",
        path ? "cursor-pointer hover:border-clinicPrimary/30" : "cursor-default"
      )}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-opacity-10 ${color}`}>
          <span className={`text-lg ${color.replace('bg-', 'text-')}`}>{icon}</span>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</h3>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const role = localStorage.getItem('deephysio_role') || 'admin';
  const isTherapist = role === 'therapist';
  const isReceptionist = role === 'receptionist';
  const isBilling = role === 'billing';

  const hideRevenue = isTherapist || isReceptionist;

  return (
    <div className="space-y-5 animate-fade-in custom-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinic Overview</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Welcome back, Kiaan Paras 👋 Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            className="flex-1 sm:flex-none h-10 px-4 rounded-xl transition-colors shadow-none" 
            leftIcon={<FaChartLine size={12} />}
            onClick={() => navigate('/analytics')}
          >
            Analytics
          </Button>
          <Button 
            variant="accent" 
            className="flex-1 sm:flex-none h-10 px-4 rounded-xl shadow-none transition-colors" 
            leftIcon={<FaCalendarCheck size={12} />}
            onClick={() => navigate('/appointments')}
          >
            Booking
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <StatCard
          title="Today's Appointments"
          value="24"
          icon={<FaCalendarAlt />}
          color="bg-clinicPrimary"
          trend="+4 today"
          path="/appointments"
        />
        {!hideRevenue && (
          <StatCard 
            title="Revenue Today" 
            value="$1,850" 
            icon={<FaFileInvoiceDollar />} 
            color="bg-amber-500" 
            trend="+12% vs avg" 
            path="/billing"
          />
        )}
        {!isBilling && (
          <StatCard 
            title="Staff Activity" 
            value="94.2%" 
            icon={<FaUsers />} 
            color="bg-indigo-500" 
            trend="Active Now"
            path="/analytics/staff"
          />
        )}
        {!isTherapist && (
          <StatCard 
            title="Pending Payments" 
            value="$3,420" 
            icon={<FaFileInvoiceDollar />} 
            color="bg-rose-500" 
            trend="5 Past Due"
            path="/billing"
          />
        )}
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

      <div className={`grid grid-cols-1 ${hideRevenue || isBilling ? '' : 'lg:grid-cols-2'} gap-5`}>
        {!isBilling && (
          <Card className="p-5 pb-3 border border-slate-100 shadow-none bg-white group cursor-pointer" onClick={() => navigate('/analytics')}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest leading-none">Appointment Trends</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Daily patient visit metrics</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-clinicPrimary animate-pulse"></span>
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2EA7B8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2EA7B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" opacity={0.6} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeights: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeights: 600}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff', padding: '12px' }}
                  />
                  <Area type="monotone" dataKey="appointments" stroke="#2EA7B8" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}

        {!hideRevenue && (
          <Card className="p-5 pb-3 border border-slate-100 shadow-none bg-white group cursor-pointer" onClick={() => navigate('/analytics')}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest leading-none">Revenue Analysis</h3>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">Weekly financial growth</p>
              </div>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" opacity={0.6} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeights: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11, fontWeights: 600}} dx={-10} />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff', padding: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#F59E0B" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-6">
        <div className="lg:col-span-2 rounded-xl overflow-hidden bg-white border border-slate-100 shadow-none">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-50 bg-slate-50/50">
            <div>
              <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none">Recent Bookings</h3>
              <p className="text-[10px] text-slate-400 mt-1">Manage pending patient visits</p>
            </div>
            <button 
              onClick={() => navigate('/appointments')}
              className="text-clinicPrimary text-[10px] font-black hover:text-white hover:bg-clinicPrimary uppercase transition-colors tracking-widest px-4 py-2 rounded-md"
            >
              View Schedule
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-slate-400 font-bold text-[9px] uppercase tracking-widest border-b border-slate-50">
                  <th className="px-5 py-3">Patient Subject</th>
                  <th className="px-5 py-3">Session Time</th>
                  <th className="px-5 py-3">Practitioner Node</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Alice Johnson', id: 'PID-101', time: '10:30 AM', dr: 'Dr. Sarah Wilson', status: 'Confirmed' },
                  { name: 'James Wilson', id: 'PID-102', time: '11:45 AM', dr: 'Dr. Michael Chen', status: 'Pending' },
                  { name: 'Robert Fox', id: 'PID-103', time: '02:15 PM', dr: 'Dr. Sarah Wilson', status: 'Arrived' },
                  { name: 'Linda Grey', id: 'PID-104', time: '04:00 PM', dr: 'Dr. Michael Chen', status: 'Confirmed' }
                ].filter(row => !isTherapist || row.dr === 'Dr. Sarah Wilson').map((row, i) => (
                  <tr 
                    key={i} 
                    className="hover:bg-slate-50/50 transition-all group/row cursor-pointer"
                    onClick={() => navigate(`/patients/profile/${row.id}`)}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-clinicPrimary/10 text-clinicPrimary flex items-center justify-center font-bold text-xs">
                          {row.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover/row:text-clinicPrimary">{row.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">ID: {800+i}-PR</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{row.time}</span>
                        <span className="text-[9px] text-slate-400 uppercase mt-0.5">Today</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-slate-600">{row.dr}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded bg-slate-50 text-[9px] font-black uppercase tracking-wider ${
                        row.status === 'Confirmed' ? 'text-emerald-600' : 
                        row.status === 'Arrived' ? 'text-blue-600' : 
                        'text-amber-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/appointments'); }}
                        className="text-slate-300 hover:text-clinicPrimary ml-auto p-1"
                      >
                        <FaChevronRight size={10} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden bg-white border border-slate-100 shadow-none">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none">Clinic Activity</h3>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <div className="p-5 space-y-6 relative before:absolute before:left-[35px] before:top-8 before:bottom-8 before:w-[1px] before:bg-slate-100">
            {[
              { type: 'Physio Evolution', patient: 'Samantha Reed', time: '12 mins ago' },
              { type: 'Financial Ledger Update', patient: 'System Sync', time: '45 mins ago' },
              { type: 'New Patient Intake', patient: 'Michael Myers', time: '2 hours ago' },
              { type: 'Insurance Approval', patient: 'AXA Healthcare', time: '3 hours ago' }
            ].map((activity, i) => (
              <div key={i} className="relative pl-10 group/act cursor-pointer" onClick={() => navigate(activity.type.includes('Financial') ? '/billing' : '/patients')}>
                <div className="absolute left-0 top-0.5 w-6 h-6 rounded-md bg-white border border-slate-200 z-10 flex items-center justify-center group-hover/act:border-clinicPrimary">
                   <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none group-hover/act:text-clinicPrimary">{activity.type}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">{activity.patient}</p>
                  <p className="text-[9px] font-bold text-clinicPrimary mt-1.5 uppercase tracking-widest">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-5 bg-slate-50/50 border-t border-slate-50 text-center">
            <button 
              onClick={() => setIsActivityModalOpen(true)}
              className="text-[10px] font-black text-slate-500 hover:text-clinicPrimary uppercase tracking-[0.2em] transition-colors"
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
