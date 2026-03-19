import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, FaSave, FaArrowLeft, FaHistory, FaCalculator, 
  FaFileAlt, FaChartLine, FaExclamationTriangle, FaInfoCircle
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const RMDQAssessment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [score, setScore] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const questions = [
        "I stay at home most of the time because of my back.",
        "I change position get comfortable.",
        "I walk more slowly than usual because of my back.",
        "Because of my back, I am not doing any jobs that I usually do around the house.",
        "Because of my back, I use a handrail to get upstairs.",
        "Because of my back, I lie down to rest more often.",
        "Because of my back, I have to hold on to something to get out of an easy chair.",
        "Because of my back, I try to get other people to do things for me.",
        "I get dressed more slowly than usual because of my back.",
        "I only stand up for short periods of time because of my back.",
        "Because of my back, I try not to bend or kneel down.",
        "I find it difficult to get out of a chair because of my back.",
        "My back is painful almost all of the time.",
        "I find it difficult to turn over in bed because of my back.",
        "My appetite is not very good because of my back.",
        "I have trouble putting on my socks (or stockings) because of my back.",
        "I only walk short distances because of my back.",
        "I sleep less well because of my back.",
        "Because of my back, I get dressed with help from someone else.",
        "I sit down for most of the day because of my back.",
        "I avoid heavy jobs around the house because of my back.",
        "Because of my back, I am more irritable and bad tempered with people than usual.",
        "Because of my back, I go upstairs more slowly than usual.",
        "I stay in bed most of the day because of my back."
    ];

    const [checkedItems, setCheckedItems] = useState(new Array(questions.length).fill(false));

    useEffect(() => {
        const newScore = checkedItems.filter(Boolean).length;
        setScore(newScore);
    }, [checkedItems]);

    const handleToggle = (index) => {
        const updated = [...checkedItems];
        updated[index] = !updated[index];
        setCheckedItems(updated);
    };

    const getInterpretation = () => {
        if (score === 0) return { text: 'No Disability', color: 'emerald' };
        if (score <= 8) return { text: 'Mild Disability', color: 'blue' };
        if (score <= 16) return { text: 'Moderate Disability', color: 'amber' };
        return { text: 'Severe Disability', color: 'rose' };
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert(`Assessment Committed: RMDQ Score ${score}/24 archived for clinical trend analysis.`);
            navigate(-1);
        }, 1500);
    };

    const interpretation = getInterpretation();

    return (
        <div className="max-w-5xl mx-auto space-y-10 p-6 md:p-10 animate-fade-in font-sans custom-scrollbar">
            {/* Header */}
            <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
                <div className="flex items-center gap-8 relative z-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
                    >
                        <FaArrowLeft size={16}/>
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">RMDQ Assessment</h1>
                        <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">ROLAND-MORRIS DISABILITY QUESTIONNAIRE • VERIFIED SCALE</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">Calculated Index</p>
                        <h2 className={`text-4xl font-black tracking-tighter text-${interpretation.color}-500`}>{score}<span className="text-slate-200 ml-1">/24</span></h2>
                    </div>
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Questions List */}
                <div className="lg:col-span-8 space-y-4">
                    <Card className="p-8 border-none shadow-premium bg-slate-50/50 rounded-[32px] mb-6">
                        <div className="flex items-center gap-4 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                            <FaInfoCircle className="text-clinicPrimary" />
                            When your back hurts, you may find it difficult to do some of the things you usually do. This list contains sentences that people have used to describe themselves when they have back pain. When you read them, you may find that some stand out because they describe you today.
                        </div>
                    </Card>

                    <div className="space-y-3">
                        {questions.map((q, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => handleToggle(idx)}
                                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-6 group ${
                                    checkedItems[idx] 
                                    ? 'bg-clinicPrimary/5 border-clinicPrimary/20 shadow-soft' 
                                    : 'bg-white border-slate-100 hover:border-clinicPrimary/10'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                                    checkedItems[idx] ? 'bg-clinicPrimary border-clinicPrimary text-white shadow-lg' : 'bg-transparent border-slate-100'
                                }`}>
                                    {checkedItems[idx] && <FaCheckCircle size={12}/>}
                                </div>
                                <span className={`text-[13px] font-bold ${checkedItems[idx] ? 'text-slate-900' : 'text-slate-500'}`}>{q}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interpretation Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className={`p-10 border-none shadow-premium bg-white group rounded-[32px] border-t-8 border-${interpretation.color}-500`}>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-8">Clinical Interpretation</h4>
                        <div className="space-y-8">
                            <div className="text-center p-8 bg-slate-50 rounded-[28px] border border-slate-100">
                                <h3 className={`text-2xl font-black uppercase tracking-tighter text-${interpretation.color}-500 mb-2`}>{interpretation.text}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Functional Delta</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest opacity-80">
                                    The RMDQ score of {score} indicates a {interpretation.text.toLowerCase()} profile. Clinical trajectory suggests {score > 12 ? 'intensive' : 'maintenance'} physical intervention protocols.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-10 bg-slate-900 border-none shadow-2xl rounded-[40px] text-white relative overflow-hidden group">
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"><FaChartLine className="text-clinicPrimary" size={24}/></div>
                            <h4 className="text-xl font-black tracking-tight mb-4 leading-none">Commit Assessment</h4>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-10 leading-relaxed">Save this diagnostic node to the clinical timeline for longitudinal analytics.</p>
                            <Button 
                                variant="accent" 
                                className="w-full h-14 rounded-2xl shadow-google text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all mt-auto"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Synchronizing Node...' : 'Commit Assessment'}
                            </Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-3xl"></div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RMDQAssessment;
