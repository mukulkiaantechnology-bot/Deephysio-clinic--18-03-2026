import React, { useState } from 'react';
import { FaCalendarPlus, FaFilter, FaChevronLeft, FaChevronRight, FaClock, FaCheckCircle, FaUserMd, FaPlus, FaSearch } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-18'));
  const [selectedPractitioner, setSelectedPractitioner] = useState('All Practitioners');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const practitioners = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Senior Physiotherapist', color: 'bg-emerald-500' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Orthopedic Specialist', color: 'bg-blue-500' },
    { id: 3, name: 'Dr. Emily Brown', role: 'Rehabilitation Expert', color: 'bg-indigo-500' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const initialAppointments = [
    { id: 101, patient: 'James Wilson', time: '09:00 AM', type: 'Physio Session', practitioner: 'Dr. Sarah Wilson', status: 'Confirmed' },
    { id: 102, patient: 'Alice Johnson', time: '11:00 AM', type: 'Initial Assessment', practitioner: 'Dr. Michael Chen', status: 'Arrived' },
    { id: 103, patient: 'Robert Fox', time: '02:00 PM', type: 'Review Session', practitioner: 'Dr. Sarah Wilson', status: 'Pending' }
  ];

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 p-6 sm:p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Scheduler</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm sm:text-base">Orchestrate patient visits, practitioner availability, and treatement node synchronization.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full lg:w-auto">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner-soft">
             <button className="px-6 py-3 bg-white shadow-premium rounded-xl text-[11px] font-black uppercase tracking-widest text-clinicPrimary transition-all">Day View</button>
             <button className="px-6 py-3 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-slate-600 transition-all" onClick={() => alert('Week View Visualization Node: Loading calendar metrics...')}>Week</button>
             <button className="px-6 py-3 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-slate-600 transition-all" onClick={() => alert('Month Grid Node: Synchronizing monthly availability logs...')}>Month</button>
          </div>
          <Button 
            variant="accent" 
            size="lg"
            className="flex-1 sm:flex-none rounded-2xl h-12 sm:h-14 px-4 sm:px-8 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
            onClick={() => setIsBookModalOpen(true)}
            leftIcon={<FaCalendarPlus size={14}/>}
          >
            New Booking
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-8">
           <Card className="p-8 border-none shadow-premium bg-white relative overflow-hidden">
             <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div> Practitioner Node
             </h3>
             <div className="space-y-4 relative z-10">
               <button 
                onClick={() => setSelectedPractitioner('All Practitioners')}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group active:scale-95 ${selectedPractitioner === 'All Practitioners' ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-google' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-clinicPrimary'}`}
               >
                 <span className="text-[13px] font-bold">All Practitioners</span>
                 <FaUserMd size={12} className={selectedPractitioner === 'All Practitioners' ? 'text-white' : 'text-slate-300'}/>
               </button>
               {practitioners.map(dr => (
                 <button 
                  key={dr.id}
                  onClick={() => setSelectedPractitioner(dr.name)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all group active:scale-95 ${selectedPractitioner === dr.name ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-clinicPrimary'}`}
                 >
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl ${dr.color} shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform`}>
                        {dr.name.split('. ')[1][0]}
                     </div>
                     <div>
                        <p className="text-[13px] font-bold leading-none">{dr.name}</p>
                        <p className={`text-[9px] mt-1.5 font-medium uppercase tracking-widest ${selectedPractitioner === dr.name ? 'text-slate-400' : 'text-slate-400'}`}>{dr.role}</p>
                     </div>
                   </div>
                 </button>
               ))}
             </div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-clinicPrimary/5 rounded-full blur-3xl"></div>
           </Card>

           <Card className="p-8 border-none shadow-premium bg-white">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Queue Status</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Verified Arrived', count: 12, color: 'text-emerald-500' },
                   { label: 'Pending Processing', count: 3, color: 'text-amber-500' },
                   { label: 'Next Call Node', count: 'Room 4', color: 'text-clinicPrimary' }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-all cursor-pointer group">
                      <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{stat.label}</span>
                      <span className={`text-[13px] font-black ${stat.color}`}>{stat.count}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="lg:col-span-9">
           <Card className="p-0 overflow-hidden border-none shadow-premium bg-white">
             <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/30 border-b border-slate-50 gap-6">
                <div className="flex items-center gap-6">
                   <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-clinicPrimary transition-all active:scale-90" onClick={() => alert('Chronology Hop: Navigating to previous schedule node...')}>
                      <FaChevronLeft size={10} className="mx-auto"/>
                   </button>
                   <div className="text-center">
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight">Wednesday, 18 March 2026</h2>
                      <p className="text-[10px] font-black text-clinicPrimary uppercase tracking-[0.3em] mt-1">Today's Protocol</p>
                   </div>
                   <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-clinicPrimary transition-all active:scale-90" onClick={() => alert('Chronology Hop: Accessing future schedule node...')}>
                      <FaChevronRight size={10} className="mx-auto"/>
                   </button>
                </div>
                <div className="relative group w-full md:max-w-[300px] bg-white rounded-2xl border border-slate-100 shadow-inner-soft transition-all focus-within:ring-4 focus-within:ring-clinicPrimary/5">
                   <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary" size={12}/>
                   <input 
                    type="text" 
                    placeholder="Filter by subject..." 
                    className="w-full pl-12 pr-6 py-3.5 bg-transparent text-[13px] font-bold text-slate-600 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
             </div>

             <div className="relative">
                {timeSlots.map((slot, index) => {
                  const appointment = initialAppointments.find(a => a.time === slot && (selectedPractitioner === 'All Practitioners' || a.practitioner === selectedPractitioner));
                  return (
                    <div key={index} className="flex border-b border-slate-50 last:border-none group/slot">
                       <div className="w-24 sm:w-32 p-8 border-r border-slate-50 bg-slate-50/20 flex flex-col items-center justify-center">
                          <span className="text-[13px] font-bold text-slate-900 group-hover/slot:text-clinicPrimary transition-colors">{slot.split(' ')[0]}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{slot.split(' ')[1]}</span>
                       </div>
                       <div className="flex-1 p-4 relative group/node">
                          {appointment ? (
                             <div 
                              className={`p-6 rounded-[24px] border border-clinicPrimary/10 shadow-premium transition-all cursor-pointer hover:-translate-y-1 active:scale-95 group/booking relative overflow-hidden ${
                                appointment.status === 'Confirmed' ? 'bg-emerald-50/40 hover:bg-emerald-50' : 
                                appointment.status === 'Arrived' ? 'bg-blue-50/40 hover:bg-blue-50' : 
                                'bg-white hover:bg-slate-50'
                              }`}
                              onClick={() => alert(`Reviewing Booking ID: ${appointment.id}\nPatient: ${appointment.patient}\nSession: ${appointment.type}`)}
                             >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                   <div>
                                      <div className="flex items-center gap-3 mb-2">
                                         <p className="text-[15px] font-bold text-slate-900">{appointment.patient}</p>
                                         <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                           appointment.status === 'Confirmed' ? 'bg-emerald-500 text-white border-emerald-500 shadow-soft' : 
                                           appointment.status === 'Arrived' ? 'bg-blue-500 text-white border-blue-500 shadow-soft' : 
                                           'bg-slate-900 text-white border-slate-900 shadow-soft'
                                         }`}>
                                            {appointment.status}
                                         </span>
                                      </div>
                                      <p className="text-[12px] font-medium text-slate-500 flex items-center gap-2">
                                         <FaClock size={10} className="text-slate-300"/> {appointment.type} • {appointment.practitioner}
                                      </p>
                                   </div>
                                   <div className="flex gap-2 opacity-0 group-hover/booking:opacity-100 transition-opacity">
                                      <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary shadow-soft transition-all active:scale-90" onClick={(e) => { e.stopPropagation(); alert('Initializing Tele-Protocol Node...'); }}>
                                         <FaUserMd size={14} className="mx-auto"/>
                                      </button>
                                      <button className="w-9 h-9 rounded-xl bg-clinicPrimary text-white shadow-soft transition-all hover:shadow-google active:scale-90" onClick={(e) => { e.stopPropagation(); alert('Finalizing Session Checkout...'); }}>
                                         <FaCheckCircle size={14} className="mx-auto"/>
                                      </button>
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <button 
                              className="w-full h-full min-h-[80px] rounded-[24px] border-2 border-dashed border-slate-100 hover:border-clinicPrimary/40 hover:bg-clinicPrimary/5 transition-all text-[11px] font-black text-slate-300 hover:text-clinicPrimary uppercase tracking-[0.2em] flex items-center justify-center group/add active:scale-[0.99]"
                              onClick={() => setIsBookModalOpen(true)}
                             >
                                <FaPlus size={14} className="mr-3 transform group-hover/add:rotate-90 transition-transform"/> Available Slot Node
                             </button>
                          )}
                       </div>
                    </div>
                  );
                })}
             </div>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)}
        title="Initialize New Booking Node"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsBookModalOpen(false)}>Discard Protocol</Button>
            <Button variant="accent" onClick={() => { setIsBookModalOpen(false); alert('Booking Node Verified & Locked in Ledger.'); }} leftIcon={<FaPlus />}>Finalize Reservation</Button>
          </div>
        }
      >
        <div className="space-y-6 p-2 font-sans">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Subject Identity</label>
            <div className="relative group">
               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={12}/>
               <input type="text" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300" placeholder="Search registered subjects..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Practitioner Node</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                {practitioners.map(dr => <option key={dr.id}>{dr.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Clinical Protocol</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                <option>Physio Assessment</option>
                <option>Follow-up Review</option>
                <option>Rehab Exercise Session</option>
                <option>Initial Consultation</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Protocol Date</label>
              <input type="date" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all" value="2026-03-18" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Protocol Time</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer">
                {timeSlots.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
