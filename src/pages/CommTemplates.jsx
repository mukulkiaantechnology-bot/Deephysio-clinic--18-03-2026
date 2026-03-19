import React, { useState, useRef } from 'react';
import { FaFileAlt, FaVideo, FaPlus, FaSearch, FaSms, FaEnvelope, FaTrash, FaEdit, FaFilter, FaCheckCircle, FaExclamationTriangle, FaMicroscope, FaBrain, FaTag, FaSync, FaCopy } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const INITIAL_TEMPLATES = [
  { id: 1, name: 'Appointment Confirmation', type: 'SMS', content: 'Hi {firstname}, your clinical appointment with {practitioner} is confirmed for {time}. Please arrive 5m early for node synchronization.', category: 'Operational', lastUsed: '2h ago' },
  { id: 2, name: 'Late Arrival Policy', type: 'SMS', content: 'Dear {firstname}, please note that arriving more than 15m late may result in a temporal node rescheduling for clinical integrity.', category: 'Policy', lastUsed: 'Yesterday' },
  { id: 3, name: 'Post-Op Followup Delta', type: 'Email', content: 'Hi {firstname}, how is your recovery node progressing after your recent session? Here are some stabilization protocols for your review...', category: 'Clinical', lastUsed: '3 days ago' },
  { id: 4, name: 'Recall Notification Alpha', type: 'SMS', content: 'Hi {firstname}, it has been 6 months since your last clinical checkpoint. Synchronize your next session now via our portal.', category: 'Marketing', lastUsed: '1 week ago' },
];

