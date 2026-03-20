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

const AppointmentCard = ({ appointment, onClick, onContextMenu }) => {
  const { patientName, startTime, endTime, status, type, hasNotes, isPaid } = appointment;
  const config = statusConfig[status] || statusConfig['Pending'];

  return (
    <motion.div
      layoutId={`appt-${appointment.id}`}
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.98, zIndex: 50 }}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={cn(
        "p-1.5 rounded-lg border shadow-sm cursor-pointer transition-all duration-300 relative overflow-hidden h-full",
        config.color,
        "group hover:shadow-premium hover:border-clinicPrimary/40"
      )}
    >
      {/* Accent Bar */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg", config.accent)}></div>

      <div className="flex flex-col h-full justify-between gap-0.5">
        <div className="min-w-0">
          <p className="text-[9px] font-black leading-tight truncate uppercase text-slate-900">{patientName}</p>
          <p className="text-[7px] font-bold opacity-70 uppercase tracking-tighter truncate">{type}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[7px] font-black tracking-tighter tabular-nums opacity-60">
            {startTime}
          </span>
          <div className="flex items-center gap-0.5">
            {hasNotes && <FaNotesMedical size={6} className="text-slate-400" />}
            {isPaid && <FaCreditCard size={6} className="text-emerald-500" />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentCard;
