import React from 'react';
import { FaShieldAlt, FaKey, FaUserLock, FaHistory, FaMobileAlt, FaUniversalAccess, FaSave, FaCheckCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const SecuritySettings = () => {
  const navigate = useNavigate();
  return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Security Configuration</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Harden Clinical Data & Access Protocols</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
                <div className="p-10 space-y-12">
                    {/* 2FA Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Authentification Factor</h3>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-white hover:shadow-google transition-all">
                            <div className="flex items-center gap-6 text-center md:text-left">
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-clinicPrimary">
                                    <FaMobileAlt size={24}/>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Two-Factor Authenticator</h4>
                                        <div className="px-3 py-1 bg-emerald-500 rounded-full text-[8px] font-black text-white uppercase shadow-sm">Active</div>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Google Auth Node: rehan@physio.com</p>
                                </div>
                            </div>
                            <button className="px-8 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-95">Disable Protocol</button>
                        </div>
                    </div>

                    {/* Policy Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-50">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Password Cryptography</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Minimum Complexity', active: true },
                                    { label: 'Expiry (90 Day Cycle)', active: true },
                                    { label: 'Auto-Term Session', active: false },
                                ].map(policy => (
                                    <div key={policy.label} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{policy.label}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={policy.active} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-clinicPrimary shadow-inner"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Network Whitelist</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group shadow-premium">
                                    <div className="relative z-10 flex flex-col gap-2">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Authorized Segment</span>
                                        <span className="text-xl font-black tracking-tighter">192.168.1.1</span>
                                    </div>
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <FaUserLock size={40}/>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-clinicPrimary hover:text-clinicPrimary transition-all">Add IP Node</button>
                            </div>
                        </div>
                    </div>

                    {/* Audit Vector */}
                    <div className="p-8 bg-indigo-600 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-premium">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                                <FaHistory className="text-indigo-200" size={20}/>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Global Audit Matrix</h4>
                            </div>
                            <p className="text-sm font-black tracking-tighter opacity-90 uppercase tracking-widest leading-none">Trace system-wide access events in real-time</p>
                        </div>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 relative z-10 shadow-lg">View Logs</button>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Protocol Hardened</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white text-slate-400" 
                            onClick={() => navigate(-1)}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={() => alert('Security Protocol Hardened Successfully.')}
                        >
                            Update Protocol
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SecuritySettings;
