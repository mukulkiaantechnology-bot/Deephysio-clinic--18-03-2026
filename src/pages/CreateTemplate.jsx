import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaCogs, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CreateTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTemplate = location.state?.template;

  const [formData, setFormData] = useState({ 
    name: editingTemplate?.name || '', 
    category: editingTemplate?.category || 'Physiotherapy', 
    description: editingTemplate?.description || '' 
  });
  const [sections, setSections] = useState(
    editingTemplate?.sections || [{ id: 1, title: 'Section 1', placeholder: 'Enter details...' }]
  );
  const [isSaving, setIsSaving] = useState(false);
  const [nameError, setNameError] = useState('');
  const [toast, setToast] = useState({ message: '', visible: false });

  const categories = ['Physiotherapy', 'Clinical', 'Rehabilitation', 'Prevention', 'Manual Therapy', 'Final'];

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setNameError('Template Name is required.');
      return;
    }
    setNameError('');
    setIsSaving(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('deephysio_note_templates') || '[]');
      
      if (editingTemplate) {
        const updated = existing.map(t => t.id === editingTemplate.id ? { ...t, ...formData, sections } : t);
        localStorage.setItem('deephysio_note_templates', JSON.stringify(updated));
      } else {
        const newTemplate = { id: Date.now(), ...formData, sections };
        localStorage.setItem('deephysio_note_templates', JSON.stringify([newTemplate, ...existing]));
      }
      
      setIsSaving(false);
      showToast(editingTemplate ? 'Template updated successfully!' : 'Template created successfully!');
      setTimeout(() => navigate('/notes/templates'), 1400);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in p-4 md:p-6 font-sans relative">
      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg border border-white/10 flex items-center gap-3">
            <FaCheckCircle className="text-clinicPrimary shrink-0" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate('/notes/templates')}
            className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:bg-slate-50 transition-colors shrink-0"
          >
            <FaArrowLeft size={12}/>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                {editingTemplate ? 'Edit Template' : 'Template Builder'}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                {editingTemplate ? 'Modify existing clinical documentation structure' : 'Design custom clinical documentation structures'}
            </p>
          </div>
        </div>
        <Button 
          variant="accent" 
          onClick={handleSave} 
          isLoading={isSaving}
          className="rounded-lg px-6 h-10 text-[10px] font-black uppercase tracking-widest shadow-sm" 
          leftIcon={isSaving ? <FaCogs size={10} className="animate-spin" /> : <FaSave size={10} />}
        >
          {isSaving ? 'Committing...' : 'Commit Protocol'}
        </Button>
      </div>

      <Card hover={false} className="p-5 sm:p-6 border border-slate-100 shadow-none bg-white space-y-5 sm:space-y-6 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative z-10">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Template Name *
              </label>
              <input 
                 type="text" 
                 placeholder="e.g., Extended Neuro Assessment"
                 className={`w-full p-3 bg-slate-50 border rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 transition-colors placeholder:text-slate-400 ${nameError ? 'border-rose-300 bg-rose-50' : 'border-slate-200 focus:border-clinicPrimary'}`}
                 value={formData.name}
                 onChange={e => { setFormData({...formData, name: e.target.value}); setNameError(''); }}
              />
              {nameError && (
                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1.5">
                  <FaExclamationTriangle size={10}/> {nameError}
                </p>
              )}
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Category Node
              </label>
              <select 
                 className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors cursor-pointer appearance-none"
                 value={formData.category}
                 onChange={e => setFormData({...formData, category: e.target.value})}
              >
                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
           </div>
        </div>
        <div className="space-y-3 relative z-10">
           <label className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-clinicPrimary"></div> Protocol Description
           </label>
           <textarea 
              placeholder="Briefly describe the purpose of this template instance..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors placeholder:text-slate-400 min-h-[80px] resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
           ></textarea>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Documentation Blocks</h3>
           <Button 
             variant="secondary" 
             size="sm" 
             leftIcon={<FaPlus size={10}/>}
             onClick={() => setSections([...sections, { id: Date.now(), title: '', placeholder: '' }])}
             className="text-[10px] uppercase font-black"
           >
              Add Block
           </Button>
        </div>

        {sections.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">No blocks yet. Click "Add Block" above.</p>
          </div>
        )}

        {sections.map((sec, i) => (
           <Card key={sec.id} className="p-6 border-none shadow-soft hover:shadow-premium transition-all bg-white flex flex-col md:flex-row gap-6 relative group">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-clinicPrimary/5 flex items-center justify-center text-[11px] font-black text-clinicPrimary self-start md:self-center">
                {i + 1}
              </div>
              <div className="flex-1 space-y-2">
                 <input 
                    type="text" 
                    placeholder="Block Title (e.g., Objective Assessment)"
                    className="w-full p-4 border-b-2 border-slate-100 bg-transparent text-[14px] font-black text-slate-900 outline-none focus:border-clinicPrimary transition-colors placeholder:text-slate-300"
                    value={sec.title}
                    onChange={e => {
                       const newSecs = [...sections];
                       newSecs[i] = { ...newSecs[i], title: e.target.value };
                       setSections(newSecs);
                    }}
                 />
                 <input 
                    type="text" 
                    placeholder="Placeholder Hint..."
                    className="w-full p-4 bg-transparent text-[12px] font-medium text-slate-500 outline-none placeholder:text-slate-200"
                    value={sec.placeholder}
                    onChange={e => {
                       const newSecs = [...sections];
                       newSecs[i] = { ...newSecs[i], placeholder: e.target.value };
                       setSections(newSecs);
                    }}
                 />
              </div>
              <button 
                 onClick={() => setSections(sections.filter(s => s.id !== sec.id))}
                 className="w-12 h-12 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all md:self-center opacity-0 group-hover:opacity-100 shrink-0 active:scale-90"
              >
                 <FaTrash size={14} />
              </button>
           </Card>
        ))}
      </div>
    </div>
  );
};

export default CreateTemplate;
