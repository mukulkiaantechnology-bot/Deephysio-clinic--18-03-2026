import React, { useState } from 'react';
import { FaHeartbeat, FaChevronRight, FaShieldAlt, FaUser, FaFileInvoiceDollar, FaEnvelope, FaLock } from 'react-icons/fa';

/**
 * HIGH-FIDELITY MINIMALIST LOGIN GATEWAY
 * A centered, ultra-premium medical portal entry.
 */
const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const roleCredentials = {
    admin: { email: 'admin@deephysio.com', password: 'admin123' },
    therapist: { email: 'therapist@deephysio.com', password: 'therapist123' },
    receptionist: { email: 'receptionist@deephysio.com', password: 'receptionist123' },
    billing: { email: 'billing@deephysio.com', password: 'billing123' }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setEmail(roleCredentials[role].email);
    setPassword(roleCredentials[role].password);
  };

  const handleLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(role); 
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert('Please select a role or fill credentials.');
        return;
    }
    handleLogin(selectedRole || 'admin');
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] bg-clinicPrimary/10 rounded-full blur-[140px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-clinicSecondary/5 rounded-full blur-[120px] pointer-events-none rotate-45"></div>
      
      {/* Ultra-Fine Particle Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]"></div>

      <div className="w-full max-w-[550px] relative z-10">
        {/* Branding Area - Refined Staggered Animation */}
        <div className="flex flex-col items-center mb-0 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-white backdrop-blur-3xl rounded-[2rem] flex items-center justify-center mb-1 shadow-premium border border-white/60 group hover:rotate-12 transition-all duration-700 p-4">
              <FaHeartbeat size={32} className="text-clinicPrimary group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-[-0.05em] leading-none mb-1">
              Dee<span className="text-clinicPrimary">Physio</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">Clinical Cloud Intelligence</p>
            </div>
        </div>

        {/* The Perfection Gateway Card */}
        <div className="bg-white/80 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-premium border-2 border-transparent hover:border-clinicPrimary/30 transition-all duration-700 relative overflow-hidden group/card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
               <span className="px-3 py-1 bg-slate-900/5 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-900/5">
                 Security Layer Verified
               </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2 text-center">Institutional Access</h2>


            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-10 h-10 border-4 border-slate-900/10 border-t-clinicPrimary rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-slate-500 animate-pulse tracking-widest uppercase">Authenticating Gateway...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Node</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={12}/>
                      <input 
                        type="email" 
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100/80 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all placeholder:text-slate-200" 
                        placeholder="identity@deephysio.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={12}/>
                      <input 
                        type="password" 
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100/80 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all placeholder:text-slate-200" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-clinicPrimary text-white shadow-lg shadow-clinicPrimary/20 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-clinicPrimaryDark hover:scale-[1.01] active:scale-95 transition-all text-center cursor-pointer"
                >
                  Authorize Session
                </button>

                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[
                    { id: 'admin', label: 'Admin', icon: <FaShieldAlt size={16} />, color: 'from-slate-800 to-slate-900' },
                    { id: 'therapist', label: 'Therapist', icon: <FaHeartbeat size={16} />, color: 'from-clinicPrimary to-clinicPrimary-dark' },
                    { id: 'receptionist', label: 'Receptionist', icon: <FaUser size={14} />, color: 'from-emerald-500 to-emerald-600' },
                    { id: 'billing', label: 'Billing Staff', icon: <FaFileInvoiceDollar size={14} />, color: 'from-indigo-500 to-indigo-600' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role.id)}
                      className={`p-3 bg-white border ${selectedRole === role.id ? 'border-clinicPrimary shadow-md' : 'border-slate-100/80 hover:border-clinicPrimary/30'} rounded-xl flex flex-col items-center gap-1.5 active:scale-95 transition-all duration-300 group cursor-pointer`}
                    >
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${role.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300`}>
                        {role.icon}
                      </div>
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none group-hover:text-clinicPrimary transition-colors text-center">
                        {role.label}
                      </span>
                    </button>
                  ))}
                </div>
              </form>
            )}



            </div>
          
          {/* Internal Decorative Blurs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[60px] group-hover/card:bg-clinicPrimary/10 transition-all duration-1000"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-clinicSecondary/5 rounded-full blur-[60px]"></div>
        </div>


      </div>
    </div>
  );
};

export default Login;
