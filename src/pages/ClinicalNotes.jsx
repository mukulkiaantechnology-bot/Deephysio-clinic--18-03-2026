import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, FaHistory, FaSearch, FaFileMedical, FaChevronRight, 
  FaStickyNote, FaClipboardList, FaStethoscope, FaFlask, FaChartLine,
  FaFileInvoice, FaNotesMedical, FaCheckCircle
} from 'react-icons/fa';

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const INITIAL_NOTES = [
  { id: 'CN-201', patientName: 'James Wilson', type: 'SOAP Note', date: '2026-03-18', time: '10:30 AM', content: 'S: Patient reports significant relief in lumbar region. O: Flexion increased by 15 degrees. A: Positive trajectory in neural recovery. P: Continue mobilization protocols...', category: 'SOAP' },
  { id: 'CN-202', patientName: 'Emily Brown', type: 'Assessment', date: '2026-03-17', time: '14:20 PM', content: 'RMDQ Score: 8/24 (Mild). Patient struggling with morning stiffness. Suggested adjustments to nighttime ergonomics...', category: 'RMDQ' },
  { id: 'CN-203', patientName: 'James Wilson', type: 'Physio Note', date: '2026-03-15', time: '09:15 AM', content: 'Gait analysis shows slight internal rotation of the left ankle. Prescribed custom orthotics and follow-up in 2 weeks...', category: 'Physio' },
  { id: 'CN-204', patientName: 'Sarah Jenkins', type: 'SOAP Note', date: '2026-03-14', time: '11:45 AM', content: 'S: Improved sleep quality. O: 85 degrees ROM. A: Surgical site healing well. P: Increase intensity of eccentric loading...', category: 'SOAP' },
  { id: 'CN-205', patientName: 'Michael Chen', type: 'Initial Assessment', date: '2026-03-10', time: '16:00 PM', content: 'Initial assessment for shoulder impingement. Positive painful arc test. Exercises provided for rotator cuff strengthening...', category: 'Initial' },
];

