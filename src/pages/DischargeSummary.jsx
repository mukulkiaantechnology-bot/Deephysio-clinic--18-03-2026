import React, { useState } from 'react';
import { 
  FaFileAlt, FaCheckDouble, FaChartLine, FaUserGraduate, 
  FaArrowLeft, FaSave, FaHandshake, FaClipboardCheck, FaExclamationTriangle
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const DischargeSummary = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Clinical File Finalized: Patient discharged with optimized outcome trajectory.');
            navigate(-1);
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 p-6 md:p-10 animate-fade-in font-sans custom-scrollbar">
            {/* Header */}
            <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-slate-900 text-white relative overflow-hidden group rounded-[40px]">
                <div className="flex items-center gap-8 relative z-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 shadow-premium flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                    >
                        <FaArrowLeft size={16}/>
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Discharge Summary</h1>
                        <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">FINAL CLINICAL CLOSURE & OUTCOME AUDIT</p>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    <Button 
                        variant="accent" 
                        size="lg" 
                        className="rounded-[24px] h-14 px-10 shadow-google text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all bg-emerald-500 hover:bg-emerald-600 border-none"
                        onClick={handleSave}
                        disabled={isSaving}
                        leftIcon={<FaCheckDouble />}
                    >
                        {isSaving ? 'Finalizing File...' : 'Final Discharge'}
                    </Button>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-[40px]"></div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    {/* Outcome Achievement */}
                    <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Outcome Synthesis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Pain Level (VAS)</label>
                                <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[18px] font-black text-slate-400" value="8/10" readOnly />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discharge Pain Level (VAS)</label>
                                <input type="text" className="w-full p-5 bg-emerald-50 rounded-2xl border border-emerald-100 text-[18px] font-black text-emerald-600 outline-none" placeholder="e.g. 1/10" />
                            </div>
                        </div>
                        <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Achievement of Goals</label>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Full Functionality Restore', 'Return to Work', 'Pain Management Proficiency', 'Independent HEP Compliance'].map(goal => (
                                    <div key={goal} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-emerald-500 transition-all cursor-pointer">
                                        <div className="w-5 h-5 rounded border-2 border-slate-200 group-hover:border-emerald-500 transition-all flex items-center justify-center">
                                            <FaCheckDouble size={10} className="text-emerald-500 opacity-0 group-hover:opacity-100" />
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-600">{goal}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </Card>

                    {/* Summary & Recommendations */}
                    <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Clinical Narrative Summary
                        </h3>
                        <textarea className="w-full min-h-[160px] p-8 bg-slate-50 border border-slate-100 rounded-[28px] text-[14px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5" placeholder="Document overall progress, treatment response, and reason for discharge..."></textarea>
                        
                        <div className="space-y-6">
                            <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <FaClipboardCheck className="text-amber-500"/> Ongoing Maintenance Recommendations
                            </label>
                            <textarea className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[24px] text-[13px] font-bold outline-none" placeholder="Future exercises, activity levels, and warning signs to monitor..."></textarea>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="p-10 border-none shadow-premium bg-emerald-500 text-white rounded-[40px] relative overflow-hidden group">
                         <div className="relative z-10 flex flex-col items-center text-center">
                            <FaUserGraduate size={48} className="mb-8 opacity-20" />
                            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4">Patient Evolution</h4>
                            <p className="text-4xl font-black tracking-tighter mb-4">OPTIMIZED</p>
                            <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">Electronic Record: STABLE</p>
                         </div>
                         <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
                    </Card>

                    <Card className="p-10 border-none shadow-premium bg-white rounded-[40px] border-l-8 border-clinicPrimary">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-clinicPrimary/5 rounded-2xl flex items-center justify-center text-clinicPrimary shadow-soft"><FaChartLine size={20}/></div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">Clinical Statistics</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Sessions</span>
                                <span className="text-[14px] font-black text-slate-900">12</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ROM Achievement</span>
                                <span className="text-[14px] font-black text-emerald-500">95%</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duration Profile</span>
                                <span className="text-[14px] font-black text-slate-900">42 Days</span>
                            </div>
                        </div>
                    </Card>

                    <div className="p-10 bg-slate-100 rounded-[40px] border border-slate-200 group">
                        <div className="flex items-center gap-4 mb-6">
                            <FaHandshake className="text-slate-300 group-hover:text-clinicPrimary transition-colors" size={24}/>
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Formal Handover</h4>
                        </div>
                        <p className="text-[12px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest mb-8">Discharge summary will be transmitted to the referring physician and primary care provider automatically.</p>
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                            <FaExclamationTriangle className="text-amber-500" size={14}/>
                            <span className="text-[9px] font-black text-slate-900 uppercase">Awaiting Physician E-Sign</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DischargeSummary;
