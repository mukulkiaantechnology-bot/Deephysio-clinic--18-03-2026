import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaHistory, FaSearch, FaFileMedical, FaChevronRight, FaStickyNote, FaClipboardList, FaStethoscope } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const INITIAL_NOTES = [
  { id: 1, patientName: 'James Wilson', type: 'Physio Note', date: '2026-03-14', time: '10:30 AM', content: 'Demonstrated significant improvement in knee stability during weight-bearing exercises. Assessment confirms 12% increase in flexion gradient...', category: 'Physio' },
  { id: 2, patientName: 'Emily Brown', date: '2026-03-13', time: '14:20 PM', content: 'Patient reports mild discomfort in lower lumbar region after initial mobilization. Suggested home care plan adjustments...', category: 'Assessment' },
  { id: 3, patientName: 'James Wilson', date: '2026-03-12', time: '09:15 AM', content: 'Gait analysis shows slight internal rotation of the left ankle. Prescribed custom orthotics and follow-up in 2 weeks...', category: 'Gait Analysis' },
  { id: 4, patientName: 'Sarah Jenkins', date: '2026-03-11', time: '11:45 AM', content: 'Post-operative rehab session 4. Range of motion at 85 degrees. Pain managed well with current medication protocol...', category: 'Rehab' },
  { id: 5, patientName: 'Michael Chen', date: '2026-03-10', time: '16:00 PM', content: 'Initial assessment for shoulder impingement. Positive painful arc test. Exercises provided for rotator cuff strengthening...', category: 'Initial Assessment' },
];