const CommTemplates = () => {
  const [activeType, setActiveType] = useState('SMS');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [formData, setFormData] = useState({ name: '', category: 'Operational', content: '' });
  const [nameError, setNameError] = useState('');
  const [contentError, setContentError] = useState('');
  const textareaRef = useRef(null);

  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const openDeploy = (template = null) => {
    setEditingTemplate(template);
    setFormData(template
      ? { name: template.name, category: template.category, content: template.content }
      : { name: '', category: 'Operational', content: '' }
    );
    setNameError('');
    setContentError('');
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    let valid = true;
    if (!formData.name.trim()) { setNameError('Protocol Identifier is required.'); valid = false; }
    if (!formData.content.trim()) { setContentError('Transmission Payload is required.'); valid = false; }
    if (!valid) return;

    setIsSaving(true);
    setTimeout(() => {
      if (editingTemplate) {
        setTemplates(prev => prev.map(t => t.id === editingTemplate.id
          ? { ...t, ...formData, lastUsed: 'Just now' }
          : t
        ));
        showToast('Template updated successfully!');
      } else {
        const newTemplate = {
          id: Date.now(),
          ...formData,
          type: activeType,
          lastUsed: 'Just now',
        };
        setTemplates(prev => [newTemplate, ...prev]);
        showToast('Template deployed successfully!');
      }
      setIsSaving(false);
      setIsEditorOpen(false);
    }, 900);
  };

  const handleDelete = (id) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    setDeleteConfirm(null);
    showToast('Template removed from cluster.');
  };

  const handleClone = (template) => {
    const clone = { ...template, id: Date.now(), name: `${template.name} (Copy)`, lastUsed: 'Just now' };
    setTemplates(prev => [clone, ...prev]);
    showToast(`"${template.name}" cloned successfully!`);
  };

  const injectTag = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = formData.content.substring(0, start) + `{${tag}}` + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    setContentError('');
    setTimeout(() => {
      textarea.focus();
      const newPos = start + tag.length + 2;
      textarea.setSelectionRange(newPos, newPos);
    }, 10);
  };

  const runTemplateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Template protocols synchronized across all branches!');
    }, 2000);
  };

  const filtered = templates.filter(t =>
    t.type === activeType &&
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in font-sans relative">
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
            <Button variant="danger" onClick={() => handleDelete(deleteConfirm?.id)} leftIcon={<FaTrash size={12}/>}>Delete</Button>
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

      {/* Header */}
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Standardized Transmission Nodes</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Orchestrate clinical outreach with pre-defined messaging protocols and validated templates.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" isLoading={isSyncing} className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={runTemplateSync} leftIcon={<FaSync className={isSyncing ? 'animate-spin' : ''} />}>
             {isSyncing ? 'Syncing...' : 'Handshake Sync'}
           </Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => openDeploy()} leftIcon={<FaPlus />}>Deploy Template</Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[700px]">
        {/* Sidebar */}
        <Card className="lg:col-span-3 p-8 space-y-3 h-full bg-white border-none shadow-premium rounded-[40px]">
           <div className="mb-10 px-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Channel Selectors</h3>
              <div className="space-y-3">
                 {[
                   { id: 'SMS', icon: <FaSms />, label: 'SMS Nodes', count: templates.filter(t => t.type === 'SMS').length },
                   { id: 'Email', icon: <FaEnvelope />, label: 'Email Protocols', count: templates.filter(t => t.type === 'Email').length },
                   { id: 'Telehealth', icon: <FaVideo />, label: 'Virtual Invites', count: templates.filter(t => t.type === 'Telehealth').length },
                   { id: 'System', icon: <FaBrain />, label: 'Internal Logic', count: templates.filter(t => t.type === 'System').length }
                 ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveType(item.id)}
                      className={`w-full flex items-center justify-between px-6 py-5 rounded-[28px] transition-all duration-500 group border ${activeType === item.id ? 'bg-clinicPrimary text-white shadow-google border-clinicPrimary translate-x-2' : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'}`}
                    >
                       <div className="flex items-center gap-4">
                          <span className={`text-lg transition-transform group-hover:rotate-12 ${activeType === item.id ? 'text-white' : 'text-slate-200'}`}>{item.icon}</span>
                          <span className={`text-[13px] font-black uppercase tracking-widest ${activeType === item.id ? 'text-white' : 'text-slate-600'}`}>{item.label}</span>
                       </div>
                       <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${activeType === item.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-300'}`}>{item.count}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-slate-900 rounded-[32px] border border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                 <p className="text-[12px] font-black text-white uppercase tracking-tight mb-3 flex items-center gap-3">
                   <FaTag className="text-clinicPrimary" /> Dynamic Token Logic
                 </p>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Use validated patient nodes (e.g., {`{firstname}`}) for stochastic personalization.</p>
              </div>
           </div>
        </Card>

        {/* Templates Grid */}
        <div className="lg:col-span-9 space-y-8">
           <Card className="p-0 border-none shadow-premium bg-white rounded-[40px] overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center gap-6 bg-slate-50/20">
                 <div className="relative flex-1 group">
                    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                    <input
                      type="text"
                      placeholder={`Query ${activeType} transmission nodes...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-8 py-4 bg-white border border-slate-100 rounded-[20px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all shadow-inner-soft placeholder:text-slate-200"
                    />
                 </div>
              </div>

              <div className="divide-y divide-slate-50">
                 {filtered.map(template => (
                    <div
                      key={template.id}
                      className="p-10 hover:bg-slate-50/50 transition-all duration-500 group relative cursor-pointer border-l-8 border-l-transparent hover:border-l-clinicPrimary"
                      onClick={() => openDeploy(template)}
                    >
                       <div className="flex justify-between items-start mb-8">
                          <div className="space-y-3">
                             <div className="flex items-center gap-4">
                                <span className="px-4 py-1.5 bg-clinicPrimary/5 text-clinicPrimary text-[9px] font-black uppercase tracking-[0.2em] rounded-xl border border-clinicPrimary/10 shadow-soft">
                                   {template.category} Node
                                </span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Used {template.lastUsed}</span>
                             </div>
                             <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-clinicPrimary transition-colors">{template.name}</h3>
                          </div>
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                             <button onClick={(e) => { e.stopPropagation(); handleClone(template); }} title="Clone" className="w-10 h-10 bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center shadow-soft"><FaCopy size={12}/></button>
                             <button onClick={(e) => { e.stopPropagation(); openDeploy(template); }} title="Edit" className="w-10 h-10 bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center shadow-soft"><FaEdit size={12}/></button>
                             <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(template); }} title="Delete" className="w-10 h-10 bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-rose-500 hover:shadow-google transition-all flex items-center justify-center shadow-soft"><FaTrash size={12}/></button>
                          </div>
                       </div>

                       <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 relative group-hover:bg-white group-hover:shadow-premium transition-all duration-500">
                          <p className="text-[15px] font-bold text-slate-600 leading-relaxed tracking-tight italic opacity-80">
                             "{template.content}"
                          </p>
                          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-premium text-slate-200 group-hover:text-clinicPrimary transition-colors">
                             <FaFileAlt size={14}/>
                          </div>
                       </div>

                       <div className="flex flex-wrap gap-3 mt-8">
                          {['firstname', 'lastname', 'practitioner', 'time', 'date'].map(tag => (
                            <span key={tag} className="text-[10px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-4 py-1.5 rounded-full hover:border-clinicPrimary hover:text-clinicPrimary transition-colors">
                               {`{${tag}}`}
                            </span>
                          ))}
                       </div>
                    </div>
                 ))}

                 {filtered.length === 0 && (
                    <div className="p-32 text-center space-y-8 group">
                       <div className="w-28 h-28 rounded-[40px] bg-slate-50 flex items-center justify-center mx-auto border-4 border-dashed border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-700">
                          <FaPlus className="text-slate-200" size={32}/>
                       </div>
                       <div className="space-y-4">
                          <p className="text-xl font-black text-slate-400 uppercase tracking-tighter">No Templates Found</p>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">No {activeType} protocols found. Deploy a new template to get started.</p>
                       </div>
                       <Button variant="secondary" className="px-10 h-14 rounded-2xl border-none shadow-premium font-black uppercase text-[10px] tracking-widest" onClick={() => openDeploy()}>Create New Template</Button>
                    </div>
                 )}
              </div>
           </Card>
        </div>
      </div>

      {/* Deploy / Edit Modal */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingTemplate ? 'Edit Transmission Protocol' : 'Deploy Protocol Prototype'}
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsEditorOpen(false)}>Cancel</Button>
            <Button variant="accent" isLoading={isSaving} onClick={handleSave} leftIcon={<FaCheckCircle />}>
              {isSaving ? 'Saving...' : (editingTemplate ? 'Update Protocol' : 'Deploy & Sync')}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 p-4 text-left font-sans">
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Protocol Identifier *</label>
                 <input
                   type="text"
                   placeholder="e.g. Follow-up Node Alpha"
                   value={formData.name}
                   onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setNameError(''); }}
                   className={`w-full px-8 py-5 bg-slate-50 border rounded-[24px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all ${nameError ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'}`}
                 />
                 {nameError && <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest ml-4 flex items-center gap-2"><FaExclamationTriangle size={10}/> {nameError}</p>}
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Categorical Tag</label>
                 <select
                   value={formData.category}
                   onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                   className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] text-[15px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all appearance-none cursor-pointer"
                 >
                    <option>Operational</option>
                    <option>Clinical</option>
                    <option>Policy</option>
                    <option>Marketing</option>
                 </select>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Transmission Payload *</label>
              <textarea
                ref={textareaRef}
                placeholder="Construct standardized message logic..."
                value={formData.content}
                onChange={e => { setFormData(p => ({ ...p, content: e.target.value })); setContentError(''); }}
                className={`w-full px-8 py-6 bg-slate-50 border rounded-[32px] text-[15px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 transition-all h-40 resize-none ${contentError ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'}`}
              ></textarea>
              {contentError && <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest ml-4 flex items-center gap-2"><FaExclamationTriangle size={10}/> {contentError}</p>}
           </div>

           <div className="p-8 bg-slate-900 rounded-[32px] border border-white/5 relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-[12px] font-black text-white uppercase tracking-tight mb-3 flex items-center gap-3">
                   <FaBrain className="text-clinicPrimary" /> Inject Dynamic Tags
                 </p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-5">Click a tag to insert at cursor position in your payload.</p>
                 <div className="flex flex-wrap gap-2">
                    {['firstname', 'lastname', 'time', 'date', 'practitioner', 'clinic', 'phone'].map(tag => (
                       <button
                         key={tag}
                         type="button"
                         onClick={() => injectTag(tag)}
                         className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 hover:text-clinicPrimary hover:bg-white/10 hover:border-clinicPrimary/30 transition-all uppercase tracking-widest active:scale-90"
                       >
                         + {`{${tag}}`}
                       </button>
                    ))}
                 </div>
              </div>
              <FaMicroscope className="absolute right-[-20px] bottom-[-20px] text-white/5 text-[100px] rotate-12" />
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommTemplates;
