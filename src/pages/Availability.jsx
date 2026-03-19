import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaPlus, FaTrash, FaCheckCircle, FaLock, FaExclamationTriangle, FaSync } from 'react-icons/fa';
import Button from '../components/ui/Button';

const Availability = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const [schedule, setSchedule] = useState({
    Monday: [{ id: 1, start: '09:00', end: '12:30' }, { id: 2, start: '13:30', end: '17:00' }],
    Tuesday: [{ id: 3, start: '09:00', end: '17:00' }],
    Wednesday: [{ id: 4, start: '09:00', end: '12:30' }, { id: 5, start: '13:30', end: '17:00' }],
    Thursday: [{ id: 6, start: '09:00', end: '17:00' }],
    Friday: [{ id: 7, start: '09:00', end: '15:00' }],
    Saturday: [],
    Sunday: []
  });

  const [blocks, setBlocks] = useState([
    { id: 1, title: 'Staff Meeting', date: 'Every Wednesday', time: '12:30 PM - 01:30 PM' },
    { id: 2, title: 'Clinic Cleaning', date: 'Mar 25, 2026', time: '08:00 AM - 09:00 AM' },
  ]);

  const [acceptBookings, setAcceptBookings] = useState(true);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2 min ago');

  const handleAddSlot = () => {
    const newSlot = { id: Date.now(), start: '09:00', end: '17:00' };
    setSchedule({ ...schedule, [selectedDay]: [...(schedule[selectedDay] || []), newSlot] });
  };

  const handleDeleteSlot = (id) => {
    setSchedule({ ...schedule, [selectedDay]: schedule[selectedDay].filter(s => s.id !== id) });
  };

  const handleSlotChange = (id, field, value) => {
    const updatedSlots = schedule[selectedDay].map(s => s.id === id ? { ...s, [field]: value } : s);
    setSchedule({ ...schedule, [selectedDay]: updatedSlots });
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('Just now');
    }, 1500);
  };

  return (
    <div className="max-w-[1300px] w-full mx-auto space-y-4 sm:space-y-6 px-4 sm:px-5 lg:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Schedule & Availability</h1>
          <p className="text-slate-500 font-bold mt-2 sm:mt-3 uppercase tracking-widest text-[10px] sm:text-[11px] opacity-80">Configure your working hours and block out time.</p>
        </div>
        <button onClick={() => navigate('/appointments/availability/add')} className="rounded-2xl sm:rounded-[24px] h-10 sm:h-12 px-5 sm:px-8 shadow-none border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] w-full sm:w-auto relative bg-white text-slate-700 flex items-center justify-center gap-2">
          <FaLock size={12}/> ADD TIME BLOCK
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Day Selector Sidebar */}
        <div className="lg:col-span-1">
           <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Choose Day</h3>
           <div className="flex flex-col md:flex-row lg:flex-col gap-2 md:overflow-x-auto lg:overflow-visible custom-scrollbar pb-2 lg:pb-0">
             {days.map(day => (
               <button 
                 key={day}
                 onClick={() => setSelectedDay(day)}
                 className={`w-full md:w-auto md:min-w-[140px] lg:w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all border ${selectedDay === day ? 'bg-clinicPrimary border-clinicPrimary text-white shadow-soft' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 shadow-none'}`}
               >
                 <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest">{day.slice(0,3)}</span>
                 {selectedDay === day ? <FaCheckCircle size={14} className="text-white/80"/> : <span className={`text-[9px] sm:text-[10px] font-bold uppercase ${schedule[day]?.length > 0 ? 'text-clinicPrimary' : 'text-slate-300'}`}>{schedule[day]?.length > 0 ? 'Active' : 'Off'}</span>}
               </button>
             ))}
           </div>
        </div>

        {/* Working Hours Area */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 border-none shadow-premium bg-white rounded-2xl sm:rounded-[24px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-4 gap-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-clinicPrimary" size={14}/>
                <h3 className="text-[13px] sm:text-[14px] font-black uppercase tracking-widest text-slate-900">{selectedDay} Hours</h3>
              </div>
              <button onClick={handleAddSlot} className="w-full sm:w-auto text-[10px] sm:text-[11px] font-black text-clinicPrimary hover:bg-clinicPrimary/10 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-clinicPrimary/5 border border-clinicPrimary/10 px-4 py-2 sm:py-2.5 rounded-xl">
                 <FaPlus size={10}/> ADD SLOT
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {schedule[selectedDay]?.length > 0 ? schedule[selectedDay].map(slot => (
                <div key={slot.id} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-slate-50/50 rounded-xl sm:rounded-2xl border border-slate-100 transition-none">
                  <div className="w-full sm:flex-1 grid grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">Start Time</label>
                      <input type="time" value={slot.start} onChange={(e) => handleSlotChange(slot.id, 'start', e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-[12px] sm:text-[13px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/20 transition-all cursor-pointer shadow-inner-soft" />
                    </div>
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 sm:mb-2">End Time</label>
                      <input type="time" value={slot.end} onChange={(e) => handleSlotChange(slot.id, 'end', e.target.value)} className="w-full bg-white border border-slate-100 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-[12px] sm:text-[13px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/20 transition-all cursor-pointer shadow-inner-soft" />
                    </div>
                  </div>
                  <button onClick={() => handleDeleteSlot(slot.id)} className="w-full sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-colors shadow-none mt-2 sm:mt-0">
                    <FaTrash size={12}/>
                  </button>
                </div>
              )) : (
                 <div className="p-8 sm:p-10 text-center border-2 border-dashed border-slate-100 rounded-xl sm:rounded-2xl bg-slate-50/50">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] sm:text-[11px]">No working slots configured for {selectedDay}.</p>
                 </div>
              )}
            </div>

            <div className="pt-2 sm:pt-4 flex items-center gap-4 border-t border-slate-50 mt-4 sm:mt-6">
               <label className="flex items-center gap-3 cursor-pointer group mt-4">
                  <div className="relative inline-block w-10 sm:w-12 h-5 sm:h-6 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" checked={acceptBookings} onChange={(e) => setAcceptBookings(e.target.checked)} className={`toggle-checkbox absolute block w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 z-10 ${acceptBookings ? 'border-clinicPrimary translate-x-5 sm:translate-x-6' : 'border-slate-200 translate-x-0'}`}/>
                    <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-5 sm:h-6 rounded-full cursor-pointer transition-colors duration-300 ${acceptBookings ? 'bg-clinicPrimary' : 'bg-slate-200'}`}></label>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-slate-600 group-hover:text-clinicPrimary transition-colors uppercase tracking-[0.1em]">Accept Online Bookings</span>
               </label>
            </div>
          </div>
        </div>

        {/* Global Blocks & Settings */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
           <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 border-none shadow-premium bg-white rounded-2xl sm:rounded-[24px]">
             <h3 className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <FaExclamationTriangle className="text-clinicSecondary" size={12}/>
                Active Blocks
             </h3>
             <div className="space-y-2 sm:space-y-3">
               {blocks.map(block => (
                 <div key={block.id} className="p-3 sm:p-4 bg-slate-50/50 rounded-lg sm:rounded-xl border-l-4 border-clinicSecondary">
                   <p className="text-[12px] sm:text-[13px] font-black text-slate-900 leading-none mb-1.5 sm:mb-2">{block.title}</p>
                   <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{block.date}</p>
                   <p className="text-[9px] sm:text-[10px] font-black text-clinicSecondary mt-1 sm:mt-1.5 uppercase">{block.time}</p>
                 </div>
               ))}
             </div>
           </div>

           <div className="p-0 overflow-hidden bg-clinicPrimary text-white shadow-premium rounded-2xl sm:rounded-[24px] border-none">
              <div className="p-4 sm:p-5 bg-white/10 flex items-center justify-between border-b border-white/10">
                 <div className="flex items-center gap-2 sm:gap-3">
                    <FaCalendarAlt size={14} className="opacity-50"/>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">Public Calendar</span>
                 </div>
                 <button onClick={() => navigate('/integrations/google')} className="bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">Config</button>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                 <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Sync Status</h4>
                    <button onClick={handleSync} disabled={isSyncing} className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white disabled:opacity-50">
                       <FaSync className={isSyncing ? 'animate-spin' : ''} size={10}/>
                    </button>
                 </div>
                 <div className="flex items-center gap-3 sm:gap-4 bg-black/10 p-3 sm:p-4 rounded-xl border border-white/5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-xl bg-white/20 flex items-center justify-center font-black text-[14px] sm:text-[16px] shadow-inner">G</div>
                    <div>
                       <p className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest">Google Calendar</p>
                       <p className="text-[8px] sm:text-[9px] font-bold text-white/60 uppercase tracking-[0.1em] mt-1">Last sync: {lastSync}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
