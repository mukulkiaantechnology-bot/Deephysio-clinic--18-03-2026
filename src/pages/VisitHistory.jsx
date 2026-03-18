import React, { useState } from 'react';
import { FaHistory, FaCalendarAlt, FaUserMd, FaFileAlt, FaChevronRight, FaFilter, FaSearch, FaDownload, FaClinicMedical, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const VisitHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const visits = [
    { id: 'VH-901', date: '15 Mar 2026', time: '10:30 AM', practitioner: 'Dr. Sarah Wilson', service: 'Physio Evolution', clinic: 'Main Clinic Node', status: 'Verified' },
    { id: 'VH-842', date: '28 Feb 2026', time: '02:00 PM', practitioner: 'Dr. Michael Chen', service: 'Bio-Metric Massage', clinic: 'Main Clinic Node', status: 'Verified' },
    { id: 'VH-711', date: '10 Feb 2026', time: '11:15 AM', practitioner: 'Dr. Sarah Wilson', service: 'Initial Assessment', clinic: 'North Partition', status: 'Verified' },
    { id: 'VH-605', date: '20 Jan 2026', time: '09:00 AM', practitioner: 'Dr. John Miller', service: 'ACL Rehabilitation', clinic: 'West Branch Node', status: 'Revoked' },
  ];

  const filteredVisits = visits.filter(v => 
    v.practitioner.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    alert('Chronology Export: Generating encrypted medical history ledger (CSV)...');
  };

  const handleViewNote = (id) => {
    alert(`Accessing Secured Clinical Note for ID: ${id}. Decrypting protocol...`);
  };

  return (
    <div className="space-y-10 p-6 md:p-10 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Visit Chronology</h1>
          <p className="text-slate-500 font-bold mt-3 uppercase tracking-widest text-[11px] opacity-80">Log of longitudinal patient consultations and treatment nodes.</p>
        </div>
        <div className="flex gap-4 relative z-10">
          <Button 
            variant="secondary" 
            size="lg" 
            className="rounded-2xl h-14 px-8 border-none shadow-premium hover:shadow-google hover:-translate-y-1 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest" 
            leftIcon={<FaDownload size={14}/>}
            onClick={handleExport}
          >
            Export XL History
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-50">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/20">
          <div className="relative flex-1 group w-full">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
            <input 
              type="text" 
              placeholder="Search chronology by practitioner, ID or clinical service..." 
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-5 border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google hover:bg-white transition-all bg-slate-50 shadow-soft active:scale-90" onClick={() => alert('Search Parameters: Initializing advanced chronology filter nodes...')}>
            <FaFilter size={16}/>
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[1000px]">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50">
              <tr>
                <th className="px-10 py-6 w-[20%]">Temporal Node</th>
                <th className="px-10 py-6 w-[20%]">Practitioner Node</th>
                <th className="px-10 py-6 w-[20%]">Clinical Protocol</th>
                <th className="px-10 py-6 w-[15%]">Clinic Hub</th>
                <th className="px-10 py-6 w-[12%] text-center">Status</th>
                <th className="px-10 py-6 w-[13%] text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVisits.length > 0 ? filteredVisits.map(visit => (
                <tr key={visit.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => handleViewNote(visit.id)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-clinicPrimary group-hover:scale-110 group-hover:rotate-6 group-hover:bg-clinicPrimary group-hover:text-white transition-all duration-500">
                        <FaCalendarAlt size={16}/>
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{visit.date}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <FaClock size={8} className="text-slate-300"/>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{visit.time}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <p className="text-[14px] font-bold text-slate-700 uppercase tracking-tight group-hover:text-slate-900 transition-colors">{visit.practitioner}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] px-3 py-1 bg-slate-100/50 rounded-lg group-hover:bg-clinicPrimary/5 group-hover:text-clinicPrimary transition-all">{visit.service}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                       <FaClinicMedical size={10} className="text-slate-200" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{visit.clinic}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className={`mx-auto w-fit px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-soft flex items-center gap-2 ${
                      visit.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-500 border-rose-100'
                    }`}>
                      {visit.status === 'Verified' ? <FaCheckCircle size={8}/> : <FaTimesCircle size={8}/>}
                      {visit.status}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-9" title="Review Node Note" onClick={(e) => { e.stopPropagation(); handleViewNote(visit.id); }}>
                          <FaFileAlt size={14}/>
                       </button>
                       <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-clinicPrimary hover:shadow-google transition-all flex items-center justify-center active:scale-9" onClick={(e) => { e.stopPropagation(); alert(`Context Menu: Modify, Move or Delete Visit Chronology Node ${visit.id}.`); }}>
                          <FaEllipsisV size={14}/>
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="6" className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                         <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner-soft text-slate-200">
                            <FaHistory size={32} />
                         </div>
                         <h3 className="text-sm font-black text-slate-300 uppercase tracking-[0.3em]">No Temporal Nodes Found</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">System was unable to locate matching chronology in this partition.</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Listing Chronology Page 1 of 1</p>
            <div className="flex gap-4">
               <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Previous Node</button>
               <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-clinicPrimary transition-colors disabled:opacity-30" disabled>Next Node</button>
            </div>
        </div>
      </div>
    </div>
  );
};

const FaEllipsisV = ({ className, size, onClick }) => (
  <svg className={className} width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="currentColor" onClick={onClick}>
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default VisitHistory;
