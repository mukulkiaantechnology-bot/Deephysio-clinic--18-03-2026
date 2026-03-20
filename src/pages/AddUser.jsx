import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaChevronLeft, FaShieldAlt, FaUserShield, FaKey, FaIdBadge, FaEnvelope, FaBriefcase, FaLock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Practitioner Node',
        clearance: 'Level 2 (Standard)'
    });

    const handleCommit = () => {
        if (!formData.name || !formData.email) {
            alert('Protocol Violation: Name and Email fields are required for identity provisioning.');
            return;
        }
        console.log('Provisioning Identity:', formData);
        alert('Institutional Protocol: New personnel identity successfully provisioned and synchronized with the clinical core.');
        navigate('/settings/users');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 px-4 py-12 animate-fade-in custom-scrollbar">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/settings/users')}
                        className="group flex items-center gap-3 text-slate-400 hover:text-clinicPrimary transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                    >
                        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
                        Personnel Registry
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Provision <span className="text-clinicPrimary">Identity</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] opacity-80">
                        Calibrate a new professional node and assign security clearing parameters.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-premium border border-slate-50">
                    <div className="w-3 h-3 rounded-full bg-clinicPrimary animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Auth Protocol Alpha-1</span>
                </div>
            </div>

            {/* Main Form Card */}
            <Card className="rounded-[40px] shadow-premium border-none bg-white overflow-hidden group">
                <div className="p-10 md:p-16 space-y-12">
                    
                    {/* Section 1: Biometric Identity */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-soft">
                                <FaIdBadge size={18} />
                            </div>
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em]">Initial Biometric Identity</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Personnel Name</label>
                                <div className="relative group/input">
                                    <FaIdBadge className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Full legal name..."
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Institutional Connectivity (Email)</label>
                                <div className="relative group/input">
                                    <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" />
                                    <input 
                                        type="email" 
                                        placeholder="professional.node@clinic.com"
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-50 w-full"></div>

                    {/* Section 2: Security Parameters */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shadow-soft">
                                <FaShieldAlt size={18} />
                            </div>
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em]">Access Control & Permissions</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Institutional Role</label>
                                <div className="relative group/input">
                                    <FaBriefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" />
                                    <select 
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer appearance-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option>Admin</option>
                                        <option>Therapist</option>
                                        <option>Receptionist</option>
                                        <option>Billing Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Clearing Level</label>
                                <div className="relative group/input">
                                    <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" />
                                    <select 
                                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer appearance-none"
                                        value={formData.clearance}
                                        onChange={(e) => setFormData({...formData, clearance: e.target.value})}
                                    >
                                        <option>Level 1 (Basic)</option>
                                        <option>Level 2 (Standard)</option>
                                        <option>Level 3 (Clinical)</option>
                                        <option>Level 4 (Admin)</option>
                                        <option>Level 5 (Restricted)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action Bar */}
                <div className="bg-slate-50/50 p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-soft animate-pulse">
                            <FaKey size={18} />
                        </div>
                        <div>
                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1 text-left">Identity Sync Ready</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] text-left">Real-time encryption active</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-12 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest border-none shadow-premium hover:bg-slate-100 transition-all font-sans"
                            onClick={() => navigate('/settings/users')}
                        >
                            Abort Protocol
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-12 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all font-sans"
                            onClick={handleCommit}
                            leftIcon={<FaUserPlus />}
                        >
                            Authorize Provisioning
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AddUser;
