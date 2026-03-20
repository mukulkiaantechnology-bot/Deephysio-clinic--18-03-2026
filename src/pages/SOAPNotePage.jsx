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
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">SOAP Documentation</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Structured Clinical Assessment Node</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-12">
          {/* Subjective Partition */}
          <div className="space-y-6">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <FaEdit className="text-clinicPrimary" /> Subjective Partition
            </label>
            <textarea 
              className="w-full min-h-[140px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
              placeholder="Enter patient narrative and reported progress..."
              value={soapData.subjective}
              onChange={(e) => handleChange('subjective', e.target.value)}
            />
          </div>

          {/* Objective Partition */}
          <div className="space-y-8 pt-10 border-t border-slate-50">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <FaStethoscope className="text-clinicPrimary" /> Objective Partition
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Range of Motion (ROM)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Flexion', 'Extension', 'Lat Flex', 'Rotation'].map(move => (
                    <div key={move} className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">{move}</span>
                      <input type="text" className="w-10 bg-transparent text-right font-black text-clinicPrimary outline-none text-xs" placeholder="0°" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Strength (MMT 0-5)</label>
                <div className="space-y-2">
                  {['Core Stability', 'Hip Flexors', 'Quadriceps'].map(muscle => (
                    <div key={muscle} className="px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">{muscle}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <div key={s} className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[8px] flex items-center justify-center font-black cursor-pointer hover:bg-clinicPrimary hover:text-white transition-all">{s}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <textarea 
              className="w-full min-h-[120px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
              placeholder="Physical findings and clinical observations..."
              value={soapData.objective}
              onChange={(e) => handleChange('objective', e.target.value)}
            />
          </div>

          {/* Assessment & Plan Partition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaBrain className="text-clinicPrimary" /> Assessment Partition
              </label>
              <textarea 
                className="w-full min-h-[160px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                placeholder="Clinical reasoning and impression..."
                value={soapData.assessment}
                onChange={(e) => handleChange('assessment', e.target.value)}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaRunning className="text-clinicPrimary" /> Plan Partition
              </label>
              <textarea 
                className="w-full min-h-[160px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                placeholder="Treatment interventions and follow-up plan..."
                value={soapData.plan}
                onChange={(e) => handleChange('plan', e.target.value)}
              />
            </div>
          </div>

          {/* Vitals & Bio-Markers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaHistory className="text-clinicPrimary" /> Neural Pain Index & Vitals
              </label>
              <div className="p-8 bg-slate-900 rounded-[32px] space-y-6">
                 <div className="flex justify-between items-end">
                    <span className="text-4xl font-black text-white">{soapData.vitals.painLevel}</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pb-1">VAS Score</span>
                 </div>
                 <input 
                    type="range" min="0" max="10" step="1"
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-clinicPrimary"
                    value={soapData.vitals.painLevel}
                    onChange={(e) => setSoapData(prev => ({ ...prev, vitals: { ...prev.vitals, painLevel: e.target.value } }))}
                 />
                 <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 120/80 BP</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 72 BPM</div>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaExclamationTriangle className="text-rose-500" /> Safety Clearance Node
              </label>
              <div className="p-8 bg-rose-50/30 rounded-[32px] border border-rose-100 space-y-4">
                 <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Are red flag danger nodes detected?</p>
                 <div className="flex gap-3">
                    <button 
                      className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${soapData.redFlagCheck ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}
                      onClick={() => setSoapData(prev => ({ ...prev, redFlagCheck: true }))}
                    >Critical</button>
                    <button 
                      className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!soapData.redFlagCheck ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}
                      onClick={() => setSoapData(prev => ({ ...prev, redFlagCheck: false }))}
                    >Cleared</button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Protocol Synchronized</p>
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
                {isSaving ? 'Synchronizing...' : 'Commit Clinical Node'}
              </Button>
           </div>
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
