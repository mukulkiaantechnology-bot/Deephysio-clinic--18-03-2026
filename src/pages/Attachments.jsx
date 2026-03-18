import React from 'react';
import { FaPaperclip, FaPlus, FaSearch, FaFilePdf, FaFileImage, FaFileWord, FaDownload, FaTrash } from 'react-icons/fa';

const Attachments = () => {
  const files = [
    { id: 1, name: 'X-Ray_Lumbar_L5-S1.pdf', patient: 'Alice Johnson', date: 'Mar 15, 2026', size: '2.4 MB', type: 'PDF' },
    { id: 2, name: 'MRI_Scan_Knee.jpg', patient: 'Bob Smith', date: 'Mar 14, 2026', size: '4.8 MB', type: 'Image' },
    { id: 3, name: 'Referral_Letter_GP.docx', patient: 'Charlie Brown', date: 'Mar 12, 2026', size: '1.2 MB', type: 'DOCX' },
    { id: 4, name: 'Consent_Form_Signed.pdf', patient: 'Diana Prince', date: 'Mar 10, 2026', size: '840 KB', type: 'PDF' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FaFilePdf className="text-red-500" />;
      case 'Image': return <FaFileImage className="text-blue-500" />;
      case 'DOCX': return <FaFileWord className="text-azure-600" />;
      default: return <FaPaperclip className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Documents & Attachments</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage clinical reports, scans, and signed forms.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card-clinic px-0 py-0 overflow-hidden border-none shadow-xl bg-white">
           <div className="p-4 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
              <div className="relative flex-1">
                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
                 <input type="text" placeholder="Search by filename or patient..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-lg text-base font-semibold outline-none focus:border-clinicPrimary shadow-sm" />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-base font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Filename</th>
                       <th className="px-6 py-4">Linked Patient</th>
                       <th className="px-6 py-4">Upload Date</th>
                       <th className="px-6 py-4">Size</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {files.map(file => (
                       <tr key={file.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                   {getFileIcon(file.type)}
                                </div>
                                <p className="text-base font-black text-gray-900 leading-none">{file.name}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-base font-bold text-gray-400 uppercase tracking-tight">{file.patient}</td>
                          <td className="px-6 py-4 text-base font-bold text-gray-400">{file.date}</td>
                          <td className="px-6 py-4 text-sm font-black text-gray-500 uppercase tracking-widest">{file.size}</td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-clinicPrimary hover:bg-clinicPrimary/10 rounded-lg transition-all"><FaDownload size={14}/></button>
                                <button className="p-2 text-gray-200 hover:text-red-500 rounded-lg transition-all"><FaTrash size={12}/></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="space-y-6">
           <div className="card-clinic p-6 bg-clinicLight border-none shadow-xl">
              <h4 className="text-base font-black text-clinicPrimary uppercase tracking-widest mb-4">Storage Usage</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <p className="text-xl font-black text-gray-900 leading-none">4.2 GB</p>
                    <p className="text-sm font-bold text-gray-400 uppercase">of 10 GB Used</p>
                 </div>
                 <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-clinicPrimary h-full" style={{ width: '42%' }}></div>
                 </div>
              </div>
           </div>

           <div className="card-clinic border-2 border-dashed border-gray-100 flex flex-col items-center justify-center py-8 text-center group hover:border-clinicPrimary/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <FaPaperclip className="text-clinicPrimary" size={20}/>
              </div>
              <h4 className="text-base font-black text-gray-900 uppercase tracking-widest mb-1">Upload Multiple</h4>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed">DRAG FILES HERE TO BATCH UPLOAD TO PATIENT PROFILE</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Attachments;
