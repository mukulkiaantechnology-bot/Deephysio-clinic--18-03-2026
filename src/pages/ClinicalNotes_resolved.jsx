import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPlus, FaHistory, FaSearch, FaFileMedical, FaChevronRight, 
  FaStickyNote, FaClipboardList, FaStethoscope, FaFlask, FaChartLine,
  FaFileInvoice, FaNotesMedical, FaCheckCircle, FaRunning
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
    <div className="space-y-4 sm:space-y-6 p-4 md:p-6 lg:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 border border-slate-100 shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Clinical Records</h1>
          <p className="text-slate-500 font-medium mt-1.5 text-[11px] sm:text-[12px]">Capture observations, plans, and assessments effectively with high-fidelity nodes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative z-10 w-full lg:w-auto mt-4 lg:mt-0">
          <Button 
            variant="secondary" 
            size="md" 
            className="flex-1 sm:flex-none rounded-lg h-10 px-4 sm:px-6 shadow-none transition-colors" 
            leftIcon={<FaHistory size={10}/>}
            onClick={() => alert('Clinical records archived.')}
          >
            Archive
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            className="flex-1 sm:flex-none rounded-lg h-10 px-4 sm:px-6 shadow-none text-emerald-600 transition-colors bg-emerald-50 hover:bg-emerald-100 border-none" 
            leftIcon={<FaFileMedical size={10}/>}
            onClick={handleExportXL}
          >
            Export XL
          </Button>
          <Button 
            variant="accent" 
            size="md"
            className="flex-1 sm:flex-none rounded-lg h-10 px-4 sm:px-6 shadow-none transition-colors"
            onClick={() => navigate('/notes/soap/NEW')}
            leftIcon={<FaStickyNote size={10}/>}
          >
            New SOAP Note
          </Button>
          <Button 
            variant="secondary" 
            size="md"
            className="flex-1 sm:flex-none rounded-lg h-10 px-4 sm:px-6 bg-slate-900 text-white hover:bg-black shadow-none transition-colors"
            onClick={() => navigate('/notes/rmdq/NEW')}
            leftIcon={<FaChartLine size={10}/>}
          >
            New RMDQ
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <Card hover={false} className="p-0 overflow-hidden border border-slate-100 shadow-none bg-white">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/50 gap-4">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <FaClipboardList size={12} className="text-clinicPrimary" /> Clinical Journal Node
              </h3>
              <div className="relative group w-full md:max-w-xs bg-white rounded-lg border border-slate-200 transition-colors focus-within:border-clinicPrimary focus-within:ring-2 focus-within:ring-clinicPrimary/10">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-clinicPrimary transition-colors">
                  <FaSearch size={12}/>
                </span>
                <input
                  type="text"
                  placeholder="Filter records (Use ↑↓ arrows)..."
                  className="block w-full pl-9 pr-4 py-2 bg-transparent rounded-lg text-[11px] font-bold text-slate-700 outline-none placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); setActiveIndex(-1); }}
                />
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {currentNotes.length > 0 ? currentNotes.map((note, index) => (
                <div 
                  key={note.id} 
                  className={`p-4 sm:p-5 hover:bg-slate-50 transition-colors duration-200 group cursor-pointer flex items-center justify-between border-l-2 gap-3 ${activeIndex === index ? 'bg-slate-50 border-clinicPrimary' : 'border-transparent'}`}
                  onClick={() => navigate(`/notes/view/${note.id}`)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white shadow-sm text-clinicPrimary flex items-center justify-center border border-slate-100 flex-shrink-0 transition-colors ${activeIndex === index ? 'bg-clinicPrimary text-white' : 'group-hover:bg-slate-100/50'}`}>
                      <FaFileMedical size={16} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                        <p 
                          onClick={(e) => { e.stopPropagation(); navigate('/patients/profile'); }}
                          className={`text-sm sm:text-[15px] font-bold text-slate-900 leading-none tracking-tight hover:text-clinicPrimary cursor-pointer transition-colors ${activeIndex === index ? 'text-clinicPrimary' : ''}`}
                        >
                          {note.patientName}
                        </p>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-widest">{note.category}</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm"></span>
                        {note.date}, {note.time}
                      </p>
                      <p className="text-[11px] sm:text-[12px] text-slate-500 mt-2 leading-relaxed font-medium line-clamp-2 max-w-xl group-hover:text-slate-700 transition-colors">
                        "{note.content}"
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/notes/view/${note.id}`);
                    }}
                    title="Review Clinical Note"
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary hover:bg-slate-50 transition-colors flex items-center justify-center flex-shrink-0 ${activeIndex === index ? 'text-clinicPrimary border-clinicPrimary' : ''}`}
                  >
                    <FaChevronRight size={10} />
                  </button>
                </div>
              )) : (
                <div className="p-12 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">No matching clinical records found</div>
              )}
            </div>
            <div className="p-4 sm:p-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
               <div className="flex gap-2">
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); setActiveIndex(-1); }}
                   disabled={currentPage === 1}
                   className="rounded-lg border border-slate-200 bg-white shadow-sm h-8 w-8 text-slate-500 hover:text-clinicPrimary transition-colors"
                 >
                   <FaChevronRight className="rotate-180" size={12} />
                 </Button>
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); setActiveIndex(-1); }}
                   disabled={currentPage === totalPages}
                   className="rounded-lg border border-slate-200 bg-white shadow-sm h-8 w-8 text-slate-500 hover:text-clinicPrimary transition-colors"
                 >
                   <FaChevronRight size={12} />
                 </Button>
               </div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Listing Node {currentPage} of {totalPages || 1}</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <Card hover={false} className="p-5 sm:p-6 border border-slate-100 shadow-none bg-white group overflow-hidden relative">
            <h3 className="text-[10px] font-bold mb-5 text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-4 bg-clinicPrimary-dark rounded-full"></div> Clinical Metrics
            </h3>
            <div className="grid grid-cols-1 gap-4 relative z-10">
              <div 
                onClick={() => alert('Viewing detailed verified records analysis...')}
                className="p-5 bg-slate-900 text-white rounded-xl border border-white/5 shadow-sm relative overflow-hidden cursor-pointer"
              >
                 <div className="relative z-10">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2 opacity-60">Verified Records</p>
                    <p className="text-2xl font-black tracking-tighter text-white">1,280 <span className="text-clinicPrimary text-xs font-bold ml-1.5">+12%</span></p>
                 </div>
                 <FaHistory className="absolute -bottom-4 -right-4 text-white/5 text-6xl" />
              </div>
              <div 
                onClick={() => alert('Opening peer review queue...')}
                className="p-5 bg-slate-50 rounded-xl border border-slate-100 shadow-none hover:bg-slate-100/50 transition-colors cursor-pointer"
              >
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3">Pending Peer Review</p>
                <div className="flex items-center justify-between">
                   <p className="text-2xl font-black text-slate-900 tracking-tighter">45</p>
                   <div className="w-12 h-1.5 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="bg-amber-400 h-full w-2/3 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl"></div>
          </Card>

          <Card hover={false} className="p-5 sm:p-6 border border-slate-100 shadow-none bg-white relative overflow-hidden">
            <h3 className="text-[10px] font-bold mb-5 text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div> Protocol Blueprints
            </h3>
            <div className="space-y-3 relative z-10">
              {['Initial Assessment', 'Physio Evolution', 'Discharge Summary', 'Critical Care Note'].map((template) => (
                <button 
                  key={template} 
                  onClick={() => navigate('/notes/new')}
                  className="w-full text-left p-3 sm:p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-clinicPrimary hover:shadow-sm transition-colors group flex items-center justify-between"
                >
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 group-hover:text-clinicPrimary uppercase tracking-tight transition-colors">{template}</p>
                    <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest font-black opacity-60">Verified Node Template</p>
                  </div>
                  <div className="w-8 h-8 rounded-md bg-white border border-slate-100 shadow-sm flex items-center justify-center text-clinicPrimary opacity-0 group-hover:opacity-100 transition-opacity">
                     <FaStethoscope size={10} />
                  </div>
                </button>
              ))}
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
