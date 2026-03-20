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
  onAppointmentContextMenu,
  practitioners = [],
  selectedPractitioner = 'all'
}) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeekDays = (start) => {
    // Find the Monday of the current week
    const d = new Date(start);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(d.setDate(diff));
    
    return days.map((dayName, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return { 
        name: dayName, 
        shortName: dayName.substring(0, 3),
        date: date.getDate(), 
        full: date,
        formatted: date.toISOString().split('T')[0]
      };
    });
  };

  const weekDays = getWeekDays(currentDate);
  const displayDays = view === 'day' ? [weekDays.find(d => d.formatted === currentDate.toISOString().split('T')[0]) || weekDays[0]] : weekDays;

  const getTimeInMinutes = (timeString) => {
    if (!timeString) return 0;
    const parts = timeString.split(' ');
    const timeParts = parts[0].split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1] || 0);
    const ampm = parts[1] || '';

    if (ampm.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    if (ampm.toLowerCase() === 'am' && hours === 12) hours = 0;
    
    return (hours - HOURS[0]) * 60 + minutes; 
  };

  const getApptsForDay = (dayFormatted) => {
    return appointments.filter(a => a.date === dayFormatted);
  };

  const getApptsForSlot = (dayFormatted, hour) => {
    return appointments.filter(a => {
      const apptHour = parseInt(a.startTime.split(':')[0]);
      const amPm = a.startTime.toLowerCase().includes('pm');
      const normalizedHour = (amPm && apptHour !== 12) ? apptHour + 12 : (!amPm && apptHour === 12 ? 0 : apptHour);
      return a.date === dayFormatted && normalizedHour === hour;
    });
  };

  if (view === 'month') {
    return (
      <div className="bg-white rounded-[2rem] shadow-premium border border-slate-50 overflow-hidden animate-in fade-in duration-500">
        <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/50">
          {days.map(d => (
            <div key={d} className="py-4 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">{d.substring(0, 3)}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="border-r border-b border-slate-50 p-4 hover:bg-slate-50/30 transition-all cursor-pointer group relative">
               <span className="text-[10px] font-bold text-slate-400 group-hover:text-clinicPrimary">{i + 1}</span>
               <div className="mt-2 space-y-1">
                 {i % 7 === 2 && <div className="h-1.5 w-full bg-clinicPrimary/20 rounded-full animate-pulse"></div>}
                 {i % 9 === 0 && <div className="h-1.5 w-2/3 bg-emerald-400/20 rounded-full"></div>}
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
      <div className="flex border-b border-slate-100 bg-slate-50/30">
        <div className="w-16 sm:w-20 flex-shrink-0 border-r border-slate-100"></div>
        <div className={`flex-1 grid ${view === 'day' ? 'grid-cols-1' : 'grid-cols-7'}`}>
          {displayDays.map((d, index) => (
            <div key={index} className="py-4 px-2 text-center border-r border-slate-100 last:border-0 group cursor-pointer hover:bg-white transition-all flex flex-col items-center justify-center">
              <p className="text-[8px] font-black text-slate-900 uppercase tracking-[0.1em] mb-0.5">{d.name} {d.date}/{d.full.getMonth()+1}</p>
              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wide truncate max-w-full">
                {selectedPractitioner !== 'all' ? selectedPractitioner : 'All Practitioners'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Body */}
      <div className="flex-1 relative overflow-x-auto custom-scrollbar">
        <div className={`${view === 'day' ? 'min-w-full' : 'min-w-[1000px]'} flex`}>
          {/* Time Column */}
          <div className="w-16 sm:w-20 flex-shrink-0 bg-slate-50/10 border-r border-slate-100">
            {HOURS.map(hour => (
              <div key={hour} className="h-20 border-b border-slate-50 px-3 py-2 flex flex-col items-center justify-start">
                <span className="text-[11px] font-black text-slate-900 tabular-nums leading-none">
                  {hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour)}
                </span>
                <span className="text-[7px] font-black text-slate-400 uppercase mt-1">
                  {hour >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
            ))}
          </div>

          {/* Slots Columns */}
          <div className={`flex-1 grid ${view === 'day' ? 'grid-cols-1' : 'grid-cols-7'} relative`}>
            {displayDays.map((d, dayIndex) => (
              <div key={dayIndex} className="relative border-r border-slate-50 last:border-0 bg-white">
                {HOURS.map(hour => (
                  <div 
                    key={hour} 
                    onClick={() => onSlotClick(d.full, hour)}
                    className="h-20 border-b border-slate-50/50 hover:bg-slate-50/50 transition-all cursor-pointer group relative border-dashed"
                  >
                    {/* Hover indicator */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
                       <div className="w-6 h-6 rounded-full bg-clinicPrimary/5 text-clinicPrimary flex items-center justify-center scale-75 group-hover:scale-100 transition-transform border border-clinicPrimary/20">
                          <span className="text-sm font-black text-clinicPrimary-dark">+</span>
                       </div>
                    </div>
                  </div>
                ))}

                {/* Absolute Appointments Layer */}
                <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-10">
                   {getApptsForDay(d.formatted).map(appt => {
                      const startMin = getTimeInMinutes(appt.startTime);
                      const endMin = getTimeInMinutes(appt.endTime || appt.startTime); 
                      // If duration less than 30 min, enforce min height
                      let duration = endMin - startMin;
                      if (duration <= 0) duration = 60; // 1 hr default

                      const totalMinutes = (HOURS[HOURS.length - 1] - HOURS[0]) * 60;
                      const topPercent = (startMin / totalMinutes) * 100;
                      const heightPercent = (duration / totalMinutes) * 100;

                      return (
                        <div 
                          key={appt.id}
                          className="absolute inset-x-0 p-1 pointer-events-auto"
                          style={{ top: `${topPercent}%`, height: `${heightPercent}%` }}
                        >
                          <AppointmentCard 
                            appointment={appt} 
                            onContextMenu={(e) => {
                              e.preventDefault();
                              onAppointmentContextMenu(appt, e);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAppointmentClick(appt, e);
                            }}
                          />
                        </div>
                      );
                   })}
                </div>
              </div>
            ))}
            
            {/* Current Time Indicator */}
            {view === 'day' && new Date().toDateString() === currentDate.toDateString() && (
               <div 
                 className="absolute left-0 right-0 h-px bg-rose-500/40 z-20 pointer-events-none after:content-[''] after:absolute after:left-0 after:top-[-3px] after:w-1.5 after:h-1.5 after:bg-rose-500 after:rounded-full"
                 style={{ top: `${((new Date().getHours() - HOURS[0]) * 60 + new Date().getMinutes()) / (HOURS.length * 60) * 100}%` }}
               ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
