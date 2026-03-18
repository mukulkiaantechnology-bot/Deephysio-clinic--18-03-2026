import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaUserMd, FaSearch } from 'react-icons/fa';
import Button from '../ui/Button';

const CalendarHeader = ({ 
  view, 
  setView, 
  dateRange, 
  onPrev, 
  onNext, 
  onToday, 
  practitioners = [], 
  selectedPractitioner, 
  setSelectedPractitioner 
}) => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 p-6 bg-white rounded-[2rem] shadow-premium border border-slate-50 transition-all">
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
        {/* Date Navigation */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner-soft">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrev}
            className="h-10 w-10 text-slate-400 hover:text-clinicPrimary hover:bg-white rounded-xl transition-all"
          >
            <FaChevronLeft size={14} />
          </Button>
          <Button 
            variant="ghost" 
            onClick={onToday}
            className="px-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-clinicPrimary"
          >
            Today
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNext}
            className="h-10 w-10 text-slate-400 hover:text-clinicPrimary hover:bg-white rounded-xl transition-all"
          >
            <FaChevronRight size={14} />
          </Button>
        </div>

        {/* Date Display */}
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase leading-none">{dateRange}</h2>
          <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">Clinic Schedule Overview</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 w-full xl:w-auto">
        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-inner-soft">
          {[
            { id: 'day', icon: <FaCalendarDay />, label: 'Day' },
            { id: 'week', icon: <FaCalendarWeek />, label: 'Week' },
            { id: 'month', icon: <FaCalendarAlt />, label: 'Month' }
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                view === v.id 
                  ? 'bg-white text-clinicPrimary shadow-soft border border-slate-100' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {v.icon}
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-slate-100 hidden sm:block mx-2"></div>

        {/* Practitioner Filter */}
        <div className="relative group min-w-[180px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-clinicPrimary opacity-50">
            <FaUserMd size={14} />
          </div>
          <select 
            value={selectedPractitioner}
            onChange={(e) => setSelectedPractitioner(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-slate-700 uppercase tracking-widest outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
          >
            <option value="all">All Practitioners</option>
            {practitioners.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <Button 
          variant="accent" 
          className="shadow-lg px-6 py-3 rounded-2xl animate-in zoom-in-95 duration-500"
          leftIcon={<FaSearch size={12} />}
        >
          <span className="text-[11px] font-black uppercase tracking-widest">Time Finder</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
