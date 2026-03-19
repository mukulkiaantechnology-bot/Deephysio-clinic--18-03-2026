import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaDownload, FaEllipsisV, FaChevronLeft, FaChevronRight, FaPlus, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaHistory, FaTrash, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

const INITIAL_PATIENTS = [
  { id: 'PID-101', name: 'Alice Johnson', age: 34, gender: 'Female', lastVisit: '2026-03-12', status: 'Active', phone: '+1 234-567-8901', email: 'alice.j@example.com' },
  { id: 'PID-102', name: 'James Wilson', age: 45, gender: 'Male', lastVisit: '2026-03-14', status: 'Active', phone: '+1 234-567-8902', email: 'j.wilson@example.com' },
  { id: 'PID-103', name: 'Emily Brown', age: 28, gender: 'Female', lastVisit: '2026-03-10', status: 'Delayed', phone: '+1 234-567-8903', email: 'emily.b@example.com' },
  { id: 'PID-104', name: 'Michael Chen', age: 52, gender: 'Male', lastVisit: '2026-03-08', status: 'Inactive', phone: '+1 234-567-8904', email: 'm.chen@example.com' },
  { id: 'PID-105', name: 'Sarah Jenkins', age: 39, gender: 'Female', lastVisit: '2026-03-15', status: 'Active', phone: '+1 234-567-8905', email: 's.jenkins@example.com' },
  { id: 'PID-106', name: 'David Miller', age: 41, gender: 'Male', lastVisit: '2026-03-05', status: 'Inactive', phone: '+1 234-567-8906', email: 'd.miller@example.com' },
];

const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const itemsPerPage = 5;

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const [patients, setPatients] = useState([]);

  React.useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('deephysio_patients') || '[]');
    setPatients([...INITIAL_PATIENTS, ...savedPatients]);
  }, []);



  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportXL = () => {
    const csvRows = [
      ['Patient ID', 'Full Name', 'Age', 'Gender', 'Last Visit', 'Status', 'Phone', 'Email'],
      ...filteredPatients.map(p => [p.id, p.name, p.age, p.gender, p.lastVisit, p.status, p.phone, p.email])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `patient_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    showToast('Patient record purged from clinical partition.', 'error');
  };

  return (
    <div className="space-y-5 animate-fade-in custom-scrollbar font-sans relative">
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-premium border flex items-center gap-3 min-w-[320px] ${
              toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {toast.type === 'success' ? <FaCheck size={10}/> : <FaTrash size={10}/>}
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 border-none shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 font-medium mt-1 text-xs">Manage subject demographics, history, and treatment trajectory nodes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto">
          <Button 
            variant="secondary" 
            size="md" 
            className="flex-1 sm:flex-none rounded-xl h-10 px-4 sm:px-5 border border-slate-200 shadow-none transition-colors uppercase tracking-widest text-[10px] font-black" 
            leftIcon={<FaDownload size={12}/>}
            onClick={handleExportXL}
          >
            Export XL
          </Button>
          <Button 
            variant="accent" 
            size="md"
            className="flex-1 sm:flex-none rounded-xl h-10 px-4 sm:px-5 shadow-none transition-colors text-[10px] font-black uppercase tracking-widest"
            onClick={() => navigate('/patients/add')}
            leftIcon={<FaUserPlus size={12}/>}
          >
            Add Patient
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-500"></div>
      </Card>

      <div className="bg-white rounded-xl shadow-none overflow-hidden border border-slate-100">
        <div className="p-4 sm:p-5 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/20">
          <div className="relative flex-1 min-w-[250px] group bg-white rounded-lg border border-slate-200 transition-colors focus-within:border-clinicPrimary">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={12}/>
            <input 
              type="text" 
              placeholder="Search by name, ID or biometric node..." 
              className="w-full pl-10 pr-4 py-2 bg-transparent text-xs font-medium text-slate-600 outline-none placeholder:text-slate-400" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[800px]">
            <thead className="bg-slate-50 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 w-[25%]">Subject Identifer</th>
                <th className="px-5 py-3 w-[15%]">Bio Data</th>
                <th className="px-5 py-3 w-[20%] text-center">Last Protocol</th>
                <th className="px-5 py-3 w-[20%] text-center">Clinical Status</th>
                <th className="px-5 py-3 w-[20%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentPatients.length > 0 ? currentPatients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => navigate(`/patients/profile/${p.id}`)}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-clinicPrimary/10 text-clinicPrimary flex items-center justify-center font-bold text-[10px] group-hover:bg-clinicPrimary/20 transition-colors">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{p.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                     <div className="flex flex-col gap-1">
                       <p className="text-xs font-bold text-slate-600">{p.age}y, {p.gender}</p>
                       <div className="flex items-center gap-1.5">
                          <FaPhoneAlt size={8} className="text-slate-400"/>
                          <span className="text-[9px] font-medium text-slate-500">{p.phone}</span>
                       </div>
                     </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex flex-col items-center">
                       <p className="text-xs font-bold text-slate-600">{p.lastVisit}</p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified View</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className={`mx-auto w-fit px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border transition-colors ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      p.status === 'Delayed' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {p.status}
                    </div>
                  </td>
                   <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center" 
                        title="Communicate Subject"
                        onClick={(e) => { e.stopPropagation(); navigate('/communication'); }}
                      >
                        <FaEnvelope size={10}/>
                      </button>
                      <button 
                        className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50 transition-colors flex items-center justify-center" 
                        title="Purge Record"
                        onClick={(e) => { e.stopPropagation(); handleDeletePatient(p.id); }}
                      >
                        <FaTrash size={10}/>
                      </button>
                      <button 
                        className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary hover:bg-clinicPrimary/5 transition-colors flex items-center justify-center" 
                        title="Audit Patient Profile"
                        onClick={(e) => { e.stopPropagation(); navigate(`/patients/profile/${p.id}`); }}
                      >
                        <FaEllipsisV size={10}/>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">Zero matching subject nodes detected</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:p-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
           <div className="flex gap-2">
             <Button 
               variant="secondary" 
               size="icon" 
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="rounded-lg border border-slate-200 bg-white h-8 w-8 transition-colors"
             >
               <FaChevronLeft size={8} />
             </Button>
             <Button 
               variant="secondary" 
               size="icon" 
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages}
               className="rounded-lg border border-slate-200 bg-white h-8 w-8 transition-colors"
             >
               <FaChevronRight size={8} />
             </Button>
           </div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Listing Node {currentPage} of {totalPages || 1}</p>
        </div>
      </div>


    </div>
  );
};

export default Patients;
