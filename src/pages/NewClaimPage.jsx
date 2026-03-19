import React, { useState } from 'react';
import { 
  FaFileInvoiceDollar, FaUser, FaBuilding, FaCalendarAlt, 
  FaDollarSign, FaArrowLeft, FaSave, FaClipboardCheck
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const NewClaimPage = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Claim Node Initialized: Electronic submission dispatched to provider gateway.');
            navigate('/billing/claims');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 p-6 md:p-10 animate-fade-in font-sans custom-scrollbar">
            {/* Header */}
            <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
                <div className="flex items-center gap-8 relative z-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90"
                    >
                        <FaArrowLeft size={16}/>
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">New Insurance Claim</h1>
                        <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">CLAIM INITIALIZATION & REIMBURSEMENT PROTOCOL</p>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    <Button 
                        variant="accent" 
                        size="lg" 
                        className="rounded-[24px] h-14 px-10 shadow-google text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        onClick={handleSave}
                        disabled={isSaving}
                        leftIcon={<FaSave />}
                    >
                        {isSaving ? 'Submitting...' : 'Submit Claim'}
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Patient Metadata
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Patient</label>
                            <div className="relative">
                                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input type="text" className="w-full pl-14 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="Search patient name..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input type="date" className="w-full pl-14 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div> Provider Details
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Insurance Provider</label>
                            <div className="relative">
                                <FaBuilding className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                <select className="w-full pl-14 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none appearance-none">
                                    <option>BUPA</option>
                                    <option>AXA</option>
                                    <option>Vitality</option>
                                    <option>Cigna</option>
                                    <option>Private Health</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Claim Amount</label>
                            <div className="relative">
                                <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input type="text" className="w-full pl-14 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="0.00" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="md:col-span-2 p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Diagnosis & Coding
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ICD-10 / Treatment Code</label>
                            <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="e.g. M54.5" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Description</label>
                            <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="Short description of service..." />
                        </div>
                    </div>
                </Card>
            </div>

            <div className="p-10 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <FaClipboardCheck className="text-clinicPrimary" size={24}/>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">Compliance Check</h4>
                    </div>
                    <p className="text-lg font-black tracking-tight leading-tight">All clinical prerequisites verified. System ready for submission.</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-clinicPrimary/10 rounded-full blur-3xl group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
            </div>
        </div>
    );
};

export default NewClaimPage;
