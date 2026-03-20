import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaUserMd, FaSearch, FaChevronDown } from 'react-icons/fa';
import Button from '../ui/Button';

const CalendarHeader = ({ 
  view, 
  setView, 
  currentDate,
  onPrev, 
  onNext, 
  onToday, 
  practitioners = [], 
  selectedPractitioner, 
  setSelectedPractitioner 
}) => {
  const dateRange = currentDate.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 p-6 bg-white rounded-[2rem] shadow-premium border border-slate-50 transition-all">
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
        {/* Date Navigation */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner-soft">
          <Button 
            variant="ghost" 
            onClick={onToday}
            className="px-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-clinicPrimary whitespace-nowrap"
          >
            Go to today
          </Button>
          <div className="h-4 w-px bg-slate-200 mx-1"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrev}
            className="h-9 w-9 text-slate-400 hover:text-clinicPrimary hover:bg-white rounded-xl transition-all"
          >
            <FaChevronLeft size={12} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext}
            className="h-9 w-9 text-slate-400 hover:text-clinicPrimary hover:bg-white rounded-xl transition-all"
          >
            <FaChevronRight size={12} />
          </Button>
        </div>

        {/* Date Display */}
        <div className="text-center sm:text-left flex flex-col justify-center">
          <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none">{dateRange}</h2>
          <p className="text-[10px] font-bold text-clinicPrimary mt-2 uppercase tracking-[0.2em]">Clinical Diary Node</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full xl:w-auto">
        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200 shadow-inner-soft">
          {[
            { id: 'day', label: 'Day' },
            { id: 'week', label: 'Week' },
            { id: 'month', label: 'Month' }
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                view === v.id 
                  ? 'bg-white text-clinicPrimary shadow-premium border border-slate-100' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-slate-100 hidden sm:block mx-1"></div>

        {/* Practitioner Filter */}
        <div className="relative group min-w-[200px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-clinicPrimary opacity-60">
            <FaUserMd size={12} />
          </div>
          <select 
            value={selectedPractitioner}
            onChange={(e) => setSelectedPractitioner(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-700 uppercase tracking-widest outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-soft"
          >
            <option value="all">All Practitioners</option>
            {practitioners.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">
             <FaChevronDown size={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
