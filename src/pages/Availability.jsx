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
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Schedule & Availability</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Configure your working hours and block out time.</p>
        </div>
        <button onClick={() => navigate('/appointments/availability/add')} className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaLock size={10}/> Add Time Block
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Day Selector Sidebar */}
        <div className="lg:col-span-3 space-y-2">
           <h3 className="text-base font-black uppercase tracking-widest text-gray-400 mb-4 px-1">Choose Day</h3>
           {days.map(day => (
             <button 
               key={day}
               onClick={() => setSelectedDay(day)}
               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all border ${selectedDay === day ? 'bg-clinicPrimary border-clinicPrimary text-white shadow-lg' : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 shadow-sm'}`}
             >
               <span className="text-[14px] font-black uppercase tracking-widest">{day}</span>
               {selectedDay === day ? <FaCheckCircle size={14}/> : <span className={`text-[12px] font-bold ${schedule[day]?.length > 0 ? 'text-clinicPrimary' : 'text-slate-300'}`}>{schedule[day]?.length > 0 ? 'Active' : 'Off'}</span>}
             </button>
           ))}
        </div>

        {/* Working Hours Area */}
        <div className="lg:col-span-6 space-y-6">
          <div className="card-clinic space-y-6 border-none shadow-xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-clinicPrimary" size={16}/>
                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Working Hours: {selectedDay}</h3>
              </div>
              <button onClick={handleAddSlot} className="text-[13px] font-black text-clinicPrimary hover:text-clinicSecondary transition-colors uppercase tracking-widest flex items-center gap-2 bg-clinicPrimary/10 px-4 py-2 rounded-xl">
                 <FaPlus size={10}/> Add Slot
              </button>
            </div>

            <div className="space-y-4">
              {schedule[selectedDay]?.length > 0 ? schedule[selectedDay].map(slot => (
                <div key={slot.id} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:border-clinicPrimary/30 shadow-inner-soft">
                  <div className="flex-1 grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">Start Time</label>
                      <input type="time" value={slot.start} onChange={(e) => handleSlotChange(slot.id, 'start', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[14px] font-black text-slate-900 outline-none focus:ring-2 focus:ring-clinicPrimary/20 transition-all cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-2">End Time</label>
                      <input type="time" value={slot.end} onChange={(e) => handleSlotChange(slot.id, 'end', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[14px] font-black text-slate-900 outline-none focus:ring-2 focus:ring-clinicPrimary/20 transition-all cursor-pointer" />
                    </div>
                  </div>
                  <button onClick={() => handleDeleteSlot(slot.id)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-sm">
                    <FaTrash size={14}/>
                  </button>
                </div>
              )) : (
                 <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[13px]">No working slots configured for {selectedDay}.</p>
                 </div>
              )}
            </div>

            <div className="pt-4 flex items-center gap-4">
               <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" checked={acceptBookings} onChange={(e) => setAcceptBookings(e.target.checked)} className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-300 z-10 ${acceptBookings ? 'border-clinicPrimary translate-x-6' : 'border-slate-300 translate-x-0'}`}/>
                    <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${acceptBookings ? 'bg-clinicPrimary' : 'bg-slate-300'}`}></label>
                  </div>
                  <span className="text-[13px] font-black text-slate-600 uppercase tracking-[0.1em]">Accept Online Bookings</span>
               </label>
            </div>
          </div>
        </div>

        {/* Global Blocks & Settings */}
        <div className="lg:col-span-3 space-y-6">
           <div className="card-clinic space-y-4 shadow-xl border-none">
             <h3 className="text-base font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                <FaExclamationTriangle className="text-clinicSecondary" size={14}/>
                Active Blocks
             </h3>
             <div className="space-y-3">
               {blocks.map(block => (
                 <div key={block.id} className="p-3 bg-clinicLight rounded-lg border-l-4 border-clinicSecondary">
                   <p className="text-base font-black text-gray-900 leading-none mb-1">{block.title}</p>
                   <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{block.date}</p>
                   <p className="text-sm font-black text-clinicSecondary mt-1 uppercase">{block.time}</p>
                 </div>
               ))}
             </div>
           </div>

           <div className="card-clinic p-0 overflow-hidden bg-clinicPrimary text-white shadow-xl border-none">
              <div className="p-4 bg-white/10 flex items-center justify-between border-b border-white/10">
                 <div className="flex items-center gap-3">
                    <FaCalendarAlt size={18} className="opacity-50"/>
                    <span className="text-[13px] font-black uppercase tracking-widest">Public Calendar</span>
                 </div>
                 <button onClick={() => navigate('/integrations/google')} className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">Config</button>
              </div>
              <div className="p-6">
                 <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Sync Status</h4>
                    <button onClick={handleSync} disabled={isSyncing} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white disabled:opacity-50">
                       <FaSync className={isSyncing ? 'animate-spin' : ''} size={12}/>
                    </button>
                 </div>
                 <div className="flex items-center gap-4 bg-black/10 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-lg shadow-inner">G</div>
                    <div>
                       <p className="text-[13px] font-black uppercase tracking-widest">Google Calendar</p>
                       <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.1em] mt-1">Last sync: {lastSync}</p>
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
