import React, { useState, useEffect, useRef } from 'react';
import { FaPaperclip, FaPlus, FaSearch, FaFilePdf, FaFileImage, FaFileWord, FaDownload, FaTrash, FaCheck, FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const INITIAL_FILES = [
  { id: 1, name: 'X-Ray_Lumbar_L5-S1.pdf', patient: 'Alice Johnson', date: 'Mar 15, 2026', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'MRI_Scan_Knee.jpg', patient: 'Bob Smith', date: 'Mar 14, 2026', size: '4.8 MB', type: 'Image' },
  { id: 3, name: 'Referral_Letter_GP.docx', patient: 'Charlie Brown', date: 'Mar 12, 2026', size: '1.2 MB', type: 'DOCX' },
  { id: 4, name: 'Consent_Form_Signed.pdf', patient: 'Diana Prince', date: 'Mar 10, 2026', size: '840 KB', type: 'PDF' },
];

const INITIAL_PATIENTS = [
  { id: 'PID-101', name: 'Alice Johnson' },
  { id: 'PID-102', name: 'James Wilson' },
  { id: 'PID-103', name: 'Emily Brown' },
  { id: 'PID-104', name: 'Michael Chen' },
];

const Attachments = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newFile, setNewFile] = useState({ name: '', patient: '', type: 'PDF', fileObject: null });
  const [patients, setPatients] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('deephysio_attachments') || '[]');
    setFiles([...savedFiles, ...INITIAL_FILES]);

    const savedPatients = JSON.parse(localStorage.getItem('deephysio_patients') || '[]');
    setPatients([...INITIAL_PATIENTS, ...savedPatients]);
    if ([...INITIAL_PATIENTS, ...savedPatients].length > 0) {
      setNewFile(prev => ({ ...prev, patient: [...INITIAL_PATIENTS, ...savedPatients][0].name }));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedFiles = files.filter(f => f.id !== id);
    const userFiles = updatedFiles.filter(f => !INITIAL_FILES.some(init => init.id === f.id));
    localStorage.setItem('deephysio_attachments', JSON.stringify(userFiles));
    setFiles(updatedFiles);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let type = 'PDF';
      if (file.type.includes('image')) type = 'Image';
      if (file.type.includes('word')) type = 'DOCX';
      
      setNewFile({
        ...newFile,
        name: file.name,
        type: type,
        fileObject: file
      });
      setIsUploadModalOpen(true);
    }
  };

  const handleUpload = () => {
    if (!newFile.name) return;
    
    const sizeStr = newFile.fileObject 
      ? (newFile.fileObject.size / (1024 * 1024)).toFixed(1) + ' MB'
      : (Math.random() * (5 - 0.5) + 0.5).toFixed(1) + ' MB';

    const fileToUpload = {
      id: Date.now(),
      name: newFile.name,
      patient: newFile.patient,
      type: newFile.type,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: sizeStr
    };

    const updatedFiles = [fileToUpload, ...files];
    const userFiles = updatedFiles.filter(f => !INITIAL_FILES.some(init => init.id === f.id));
    localStorage.setItem('deephysio_attachments', JSON.stringify(userFiles));
    setFiles(updatedFiles);
    setIsUploadModalOpen(false);
    setNewFile({ name: '', patient: patients[0]?.name || '', type: 'PDF', fileObject: null });
  };

  const handleDownload = (file) => {
    // Simulated download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback
    const notifyElement = document.createElement('div');
    notifyElement.className = 'fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl font-black uppercase tracking-widest text-[10px] z-[9999] animate-bounce';
    notifyElement.innerText = `Synchronizing: ${file.name} (Decrypted)`;
    document.body.appendChild(notifyElement);
    setTimeout(() => notifyElement.remove(), 3000);
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Documents & Attachments</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage clinical reports, scans, and signed forms.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current.click()}
          className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg "
        >
          <FaCloudUploadAlt size={14}/> Upload File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card-clinic px-0 py-0 overflow-hidden border-none shadow-xl bg-white">
           <div className="p-4 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
              <div className="relative flex-1">
                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
                 <input 
                    type="text" 
                    placeholder="Search by filename or patient..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-lg text-base font-semibold outline-none focus:border-clinicPrimary shadow-sm" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
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
                    {filteredFiles.map(file => (
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
                                <button 
                                  onClick={() => handleDownload(file)}
                                  className="p-2 text-clinicPrimary hover:bg-clinicPrimary/10 rounded-lg transition-all"
                                >
                                  <FaDownload size={14}/>
                                </button>
                                <button 
                                  onClick={() => handleDelete(file.id)}
                                  className="p-2 text-gray-200 hover:text-red-500 rounded-lg transition-all"
                                >
                                  <FaTrash size={12}/>
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                    {filteredFiles.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest">No documents found</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="space-y-6">
           <div className="card-clinic p-6 bg-clinicLight border-none shadow-xl">
              <h4 className="text-base font-black text-clinicPrimary uppercase tracking-widest mb-4">Storage Usage</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <p className="text-xl font-black text-gray-900 leading-none">
                      {(files.reduce((acc, f) => acc + parseFloat(f.size), 0)).toFixed(1)} MB
                    </p>
                    <p className="text-sm font-bold text-gray-400 uppercase">of 10 GB Buffer</p>
                 </div>
                 <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-clinicPrimary h-full" style={{ width: '4.2%' }}></div>
                 </div>
              </div>
           </div>

           <div className="card-clinic border-2 border-dashed border-gray-100 flex flex-col items-center justify-center py-8 text-center group hover:border-clinicPrimary/30 transition-all cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <FaCloudUploadAlt className="text-clinicPrimary" size={24}/>
              </div>
              <h4 className="text-base font-black text-gray-900 uppercase tracking-widest mb-1">Quick Upload</h4>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed">CLICK TO SELECT CLINICAL DATA FROM YOUR DEVICE</p>
           </div>
        </div>
      </div>

      <Modal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Finalize Synchronization"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button variant="accent" onClick={handleUpload} leftIcon={<FaCheck />}>Add to Patient Profile</Button>
          </div>
        }
      >
        <div className="space-y-6 p-2">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-clinicPrimary">
              {getFileIcon(newFile.type)}
            </div>
            <div>
              <p className="text-base font-black text-gray-900 leading-none mb-1">{newFile.name}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ready for secure upload</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Assign to Subject</label>
              <select 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-base font-bold text-gray-700 outline-none cursor-pointer"
                value={newFile.patient}
                onChange={(e) => setNewFile({ ...newFile, patient: e.target.value })}
              >
                {patients.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Document Class</label>
              <select 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-base font-bold text-gray-700 outline-none cursor-pointer"
                value={newFile.type}
                onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
              >
                <option value="PDF">Clinical Report (PDF)</option>
                <option value="Image">Diagnostic Scan (IMG)</option>
                <option value="DOCX">GP Correspondence (DOC)</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Attachments;
