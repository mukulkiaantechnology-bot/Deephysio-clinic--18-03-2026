import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCalendarPlus, FaFilter, FaChevronLeft, FaChevronRight, 
  FaClock, FaCheckCircle, FaUserMd, FaPlus, FaSearch, 
  FaTimes, FaEllipsisV, FaRegCalendarCheck, FaUserSlash 
} from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';
import CalendarHeader from '../components/appointments/CalendarHeader';
import CalendarGrid from '../components/appointments/CalendarGrid';
import { motion, AnimatePresence } from 'framer-motion';

const Appointments = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-18'));
  const [selectedPractitioner, setSelectedPractitioner] = useState('all');
  const [viewMode, setViewMode] = useState('day');
  const [searchTerm, setSearchTerm] = useState('');

  // Context Menu State
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, appointment: null });
  // Side Panel State
  const [sidePanel, setSidePanel] = useState({ isOpen: false, type: 'book', data: null });

  const practitioners = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Senior Physiotherapist', color: 'bg-emerald-500' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Orthopedic Specialist', color: 'bg-blue-500' },
    { id: 3, name: 'Dr. Emily Brown', role: 'Rehabilitation Expert', color: 'bg-indigo-500' }
  ];

  const [appointments, setAppointments] = useState([
    { id: 101, patientName: 'James Wilson', patientId: 'PID-102', date: '2026-03-18', startTime: '09:00 AM', endTime: '10:00 AM', type: 'Physio Session', practitioner: 'Dr. Sarah Wilson', status: 'Confirmed', hasNotes: true, isPaid: true },
    { id: 102, patientName: 'Alice Johnson', patientId: 'PID-101', date: '2026-03-18', startTime: '11:00 AM', endTime: '12:00 PM', type: 'Initial Assessment', practitioner: 'Dr. Michael Chen', status: 'Arrived', hasNotes: false, isPaid: false },
    { id: 103, patientName: 'Robert Fox', patientId: 'PID-103', date: '2026-03-18', startTime: '02:00 PM', endTime: '03:00 PM', type: 'Review Session', practitioner: 'Dr. Sarah Wilson', status: 'Pending', hasNotes: true, isPaid: false }
  ]);

  const [newBooking, setNewBooking] = useState({
    patientName: '', practitioner: 'Dr. Sarah Wilson', type: 'Physio Assessment', startTime: '09:00 AM'
  });

  const handleDateChange = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d);
  };

  const handleSlotClick = (date, hour) => {
    const formattedTime = `${hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour)}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    setNewBooking({
      ...newBooking,
      startTime: formattedTime,
      practitioner: selectedPractitioner !== 'all' ? selectedPractitioner : 'Dr. Sarah Wilson'
    });
    setSidePanel({ isOpen: true, type: 'book', data: { date, hour } });
    setContextMenu({ visible: false, x: 0, y: 0, appointment: null });
  };

  const handleAppointmentClick = (appointment) => {
    // Navigate directly to Patient's Clinical Record
    navigate(`/patients/profile/${appointment.patientId}`);
  };

  const handleAppointmentContextMenu = (appointment, e) => {
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      appointment
    });
  };

  const handleStatusChange = (status) => {
    if (contextMenu.appointment) {
      setAppointments(appointments.map(a => 
        a.id === contextMenu.appointment.id ? { ...a, status } : a
      ));
    }
    setContextMenu({ visible: false, x: 0, y: 0, appointment: null });
  };

  const handleAddAppointment = () => {
    if (!newBooking.patientName) return;
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 101;
    const formattedDate = sidePanel.data?.date ? new Date(sidePanel.data.date).toISOString().split('T')[0] : currentDate.toISOString().split('T')[0];
    
    // Calculate endTime (1 hour later for simplicity)
    const hour = parseInt(newBooking.startTime.split(':')[0]);
    const amPm = newBooking.startTime.split(' ')[1];
    let nextHour = hour + 1;
    let nextAmPm = amPm;
    if (nextHour === 12) {
      nextAmPm = amPm === 'AM' ? 'PM' : 'AM';
    } else if (nextHour > 12) {
      nextHour = 1;
    }
    const endTime = `${nextHour}:00 ${nextAmPm}`;

    setAppointments([...appointments, { 
      ...newBooking, 
      id: newId, 
      date: formattedDate, 
      endTime,
      status: 'Confirmed',
      hasNotes: false,
      isPaid: false
    }]);
    setSidePanel({ isOpen: false, type: 'book', data: null });
    setNewBooking({ patientName: '', practitioner: 'Dr. Sarah Wilson', type: 'Physio Assessment', startTime: '09:00 AM' });
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesPractitioner = selectedPractitioner === 'all' || a.practitioner === selectedPractitioner;
    const matchesSearch = searchTerm === '' || a.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPractitioner && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 animate-fade-in custom-scrollbar font-sans pb-10" onClick={() => setContextMenu({ visible: false, x: 0, y: 0, appointment: null })}>
      <PageHeader 
        title="Clinical Diary"
        subtitle="Manage patient appointments, clinical schedules, and multi-disciplinary node synchronization."
        icon={<FaCalendarPlus />}
        actions={
          <Button 
            variant="accent" 
            className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-google"
            onClick={() => setSidePanel({ isOpen: true, type: 'book', data: null })}
            leftIcon={<FaCalendarPlus size={12}/>}
          >
            New Booking
          </Button>
        }
      />

      {/* Calendar Controller */}
      <CalendarHeader 
        view={viewMode}
        setView={setViewMode}
        currentDate={currentDate}
        onPrev={() => handleDateChange(viewMode === 'week' ? -7 : (viewMode === 'month' ? -30 : -1))}
        onNext={() => handleDateChange(viewMode === 'week' ? 7 : (viewMode === 'month' ? 30 : 1))}
        onToday={() => setCurrentDate(new Date('2026-03-18'))}
        practitioners={practitioners}
        selectedPractitioner={selectedPractitioner}
        setSelectedPractitioner={setSelectedPractitioner}
      />

      {/* Grid Container */}
      <div className="relative">
        <CalendarGrid 
          view={viewMode}
          currentDate={currentDate}
          appointments={filteredAppointments}
          onSlotClick={handleSlotClick}
          onAppointmentClick={handleAppointmentClick}
          onAppointmentContextMenu={handleAppointmentContextMenu}
          practitioners={practitioners}
          selectedPractitioner={selectedPractitioner}
        />
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.visible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed bg-white rounded-xl shadow-premium border border-slate-100 p-1.5 z-[100] w-48 font-sans"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
             <div className="px-3 py-2 border-b border-slate-50 mb-1">
                <p className="text-[10px] font-black text-slate-900 uppercase truncate">{contextMenu.appointment?.patientName}</p>
                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{contextMenu.appointment?.status}</p>
             </div>
             {[
               { label: 'Arrived', icon: <FaCheckCircle className="text-emerald-500" />, status: 'Arrived' },
               { label: 'Wait List', icon: <FaClock className="text-amber-500" />, status: 'Pending' },
               { label: 'Cancel Node', icon: <FaTimes className="text-red-500" />, status: 'Cancelled' }
             ].map((item, i) => (
               <button 
                key={i}
                onClick={() => handleStatusChange(item.status)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-clinicPrimary transition-colors text-left"
               >
                 <span className="text-xs">{item.icon}</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
               </button>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-Side Panel */}
      <AnimatePresence>
        {sidePanel.isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidePanel({ isOpen: false, type: 'book', data: null })}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 right-0 w-full sm:w-[400px] bg-white shadow-premium z-50 flex flex-col font-sans border-l border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {sidePanel.type === 'book' ? 'Initialize Booking Node' : 'Record Node'}
                    </h3>
                    <p className="text-[8px] font-black text-clinicPrimary uppercase tracking-[0.2em] mt-1">Personnel Management</p>
                 </div>
                 <button 
                  onClick={() => setSidePanel({ isOpen: false, type: 'book', data: null })}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                 >
                    <FaTimes size={12} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Identity</label>
                    <div className="relative">
                       <input 
                        type="text" 
                        placeholder="Search registered subjects..." 
                        className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-700 outline-none focus:border-clinicPrimary focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft"
                        value={newBooking.patientName}
                        onChange={(e) => setNewBooking({...newBooking, patientName: e.target.value})}
                       />
                       <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={10} />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Practitioner</label>
                       <select 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest outline-none focus:border-clinicPrimary transition-all cursor-pointer shadow-soft"
                        value={newBooking.practitioner}
                        onChange={(e) => setNewBooking({...newBooking, practitioner: e.target.value})}
                       >
                         {practitioners.map(dr => <option key={dr.id}>{dr.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Node</label>
                       <select 
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest outline-none focus:border-clinicPrimary transition-all cursor-pointer shadow-soft"
                        value={newBooking.type}
                        onChange={(e) => setNewBooking({...newBooking, type: e.target.value})}
                       >
                          <option>Physio Assessment</option>
                          <option>Follow-up Review</option>
                          <option>Initial Consultation</option>
                          <option>Sports Massage</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                       <input 
                        type="text" 
                        className="w-full p-3 bg-slate-100 border border-slate-50 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest outline-none" 
                        value={sidePanel.data?.date ? new Date(sidePanel.data.date).toLocaleDateString('en-GB') : currentDate.toLocaleDateString('en-GB')} 
                        readOnly 
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Time</label>
                       <input 
                        type="text" 
                        className="w-full p-3 bg-slate-100 border border-slate-50 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest outline-none" 
                        value={newBooking.startTime} 
                        readOnly 
                       />
                    </div>
                 </div>

                 {sidePanel.type === 'book' && (
                    <div className="pt-4 border-t border-slate-50">
                       <p className="text-[8px] font-bold text-slate-400 uppercase text-center">Empty nodes can be calibrated post-allocation.</p>
                    </div>
                 )}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex gap-3">
                 <Button 
                  variant="ghost" 
                  className="flex-1 h-11 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800"
                  onClick={() => setSidePanel({ isOpen: false, type: 'book', data: null })}
                 >
                    Discard
                 </Button>
                 <Button 
                  variant="accent" 
                  className="flex-1 h-11 text-[10px] font-black uppercase tracking-widest shadow-google"
                  onClick={handleAddAppointment}
                  leftIcon={<FaPlus />}
                 >
                    Finalize Node
                 </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Appointments;