const ClinicalNotes = () => {
  const navigate = useNavigate();
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [noteText, setNoteText] = useState('');
  const itemsPerPage = 3;
  const textareaRef = useRef(null);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('deephysio_clinical_notes') || '[]');
    setNotes([...savedNotes, ...INITIAL_NOTES]);
  }, []);

  const filteredNotes = notes.filter(note => 
    note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const currentNotes = filteredNotes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (isNoteModalOpen) return;
      if (e.key === 'ArrowDown') {
        setActiveIndex(prev => Math.min(prev + 1, currentNotes.length - 1));
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && activeIndex !== -1) {
        setSelectedNote(currentNotes[activeIndex]);
        setIsNoteModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentNotes, activeIndex, isNoteModalOpen]);

  const handleExportXL = () => {
    const csvRows = [
      ['ID', 'Patient Name', 'Date', 'Time', 'Category', 'Content'],
      ...filteredNotes.map(n => [n.id, n.patientName, n.date, n.time, n.category, n.content.replace(/,/g, ';')])
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

  const addToken = (token) => {
    setNoteText(prev => prev + (prev ? '\n' : '') + `[${token}]: `);
    if (textareaRef.current) textareaRef.current.focus();
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Records</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Capture observations, plans, and assessments effectively with high-fidelity nodes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full lg:w-auto">
          <Button 
            variant="secondary" 
            size="lg" 
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 border-none shadow-premium hover:shadow-google transition-all active:scale-95" 
            leftIcon={<FaHistory size={12}/>}
            onClick={() => alert('Clinical records archived successfully!')}
          >
            Archive
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 border-none shadow-premium hover:shadow-google text-emerald-600 transition-all active:scale-95" 
            leftIcon={<FaFileMedical size={12}/>}
            onClick={handleExportXL}
          >
            Export XL
          </Button>
          <Button 
            variant="accent" 
            size="lg"
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 shadow-lg active:scale-95 transition-all"
            onClick={() => navigate('/notes/new')}
            leftIcon={<FaStickyNote size={12}/>}
          >
            New Note
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <Modal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)}
        title={selectedNote ? `Review: ${selectedNote.patientName}` : "New Clinical Observation"}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => { setIsNoteModalOpen(false); }}>Discard Draft</Button>
            <Button variant="accent" onClick={() => {
              if (!noteText) return;
              const newNote = {
                id: Date.now(),
                patientName: document.getElementById('patient-select')?.value || 'James Wilson',
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                content: noteText,
                category: 'Physio Note'
              };
              const existingNotes = JSON.parse(localStorage.getItem('deephysio_clinical_notes') || '[]');
              const updatedNotes = [newNote, ...existingNotes];
              localStorage.setItem('deephysio_clinical_notes', JSON.stringify(updatedNotes));
              setNotes([...updatedNotes, ...INITIAL_NOTES]);
              setIsNoteModalOpen(false);
              setNoteText('');
            }} leftIcon={<FaPlus />}>Finalize & Save</Button>
          </div>
        }
      >
        <div className="space-y-8 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Patient Subject</label>
              <select id="patient-select" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                {selectedNote ? <option>{selectedNote.patientName}</option> : (
                  <>
                    <option value="James Wilson">James Wilson (PID-102)</option>
                    <option value="Emily Brown">Emily Brown (PID-205)</option>
                    <option value="Alice Johnson">Alice Johnson (PID-101)</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Attending Clinician</label>
              <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-400 outline-none" value="Dr. Sarah Smith (Senior Physio)" readOnly />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Primary Clinical Content</label>
            <textarea 
              ref={textareaRef}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-[13px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all h-48 custom-scrollbar placeholder:text-slate-300" 
              placeholder="Describe clinical findings, diagnostic impressions, and treatment progress..."
              value={selectedNote ? selectedNote.content : noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-4 block leading-none">Quick Integration Tokens</label>
            <div className="flex flex-wrap gap-2.5">
              {['ROM Evaluation', 'Mobilization Stage', 'Pain Scale (1-10)', 'Home Care Plan', 'Gait Analysis'].map(tag => (
                <span 
                  key={tag} 
                  onClick={() => addToken(tag)}
                  className="px-4 py-2 bg-white border border-slate-100 text-clinicPrimary rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-clinicPrimary hover:text-white hover:shadow-google hover:-translate-y-0.5 transition-all shadow-sm active:scale-95"
                >
                  + {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <Card className="p-0 overflow-hidden border-none shadow-premium bg-white">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/20 gap-6">
              <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                 <FaClipboardList size={14} className="text-clinicPrimary" /> Clinical Journal Node
              </h3>
              <div className="relative group w-full md:max-w-md bg-white rounded-2xl border border-slate-100 shadow-inner-soft transition-all focus-within:ring-4 focus-within:ring-clinicPrimary/5">
                <span className="absolute inset-y-0 left-4 flex items-center text-slate-300 group-focus-within:text-clinicPrimary transition-colors">
                  <FaSearch size={14}/>
                </span>
                <input
                  type="text"
                  placeholder="Filter records (Use ↑↓ arrows)..."
                  className="block w-full pl-12 pr-6 py-4 bg-transparent rounded-2xl text-[13px] font-bold text-slate-600 outline-none placeholder:text-slate-300"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); setActiveIndex(-1); }}
                />
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {currentNotes.length > 0 ? currentNotes.map((note, index) => (
                <div 
                  key={note.id} 
                  className={`p-6 sm:p-10 hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer flex items-center justify-between border-l-4 gap-4 ${activeIndex === index ? 'bg-slate-50 border-clinicPrimary' : 'border-transparent'}`}
                  onClick={() => { setSelectedNote(note); setIsNoteModalOpen(true); }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-premium text-clinicPrimary flex items-center justify-center group-hover:bg-clinicPrimary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-slate-50 flex-shrink-0 ${activeIndex === index ? 'bg-clinicPrimary text-white rotate-3 scale-110' : ''}`}>
                      <FaFileMedical size={24} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
                        <p 
                          onClick={(e) => { e.stopPropagation(); navigate('/patients/profile'); }}
                          className={`text-base sm:text-[17px] font-bold text-slate-900 leading-none tracking-tight hover:text-clinicPrimary cursor-pointer transition-colors ${activeIndex === index ? 'text-clinicPrimary' : ''}`}
                        >
                          {note.patientName}
                        </p>
                        <span className="px-3 py-1 bg-slate-900 text-clinicPrimary rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg">{note.category}</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        {note.date}, {note.time}
                      </p>
                      <p className="text-[12px] sm:text-[13px] text-slate-500 mt-4 leading-relaxed font-medium line-clamp-2 opacity-80 max-w-2xl group-hover:opacity-100 transition-opacity italic">
                        "{note.content}"
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedNote(note); setIsNoteModalOpen(true); }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-white hover:bg-clinicPrimary hover:shadow-google hover:scale-110 transition-all flex items-center justify-center flex-shrink-0 active:scale-95 ${activeIndex === index ? 'bg-clinicPrimary text-white shadow-google scale-110' : ''}`}
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              )) : (
                <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">No matching clinical records found</div>
              )}
            </div>
            <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between gap-4">
               <div className="flex gap-3">
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); setActiveIndex(-1); }}
                   disabled={currentPage === 1}
                   className="rounded-2xl border border-slate-100 bg-white shadow-premium h-12 w-12 active:scale-95"
                 >
                   <FaChevronRight className="rotate-180" size={10} />
                 </Button>
                 <Button 
                   variant="secondary" 
                   size="icon" 
                   onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); setActiveIndex(-1); }}
                   disabled={currentPage === totalPages}
                   className="rounded-2xl border border-slate-100 bg-white shadow-premium h-12 w-12 active:scale-95"
                 >
                   <FaChevronRight size={10} />
                 </Button>
               </div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Node {currentPage} of {totalPages || 1}</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="p-10 border-none shadow-premium bg-white group overflow-hidden relative">
            <h3 className="text-[11px] font-bold mb-8 text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
               <div className="w-1.5 h-6 bg-clinicPrimary-dark rounded-full"></div> Clinical Metrics
            </h3>
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div 
                onClick={() => alert('Viewing detailed verified records analysis...')}
                className="p-8 bg-slate-900 text-white rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group/card cursor-pointer"
              >
                 <div className="relative z-10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3 opacity-60">Verified Records</p>
                    <p className="text-4xl font-bold tracking-tighter text-white">1,280 <span className="text-clinicPrimary text-lg font-medium ml-2">+12%</span></p>
                 </div>
                 <FaHistory className="absolute -bottom-6 -right-6 text-white/5 text-8xl group-hover/card:scale-110 transition-transform duration-700" />
              </div>
              <div 
                onClick={() => alert('Opening peer review queue...')}
                className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner-soft hover:bg-white transition-all cursor-pointer"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-4">Pending Peer Review</p>
                <div className="flex items-center justify-between">
                   <p className="text-3xl font-bold text-slate-900 tracking-tighter">45</p>
                   <div className="w-16 h-2 bg-white rounded-full overflow-hidden border border-slate-100 shadow-inner">
                      <div className="bg-amber-400 h-full w-2/3 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px]"></div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white relative overflow-hidden">
            <h3 className="text-[11px] font-bold mb-8 text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
               <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Protocol Blueprints
            </h3>
            <div className="space-y-4 relative z-10">
              {['Initial Assessment', 'Physio Evolution', 'Discharge Summary', 'Critical Care Note'].map((template) => (
                <button 
                  key={template} 
                  onClick={() => {
                    setSelectedNote(null);
                    setNoteText(`[${template.toUpperCase()}]: \n\nSubjective: \nObjective: \nAssessment: \nPlan: `);
                    setIsNoteModalOpen(true);
                  }}
                  className="w-full text-left p-5 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-clinicPrimary hover:shadow-google transition-all duration-300 group flex items-center justify-between active:scale-95"
                >
                  <div>
                    <p className="text-[13px] font-bold text-slate-800 group-hover:text-clinicPrimary uppercase tracking-tight transition-colors">{template}</p>
                    <p className="text-[9px] text-slate-400 mt-2 uppercase tracking-widest font-black opacity-60">Verified Node Template</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white shadow-soft flex items-center justify-center text-clinicPrimary opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                     <FaStethoscope size={12} />
                  </div>
                </button>
              ))}
            </div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-[40px]"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicalNotes;
