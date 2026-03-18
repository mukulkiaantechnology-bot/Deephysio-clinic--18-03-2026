import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaPlus, FaTrash, FaCheckCircle, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const Availability = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const activeSlots = [
    { id: 1, start: '09:00 AM', end: '12:30 PM', sessions: 4 },
    { id: 2, start: '01:30 PM', end: '05:00 PM', sessions: 5 },
  ];

  const blocks = [
    { id: 1, title: 'Staff Meeting', date: 'Every Wednesday', time: '12:30 PM - 01:30 PM' },
    { id: 2, title: 'Clinic Cleaning', date: 'Mar 25, 2026', time: '08:00 AM - 09:00 AM' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Schedule & Availability</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Configure your working hours and block out time.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
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
               <span className="text-base font-black uppercase tracking-widest">{day}</span>
               {selectedDay === day ? <FaCheckCircle size={10}/> : <span className="text-base font-bold text-gray-300">Active</span>}
             </button>
           ))}
        </div>

        {/* Working Hours Area */}
        <div className="lg:col-span-6 space-y-6">
          <div className="card-clinic space-y-6 border-none shadow-xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-clinicPrimary" size={14}/>
                <h3 className="text-base font-black uppercase tracking-widest">Working Hours: {selectedDay}</h3>
              </div>
              <button className="text-base font-black text-clinicPrimary uppercase tracking-widest">+ Add Slot</button>
            </div>

            <div className="space-y-3">
              {activeSlots.map(slot => (
                <div key={slot.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group transition-all hover:border-clinicPrimary/30">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-base font-black text-gray-400 uppercase tracking-widest block mb-1">Start Time</label>
                      <input type="text" value={slot.start} readOnly className="w-full bg-white border border-gray-100 rounded-lg p-2 text-base font-black text-gray-900 outline-none" />
                    </div>
                    <div>
                      <label className="text-base font-black text-gray-400 uppercase tracking-widest block mb-1">End Time</label>
                      <input type="text" value={slot.end} readOnly className="w-full bg-white border border-gray-100 rounded-lg p-2 text-base font-black text-gray-900 outline-none" />
                    </div>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <FaTrash size={12}/>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
               <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-clinicPrimary right-0"/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-clinicPrimary cursor-pointer"></label>
                  </div>
                  <span className="text-base font-black text-gray-600 uppercase tracking-tight">Accept Online Bookings</span>
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
              <div className="p-4 bg-white/10 flex items-center justify-between">
                 <FaCalendarAlt size={18} className="opacity-50"/>
                 <span className="text-base font-black uppercase tracking-widest">Public Calendar</span>
              </div>
              <div className="p-5">
                 <h4 className="text-base font-black uppercase tracking-widest mb-3">Sync Status</h4>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">G</div>
                    <div>
                       <p className="text-sm font-black uppercase">Google Calendar</p>
                       <p className="text-base font-bold text-white/60 uppercase">Last sync: 2 min ago</p>
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
