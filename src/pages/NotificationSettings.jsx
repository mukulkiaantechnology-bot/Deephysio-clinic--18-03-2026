import React from 'react';
import { FaBell, FaSms, FaEnvelope, FaRobot, FaCalendarCheck, FaMoneyBillWave, FaShieldAlt, FaSave, FaSyncAlt } from 'react-icons/fa';

const NotificationSettings = () => {
  const sections = [
    { title: 'Clinic Operations', icon: <FaCalendarCheck />, items: ['New Appointment Booking', 'Waitlist Availability', 'Schedule Changes'] },
    { title: 'Patient Communication', icon: <FaEnvelope />, items: ['Incoming SMS/Emails', 'Recall Alerts', 'Post-Op Reminders'] },
    { title: 'Billing & Payments', icon: <FaMoneyBillWave />, items: ['Online Payment Success', 'Insurance Claim Updates', 'Overdue Deposit Alerts'] },
    { title: 'System & Security', icon: <FaShieldAlt />, items: ['New Login Detected', 'Data Backup Status', 'Role Change Alerts'] },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Notification Preferences</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Customize how and when you stay informed about clinic activity.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg  p-3">
          <FaSave size={12}/> Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map(section => (
          <div key={section.title} className="card-clinic p-8 bg-white border-none shadow-xl hover:shadow-2xl transition-all group">
             <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-clinicLight text-clinicPrimary rounded-2xl shadow-sm border border-clinicPrimary/5 transition-transform group-hover:rotate-12 duration-500">
                   {section.icon}
                </div>
                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">{section.title}</h3>
             </div>

             <div className="space-y-6">
                {section.items.map(item => (
                   <div key={item} className="flex items-center justify-between group/row">
                      <div className="flex flex-col">
                         <span className="text-base font-black text-gray-700 uppercase tracking-tight leading-none mb-1 group-hover/row:text-clinicPrimary transition-colors">{item}</span>
                         <span className="text-base font-bold text-gray-400 uppercase tracking-widest">Push, SMS, and Email</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 rounded-xl">
                            <button className="text-gray-300 hover:text-blue-500 transition-colors"><FaEnvelope size={12}/></button>
                            <button className="text-blue-500"><FaSms size={12}/></button>
                            <button className="text-gray-300 hover:text-clinicPrimary transition-colors"><FaBell size={12}/></button>
                         </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-clinicPrimary"></div>
                         </label>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        ))}
      </div>

      <div className="card-clinic p-8 bg-clinicDark text-white border-none shadow-2xl flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-clinicPrimary/10 border border-clinicPrimary/20 flex items-center justify-center text-clinicPrimary">
               <FaSyncAlt size={28} className="animate-spin-slow"/>
            </div>
            <div>
               <h4 className="text-base font-black uppercase tracking-tight text-white mb-1">Global Quiet Hours</h4>
               <p className="text-base font-bold text-slate-400 uppercase tracking-widest">Suppress automation during clinic off-hours (22:00 - 06:00).</p>
            </div>
         </div>
         <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-clinicPrimary hover:text-white transition-all">Configure Schedule</button>
      </div>
    </div>
  );
};

export default NotificationSettings;
