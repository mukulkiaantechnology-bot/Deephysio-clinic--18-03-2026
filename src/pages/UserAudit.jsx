import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaShieldAlt, FaHistory, FaFingerprint, FaNetworkWired, FaServer, FaUserTag, FaDownload } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const UserAudit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        id: 'US-801',
        name: 'Dr. Sarah Wilson',
        role: 'Clinical Owner',
        clearance: 'Level 5 (Restricted)',
        status: 'Authorized',
        lastLogin: '10 mins ago'
    });

    useEffect(() => {
        const users = [
            { id: 'US-801', name: 'Dr. Sarah Wilson', role: 'Clinical Owner', clearance: 'Level 5 (Restricted)', status: 'Authorized', lastLogin: '10 mins ago' },
            { id: 'US-802', name: 'Dr. Michael Chen', role: 'Senior Practitioner', clearance: 'Level 4 (Admin)', status: 'Authorized', lastLogin: '2h ago' },
            { id: 'US-803', name: 'John Miller', role: 'Operations Desk', clearance: 'Level 2 (Standard)', status: 'Authorized', lastLogin: 'Yesterday' },
            { id: 'US-800', name: 'System Root', role: 'Super Admin', clearance: 'Level 5 (Restricted)', status: 'Authorized', lastLogin: 'Synchronized' },
            { id: 'US-805', name: 'Emily Rose', role: 'Junior Practitioner', clearance: 'Level 3 (Clinical)', status: 'Revoked', lastLogin: '3 weeks ago' },
        ];
        
        const found = users.find(u => u.id === id);
        if (found) setUser(found);
    }, [id]);

    const auditLogs = [
        { id: 'LOG-001', action: 'Institutional Login', timestamp: '2026-03-20 09:12:45', status: 'Success', node: 'Primary Gateway' },
        { id: 'LOG-002', action: 'Data Synchronization', timestamp: '2026-03-20 10:05:12', status: 'Verified', node: 'Cloud-Sync-Alpha' },
        { id: 'LOG-003', action: 'Identity Validation', timestamp: '2026-03-20 11:30:00', status: 'Authorized', node: 'Security-Core' },
        { id: 'LOG-004', action: 'Resource Allocation', timestamp: '2026-03-19 16:45:22', status: 'Success', node: 'Ops-Matrix' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 px-4 py-12 animate-fade-in custom-scrollbar">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div className="space-y-4 text-left">
                    <button 
                        onClick={() => navigate('/settings/users')}
                        className="group flex items-center gap-3 text-slate-400 hover:text-clinicPrimary transition-all font-black text-[10px] uppercase tracking-[0.3em]"
                    >
                        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
                        Personnel Registry
                    </button>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Personnel <span className="text-clinicPrimary">Audit</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] opacity-80">
                        Diagnostic log for identity: <span className="text-clinicPrimary">{id}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-premium border border-slate-50">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Protocol Monitor Active</span>
                </div>
            </div>

            {/* Profile Overview Card */}
            <Card className="rounded-[40px] shadow-premium border-none bg-white overflow-hidden p-10 md:p-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                    <div className="space-y-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                             <FaUserTag className="text-clinicPrimary" /> Professional Node
                         </p>
                         <p className="text-[18px] font-black text-slate-900 uppercase tracking-tight">{user.name}</p>
                         <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-70">{user.role}</p>
                    </div>
                    <div className="space-y-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                             <FaShieldAlt className="text-clinicPrimary" /> Access Level
                         </p>
                         <p className="text-[18px] font-black text-slate-900 uppercase tracking-tight">{user.clearance}</p>
                         <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${user.status === 'Authorized' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-70">{user.status}</span>
                         </div>
                    </div>
                    <div className="space-y-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                             <FaHistory className="text-clinicPrimary" /> Temporal Sync
                         </p>
                         <p className="text-[18px] font-black text-slate-900 uppercase tracking-tight">Active Connection</p>
                         <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-70">Last active: {user.lastLogin}</p>
                    </div>
                </div>
                <FaNetworkWired className="absolute -right-10 -bottom-10 text-slate-50 text-[180px] opacity-30 transform -rotate-12 pointer-events-none" />
            </Card>

            {/* Audit Logs */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
                         <FaServer className="text-clinicPrimary" /> System Event Log
                    </h3>
                    <Button variant="secondary" className="px-6 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 shadow-soft" leftIcon={<FaDownload />}>Export Protocol</Button>
                </div>

                <div className="space-y-4">
                    {auditLogs.map(log => (
                        <Card key={log.id} className="p-8 border-none shadow-premium bg-white group hover:translate-x-2 transition-all cursor-pointer rounded-[32px]">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 group-hover:bg-clinicPrimary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                                        <FaFingerprint size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[14px] font-black text-slate-900 uppercase tracking-tight mb-1">{log.action}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {log.id} • Node: {log.node}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-10">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[12px] font-black text-slate-700 tracking-tighter">{log.timestamp}</p>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Temporal Stamp</p>
                                    </div>
                                    <div className="px-5 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-soft">
                                        {log.status}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            
            <div className="pt-10 flex justify-center">
                <Button 
                    variant="accent" 
                    className="px-12 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all font-sans"
                    onClick={() => navigate('/settings/users')}
                >
                    Dismiss Protocol Monitor
                </Button>
            </div>
        </div>
    );
};

export default UserAudit;
