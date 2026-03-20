import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaClock, FaUserCircle, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddReminderRulePage = () => {
    const navigate = useNavigate();
    const [rule, setRule] = useState({
        patient: '',
        amount: '',
        age: '7 Days',
        method: 'Email',
        status: 'Courteous Prompt'
    });

    const handleSave = () => {
        if (!rule.patient || !rule.amount) {
            alert('Please provide patient name and amount for the clinical reminder node.');
            return;
        }

        const saved = JSON.parse(localStorage.getItem('deephysio_reminders') || '[]');
        const newRule = {
            ...rule,
            id: Date.now(),
            isPaused: false,
            amount: `$${parseFloat(rule.amount).toFixed(2)}`
        };

        const updated = [newRule, ...saved];
        localStorage.setItem('deephysio_reminders', JSON.stringify(updated));
        
        alert('Automation Rule Vector Successfully Deployed.');
        navigate('/billing/reminders');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/billing/reminders')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Configure Rule</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Initialize Automated Debt Recovery Protocol</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
                <div className="p-10 space-y-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                             <FaUserCircle className="text-clinicPrimary" /> Target Patient
                        </label>
                        <input 
                            type="text" 
                            placeholder="Select patient for automation queue..." 
                            className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                            value={rule.patient}
                            onChange={e => setRule({...rule, patient: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaShieldAlt className="text-clinicPrimary" /> Overdue Amount ($)
                            </label>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                                value={rule.amount}
                                onChange={e => setRule({...rule, amount: e.target.value})}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaClock className="text-clinicPrimary" /> Threshold Age
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={rule.age}
                                onChange={e => setRule({...rule, age: e.target.value})}
                            >
                                <option value="7 Days">7 Days Overdue (Initial)</option>
                                <option value="14 Days">14 Days Overdue (Soft Warning)</option>
                                <option value="30 Days">30 Days Overdue (Standard)</option>
                                <option value="60+ Days">60+ Days Overdue (Final)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaEnvelope className="text-clinicPrimary" /> Communication Channel
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={rule.method}
                                onChange={e => setRule({...rule, method: e.target.value})}
                            >
                                <option value="Email">Email Only</option>
                                <option value="SMS">SMS Only</option>
                                <option value="Dual">Email & SMS (Recommended)</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaClock className="text-clinicPrimary" /> Logic Preset
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={rule.status}
                                onChange={e => setRule({...rule, status: e.target.value})}
                            >
                                <option value="Courteous Prompt">Courteous Prompt (Friendly)</option>
                                <option value="First Warning">First Warning (Direct)</option>
                                <option value="Third Warning">Third Warning (Escalated)</option>
                                <option value="Final Notice">Final Notice (Critical)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Automation Engine v4.2 Ready</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                            onClick={() => navigate('/billing/reminders')}
                        >
                            Discard
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleSave} 
                            leftIcon={<FaPlus />}
                        >
                            Deploy Rule
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AddReminderRulePage;
