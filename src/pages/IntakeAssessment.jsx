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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Intake Assessment</h1>
                        <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">DEEP CLINICAL NARRATIVE & BIOMETRIC DATA AGGREGATION</p>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10">
                    <Button 
                        variant="accent" 
                        size="lg" 
                        className="rounded-[24px] h-14 px-10 shadow-google text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        onClick={handleSave}
                        disabled={isSaving}
                        leftIcon={isSaving ? null : <FaSave />}
                    >
                        {isSaving ? 'Archiving Node...' : 'Commit Assessment'}
                    </Button>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
            </Card>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                {sections.map(s => (
                    <button
                        key={s}
                        onClick={() => setActiveSection(s)}
                        className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border shadow-soft ${
                            activeSection === s 
                            ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-google' 
                            : 'bg-white text-slate-400 border-slate-50 hover:border-clinicPrimary/20'
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    {activeSection === 'Chief Complaint' && (
                        <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-10 animate-fade-in">
                            <div className="space-y-8">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Condition Narrative
                                </h3>
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
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mechanism of Injury</label>
                                        <select className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5">
                                            <option>Gradual Onset</option>
                                            <option>Acute Injury (Sports/Fall)</option>
                                            <option>Accident (MV)</option>
                                            <option>Workplace Incident</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Affected Body Area</label>
                                        <input type="text" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" placeholder="e.g. Lumbar / L5-S1" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Condition Narrative Description</label>
                                    <textarea className="w-full min-h-[120px] p-5 bg-slate-50 rounded-[24px] border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" placeholder="Describe how it started and current progress..."></textarea>
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeSection === 'Symptoms & Pain' && (
                        <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-10 animate-fade-in">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div> Symptom Mapping
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Symptom Type Detection</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Pain', 'Stiffness', 'Weakness', 'Numbness', 'Tingling', 'Instability'].map(t => (
                                            <div key={t} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                <input type="checkbox" className="w-4 h-4 rounded-md accent-clinicPrimary" />
                                                <span className="text-[12px] font-bold text-slate-600">{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pain Protocol</label>
                                    <select className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none">
                                        <option>Dull / Ache</option>
                                        <option>Sharp / Stabbing</option>
                                        <option>Burning / Neural</option>
                                        <option>Throbbing / Pulsing</option>
                                    </select>
                                    <div className="space-y-3 mt-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pain Radiation</label>
                                        <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-[13px] font-bold" placeholder="Does pain travel to other areas?" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Aggravating Factors (Worse with...)</label>
                                    <input type="text" className="w-full p-5 bg-rose-50/50 rounded-2xl border border-rose-100 text-[14px] font-bold outline-none" placeholder="e.g. Sitting, Running" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Easing Factors (Better with...)</label>
                                    <input type="text" className="w-full p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-[14px] font-bold outline-none" placeholder="e.g. Rest, Ice" />
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeSection === 'Functional Impact' && (
                        <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-10 animate-fade-in">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div> Functional Delta Tracker
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { label: 'Occupational Impact', icon: <FaHistory />, key: 'work', placeholder: 'How is work performance affected?' },
                                    { label: 'Recreational / Sport', icon: <FaRunning />, key: 'exercise', placeholder: 'Can you continue training?' },
                                    { label: 'Nocturnal / Sleep', icon: <FaBed />, key: 'sleep', placeholder: 'Are you waking up due to pain?' },
                                    { label: 'Mobility / Driving', icon: <FaPlus />, key: 'driving', placeholder: 'Issues with car movement?' },
                                    { label: 'Self-Care / ADLs', icon: <FaClipboardList />, key: 'adls', placeholder: 'Difficulty in dressing/bathing?' }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 group hover:bg-white hover:shadow-google transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-clinicPrimary group-hover:scale-110 transition-transform">
                                                {item.icon}
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <textarea className="w-full bg-transparent border-none text-[13px] font-bold text-slate-600 outline-none resize-none p-0 h-16 placeholder:opacity-50" placeholder={item.placeholder}></textarea>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {activeSection === 'Medical History' && (
                        <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-10 animate-fade-in">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div> Clinical History Node
                            </h3>
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Medical Conditions</label>
                                        <textarea className="w-full min-h-[80px] p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="e.g. Hypertension, Diabetes"></textarea>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Previous Surgical Procedures</label>
                                        <textarea className="w-full min-h-[80px] p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="Type and year of surgery..."></textarea>
                                    </div>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-[30px] border border-slate-100">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-6">Imaging / Diagnostics Hub</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {['X-Ray Capture', 'MRI Scan', 'CT Analysis', 'Ultrasound'].map(im => (
                                            <button key={im} className="p-4 bg-white rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-clinicPrimary hover:text-clinicPrimary transition-all shadow-soft active:scale-95">
                                                {im}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeSection === 'Meds & Lifestyle' && (
                        <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] space-y-10 animate-fade-in">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Bio-Markers & Lifestyle
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pharmacological Intake (Meds)</label>
                                        <textarea className="w-full min-h-[80px] p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none" placeholder="Current medications..."></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                                            <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                                            <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                     <div className="p-6 bg-slate-50 rounded-[28px] border border-slate-100">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Alcohol / Smoking Protocol</label>
                                        <div className="flex gap-3">
                                            <button className="flex-1 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Non-Smoker</button>
                                            <button className="flex-1 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Occasional</button>
                                        </div>
                                     </div>
                                     <div className="p-6 bg-slate-900 rounded-[28px] text-white overflow-hidden relative group">
                                         <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Stress Index Gradient</h4>
                                         <input type="range" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-clinicPrimary mb-4" />
                                         <div className="flex justify-between text-[8px] font-black text-slate-500 tracking-widest">
                                             <span>LOW LOAD</span>
                                             <span>HIGH DEMAND</span>
                                         </div>
                                     </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar: Pain Monitoring */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="p-10 border-none shadow-premium bg-slate-900 text-white rounded-[32px] relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] mb-10">Intensity Scale (0-10)</h4>
                            <div className="space-y-10">
                                <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Current Node</p>
                                        <h3 className="text-5xl font-black text-clinicPrimary tracking-tighter">{form.painLevel.current}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Worst Point</p>
                                        <h3 className="text-3xl font-black text-rose-500 tracking-tighter">{form.painLevel.worst}</h3>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sync Intensity Gradient</p>
                                     <input type="range" min="0" max="10" className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-clinicPrimary" value={form.painLevel.current} onChange={(e) => setForm({...form, painLevel: {...form.painLevel, current: e.target.value}})} />
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-3xl"></div>
                    </Card>

                    <Card className="p-10 border-none shadow-premium bg-white rounded-[32px] border-l-8 border-clinicPrimary">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-clinicPrimary/5 rounded-2xl flex items-center justify-center text-clinicPrimary shadow-soft"><FaHeartbeat size={20}/></div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">Vitals Node Sync</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight Change</span>
                                <span className="text-[12px] font-black text-slate-700">STABLE</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appetite Node</span>
                                <span className="text-[12px] font-black text-slate-700">OPTIMAL</span>
                            </div>
                        </div>
                    </Card>

                    <div className="p-10 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] shadow-2xl relative overflow-hidden group hover:shadow-google transition-all">
                        <div className="relative z-10 flex flex-col h-full">
                            <FaBrain className="text-white/20 mb-8" size={32} />
                            <h4 className="text-xl font-black text-white tracking-tight leading-tight mb-4 uppercase">Clinical Intelligence</h4>
                            <p className="text-[11px] font-bold text-white/60 leading-relaxed uppercase tracking-widest mb-10">Cross-referencing input with Red Flag and Safety protocols... System Ready.</p>
                            <Button variant="secondary" className="bg-white/10 border border-white/20 text-white h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glass">Verify Data Matrix</Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntakeAssessment;
