import React, { useState, useEffect } from 'react';
import { FaMagic, FaCopy, FaEdit, FaTrash, FaPlus, FaSearch, FaFileMedical } from 'react-icons/fa';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const INITIAL_TEMPLATES = [
  { id: 1, name: 'Standard SOAP Note', category: 'Physiotherapy', description: 'Subjective, Objective, Assessment, Plan' },
  { id: 2, name: 'Initial Assessment', category: 'Clinical', description: 'Comprehensive first visit record' },
  { id: 3, name: 'Post-Op Follow-up', category: 'Rehabilitation', description: 'Specialized for post-surgical progress' },
  { id: 4, name: 'Wellness Check', category: 'Prevention', description: 'General health and maintenance record' },
  { id: 5, name: 'Sports Massage Report', category: 'Manual Therapy', description: 'Focus on muscular findings and treatment' },
  { id: 6, name: 'Discharge Summary', category: 'Final', description: 'Conclusive report for GP and Patient' },
];

const NoteTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', category: '', description: '' });

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
    if (savedTemplates.length > 0) {
      setTemplates([...savedTemplates, ...INITIAL_TEMPLATES]);
    } else {
      setTemplates(INITIAL_TEMPLATES);
    }
  }, []);

  const handleCreateTemplate = () => {
    if (!formData.name || !formData.category || !formData.description) return;

    const newTemplate = {
      id: Date.now(),
      ...formData
    };

    const savedTemplates = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
    const updatedSaved = [newTemplate, ...savedTemplates];
    localStorage.setItem('deephysio_note_templates', JSON.stringify(updatedSaved));
    
    setTemplates([newTemplate, ...templates]);
    setIsModalOpen(false);
    setFormData({ name: '', category: '', description: '' });
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Note Templates</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Standardize your clinical documentation workflow.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg "
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
                          onClick={(e) => { e.stopPropagation(); alert(`Editing ${template.name}...`); }}
                          className="p-1.5 text-gray-300 hover:text-clinicPrimary"
                        >
                          <FaEdit size={12}/>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); alert(`Creating a copy of ${template.name}...`); }}
                          className="p-1.5 text-gray-300 hover:text-clinicSecondary"
                        >
                          <FaCopy size={12}/>
                        </button>
                     </div>
                  </div>
                  <h3 className="text-base font-black text-gray-900 leading-none mb-2">{template.name}</h3>
                  <p className="text-base font-medium text-gray-500 leading-relaxed uppercase tracking-tighter mb-6">{template.description}</p>
                  <button 
                    onClick={() => alert(`Previewing template: ${template.name}`)}
                    className="w-full py-2 bg-white border border-gray-100 rounded-lg text-base font-black text-gray-500 uppercase tracking-widest hover:border-clinicPrimary hover:text-clinicPrimary transition-all"
                  >
                    Preview Template
                  </button>
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
              onClick={() => alert('Smart Template Suggester enabled!')}
              className="px-6 py-3 bg-white text-clinicDark rounded-xl text-base font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
            >
              Enable Smart Docs
            </button>
         </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Note Template"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleCreateTemplate}>Create Template</Button>
          </div>
        }
      >
        <div className="space-y-6 p-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Template Name</label>
            <input 
              type="text" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-clinicPrimary transition-all"
              placeholder="e.g., Progress Follow-up"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
            <select 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-clinicPrimary transition-all appearance-none cursor-pointer"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Clinical">Clinical</option>
              <option value="Rehabilitation">Rehabilitation</option>
              <option value="Prevention">Prevention</option>
              <option value="Manual Therapy">Manual Therapy</option>
              <option value="Final">Final</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-clinicPrimary transition-all h-32 resize-none"
              placeholder="List the key components of this template..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NoteTemplates;
