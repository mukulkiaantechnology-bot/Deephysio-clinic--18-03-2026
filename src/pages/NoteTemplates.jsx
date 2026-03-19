import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaCopy, FaEdit, FaTrash, FaPlus, FaSearch, FaFileMedical, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';


const INITIAL_TEMPLATES = [
  { 
    id: 1, 
    name: 'Standard SOAP Note', 
    category: 'Physiotherapy', 
    description: 'Subjective, Objective, Assessment, Plan',
    sections: [
      { id: 101, title: 'Subjective', placeholder: 'Knee pain, onset, VAS 0-10...' },
      { id: 102, title: 'Objective', placeholder: 'ROM flexion/extension, palpation...' },
      { id: 103, title: 'Assessment', placeholder: 'Clinical diagnosis, progress...' },
      { id: 104, title: 'Plan', placeholder: 'Treatment, HEP, next visit...' }
    ]
  },
  { 
    id: 2, 
    name: 'Initial Assessment', 
    category: 'Clinical', 
    description: 'Comprehensive first visit record',
    sections: [
      { id: 201, title: 'Medical History', placeholder: 'Past surgeries, conditions...' },
      { id: 202, title: 'Goal Setting', placeholder: 'Patient goals, expected outcomes...' },
      { id: 203, title: 'Physical Exam', placeholder: 'Specific clinical tests...' }
    ]
  },
  { 
    id: 3, 
    name: 'Post-Op Follow-up', 
    category: 'Rehabilitation', 
    description: 'Specialized for post-surgical progress',
    sections: [
      { id: 301, title: 'Surgical Status', placeholder: 'Wound healing, protocol stage...' },
      { id: 302, title: 'Mobility', placeholder: 'Aids used, gait pattern...' }
    ]
  },
  { id: 4, name: 'Wellness Check', category: 'Prevention', description: 'General health and maintenance record', sections: [{ id: 401, title: 'General Vitals', placeholder: 'HR, BP, etc.' }] },
  { id: 5, name: 'Sports Massage Report', category: 'Manual Therapy', description: 'Focus on muscular findings and treatment', sections: [{ id: 501, title: 'Soft Tissue State', placeholder: 'Tension, trigger points...' }] },
  { id: 6, name: 'Discharge Summary', category: 'Final', description: 'Conclusive report for GP and Patient', sections: [{ id: 601, title: 'Outcome Measures', placeholder: 'Final scores, recommendations...' }] },
];

const NoteTemplates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSmartDocsEnabled, setIsSmartDocsEnabled] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // holds template to delete
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
    
    // Deduplicate and ensure INITIAL_TEMPLATES always have their latest logic/sections
    const merged = [...savedTemplates];
    INITIAL_TEMPLATES.forEach(initial => {
      const existingIndex = merged.findIndex(t => t.id === initial.id);
      if (existingIndex > -1) {
        // Update existing initial template with new sections if missing
        merged[existingIndex] = { ...initial, ...merged[existingIndex], sections: initial.sections };
      } else {
        merged.push(initial);
      }
    });

    setTemplates(merged);
  }, []);

  const handleResetTemplates = () => {
    localStorage.removeItem('deephysio_note_templates');
    setTemplates(INITIAL_TEMPLATES);
    showToast('Templates factory reset successful!');
  };


  const handleToggleSmartDocs = () => {
    setIsSmartDocsEnabled(!isSmartDocsEnabled);
  };

  const handleCopyTemplate = (template) => {
    const newTemplate = { ...template, id: Date.now(), name: `${template.name} (Copy)` };
    const savedTemplates = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
    const updated = [newTemplate, ...savedTemplates];
    localStorage.setItem('deephysio_note_templates', JSON.stringify(updated));
    setTemplates([newTemplate, ...templates]);
    showToast(`"${template.name}" copied successfully!`);
  };

  const handleDeleteTemplate = (id) => {
    const savedTemplates = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
    const updated = savedTemplates.filter(t => t.id !== id);
    localStorage.setItem('deephysio_note_templates', JSON.stringify(updated));
    setTemplates(templates.filter(t => t.id !== id));
    setDeleteConfirm(null);
    showToast('Template deleted successfully.');
  };  

  
  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 relative">
      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-[20px] shadow-2xl border border-white/10 flex items-center gap-4">
            <FaCheckCircle className="text-clinicPrimary shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Template"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDeleteTemplate(deleteConfirm?.id)} leftIcon={<FaTrash size={12}/>}>Delete</Button>
          </div>
        }
      >
        <div className="p-6 text-center font-sans">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-rose-400 text-2xl" />
          </div>
          <p className="text-[15px] font-black text-slate-900 uppercase tracking-tighter">Delete "{deleteConfirm?.name}"?</p>
          <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">This action cannot be undone.</p>
        </div>
      </Modal>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Note Templates</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Standardize your clinical documentation workflow.</p>
        </div>
        <button 
          onClick={() => navigate('/notes/templates/new')}
          className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg active:scale-95 transition-all"
        >
          <FaPlus size={10}/> New Template
        </button>
      </div>

      <div className="card-clinic p-0 overflow-hidden border-none shadow-xl bg-white mb-8">
         <div className="p-4 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1">
               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
               <input 
                type="text" 
                placeholder="Search templates by name or category..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-lg text-base font-semibold outline-none focus:bg-white focus:border-clinicPrimary transition-all" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-gray-50">
            {filteredTemplates.map(template => (
               <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-2 py-0.5 bg-clinicLight rounded text-base font-black text-clinicPrimary uppercase tracking-widest">{template.category}</span>
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate('/notes/templates/new', { state: { template } }); }}
                          className="p-1.5 text-gray-300 hover:text-clinicPrimary"
                        >
                          <FaEdit size={12}/>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDeleteConfirm(template); }}
                          className="p-1.5 text-gray-300 hover:text-red-500"
                        >
                          <FaTrash size={12}/>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleCopyTemplate(template); }}
                          className="p-1.5 text-gray-300 hover:text-clinicSecondary"
                        >
                          <FaCopy size={12}/>
                        </button>
                     </div>
                  </div>
                  <h3 className="text-base font-black text-gray-900 leading-none mb-2">{template.name}</h3>
                  <p className="text-base font-medium text-gray-500 leading-relaxed uppercase tracking-tighter mb-6">{template.description}</p>
                </div>
            ))}
         </div>
      </div>

      <div className="card-clinic p-8 bg-clinicDark text-white border-none shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-clinicPrimary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-clinicPrimary flex items-center justify-center text-white shadow-xl rotate-3">
               <FaMagic size={32}/>
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-lg font-black uppercase tracking-widest mb-2 leading-none">Smart Template Suggester</h3>
               <p className="text-base font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-lg">Our AI analyzes your consultation patterns and suggests the perfect template for each treatment type.</p>
            </div>
            <button 
              onClick={handleToggleSmartDocs}
              className={`px-6 py-3 rounded-xl text-base font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-2 ${isSmartDocsEnabled ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-white text-clinicDark'}`}
            >
              {isSmartDocsEnabled ? <><FaCheckCircle size={14} /> Smart Docs Active</> : 'Enable Smart Docs'}
            </button>
         </div>
      </div>

      {/* Preview Modal Removed per request */}
    </div>
  );
};

export default NoteTemplates;
