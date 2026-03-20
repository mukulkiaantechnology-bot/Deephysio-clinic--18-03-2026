import React, { useState, useEffect } from 'react';
import { FaFileMedical, FaUser, FaSave, FaMagic, FaPlus, FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const INITIAL_PATIENTS = [
  { id: 'PID-101', name: 'Alice Johnson' },
  { id: 'PID-102', name: 'James Wilson' },
  { id: 'PID-103', name: 'Emily Brown' },
  { id: 'PID-104', name: 'Michael Chen' },
  { id: 'PID-105', name: 'Sarah Jenkins' },
  { id: 'PID-106', name: 'David Miller' },
];

const NewNote = () => {
    const navigate = useNavigate();
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const templates = [
        { id: 1, name: 'Initial SOAP', desc: 'S-O-A-P Protocol' },
        { id: 2, name: 'Progress Follow-up', desc: 'Summary' },
        { id: 3, name: 'Discharge Summary', desc: 'Final Outcome' },
        { id: 4, name: 'Referral Response', desc: 'GP Report' },
    ];

    useEffect(() => {
        const savedPatients = JSON.parse(localStorage.getItem('deephysio_patients') || '[]');
        const allPatients = [...INITIAL_PATIENTS, ...savedPatients];
        setPatients(allPatients);
        if (allPatients.length > 0) {
            setSelectedPatient(allPatients[0]);
        }
    }, []);

    const [notes, setNotes] = useState({
        subjective: '', objective: '', plan: ''
    });

    const handleTemplateClick = (id) => {
        setActiveTemplate(id);
        if (id === 1) {
            setNotes({
                subjective: 'Onset: Sudden\nPain: 7/10 VAS\nAggravating: Walking\nEasing: Rest',
                objective: 'ROM Flexion: 90 deg\nStrength: 4/5 LQS\nPalpation: Tender L4/5',
                plan: 'Manual therapy - 20 mins Lumbar Mobilizations\nHEP Given: Cat/Camel, Knee Rolls'
            });
        } else if (id === 2) {
            setNotes({
                subjective: 'Pain down to 4/10\nSleeping better, less stiffness in morning.',
                objective: 'ROM Flexion: 110 deg\nStability improving.',
                plan: 'Increase repetitions in HEP.\nReview in 1 week.'
            });
        } else {
            setNotes({ subjective: '', objective: '', plan: '' });
        }
    };

    const handleFinalize = () => {
        if (!selectedPatient || (!notes.subjective && !notes.objective && !notes.plan)) {
            alert('Protocol Violation: Requirements not met for submission.');
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            const newNote = {
                id: Date.now(),
                patientName: selectedPatient.name,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                content: `SUBJECTIVE: ${notes.subjective}\nOBJECTIVE: ${notes.objective}\nPLAN: ${notes.plan}`,
                category: activeTemplate ? templates.find(t => t.id === activeTemplate).name : 'General Note'
            };

            const existingNotes = JSON.parse(localStorage.getItem('deephysio_clinical_notes') || '[]');
            localStorage.setItem('deephysio_clinical_notes', JSON.stringify([newNote, ...existingNotes]));
            
            setIsSaving(false);
            navigate('/notes');
        }, 1500);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/notes')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Initialize Note</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Record treatment and progress telemetry</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
                <div className="p-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaUser className="text-clinicPrimary" /> Patient Context
                            </label>
                            <div className="relative group">
                                <select 
                                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                    value={selectedPatient ? selectedPatient.id : ''}
                                    onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value))}
                                >
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                                <FaChevronDown size={12} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-clinicPrimary transition-colors pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaMagic className="text-clinicPrimary" /> Logic Preset
                            </label>
                            <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-3xl shadow-inner-soft">
                                {templates.map(t => (
                                    <button 
                                        key={t.id}
                                        type="button"
                                        onClick={() => handleTemplateClick(t.id)}
                                        className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                            activeTemplate === t.id ? 'bg-white text-clinicPrimary shadow-premium' : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {t.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 pt-10 border-t border-slate-50">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subjective Findings</label>
                            <textarea 
                                className="w-full min-h-[120px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft resize-none"
                                placeholder="..."
                                value={notes.subjective}
                                onChange={(e) => setNotes({...notes, subjective: e.target.value})}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Objective Assessment</label>
                            <textarea 
                                className="w-full min-h-[120px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft resize-none"
                                placeholder="..."
                                value={notes.objective}
                                onChange={(e) => setNotes({...notes, objective: e.target.value})}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Treatment Plan</label>
                            <textarea 
                                className="w-full min-h-[120px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft resize-none"
                                placeholder="..."
                                value={notes.plan}
                                onChange={(e) => setNotes({...notes, plan: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric Documenting Active</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                            onClick={() => navigate('/notes')}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleFinalize}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Synchronizing...' : 'Commit Note'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default NewNote;
