import React, { useState, useEffect } from 'react';
import { FaFileMedical, FaUser, FaSave, FaMagic, FaPrint, FaShareAlt, FaPlus, FaTimes, FaBold, FaItalic, FaListUl, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    { id: 1, name: 'Initial SOAP', desc: 'Subjective, Objective, Assessment, Plan' },
    { id: 2, name: 'Progress Follow-up', desc: 'Quick session summary' },
    { id: 3, name: 'Discharge Summary', desc: 'Final assessment & outcome' },
    { id: 4, name: 'Referral Response', desc: 'Report for GP/Specialist' },
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
    if (!selectedPatient) {
      return;
    }
    if (!notes.subjective && !notes.objective && !notes.plan) {
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
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">Clinical Documentation</h1>
          <p className="text-sm sm:text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Record treatment and progress.</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-white border border-gray-200 rounded-lg text-sm sm:text-base font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest flex items-center justify-center gap-2"><FaShareAlt size={10}/> Share</button>
          <button 
            onClick={handleFinalize}
            disabled={isSaving}
            className={`w-full sm:w-auto btn-primary flex justify-center items-center gap-2 text-sm sm:text-base uppercase tracking-widest shadow-lg py-3 sm:py-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaSave size={10}/> {isSaving ? 'Finalizing...' : 'Finalize Note'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-clinic">
            <h3 className="text-base font-black uppercase tracking-widest mb-4 text-clinicPrimary">Patient Context</h3>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mb-4 relative group">
              <label className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest mb-2 block opacity-60">Active Subject</label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary font-black">
                  {selectedPatient ? selectedPatient.name.split(' ').map(n => n[0]).join('') : '??'}
                </div>
                <div className="flex-1">
                  <select 
                    className="w-full bg-transparent text-base font-black text-gray-900 leading-none outline-none cursor-pointer appearance-none pr-6"
                    value={selectedPatient ? selectedPatient.id : ''}
                    onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value))}
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: {selectedPatient ? selectedPatient.id : 'N/A'}</p>
                </div>
                <FaChevronDown size={10} className="text-gray-300 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-clinicPrimary transition-colors" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-base font-black uppercase tracking-widest text-slate-400">
                <span>Templates</span>
                <FaMagic />
              </div>
              <div className="space-y-2">
                {templates.map(t => (
                  <button 
                    key={t.id}
                    onClick={() => handleTemplateClick(t.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all ${activeTemplate === t.id ? 'border-clinicPrimary bg-clinicPrimary/5 text-clinicPrimary' : 'border-gray-50 text-gray-500 hover:bg-gray-50'}`}
                  >
                    <p className="text-base font-bold leading-none mb-1">{t.name}</p>
                    <p className="text-base opacity-60 leading-tight uppercase tracking-tighter">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="card-clinic p-0 overflow-hidden min-h-[600px] flex flex-col bg-white border-2 border-transparent hover:border-clinicPrimary/5 transition-colors">
            {/* Toolbar */}
            <div className="border-b border-gray-100 p-2 flex items-center gap-1.5 bg-gray-50/50">
              <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
                <button className="p-1.5 hover:bg-white rounded transition-colors text-gray-500"><FaBold size={11}/></button>
                <button className="p-1.5 hover:bg-white rounded transition-colors text-gray-500"><FaItalic size={11}/></button>
                <button className="p-1.5 hover:bg-white rounded transition-colors text-gray-500"><FaListUl size={11}/></button>
              </div>
              <div className="flex items-center gap-1 border-r border-gray-200 pr-2">
                <button className="px-2 py-1 text-base font-black uppercase text-clinicPrimary hover:bg-white rounded transition-colors">Heading</button>
                <button className="px-2 py-1 text-base font-black uppercase text-gray-400 hover:bg-white rounded transition-colors">Body</button>
              </div>
              <div className="ml-auto">
                <button className="flex items-center gap-1.5 px-2.5 py-1 bg-clinicLight rounded text-clinicPrimary text-base font-black uppercase tracking-widest"><FaMagic size={10}/> AI Assist</button>
              </div>
            </div>

            {/* Note Editor Area */}
            <div className="flex-1 p-8 space-y-8 overflow-y-auto">
              <div>
                <h4 className="text-base font-black text-clinicPrimary uppercase tracking-[3px] mb-4">Subjective Findings</h4>
                <textarea 
                  className="w-full min-h-[100px] bg-transparent text-base font-medium text-gray-700 leading-relaxed outline-none resize-none placeholder:text-gray-300 placeholder:italic"
                  placeholder="Record patient complaints, onset of symptoms, pain levels (VAS 0-10)..."
                  value={notes.subjective}
                  onChange={(e) => setNotes({...notes, subjective: e.target.value})}
                ></textarea>
              </div>
              
              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-base font-black text-clinicPrimary uppercase tracking-[3px] mb-4">Objective Assessment</h4>
                <textarea 
                  className="w-full min-h-[100px] bg-transparent text-base font-medium text-gray-700 leading-relaxed outline-none resize-none placeholder:text-gray-300 placeholder:italic"
                  placeholder="Observe gait, ROM testing, special tests, palpation findings..."
                  value={notes.objective}
                  onChange={(e) => setNotes({...notes, objective: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-base font-black text-clinicPrimary uppercase tracking-[3px] mb-4">Treatment Plan</h4>
                <textarea 
                  className="w-full min-h-[100px] bg-transparent text-base font-medium text-gray-700 leading-relaxed outline-none resize-none placeholder:text-gray-300 placeholder:italic"
                  placeholder="Exercises prescribed, manual therapy used, home advice given..."
                  value={notes.plan}
                  onChange={(e) => setNotes({...notes, plan: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
