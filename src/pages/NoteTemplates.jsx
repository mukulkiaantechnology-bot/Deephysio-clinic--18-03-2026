import React from 'react';
import { FaMagic, FaCopy, FaEdit, FaTrash, FaPlus, FaSearch, FaFileMedical } from 'react-icons/fa';

const NoteTemplates = () => {
  const templates = [
    { id: 1, name: 'Standard SOAP Note', category: 'Physiotherapy', description: 'Subjective, Objective, Assessment, Plan' },
    { id: 2, name: 'Initial Assessment', category: 'Clinical', description: 'Comprehensive first visit record' },
    { id: 3, name: 'Post-Op Follow-up', category: 'Rehabilitation', description: 'Specialized for post-surgical progress' },
    { id: 4, name: 'Wellness Check', category: 'Prevention', description: 'General health and maintenance record' },
    { id: 5, name: 'Sports Massage Report', category: 'Manual Therapy', description: 'Focus on muscular findings and treatment' },
    { id: 6, name: 'Discharge Summary', category: 'Final', description: 'Conclusive report for GP and Patient' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Note Templates</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Standardize your clinical documentation workflow.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> New Template
        </button>
      </div>

      <div className="card-clinic p-0 overflow-hidden border-none shadow-xl bg-white mb-8">
         <div className="p-4 border-b border-gray-50 flex items-center justify-between gap-4">
            <div className="relative flex-1">
               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
               <input type="text" placeholder="Search templates by name or category..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-lg text-base font-semibold outline-none focus:bg-white focus:border-clinicPrimary transition-all" />
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-gray-50">
            {templates.map(template => (
               <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-2 py-0.5 bg-clinicLight rounded text-base font-black text-clinicPrimary uppercase tracking-widest">{template.category}</span>
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-300 hover:text-clinicPrimary"><FaEdit size={12}/></button>
                        <button className="p-1.5 text-gray-300 hover:text-clinicSecondary"><FaCopy size={12}/></button>
                     </div>
                  </div>
                  <h3 className="text-base font-black text-gray-900 leading-none mb-2">{template.name}</h3>
                  <p className="text-base font-medium text-gray-500 leading-relaxed uppercase tracking-tighter mb-6">{template.description}</p>
                  <button className="w-full py-2 bg-white border border-gray-100 rounded-lg text-base font-black text-gray-500 uppercase tracking-widest hover:border-clinicPrimary hover:text-clinicPrimary transition-all">Preview Template</button>
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
            <button className="px-6 py-3 bg-white text-clinicDark rounded-xl text-base font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Enable Smart Docs</button>
         </div>
      </div>
    </div>
  );
};

export default NoteTemplates;
