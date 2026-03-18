import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaUserCheck, FaTimesCircle, FaNotesMedical, FaCreditCard, FaSyncAlt } from 'react-icons/fa';
import { cn } from '../ui/Button';

const statusConfig = {
  'Pending': { color: 'bg-amber-50 border-amber-200 text-amber-700', icon: <FaClock className="animate-pulse" />, accent: 'bg-amber-400' },
  'Confirmed': { color: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: <FaCheckCircle />, accent: 'bg-emerald-500' },
  'Arrived': { color: 'bg-info/10 border-info/20 text-info', icon: <FaUserCheck />, accent: 'bg-info' },
  'Completed': { color: 'bg-slate-50 border-slate-200 text-slate-500', icon: <FaCheckCircle className="opacity-50" />, accent: 'bg-slate-400' },
  'Rescheduled': { color: 'bg-indigo-50 border-indigo-200 text-indigo-700', icon: <FaSyncAlt />, accent: 'bg-indigo-500' },
  'Cancelled': { color: 'bg-red-50 border-red-200 text-red-700', icon: <FaTimesCircle />, accent: 'bg-red-500' },
  'Late Cancellation': { color: 'bg-orange-50 border-orange-200 text-orange-700', icon: <FaTimesCircle />, accent: 'bg-orange-500' },
  'No Show': { color: 'bg-rose-50 border-rose-200 text-rose-700', icon: <FaTimesCircle />, accent: 'bg-rose-500' },
};

const AppointmentCard = ({ appointment, onClick, onDragStart, onDragEnd }) => {
  const { patientName, startTime, endTime, status, type, hasNotes, isPaid } = appointment;
  const config = statusConfig[status] || statusConfig['Pending'];

  return (
    <motion.div
      layoutId={`appt-${appointment.id}`}
      drag
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98, zIndex: 50 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={cn(
        "absolute inset-x-1 p-2 rounded-xl border shadow-card cursor-pointer transition-all duration-300",
        config.color,
        "group hover:shadow-premium hover:border-clinicPrimary/40 overflow-hidden"
      )}
      style={{
        zIndex: 10,
        boxShadow: 'rgba(60,64,67,0.3) 0px 1px 2px 0px, rgba(60,64,67,0.15) 0px 1px 3px 1px'
      }}
    >
      {/* Accent Bar */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-xl", config.accent)}></div>

      <div className="flex flex-col h-full justify-between gap-1">
        <div className="space-y-0.5">
          <div className="flex items-center justify-between gap-1">
            <p className="text-[11px] font-black leading-tight tracking-tight truncate uppercase">{patientName}</p>
            <span className="text-[8px] opacity-70 flex-shrink-0">{config.icon}</span>
          </div>
          <p className="text-[9px] font-bold opacity-60 uppercase tracking-[0.05em] truncate">{type}</p>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/40 rounded-md backdrop-blur-sm border border-white/20">
            <span className="text-[9px] font-black tracking-tighter whitespace-nowrap">
              {startTime} - {endTime}
            </span>
          </div>
          
          <div className="flex items-center gap-1 translate-x-1">
            {hasNotes && <FaNotesMedical size={8} className="text-slate-400 opacity-60" title="Has Clinical Notes" />}
            {isPaid && <FaCreditCard size={8} className="text-emerald-500 opacity-80" title="Payment Complete" />}
          </div>
        </div>
      </div>

      {/* Hover Status Tag */}
      <div className="absolute -right-10 top-1 p-1 px-3 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-lg text-[7px] font-black uppercase tracking-widest text-slate-800 shadow-sm opacity-0 group-hover:right-1 group-hover:opacity-100 transition-all duration-300">
        {status}
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
