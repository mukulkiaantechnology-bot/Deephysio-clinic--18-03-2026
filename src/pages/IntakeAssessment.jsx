import React, { useState } from 'react';
import { 
  FaClipboardList, FaStethoscope, FaHistory, FaRunning, FaCapsules, 
  FaHeartbeat, FaSearch, FaPlus, FaCheckCircle, FaExclamationTriangle,
  FaArrowLeft, FaSave, FaEdit, FaFlask, FaBrain, FaBed
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const IntakeAssessment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('Chief Complaint');

    const [form, setForm] = useState({
        // 3. Chief Complaint
        complaint: '',
        onsetDate: '',
        mechanism: '', // injury / gradual / accident
        affectedArea: '',
        painLevel: { current: 5, best: 2, worst: 8 },

        // 4. Symptoms
        symptomTypes: { pain: true, stiffness: false, weakness: false, numbness: false },
        painType: 'Dull', // Sharp, Burning, Throbbing
        aggravatingFactors: '',
        easingFactors: '',
        radiation: '',

        // 5. Functional Impact
        impact: { work: '', exercise: '', sleep: '', adls: '', driving: '' },

        // 6. Medical History
        conditions: '',
        previousInjuries: '',
        surgeries: '',
        imaging: { xray: false, mri: false, ct: false, ultrasound: false },

        // 7. Medications & Allergies
        medications: '',
        supplements: '',
        allergies: '',

        // 8. Lifestyle
        lifestyle: { height: '', weight: '', exerciseFreq: '', diet: '', alcohol: '', stress: '' }
    });

    const sections = [
        'Chief Complaint', 
        'Symptoms & Pain', 
        'Functional Impact', 
        'Medical History', 
        'Meds & Lifestyle'
    ];

    React.useEffect(() => {
        const savedData = localStorage.getItem(`deephysio_intake_${id}`);
        if (savedData) {
            setForm(JSON.parse(savedData));
        }
    }, [id]);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem(`deephysio_intake_${id}`, JSON.stringify(form));
        setTimeout(() => {
            setIsSaving(false);
            alert('Intake Protocol Committed: Comprehensive clinical node synchronized.');
            navigate(-1);
        }, 2000);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Intake Assessment</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Comprehensive Clinical Narrative Protocol</p>
                </div>
            </div>

            {/* Navigation Tabs - Refined */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
                {sections.map(s => (
                    <button
                        key={s}
                        onClick={() => setActiveSection(s)}
                        className={`px-6 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border ${
                            activeSection === s 
                            ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-google' 
                            : 'bg-white text-slate-400 border-slate-50 hover:border-clinicPrimary/20'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
                <div className="p-10 space-y-10 flex-1">
                    {activeSection === 'Chief Complaint' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Condition Narrative</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Reason for Visit</label>
                                    <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" placeholder="e.g. Chronic Low Back Pain" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Onset Date</label>
                                    <input type="date" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mechanism</label>
                                    <select className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none">
                                        <option>Gradual Onset</option>
                                        <option>Acute Injury</option>
                                        <option>Accident</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intensity Vector</label>
                                    <div className="p-4 bg-slate-900 rounded-2xl flex items-center justify-between">
                                        <input type="range" min="0" max="10" className="w-32 accent-clinicPrimary h-1.5" />
                                        <span className="text-clinicPrimary font-black text-xl">5</span>
                                    </div>
                                </div>
                            </div>
                            <textarea className="w-full min-h-[160px] p-8 bg-slate-50 rounded-[32px] border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5 shadow-inner-soft" placeholder="Describe clinical symptoms and onset narrative..."></textarea>
                        </div>
                    )}

                    {activeSection === 'Symptoms & Pain' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Symptom Mapping</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {['Pain', 'Stiffness', 'Weakness', 'Numbness', 'Tingling', 'Instability'].map(t => (
                                    <div key={t} className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-google transition-all cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded-md accent-clinicPrimary" />
                                        <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{t}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-rose-50/30 rounded-[32px] border border-rose-100 space-y-4">
                                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Aggravating Factors</label>
                                    <textarea className="w-full bg-transparent border-none outline-none font-bold text-sm h-20 placeholder:text-rose-200" placeholder="What makes it worse?"></textarea>
                                </div>
                                <div className="p-8 bg-emerald-50/30 rounded-[32px] border border-emerald-100 space-y-4">
                                    <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Easing Factors</label>
                                    <textarea className="w-full bg-transparent border-none outline-none font-bold text-sm h-20 placeholder:text-emerald-200" placeholder="What makes it better?"></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Functional Impact' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Functional Delta Hub</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'Occupational', icon: <FaBriefcase />, placeholder: 'Work impact...' },
                                    { label: 'Recreational', icon: <FaRunning />, placeholder: 'Sport impact...' },
                                    { label: 'Nocturnal', icon: <FaBed />, placeholder: 'Sleep disruption...' },
                                    { label: 'ADLS', icon: <FaClipboardList />, placeholder: 'Dressing, Bathing...' }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-7 bg-slate-50 rounded-[32px] border border-slate-100 flex items-start gap-5 group hover:bg-white hover:shadow-google transition-all">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-clinicPrimary group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <div className="flex-1 space-y-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                            <textarea className="w-full bg-transparent border-none outline-none text-sm font-bold h-12 p-0 placeholder:opacity-50" placeholder={item.placeholder}></textarea>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'Medical History' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Clinical Background Node</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Conditions</label>
                                    <textarea className="w-full min-h-[100px] p-6 bg-slate-50 rounded-[28px] border border-slate-100 text-sm font-bold outline-none" placeholder="Medical history..."></textarea>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Surgical history</label>
                                    <textarea className="w-full min-h-[100px] p-6 bg-slate-50 rounded-[28px] border border-slate-100 text-sm font-bold outline-none" placeholder="Past surgeries..."></textarea>
                                </div>
                            </div>
                            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 space-y-6">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Imaging Diagnostics Sync</label>
                                <div className="flex gap-3 flex-wrap">
                                    {['MRI Analysis', 'X-Ray Node', 'Ultrasound', 'CT Scan'].map(node => (
                                        <button key={node} className="px-6 py-3 bg-white rounded-xl border border-slate-100 text-[10px] font-black tracking-widest text-slate-500 hover:border-clinicPrimary hover:text-clinicPrimary transition-all shadow-sm">{node}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Meds & Lifestyle' && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Bio-Metric & Lifestyle</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medications</label>
                                        <textarea className="w-full bg-transparent border-none outline-none font-bold text-sm h-20 placeholder:opacity-40" placeholder="List pharmacological intake..."></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Height</span>
                                            <span className="text-sm font-black text-slate-700">180 cm</span>
                                        </div>
                                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
                                            <span className="text-sm font-black text-slate-700">75 kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 bg-slate-900 rounded-[32px] text-white flex flex-col justify-between h-full">
                                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Stress & Support Matrix</h4>
                                    <div className="space-y-6">
                                        <input type="range" className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-clinicPrimary" />
                                        <div className="flex justify-between text-[8px] font-black text-slate-500 tracking-widest">
                                            <span>LOW LOAD</span>
                                            <span>MAX STRAIN</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1 p-3 bg-white/5 rounded-xl text-[9px] font-black text-center uppercase border border-white/5 opacity-60">Non-Smoker</div>
                                        <div className="flex-1 p-3 bg-white/5 rounded-xl text-[9px] font-black text-center uppercase border border-white/5 opacity-60">No Alcohol</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assessment Matrix Synced</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                            onClick={() => navigate(-1)}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Synchronizing...' : 'Commit Assessment'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default IntakeAssessment;
