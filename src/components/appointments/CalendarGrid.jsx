import React from 'react';
import AppointmentCard from './AppointmentCard';
import { cn } from '../ui/Button';

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

const CalendarGrid = ({ 
  view, 
  currentDate, 
  appointments, 
  onSlotClick, 
  onAppointmentClick,
  onAppointmentDrop,
  practitioners = [] 
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getWeekDays = (start) => {
    return days.map((day, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return { 
        name: day, 
        date: d.getDate(), 
        full: d 
      };
    });
  };

  const weekDays = getWeekDays(currentDate);

  // Helper to group appointments by day and time for easier rendering
  const getApptsForSlot = (dayDate, hour) => {
    return appointments.filter(a => {
      const apptDate = new Date(a.date);
      const apptHour = parseInt(a.startTime.split(':')[0]);
      return apptDate.getDate() === dayDate && apptHour === hour;
    });
  };

  if (view === 'month') {
    return (
      <div className="bg-white rounded-[2rem] shadow-premium border border-slate-50 overflow-hidden animate-in fade-in duration-500">
        <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/50">
          {days.map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="border-r border-b border-slate-50 p-2 hover:bg-slate-50/30 transition-all cursor-pointer group">
               <span className="text-[10px] font-bold text-slate-400 group-hover:text-clinicPrimary">{i + 1}</span>
               <div className="mt-1 space-y-1">
                 {/* Simplified dots for month view */}
                 {i % 4 === 0 && <div className="h-1.5 w-full bg-clinicPrimary/20 rounded-full animate-pulse"></div>}
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-premium border border-slate-50 overflow-hidden flex flex-col animate-in fade-in duration-700">
      {/* Grid Header */}
      <div className="flex border-b border-slate-50 bg-slate-50/30">
        <div className="w-20 sm:w-24 flex-shrink-0 border-r border-slate-50"></div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-7">
          {(view === 'week' ? weekDays : [weekDays[0]]).map((d, index) => (
            <div key={index} className="py-6 px-4 text-center border-r border-slate-50 last:border-0 group cursor-pointer hover:bg-white transition-all">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{d.name}</p>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-clinicPrimary transition-colors leading-none">{d.date}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Body */}
      <div className="flex-1 relative overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px] flex">
          {/* Time Column */}
          <div className="w-20 sm:w-24 flex-shrink-0 bg-slate-50/30 border-r border-slate-50">
            {HOURS.map(hour => (
              <div key={hour} className="h-28 border-b border-slate-50 px-4 py-2 flex justify-end">
                <span className="text-[10px] font-black text-slate-300 uppercase tabular-nums">
                  {hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? 'PM' : 'AM'}`}
                </span>
              </div>
            ))}
          </div>

          {/* Slots Columns */}
          <div className="flex-1 grid grid-cols-7 relative">
            {weekDays.map((d, dayIndex) => (
              <div key={dayIndex} className="relative border-r border-slate-50 last:border-0 bg-white">
                {HOURS.map(hour => (
                  <div 
                    key={hour} 
                    onClick={() => onSlotClick(d.full, hour)}
                    className="h-28 border-b border-slate-50 hover:bg-slate-50/50 transition-all cursor-crosshair group relative"
                  >
                    {/* Hover indicator */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                       <div className="w-8 h-8 rounded-full bg-clinicPrimary/10 text-clinicPrimary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                          <span className="text-xl font-black">+</span>
                       </div>
                    </div>

                    {/* Appointments in this slot */}
                    <div className="absolute inset-0 pt-1 px-1">
                       {getApptsForSlot(d.date, hour).map(appt => (
                         <div key={appt.id} className="relative h-full">
                           <AppointmentCard 
                             appointment={appt} 
                             onClick={(e) => onAppointmentClick(appt, e)}
                             onDragStart={() => {}} // Handle in parent if needed
                             onDragEnd={(e, info) => onAppointmentDrop(appt, info)}
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            {/* Current Time Indicator (Dummy for UI scale) */}
            <div className="absolute left-0 right-0 top-[35%] h-px bg-rose-500/30 z-20 pointer-events-none after:content-[''] after:absolute after:left-0 after:top-[-4px] after:w-2 after:h-2 after:bg-rose-500 after:rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
