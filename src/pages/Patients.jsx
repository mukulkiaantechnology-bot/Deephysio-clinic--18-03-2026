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
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans relative">
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-premium border flex items-center gap-4 min-w-[320px] ${
              toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {toast.type === 'success' ? <FaCheck size={12}/> : <FaTrash size={12}/>}
            </div>
            <p className="text-[13px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Manage subject demographics, history, and treatment trajectory nodes.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full lg:w-auto">
          <Button 
            variant="secondary" 
            size="lg" 
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 border-none shadow-premium hover:shadow-google transition-all active:scale-95 uppercase tracking-widest text-[11px] font-black" 
            leftIcon={<FaDownload size={14}/>}
            onClick={handleExportXL}
          >
            Export XL
          </Button>
          <Button 
            variant="accent" 
            size="lg"
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
            onClick={() => navigate('/patients/add')}
            leftIcon={<FaUserPlus size={14}/>}
          >
            Add Patient
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-50">
        <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6 bg-slate-50/20">
          <div className="relative flex-1 min-w-[300px] group bg-white rounded-2xl border border-slate-100 shadow-inner-soft transition-all focus-within:ring-4 focus-within:ring-clinicPrimary/5">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
            <input 
              type="text" 
              placeholder="Search by name, ID or biometric node..." 
              className="w-full pl-14 pr-6 py-4 bg-transparent text-[13px] font-bold text-slate-600 outline-none placeholder:text-slate-300 transition-all" 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[1100px]">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
              <tr>
                <th className="px-10 py-6 w-[25%]">Subject Identifer</th>
                <th className="px-10 py-6 w-[15%]">Bio Data</th>
                <th className="px-10 py-6 w-[20%] text-center">Last Protocol</th>
                <th className="px-10 py-6 w-[20%] text-center">Clinical Status</th>
                <th className="px-10 py-6 w-[20%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentPatients.length > 0 ? currentPatients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => navigate(`/patients/profile/${p.id}`)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-clinicPrimary/10 to-clinicPrimary/5 text-clinicPrimary flex items-center justify-center font-bold text-sm shadow-soft border border-clinicPrimary/10 group-hover:scale-110 transition-transform">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{p.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex flex-col gap-1.5">
                       <p className="text-sm font-bold text-slate-600">{p.age}y, {p.gender}</p>
                       <div className="flex items-center gap-2">
                          <FaPhoneAlt size={8} className="text-slate-300"/>
                          <span className="text-[10px] font-medium text-slate-400">{p.phone}</span>
                       </div>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className="flex flex-col items-center">
                       <p className="text-[13px] font-bold text-slate-500">{p.lastVisit}</p>
                       <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">Verified View</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={`mx-auto w-fit px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-inner-soft transition-all ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      p.status === 'Delayed' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      {p.status}
                    </div>
                  </td>
                   <td className="px-10 py-8">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center active:scale-90" 
                        title="Communicate Subject"
                        onClick={(e) => { e.stopPropagation(); navigate('/communication'); }}
                      >
                        <FaEnvelope size={14}/>
                      </button>
                      <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center active:scale-90" 
                        title="Purge Record"
                        onClick={(e) => { e.stopPropagation(); handleDeletePatient(p.id); }}
                      >
                        <FaTrash size={14}/>
                      </button>
                      <button 
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary hover:bg-clinicPrimary/5 transition-all flex items-center justify-center active:scale-90" 
                        title="Audit Patient Profile"
                        onClick={(e) => { e.stopPropagation(); navigate(`/patients/profile/${p.id}`); }}
                      >
                        <FaEllipsisV size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-10 py-24 text-center text-slate-400 font-bold uppercase tracking-widest">Zero matching subject nodes detected</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between gap-4">
           <div className="flex gap-3">
             <Button 
               variant="secondary" 
               size="icon" 
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="rounded-2xl border border-slate-100 bg-white shadow-premium h-12 w-12 active:scale-95"
             >
               <FaChevronLeft size={10} />
             </Button>
             <Button 
               variant="secondary" 
               size="icon" 
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages}
               className="rounded-2xl border border-slate-100 bg-white shadow-premium h-12 w-12 active:scale-95"
             >
               <FaChevronRight size={10} />
             </Button>
           </div>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Node {currentPage} of {totalPages || 1}</p>
        </div>
      </div>


    </div>
  );
};

export default Patients;
