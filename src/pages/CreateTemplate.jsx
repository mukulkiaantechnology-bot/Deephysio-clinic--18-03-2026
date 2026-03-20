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
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            {/* Toast */}
            {toast.visible && (
                <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[9999]">
                    <div className="bg-slate-900/95 backdrop-blur-md text-white px-8 py-4 rounded-[24px] shadow-2xl border border-white/10 flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                        <div className="w-8 h-8 rounded-full bg-clinicPrimary/20 flex items-center justify-center">
                            <FaCheckCircle className="text-clinicPrimary" size={14} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/notes/templates')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {editingTemplate ? 'Edit Protocol' : 'Protocol Builder'}
                    </h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">
                        {editingTemplate ? 'Synchronize Clinical Documentation Structure' : 'Design Master Clinical Patterns'}
                    </p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
                <div className="p-10 space-y-12">
                    {/* Basic Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Pattern Identity</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <input 
                                        type="text" 
                                        placeholder="Protocol Name (e.g., Neuro Master)"
                                        className={`w-full p-6 bg-slate-50 border rounded-2xl text-[14px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all placeholder:text-slate-300 ${nameError ? 'border-rose-200 bg-rose-50' : 'border-slate-100 focus:border-clinicPrimary'}`}
                                        value={formData.name}
                                        onChange={e => { setFormData({...formData, name: e.target.value}); setNameError(''); }}
                                    />
                                    {nameError && (
                                        <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                                            <FaExclamationTriangle size={10}/> {nameError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Category Vector</h3>
                            </div>
                            <div className="relative group">
                                <select 
                                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl text-[14px] font-black text-slate-800 outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all"
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                    <FaCogs size={14}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-6 pt-8 border-t border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Global Instruction Set</h3>
                        </div>
                        <textarea 
                            placeholder="Define the scope and utilization of this clinical pattern..."
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all min-h-[120px] resize-none shadow-inner-soft"
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    {/* Documentation Blocks */}
                    <div className="space-y-8 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Documentation Grid Nodes</h3>
                            </div>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={() => setSections([...sections, { id: Date.now(), title: '', placeholder: '' }])}
                                className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-50 border-slate-100 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                            >
                                <FaPlus className="mr-2"/> Append Block
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {sections.map((sec, i) => (
                                <div key={sec.id} className="group p-8 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-google transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-premium flex items-center justify-center text-[12px] font-black text-slate-400 group-hover:text-clinicPrimary transition-colors shrink-0">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Component Identifier (e.g., SOAP Objective)"
                                            className="w-full bg-transparent border-none text-[16px] font-black text-slate-900 outline-none placeholder:text-slate-200"
                                            value={sec.title}
                                            onChange={e => {
                                                const newSecs = [...sections];
                                                newSecs[i] = { ...newSecs[i], title: e.target.value };
                                                setSections(newSecs);
                                            }}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Input Matrix Ghost Text..."
                                            className="w-full bg-transparent border-none text-[12px] font-bold text-slate-400 outline-none placeholder:text-slate-200"
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
                                        className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-200 hover:text-rose-500 hover:border-rose-100 flex items-center justify-center transition-all md:self-center opacity-0 group-hover:opacity-100 shadow-sm active:scale-90"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol engine state: READY</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                            onClick={() => navigate('/notes/templates')}
                        >
                            Abort Builder
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Synchronizing...' : 'Commit Protocol'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CreateTemplate;
