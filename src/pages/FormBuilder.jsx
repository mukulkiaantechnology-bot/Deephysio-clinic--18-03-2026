import React, { useState } from 'react';
import { FaPlus, FaSave, FaTrash, FaGripLines, FaHeading, FaFont, FaCheckSquare, FaDotCircle, FaCalendarAlt, FaToggleOn, FaSlidersH, FaEye, FaLayerGroup, FaUndo, FaCloudUploadAlt, FaHistory, FaCheck, FaMicroscope } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const FormBuilder = () => {
  const [fields, setFields] = useState([
    { id: 1, type: 'Heading', label: 'Clinical Intake Protocol', required: false },
    { id: 2, type: 'Text', label: 'Authenticated Subject Name', required: true },
    { id: 3, type: 'Date', label: 'Temporal Origin (DOB)', required: true },
    { id: 4, type: 'Checkbox', label: 'Protocol Acknowledgement', required: true },
  ]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const addField = (type) => {
    setFields([...fields, { id: Date.now(), type, label: `Analytical ${type} Field`, required: false }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
    if (selectedField?.id === id) setSelectedField(null);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('System: Form Architecture finalized and synchronized with the clinical baseline.');
    }, 1500);
  };

  const toggleFieldRequired = (id) => {
    setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Form Architecture Lab</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Engineer high-fidelity clinical intake protocols and consent frameworks.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 transition-all text-[11px] font-black uppercase tracking-widest" onClick={() => setIsPreviewOpen(true)} leftIcon={<FaEye />}>Live Preview</Button>
           <Button variant="accent" size="lg" className="flex-1 lg:flex-none rounded-[24px] h-14 px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" onClick={handleSave} disabled={isSaving} leftIcon={isSaving ? null : <FaCloudUploadAlt />}>
             {isSaving ? 'Synchronizing...' : 'Finalize Template'}
           </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 min-h-[700px]">
        {/* Field Library */}
        <div className="xl:col-span-3 space-y-8">
          <Card className="p-8 border-none shadow-premium bg-white sticky top-28 group rounded-[40px]">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-10 flex items-center gap-4">
               <FaLayerGroup className="text-clinicPrimary" /> Node Library
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { type: 'Heading', icon: <FaHeading /> },
                { type: 'Text', icon: <FaFont /> },
                { type: 'Checkbox', icon: <FaCheckSquare /> },
                { type: 'Radio', icon: <FaDotCircle /> },
                { type: 'Date', icon: <FaCalendarAlt /> },
                { type: 'Long Text', icon: <FaGripLines /> },
              ].map(item => (
                <button 
                  key={item.type}
                  onClick={() => addField(item.type)}
                  className="p-6 bg-slate-50 border border-slate-100 rounded-[24px] flex flex-col items-center gap-4 hover:bg-white hover:shadow-premium hover:border-clinicPrimary transition-all duration-300 group/item transform hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-lg text-slate-400 group-hover/item:text-clinicPrimary group-hover/item:scale-125 transition-all">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/item:text-slate-900 transition-colors uppercase">{item.type}</span>
                </button>
              ))}
            </div>
            <div className="mt-10 p-6 bg-blue-50/50 rounded-[28px] border border-blue-100 flex items-start gap-4">
               <p className="text-[10px] font-black text-blue-600 leading-relaxed uppercase tracking-widest opacity-80">Sync Tip: System nodes ingestion active.</p>
            </div>
          </Card>
        </div>

        {/* Live Canvas */}
        <div className="xl:col-span-6 space-y-6">
          <Card className="min-h-[700px] border-none shadow-premium bg-slate-50/30 p-10 relative overflow-hidden rounded-[40px] border-l-4 border-l-clinicPrimary">
             <div className="space-y-5 relative z-10">
              {fields.map((field, index) => (
                <div 
                  key={field.id} 
                  onClick={() => setSelectedField(field)}
                  className={`p-8 bg-white border rounded-[32px] flex items-center justify-between group hover:shadow-google hover:-translate-y-1 transition-all duration-500 cursor-pointer ${selectedField?.id === field.id ? 'border-clinicPrimary ring-4 ring-clinicPrimary/5 translate-x-2' : 'border-slate-50'}`}
                >
                  <div className="flex items-center gap-6 flex-1 pr-6">
                    <div className="cursor-grab text-slate-200 hover:text-clinicPrimary transition-colors active:scale-110"><FaGripLines /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-clinicPrimary uppercase tracking-[0.25em] opacity-80">{field.type} Node</span>
                        {field.required && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100 shadow-soft">Required Node</span>}
                      </div>
                      <input 
                        type="text" 
                        value={field.label}
                        onChange={(e) => {
                          const newFields = [...fields];
                          newFields[index].label = e.target.value;
                          setFields(newFields);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[18px] font-black text-slate-900 bg-transparent border-none p-0 outline-none w-full tracking-tighter focus:text-clinicPrimary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedField(field); }}
                        className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-clinicPrimary hover:bg-white hover:shadow-google transition-all active:scale-90"
                     >
                        <FaSlidersH size={14} />
                     </button>
                     <button 
                      onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                      className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                    >
                      <FaTrash size={14}/>
                    </button>
                  </div>
                </div>
              ))}
              
              {fields.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 text-slate-300 bg-white shadow-premium rounded-[40px] border-4 border-dashed border-slate-100 p-10 text-center">
                  <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 transform hover:scale-110 transition-all duration-500 shadow-inner-soft group cursor-pointer" onClick={() => addField('Heading')}>
                     <FaPlus size={32} className="text-clinicPrimary opacity-30 group-hover:opacity-100 transition-all"/>
                  </div>
                  <p className="font-black uppercase tracking-[0.3em] text-[11px] text-slate-400">Initialize Workspace Node Intelligence</p>
                </div>
              )}
             </div>
             
             <div className="absolute bottom-10 right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none opacity-50"></div>
          </Card>
        </div>

        {/* Property Inspector */}
        <div className="xl:col-span-3 space-y-8">
          <Card className="p-8 border-none shadow-premium bg-white sticky top-28 group rounded-[40px]">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-10 flex items-center gap-4">
               <FaSlidersH className="text-clinicPrimary" /> Logic Calibration
            </h3>
            
            {!selectedField ? (
              <div className="py-20 text-center px-4">
                <FaMicroscope className="mx-auto text-slate-100 mb-6" size={48} />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Select a functional node to calibrate its analytical constraints.</p>
              </div>
            ) : (
              <div className="space-y-10 animate-fade-in">
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Validation Rules</p>
                  <div className="space-y-4">
                    {[
                      { label: 'Mandatory Node', icon: <FaToggleOn size={20} />, id: 'required', active: selectedField.required },
                      { label: 'Read-Only Mode', icon: <FaToggleOn size={20} />, id: 'readonly', active: false },
                      { label: 'System Variable Sync', icon: <FaToggleOn size={20} />, id: 'sync', active: false },
                    ].map(rule => (
                      <div 
                        key={rule.label} 
                        onClick={() => rule.id === 'required' ? toggleFieldRequired(selectedField.id) : null}
                        className="p-5 bg-slate-50 rounded-[24px] border border-transparent hover:border-slate-100 transition-all flex items-center justify-between group/rule cursor-pointer active:scale-95"
                      >
                        <span className="text-[13px] font-bold text-slate-700 tracking-tight">{rule.label}</span>
                        <span className={`transition-all duration-300 ${rule.active ? 'text-clinicPrimary' : 'text-slate-200 rotate-180'}`}>{rule.icon}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Statistical Namespace</p>
                   <select className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[24px] text-[13px] font-black text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all cursor-pointer shadow-soft">
                      <option>General Intake Node</option>
                      <option>Clinical ROM Branch</option>
                      <option>Bio-Logic Audit</option>
                      <option>Financial Consent Hash</option>
                   </select>
                </div>

                <button 
                  onClick={() => setSelectedField(null)}
                  className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors flex items-center justify-center gap-3 border border-slate-100 rounded-2xl hover:bg-slate-50"
                >
                  <FaUndo size={12}/> Disconnect Node
                </button>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        title="Institutional Protocol Preview"
        footer={
          <div className="flex gap-4 justify-end w-full px-2">
            <Button variant="secondary" onClick={() => setIsPreviewOpen(false)}>Audit Complete</Button>
            <Button variant="accent" onClick={() => { setIsPreviewOpen(false); alert('System: Snapshot synchronized and saved to laboratory archive.'); }} leftIcon={<FaSave />}>Save Calibration</Button>
          </div>
        }
      >
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[40px] shadow-glass space-y-10 border border-slate-50">
           <div className="text-center space-y-2 border-b border-slate-50 pb-10">
              <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">Institutional Protocol Build</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">Scientific Model Sync Verified</p>
           </div>
           
           <div className="space-y-10">
              {fields.map(field => (
                <div key={field.id} className="space-y-4">
                   {field.type === 'Heading' ? (
                     <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none border-l-4 border-clinicPrimary pl-4">{field.label}</h3>
                   ) : (
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.label} {field.required && <span className="text-rose-400 opacity-60">*</span>}</label>
                        {field.type === 'Text' && <input type="text" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl shadow-soft" placeholder="Enter node data..." />}
                        {field.type === 'Checkbox' && <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white transition-all"><FaCheckSquare className="text-clinicPrimary" /> <span className="text-[13px] font-bold text-slate-600">Acknowledge Institutional Logic</span></div>}
                        {field.type === 'Date' && <input type="date" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl shadow-soft" />}
                        {field.type === 'Long Text' && <textarea className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl min-h-[120px]" placeholder="Detailed analytical observation..." />}
                     </div>
                   )}
                </div>
              ))}
           </div>
           <div className="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">Verified by DeePhysio Clinical Logic Hub v4.0 • {new Date().toLocaleDateString()}</p>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormBuilder;
