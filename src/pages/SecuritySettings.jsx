import React from 'react';
import { FaShieldAlt, FaKey, FaUserLock, FaHistory, FaMobileAlt, FaUniversalAccess, FaSave, FaCheckCircle } from 'react-icons/fa';

const SecuritySettings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Security Configuration</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Harden your clinical data protection and manage access security.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg  p-3">
          <FaSave size={12}/> Update Security
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="card-clinic p-10 bg-white border-none shadow-xl">
           <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-clinicLight text-clinicPrimary flex items-center justify-center shadow-sm">
                 <FaMobileAlt size={28}/>
              </div>
              <div>
                 <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none mb-1">Two-Factor Authentication</h3>
                 <p className="text-base font-bold text-gray-400 uppercase tracking-widest">Add an extra layer of security to staff logins.</p>
              </div>
           </div>
           
           <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-4">
                 <FaCheckCircle className="text-green-500" size={20}/>
                 <div className="flex flex-col">
                    <span className="text-base font-black text-gray-900 uppercase tracking-tight leading-none mb-1">2FA is Currently Enabled</span>
                    <span className="text-base font-bold text-gray-400 uppercase tracking-widest">Primary Method: Google Authenticator</span>
                 </div>
              </div>
              <button className="text-base font-black text-red-500 uppercase tracking-widest hover:underline">Disable Method</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="card-clinic p-10 bg-white border-none shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                 <FaKey className="text-clinicPrimary" size={20}/>
                 <h3 className="text-base font-black text-gray-900 uppercase tracking-widest">Password Policy</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { label: 'Min Complexity', active: true },
                   { label: 'Expiry (90 Days)', active: true },
                   { label: 'Auto-lock (15m)', active: false },
                 ].map(policy => (
                   <div key={policy.label} className="flex items-center justify-between">
                      <span className="text-base font-black text-gray-600 uppercase tracking-tight">{policy.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" defaultChecked={policy.active} />
                         <div className="w-10 h-5 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-clinicPrimary"></div>
                      </label>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card-clinic p-10 bg-white border-none shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                 <FaUserLock className="text-clinicPrimary" size={20}/>
                 <h3 className="text-base font-black text-gray-900 uppercase tracking-widest">IP Whitelisting</h3>
              </div>
              <div className="space-y-4">
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-base font-black text-gray-400 uppercase tracking-widest">
                    Office Network: 192.168.1.1
                 </div>
                 <button className="w-full py-3 bg-clinicLight text-clinicPrimary rounded-xl text-base font-black uppercase tracking-widest hover:bg-clinicPrimary hover:text-white transition-all">Add New IP</button>
              </div>
           </div>
        </div>

        <div className="card-clinic p-10 bg-clinicDark text-white border-none shadow-2xl overflow-hidden relative group">
           <FaHistory className="absolute -right-8 -bottom-8 text-white/5 text-[150px] rotate-12 group-hover:rotate-0 transition-transform duration-700"/>
           <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-clinicPrimary">
                 <FaUniversalAccess size={24}/>
              </div>
              <div>
                 <h4 className="text-base font-black uppercase tracking-tight text-white mb-1">Global Audit Log</h4>
                 <p className="text-base font-bold text-slate-400 uppercase tracking-widest">Trace every sensitive data access and modification event.</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-clinicPrimary hover:text-white transition-all relative z-10">View Access History</button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
