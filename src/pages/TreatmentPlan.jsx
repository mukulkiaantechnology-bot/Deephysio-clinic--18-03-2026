import React, { useState } from 'react';
import { 
  FaBullseye, FaCalendarCheck, FaChartLine, FaClipboardCheck, 
  FaArrowLeft, FaSave, FaPlus, FaTrash, FaInfoCircle, FaStethoscope
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const TreatmentPlan = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);

    const [plan, setPlan] = useState({
        goals: [
            { id: 1, type: 'Short-term', description: 'Reduce VAS pain score from 8/10 to 4/10 within 2 weeks.', targetDate: '2026-04-02' },
            { id: 2, type: 'Long-term', description: 'Return to full-time work and gym activities (Squats @ 60kg).', targetDate: '2026-05-15' }
        ],
        modalities: ['Manual Therapy', 'Dry Needling', 'Therapeutic Exercise', 'Education'],
        frequency: '2 sessions / week',
        duration: '6 weeks',
        prognosis: 'Good - Patient highly motivated for rehabilitation.'
    });

    const handleAddGoal = () => {
        const newGoal = {
            id: Date.now(),
            type: 'Short-term',
            description: '',
            targetDate: ''
        };
        setPlan({...plan, goals: [...plan.goals, newGoal]});
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Clinical Strategy Optimized: Treatment plan synchronized with patient trajectory.');
            navigate(-1);
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 p-6 md:p-10 animate-fade-in font-sans custom-scrollbar">
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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Treatment Plan</h1>
                        <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">STRATEGIC GOAL SETTING & REHABILITATION MATRIX</p>
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
                        {isSaving ? 'Archiving...' : 'Save Strategy'}
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    {/* Goals Section */}
                    <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Treatment Goals
                            </h3>
                            <button onClick={handleAddGoal} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-clinicPrimary uppercase tracking-widest hover:bg-clinicPrimary hover:text-white transition-all">Add Goal</button>
                        </div>
                        
                        <div className="space-y-6">
                            {plan.goals.map((goal, idx) => (
                                <div key={goal.id} className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 group hover:bg-white hover:shadow-google transition-all flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${goal.type === 'Short-term' ? 'bg-blue-50 text-blue-500' : 'bg-indigo-50 text-indigo-500'}`}>{goal.type} Node</span>
                                            <input type="text" className="flex-1 bg-transparent border-none text-[14px] font-black text-slate-800 outline-none" placeholder="Goal description..." defaultValue={goal.description} />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-48 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Date</label>
                                        <input type="date" className="w-full p-3 bg-white border border-slate-100 rounded-xl text-[12px] font-bold outline-none" defaultValue={goal.targetDate} />
                                    </div>
                                    <button className="self-center p-3 text-slate-200 hover:text-rose-500 transition-colors"><FaTrash size={12}/></button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Modalities & Methods */}
                    <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-8">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div> Modalities & Protocols
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Manual Therapy', 'Exercise Therapy', 'Dry Needling', 'Shockwave', 'Taping', 'Education', 'Massage', 'Hydrotherapy'].map(m => (
                                <div key={m} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-clinicPrimary/20 cursor-pointer group transition-all">
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-clinicPrimary transition-all"></div>
                                    <span className="text-[11px] font-bold text-slate-600">{m}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="p-10 border-none shadow-premium bg-slate-900 text-white rounded-[40px] relative overflow-hidden group">
                         <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] mb-10">Dosage Control</h4>
                         <div className="space-y-8">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">Protocol Frequency</label>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black uppercase">{plan.frequency}</span>
                                    <FaCalendarCheck className="text-clinicPrimary" size={20}/>
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">Duration Node</label>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black uppercase">{plan.duration}</span>
                                    <FaClipboardCheck className="text-amber-500" size={20}/>
                                </div>
                            </div>
                         </div>
                         <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-3xl"></div>
                    </Card>

                    <Card className="p-10 border-none shadow-premium bg-white rounded-[40px] border-t-8 border-emerald-500">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-soft"><FaChartLine size={20}/></div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">Expected Outcome</h4>
                        </div>
                        <textarea className="w-full min-h-[140px] p-5 bg-slate-50 border border-slate-100 rounded-[28px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-emerald-500/5" defaultValue={plan.prognosis} placeholder="Summarize clinical expectations..."></textarea>
                    </Card>

                    <div className="p-10 bg-clinicPrimary rounded-[40px] text-white space-y-6 shadow-google">
                        <FaStethoscope size={32} className="opacity-40" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em]">Therapist Node</h4>
                        <p className="text-[14px] font-black tracking-tight leading-relaxed italic opacity-80">"Rehabilitation strategy focused on biomechanical correction and progressive loading."</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentPlan;