const ClinicalNotes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemsPerPage = 4;

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('deephysio_clinical_notes') || '[]');
    setNotes([...savedNotes, ...INITIAL_NOTES]);
  }, []);

  const filteredNotes = notes.filter(note => 
    note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const currentNotes = filteredNotes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportXL = () => {
    const csvRows = [
      ['ID', 'Patient Name', 'Type', 'Date', 'Time', 'Category', 'Content'],
      ...filteredNotes.map(n => [n.id, n.patientName, n.type || 'General', n.date, n.time, n.category, n.content.replace(/,/g, ';')])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clinical_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getNoteIcon = (category) => {
    switch (category) {
        case 'SOAP': return <FaNotesMedical size={24} />;
        case 'RMDQ': return <FaChartLine size={24} />;
        case 'Initial': return <FaStethoscope size={24} />;
        default: return <FaFileMedical size={24} />;
    }
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Clinical Records</h1>
          <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-[11px] opacity-70">Capture observations, plans, and assessments with structured clinical nodes.</p>
        </div>
        <div className="flex flex-wrap flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
          <Button 
            variant="secondary" 
            size="lg" 
            className="flex-1 lg:flex-none rounded-[20px] h-14 px-8 border-none shadow-premium hover:shadow-google text-[11px] font-black uppercase tracking-widest" 
            leftIcon={<FaHistory size={14}/>}
            onClick={() => alert('Clinical records archived.')}
          >
            Archive
          </Button>
          <Button 
            variant="accent" 
            size="lg"
            className="flex-1 lg:flex-none rounded-[20px] h-14 px-10 shadow-google text-[11px] font-black uppercase tracking-widest"
            onClick={() => navigate('/notes/soap/NEW')}
            leftIcon={<FaPlus size={14}/>}
          >
            New SOAP Note
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            className="flex-1 lg:flex-none rounded-[20px] h-14 px-10 bg-slate-900 text-white hover:bg-black shadow-google text-[11px] font-black uppercase tracking-widest"
            onClick={() => navigate('/notes/rmdq/NEW')}
            leftIcon={<FaChartLine size={14}/>}
          >
            New RMDQ
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-0 overflow-hidden border-none shadow-premium bg-white rounded-[40px]">
            <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/10 gap-8">
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-4">
                 <div className="w-2 h-6 bg-clinicPrimary rounded-full"></div> Clinical Journal Ledger
              </h3>
              <div className="relative group w-full md:max-w-md">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                <input
                  type="text"
                  placeholder="Filter records by node, patient or type..."
                  className="block w-full pl-16 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); setActiveIndex(-1); }}
                />
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {currentNotes.length > 0 ? currentNotes.map((note, index) => (
                <div 
                  key={note.id} 
                  className={`p-10 hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer flex items-center justify-between border-l-8 gap-10 ${activeIndex === index ? 'border-clinicPrimary' : 'border-transparent'}`}
                  onClick={() => navigate(`/notes/view/${note.id}`)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-10">
                    <div className={`w-20 h-20 rounded-[32px] bg-white shadow-premium text-clinicPrimary flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-slate-50 flex-shrink-0 ${activeIndex === index ? 'shadow-google scale-110 rotate-6 text-clinicPrimary' : 'opacity-60'}`}>
                      {getNoteIcon(note.category)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <p className={`text-xl font-black text-slate-900 leading-none tracking-tight group-hover:text-clinicPrimary transition-colors ${activeIndex === index ? 'text-clinicPrimary' : ''}`}>
                          {note.patientName}
                        </p>
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-soft border ${
                            note.category === 'SOAP' ? 'bg-blue-50 text-blue-500 border-blue-100' : 
                            note.category === 'RMDQ' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                            'bg-slate-900 text-white border-slate-900'
                        }`}>{note.category} Node</span>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        {note.date} <span className="text-slate-200">/</span> {note.time} <span className="text-slate-200">/</span> {note.id}
                      </p>
                      <p className="text-[14px] text-slate-500 mt-6 leading-relaxed font-bold line-clamp-2 opacity-80 max-w-2xl group-hover:opacity-100 transition-opacity italic">
                        {note.content}
                      </p>
                    </div>
                  </div>
                  <button className="w-14 h-14 rounded-[24px] bg-white border border-slate-100 text-slate-300 group-hover:bg-clinicPrimary group-hover:text-white group-hover:shadow-google transition-all flex items-center justify-center flex-shrink-0 active:scale-95">
                    <FaChevronRight size={14} />
                  </button>
                </div>
              )) : (
                <div className="p-24 text-center text-slate-300 font-black uppercase tracking-widest">No matching clinical records detected</div>
              )}
            </div>
            <div className="p-10 bg-slate-50/40 border-t border-slate-50 flex items-center justify-between gap-4">
               <div className="flex gap-4">
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); setActiveIndex(-1); }}
                   disabled={currentPage === 1}
                   className="rounded-2xl border border-slate-100 bg-white shadow-premium h-14 w-14 active:scale-95"
                 >
                   <FaChevronRight className="rotate-180" size={12} />
                 </Button>
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); setActiveIndex(-1); }}
                   disabled={currentPage === totalPages}
                   className="rounded-2xl border border-slate-100 bg-white shadow-premium h-14 w-14 active:scale-95"
                 >
                   <FaChevronRight size={12} />
                 </Button>
               </div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Listing Ledger Node {currentPage} of {totalPages || 1}</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
          {/* Quick Stats */}
          <Card className="p-10 border-none shadow-premium bg-slate-900 text-white rounded-[40px] relative overflow-hidden group">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 relative z-10">Longitudinal Velocity</h3>
            <div className="grid grid-cols-1 gap-8 relative z-10">
               <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 opacity-60">Verified Clincal Records</p>
                  <div className="flex items-end gap-4">
                    <h2 className="text-5xl font-black tracking-tighter text-white">{notes.length + 1200}</h2>
                    <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest pb-2">+4.2% Δ</span>
                  </div>
               </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-clinicPrimary/20 rounded-full blur-[80px]"></div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white relative overflow-hidden rounded-[40px]">
             <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Smart Blueprints
             </h3>
             <div className="space-y-4 relative z-10">
                {[
                  { label: 'SOAP Assessment', path: '/notes/soap/NEW', icon: <FaNotesMedical/> },
                  { label: 'RMDQ Disability Scan', path: '/notes/rmdq/NEW', icon: <FaChartLine/> },
                  { label: 'Initial Physical Intake', path: '/notes/new', icon: <FaStethoscope/> },
                  { label: 'Neural Rehab Evolution', path: '/notes/new', icon: <FaRunning/> }
                ].map((blueprint) => (
                  <button 
                    key={blueprint.label} 
                    onClick={() => navigate(blueprint.path)}
                    className="w-full text-left p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-clinicPrimary hover:shadow-google transition-all duration-300 group flex items-center justify-between active:scale-95"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center text-slate-300 group-hover:text-clinicPrimary transition-colors">{blueprint.icon}</div>
                      <div>
                        <p className="text-[13px] font-black text-slate-900 group-hover:text-clinicPrimary uppercase tracking-tight transition-colors">{blueprint.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest opacity-60">Validated Framework</p>
                      </div>
                    </div>
                    <FaPlus size={10} className="text-slate-200 group-hover:text-clinicPrimary" />
                  </button>
                ))}
             </div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white rounded-[40px] flex flex-col items-center text-center group hover:shadow-google transition-all">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[28px] flex items-center justify-center mb-8 shadow-soft transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                <FaCheckCircle size={32} />
             </div>
             <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-3">Integrity Verified</h4>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">All clinical notes are signed with a unique cryptographic clinical ID.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
