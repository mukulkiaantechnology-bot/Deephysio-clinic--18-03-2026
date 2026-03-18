import React, { useState } from 'react';
import { FaHeartbeat, FaChevronRight, FaShieldAlt, FaUser, FaFileInvoiceDollar } from 'react-icons/fa';

/**
 * HIGH-FIDELITY MINIMALIST LOGIN GATEWAY
 * A centered, ultra-premium medical portal entry.
 */
const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (role) => {
    setLoading(true);
    // Professional fake auth delay
    setTimeout(() => {
      setLoading(false);
      onLogin(role); 
    }, 800);
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] bg-clinicPrimary/10 rounded-full blur-[140px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-clinicSecondary/5 rounded-full blur-[120px] pointer-events-none rotate-45"></div>
      
      {/* Ultra-Fine Particle Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')]"></div>

      <div className="w-full max-w-[440px] relative z-10">
        {/* Branding Area - Refined Staggered Animation */}
        <div className="flex flex-col items-center mb-10 text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="w-22 h-22 bg-white backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center mb-6 shadow-premium border border-white/60 group hover:rotate-12 transition-all duration-700 p-5">
              <FaHeartbeat size={42} className="text-clinicPrimary group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-[-0.05em] leading-none mb-3">
              Dee<span className="text-clinicPrimary">Physio</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Clinical Cloud Intelligence</p>
            </div>
        </div>

        {/* The Perfection Gateway Card */}
        <div className="bg-white/80 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-premium border-2 border-transparent hover:border-clinicPrimary/30 transition-all duration-700 relative overflow-hidden group/card animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="relative z-10">
            <div className="flex justify-center mb-8">
               <span className="px-4 py-1.5 bg-slate-900/5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-900/5">
                 Security Layer Verified
               </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3 text-center">Institutional Access</h2>
            <p className="text-[13px] font-medium text-slate-500 text-center mb-12 leading-relaxed opacity-80">
              Authorized clinical personnel only. Access is tracked and encrypted via enterprise-grade HIPAA protocols.
            </p>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-10 h-10 border-4 border-slate-900/10 border-t-clinicPrimary rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-slate-500 animate-pulse tracking-widest uppercase">Authenticating Gateway...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { id: 'admin', label: 'Admin', icon: <FaShieldAlt size={20} />, color: 'from-slate-800 to-slate-900' },
                  { id: 'therapist', label: 'Therapist', icon: <FaHeartbeat size={20} />, color: 'from-clinicPrimary to-clinicPrimary-dark' },
                  { id: 'receptionist', label: 'Receptionist', icon: <FaUser size={18} />, color: 'from-emerald-500 to-emerald-600' },
                  { id: 'billing', label: 'Billing Staff', icon: <FaFileInvoiceDollar size={18} />, color: 'from-indigo-500 to-indigo-600' },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleLogin(role.id)}
                    className="p-6 bg-white backdrop-blur-3xl border border-slate-100/80 rounded-3xl flex flex-col items-center gap-3 hover:shadow-premium hover:border-clinicPrimary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {role.icon}
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none group-hover:text-clinicPrimary transition-colors">
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-12 pt-10 border-t border-slate-100/50 flex flex-col items-center gap-5">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl border border-emerald-100 shadow-inner-soft hover:bg-emerald-100 transition-colors cursor-default">
                  <FaShieldAlt size={12} className="animate-pulse" />
                  HIPAA Secured Protocol
              </div>
              <div className="flex items-center gap-6 opacity-40">
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">v2.1 Premium</p>
                 <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">Build ID: DPH-2026</p>
              </div>
            </div>
          </div>
          
          {/* Internal Decorative Blurs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[60px] group-hover/card:bg-clinicPrimary/10 transition-all duration-1000"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-clinicSecondary/5 rounded-full blur-[60px]"></div>
        </div>

        {/* Refined System Support */}
        <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <button className="text-[10px] font-black text-slate-400 hover:text-clinicPrimary transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 mx-auto group">
            <span className="w-8 h-[1px] bg-slate-200 group-hover:w-12 group-hover:bg-clinicPrimary transition-all"></span>
            Contact Tier-1 Support
            <span className="w-8 h-[1px] bg-slate-200 group-hover:w-12 group-hover:bg-clinicPrimary transition-all"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
