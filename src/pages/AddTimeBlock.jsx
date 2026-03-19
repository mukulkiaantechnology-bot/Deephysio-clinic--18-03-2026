import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaCalendarAlt, FaClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddTimeBlock = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Time Block Successfully Enforced!');
    navigate('/appointments/availability');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      <div className="flex items-center gap-8 mb-8">
        <button 
          type="button"
          onClick={() => navigate('/appointments/availability')}
          className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90 shrink-0"
        >
          <FaArrowLeft size={16}/>
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Create Time Block</h1>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em] opacity-80">Enforce Schedule Restrictions & Lockouts</p>
        </div>
      </div>

      <Card className="p-6 sm:p-10 border-none shadow-premium bg-white space-y-10 group relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10 w-full mb-8">
          
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Block Motivation / Title</label>
             <div className="relative group/input">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Mandatory Staff Drill..."
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Date Specification</label>
              <div className="relative group/input">
                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Nov 14, 2026 or Every Friday"
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Time Envelope</label>
              <div className="relative group/input">
                <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="02:00 PM - 04:00 PM"
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-end gap-5 relative z-10 w-full mt-10">
             <Button type="button" variant="secondary" onClick={() => navigate('/appointments/availability')} className="w-full sm:w-auto px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-soft flex-1 sm:flex-none">Cancel Request</Button>
             <Button type="submit" variant="accent" leftIcon={<FaLock />} className="w-full sm:w-auto px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-google active:scale-95 transition-all flex-1 sm:flex-none">Enforce Schedule Block</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddTimeBlock;
