import React, { useState } from 'react';
import { 
  FaNotesMedical, FaCheckCircle, FaSave, FaArrowLeft, FaHistory, 
  FaEdit, FaPrint, FaTrashAlt, FaStethoscope, FaFlask, FaBrain, 
  FaRunning, FaPlus, FaCloudUploadAlt, FaChevronRight, FaTimes,
  FaRulerCombined, FaWeightHanging, FaWalking, FaUser, FaExclamationTriangle
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SOAPNotePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  
  const [soapData, setSoapData] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    vitals: {
        bp: '',
        pulse: '',
        painLevel: 5
    },
    redFlagCheck: false
  });

  React.useEffect(() => {
    const savedData = localStorage.getItem(`deephysio_soap_${id}`);
    if (savedData) {
      setSoapData(JSON.parse(savedData));
    }
  }, [id]);

  const handleChange = (section, value) => {
    setSoapData(prev => ({ ...prev, [section]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem(`deephysio_soap_${id}`, JSON.stringify(soapData));
    setTimeout(() => {
        setIsSaving(false);
        alert('Clinical Node Saved: SOAP assessment synchronized with patient archive.');
        navigate(-1);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6 md:p-10 animate-fade-in font-sans custom-scrollbar">
      {/* SOAP Header */}
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
        <div className="flex items-center gap-8 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
          >
            <FaArrowLeft size={16}/>
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SOAP Documentation</h1>
            <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-[0.2em] opacity-80">STRUCTURED CLINICAL ASSESSMENT & TREATMENT TRACKING ENGINE</p>
          </div>
        </div>
        <div className="flex gap-4 relative z-10">
            <Button variant="secondary" size="lg" className="rounded-[24px] h-14 px-10 border-none shadow-premium text-[11px] font-black uppercase tracking-widest hover:shadow-google" leftIcon={<FaHistory />}>History</Button>
            <Button 
                variant="accent" 
                size="lg" 
                className="rounded-[24px] h-14 px-10 shadow-google text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all"
                onClick={handleSave}
                disabled={isSaving}
                leftIcon={isSaving ? null : <FaSave />}
            >
                {isSaving ? 'Synchronizing Node...' : 'Commit Node'}
            </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Subjective Section */}
          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px]">
            <div className="flex items-center gap-5 border-b border-slate-50 pb-8 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-soft"><FaEdit size={18}/></div>
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] leading-none mb-1.5">Subjective Partition</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Symptomology, History, Patient Narrative</p>
              </div>
            </div>
            <textarea 
              className="w-full min-h-[160px] p-8 bg-slate-50 rounded-[28px] border border-slate-100 text-[14px] font-bold text-slate-700 outline-none focus:ring-8 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all placeholder:text-slate-200 shadow-inner-soft"
              placeholder="Enter patient narrative, symptoms, and self-reported progress..."
              value={soapData.subjective}
              onChange={(e) => handleChange('subjective', e.target.value)}
            />
          </Card>

          {/* Objective Section - Expanded with Physical Exam */}
          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px] space-y-10">
            <div className="flex items-center gap-5 border-b border-slate-50 pb-8 mb-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-soft"><FaStethoscope size={18}/></div>
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] leading-none mb-1.5">Objective Partition</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Physical Exam, Range of Motion, Special Tests (Point 10)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* ROM Tracking */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FaRulerCombined size={10} /> Range of Motion (Degrees)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {['Flexion', 'Extension', 'Lat Flex (L)', 'Lat Flex (R)', 'Rotation (L)', 'Rotation (R)'].map(move => (
                            <div key={move} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-500">{move}</span>
                                <input type="text" className="w-12 bg-transparent text-right font-black text-clinicPrimary outline-none" placeholder="0°" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strength Testing */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FaWeightHanging size={10} /> Strength Testing (MMT 0-5)
                    </label>
                    <div className="space-y-3">
                        {['Core Stability', 'Hip Flexors', 'Quadriceps', 'Gluteals'].map(muscle => (
                            <div key={muscle} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-500">{muscle}</span>
                                <div className="flex gap-1">
                                    {[0,1,2,3,4,5].map(score => (
                                        <button key={score} className="w-6 h-6 rounded-md bg-white border border-slate-200 text-[8px] font-black hover:bg-clinicPrimary hover:text-white transition-all">{score}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-50 pt-10">
                {/* Posture & Gait */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FaWalking size={10} /> Posture & Gait Analysis
                    </label>
                    <textarea className="w-full p-6 bg-slate-50 rounded-[24px] border border-slate-100 text-[13px] font-bold outline-none h-32" placeholder="Observations on alignment, gait cycle, and compensations..."></textarea>
                </div>

                {/* Special Orthopedic Tests */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FaFlask size={10} /> Special Orthopedic Tests
                    </label>
                    <textarea className="w-full p-6 bg-slate-50 rounded-[24px] border border-slate-100 text-[13px] font-bold outline-none h-32" placeholder="SLR, Faber, Trendelenburg, or other region-specific tests..."></textarea>
                </div>
            </div>

            <div className="pt-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Other Clinical Observations</label>
                <textarea 
                  className="w-full min-h-[120px] p-8 bg-slate-50 rounded-[28px] border border-slate-100 text-[14px] font-bold text-slate-700 outline-none focus:ring-8 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft"
                  placeholder="Document general observations and clinical findings..."
                  value={soapData.objective}
                  onChange={(e) => handleChange('objective', e.target.value)}
                />
            </div>
          </Card>

          {/* Assessment Section */}
          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px]">
            <div className="flex items-center gap-5 border-b border-slate-50 pb-8 mb-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-soft"><FaBrain size={18}/></div>
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] leading-none mb-1.5">Assessment Partition</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Clinical Reasoning, Diagnosis, Differential Findings</p>
              </div>
            </div>
            <textarea 
              className="w-full min-h-[160px] p-8 bg-slate-50 rounded-[28px] border border-slate-100 text-[14px] font-bold text-slate-700 outline-none focus:ring-8 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all placeholder:text-slate-200 shadow-inner-soft"
              placeholder="Clinical synthesis, diagnostic impression, and reasoning nodes..."
              value={soapData.assessment}
              onChange={(e) => handleChange('assessment', e.target.value)}
            />
          </Card>

          {/* Plan Section */}
          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px]">
            <div className="flex items-center gap-5 border-b border-slate-50 pb-8 mb-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shadow-soft"><FaRunning size={18}/></div>
              <div>
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] leading-none mb-1.5">Plan Partition</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Treatment Protocol, Exercise Rx, Follow-up</p>
              </div>
            </div>
            <textarea 
              className="w-full min-h-[160px] p-8 bg-slate-50 rounded-[28px] border border-slate-100 text-[14px] font-bold text-slate-700 outline-none focus:ring-8 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all placeholder:text-slate-200 shadow-inner-soft"
              placeholder="Specific treatment interventions, home exercise program, and future session targets..."
              value={soapData.plan}
              onChange={(e) => handleChange('plan', e.target.value)}
            />
          </Card>
        </div>

        {/* Sidebar: Bio-Markers & Vitals */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 border-none shadow-premium bg-slate-900 text-white group rounded-[32px] relative overflow-hidden">
            <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.25em] mb-10 relative z-10">Neural Pain Index</h4>
            <div className="space-y-10 relative z-10">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-6xl font-black text-white tracking-tighter">{soapData.vitals.painLevel}</span>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest pb-3">on VAS Grid</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="1"
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-clinicPrimary"
                    value={soapData.vitals.painLevel}
                    onChange={(e) => setSoapData(prev => ({ ...prev, vitals: { ...prev.vitals, painLevel: e.target.value } }))}
                />
                <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <span>Baseline (0)</span>
                    <span>Max Intesity (10)</span>
                </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-clinicPrimary/10 rounded-full blur-[60px]"></div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px]">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-8">Vital Statistics</h4>
            <div className="space-y-6">
               <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-between group/vital hover:bg-white hover:shadow-google transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-soft flex items-center justify-center text-rose-500 group-hover/vital:scale-110 transition-transform"><FaPlus size={14}/></div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Blood Pressure</span>
                  </div>
                  <input type="text" placeholder="120/80" className="w-20 bg-transparent border-none text-right text-[13px] font-black text-slate-600 outline-none" />
               </div>
               <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-between group/vital hover:bg-white hover:shadow-google transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-soft flex items-center justify-center text-blue-500 group-hover/vital:scale-110 transition-transform"><FaPulse size={14} /></div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Heart Rate (BPM)</span>
                  </div>
                  <input type="text" placeholder="72" className="w-16 bg-transparent border-none text-right text-[13px] font-black text-slate-600 outline-none" />
               </div>
            </div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-google transition-all rounded-[32px] border-l-4 border-rose-500">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shrink-0 shadow-soft"><FaExclamationTriangle size={20}/></div>
              <div>
                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-tight mb-2">Safety Clearance</h4>
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest opacity-80">Are any red flag danger nodes detected during assessment?</p>
                <div className="flex mt-6 gap-3">
                    <button 
                        className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${soapData.redFlagCheck ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                        onClick={() => setSoapData(prev => ({ ...prev, redFlagCheck: true }))}
                    >Critical Danger</button>
                    <button 
                        className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!soapData.redFlagCheck ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                        onClick={() => setSoapData(prev => ({ ...prev, redFlagCheck: false }))}
                    >Cleared</button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-10 bg-gradient-to-br from-clinicPrimary to-blue-600 border-none shadow-premium group hover:shadow-google transition-all rounded-[32px] text-white overflow-hidden relative">
             <div className="relative z-10">
                <h4 className="text-[11px] font-black text-white/60 uppercase tracking-[0.25em] mb-4">Outcome Prediction</h4>
                <p className="text-xl font-black tracking-tight mb-8">Subject shows optimal trajectory for 90% recovery Node v1.2</p>
                <Button variant="secondary" className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glass">Initialize Analytics</Button>
             </div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper component for Pulse icon since I used FaPulse which might not exist in standard react-icons
const FaPulse = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

export default SOAPNotePage;
