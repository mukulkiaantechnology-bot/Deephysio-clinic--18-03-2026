import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus, FaFilter, FaChevronLeft, FaChevronRight, FaClock, FaCheckCircle, FaUserMd, FaPlus, FaSearch } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Appointments = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-18'));
  const [selectedPractitioner, setSelectedPractitioner] = useState('All Practitioners');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('day');

  const practitioners = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Senior Physiotherapist', color: 'bg-emerald-500' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Orthopedic Specialist', color: 'bg-blue-500' },
    { id: 3, name: 'Dr. Emily Brown', role: 'Rehabilitation Expert', color: 'bg-indigo-500' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const [appointments, setAppointments] = useState([
    { id: 101, patient: 'James Wilson', date: '2026-03-18', time: '09:00 AM', type: 'Physio Session', practitioner: 'Dr. Sarah Wilson', status: 'Confirmed' },
    { id: 102, patient: 'Alice Johnson', date: '2026-03-18', time: '11:00 AM', type: 'Initial Assessment', practitioner: 'Dr. Michael Chen', status: 'Arrived' },
    { id: 103, patient: 'Robert Fox', date: '2026-03-18', time: '02:00 PM', type: 'Review Session', practitioner: 'Dr. Sarah Wilson', status: 'Pending' }
  ]);

  const [newBooking, setNewBooking] = useState({
    patient: '', practitioner: 'Dr. Sarah Wilson', type: 'Physio Assessment', time: '09:00 AM'
  });

  const [selectedAppt, setSelectedAppt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleAddAppointment = () => {
    if (!newBooking.patient) return;
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 101;
    const formattedDate = currentDate.toISOString().split('T')[0];
    setAppointments([...appointments, { ...newBooking, id: newId, date: formattedDate, status: 'Confirmed' }]);
    setIsBookModalOpen(false);
    setNewBooking({ patient: '', practitioner: 'Dr. Sarah Wilson', type: 'Physio Assessment', time: '09:00 AM' });
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
    setIsDetailModalOpen(false);
  };

  const handleDateChange = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto space-y-4 px-4 sm:px-5 lg:px-6 animate-fade-in custom-scrollbar font-sans pb-10">
      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 border-none shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Clinical Scheduler</h1>
          <p className="text-slate-500 font-medium mt-1 text-[10px] sm:text-[11px]">Orchestrate patient visits, practitioner availability, and treatement node synchronization.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 relative z-10 w-full lg:w-auto">
          <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100 shadow-none">
             <button className={`px-4 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-colors ${viewMode === 'day' ? 'bg-white shadow-sm text-clinicPrimary' : 'text-slate-400'}`} onClick={() => setViewMode('day')}>Day View</button>
             <button className={`px-4 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-colors ${viewMode === 'week' ? 'bg-white shadow-sm text-clinicPrimary' : 'text-slate-400'}`} onClick={() => setViewMode('week')}>Week</button>
             <button className={`px-4 py-2 rounded-md text-[9px] font-black uppercase tracking-widest transition-colors ${viewMode === 'month' ? 'bg-white shadow-sm text-clinicPrimary' : 'text-slate-400'}`} onClick={() => setViewMode('month')}>Month</button>
          </div>
          <Button 
            variant="accent" 
            size="md"
            className="flex-1 sm:flex-none rounded-xl h-10 shadow-none transition-colors text-[10px] sm:text-[11px] font-black uppercase tracking-widest"
            onClick={() => navigate('/appointments/book')}
            leftIcon={<FaCalendarPlus size={12}/>}
          >
            New Booking
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-3xl"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-4">
           <Card hover={false} className="p-4 border border-slate-100 shadow-none bg-white relative overflow-hidden">
             <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-clinicPrimary rounded-full"></div> Practitioner Node
             </h3>
             <div className="space-y-2 relative z-10">
               <button 
                onClick={() => setSelectedPractitioner('All Practitioners')}
                className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between cursor-pointer ${selectedPractitioner === 'All Practitioners' ? 'bg-clinicPrimary/10 text-clinicPrimary border-clinicPrimary/30 shadow-none' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
               >
                 <span className="text-[10px] font-bold uppercase tracking-widest">All Practitioners</span>
                 <FaUserMd size={10} className={selectedPractitioner === 'All Practitioners' ? 'text-clinicPrimary' : 'text-slate-400'}/>
               </button>
               {practitioners.map(dr => (
                 <button 
                  key={dr.id}
                  onClick={() => setSelectedPractitioner(dr.name)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${selectedPractitioner === dr.name ? 'bg-slate-900 border-slate-900 shadow-none' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                 >
                   <div className="flex items-center gap-2">
                     <div className={`w-6 h-6 rounded-md ${dr.color} flex items-center justify-center text-white text-[9px] font-black`}>
                        {dr.name.split('. ')[1][0]}
                     </div>
                     <div>
                        <p className={`text-[10px] font-bold leading-none ${selectedPractitioner === dr.name ? 'text-white' : 'text-slate-700'}`}>{dr.name}</p>
                        <p className={`text-[8px] mt-0.5 font-black uppercase tracking-widest ${selectedPractitioner === dr.name ? 'text-slate-400' : 'text-slate-400'}`}>{dr.role}</p>
                     </div>
                   </div>
                 </button>
               ))}
             </div>
             <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl"></div>
           </Card>

           <Card hover={false} className="p-4 border border-slate-100 shadow-none bg-white">
              <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Queue Status</h3>
              <div className="space-y-2">
                 {[
                   { label: 'Verified Arrived', count: 12, color: 'text-emerald-500' },
                   { label: 'Pending Processing', count: 3, color: 'text-amber-500' },
                   { label: 'Next Call Node', count: 'Room 4', color: 'text-clinicPrimary' }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                      <span className={`text-[10px] font-black ${stat.color}`}>{stat.count}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="lg:col-span-3">
           <Card hover={false} className="p-0 overflow-hidden border border-slate-100 shadow-none bg-white">
             <div className="p-4 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/50 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3">
                   <button className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => handleDateChange(-1)}>
                      <FaChevronLeft size={8} className="mx-auto"/>
                   </button>
                   <div className="text-center">
                      <h2 className="text-xs font-bold text-slate-900 tracking-tight">{currentDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
                      <p className="text-[8px] font-black text-clinicPrimary uppercase tracking-widest mt-0.5">Daily Protocol</p>
                   </div>
                   <button className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => handleDateChange(1)}>
                      <FaChevronRight size={8} className="mx-auto"/>
                   </button>
                </div>
                <div className="relative w-full md:max-w-[240px] bg-white rounded-lg border border-slate-200 transition-colors focus-within:border-clinicPrimary">
                   <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={10}/>
                   <input 
                    type="text" 
                    placeholder="Filter by subject..." 
                    className="w-full pl-8 pr-3 py-2 bg-transparent text-[10px] font-bold text-slate-600 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
             </div>

             <div className="relative">
                {viewMode === 'day' ? timeSlots.map((slot, index) => {
                  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
                  const appointment = appointments.find(a => 
                    a.time === slot && 
                    a.date === formattedCurrentDate &&
                    (selectedPractitioner === 'All Practitioners' || a.practitioner === selectedPractitioner) &&
                    (searchTerm === '' || a.patient.toLowerCase().includes(searchTerm.toLowerCase()))
                  );
                  return (
                    <div key={index} className="flex border-b border-slate-50 last:border-none">
                       <div className="w-16 sm:w-20 p-3 sm:p-4 border-r border-slate-50 bg-slate-50/20 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] sm:text-[11px] font-bold text-slate-900">{slot.split(' ')[0]}</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{slot.split(' ')[1]}</span>
                       </div>
                       <div className="flex-1 p-2 relative group/node">
                          {appointment ? (
                             <div 
                              className={`p-3 rounded-lg border border-clinicPrimary/10 transition-colors cursor-pointer relative overflow-hidden ${
                                appointment.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-900 select-none border-emerald-100' : 
                                appointment.status === 'Arrived' ? 'bg-blue-50 text-blue-900 select-none border-blue-100' : 
                                'bg-white hover:bg-slate-50'
                              }`}
                              onClick={() => { setSelectedAppt(appointment); setIsDetailModalOpen(true); }}
                             >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                   <div>
                                      <div className="flex items-center gap-2 mb-1">
                                         <p className="text-[11px] font-bold text-slate-900">{appointment.patient}</p>
                                         <button className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border transition-colors ${
                                           appointment.status === 'Confirmed' ? 'bg-emerald-500 text-white border-emerald-500' : 
                                           appointment.status === 'Arrived' ? 'bg-blue-500 text-white border-blue-500' : 
                                           'bg-slate-900 text-white border-slate-900'
                                         }`} onClick={(e) => e.stopPropagation()}>
                                            {appointment.status}
                                         </button>
                                      </div>
                                      <p className="text-[9px] font-medium text-slate-500 flex items-center gap-1">
                                         <FaClock size={8} className="text-slate-300"/> {appointment.type} • {appointment.practitioner}
                                      </p>
                                   </div>
                                   <div className="flex gap-1.5">
                                       <button className="w-6 h-6 rounded bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary hover:border-clinicPrimary transition-colors cursor-pointer flex items-center justify-center" onClick={(e) => { e.stopPropagation(); navigate('/patients/profile'); }}>
                                         <FaUserMd size={10}/>
                                      </button>
                                      <button className="w-6 h-6 rounded bg-clinicPrimary text-white shadow-none transition-colors hover:bg-clinicPrimaryDark cursor-pointer flex items-center justify-center" onClick={(e) => { e.stopPropagation(); navigate('/billing'); }}>
                                         <FaCheckCircle size={10}/>
                                      </button>
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <button 
                              className="w-full h-full py-4 min-h-[40px] rounded-lg border border-dashed border-slate-200 bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center cursor-pointer select-none transition-colors hover:bg-clinicPrimary/5 hover:text-clinicPrimary hover:border-clinicPrimary/30"
                              onClick={() => {
                                setNewBooking({ ...newBooking, time: slot, practitioner: selectedPractitioner !== 'All Practitioners' ? selectedPractitioner : 'Dr. Sarah Wilson' });
                                setIsBookModalOpen(true);
                              }}
                             >
                                <FaPlus size={8} className="mr-1.5"/> Available Slot Node
                             </button>
                          )}
                       </div>
                    </div>
                  );
                }) : (
                  <div className="p-20 text-center space-y-4">
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{viewMode} View Grid Pipeline setup</p>
                     <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Temporal Nodes display buffers activated.</p>
                  </div>
                )}
             </div>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)}
        title="Initialize New Booking Node"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsBookModalOpen(false)}>Discard</Button>
            <Button variant="accent" onClick={handleAddAppointment} leftIcon={<FaPlus />}>Finalize</Button>
          </div>
        }
      >
        <div className="space-y-4 p-2 font-sans">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject Identity</label>
            <div className="relative group">
               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={10}/>
               <input 
                type="text" 
                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-clinicPrimary transition-colors" 
                placeholder="Search registered subjects..." 
                value={newBooking.patient}
                onChange={(e) => setNewBooking({...newBooking, patient: e.target.value})}
               />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Practitioner</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-clinicPrimary transition-colors"
                value={newBooking.practitioner}
                onChange={(e) => setNewBooking({...newBooking, practitioner: e.target.value})}
              >
                {practitioners.map(dr => <option key={dr.id}>{dr.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Protocol</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-clinicPrimary transition-colors"
                value={newBooking.type}
                onChange={(e) => setNewBooking({...newBooking, type: e.target.value})}
              >
                <option>Physio Assessment</option>
                <option>Follow-up Review</option>
                <option>Rehab Exercise Session</option>
                <option>Initial Consultation</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
              <input type="date" className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none" value="2026-03-18" readOnly />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Time</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-clinicPrimary transition-colors"
                value={newBooking.time}
                onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
              >
                {timeSlots.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)}
        title="Appointment Details"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="danger" onClick={() => handleCancelAppointment(selectedAppt?.id)}>Cancel Appointment</Button>
            <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>Close Node</Button>
          </div>
        }
      >
        {selectedAppt && (
          <div className="space-y-3 p-2 font-sans">
             <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject Node</p>
                <p className="text-md font-black text-slate-900 mt-1">{selectedAppt.patient}</p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Practitioner</p>
                   <p className="text-xs font-bold text-slate-700 mt-0.5">{selectedAppt.practitioner}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Type</p>
                   <p className="text-xs font-bold text-slate-700 mt-0.5">{selectedAppt.type}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session Time</p>
                   <p className="text-xs font-bold text-slate-700 mt-0.5">{selectedAppt.time}</p>
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                   <p className="text-xs font-bold text-emerald-600 mt-0.5">{selectedAppt.status}</p>
                </div>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;
