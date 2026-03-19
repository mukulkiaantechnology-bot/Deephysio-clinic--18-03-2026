import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserInjured, FaStethoscope, FaHospital, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddReferral = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    practitioner: '',
    clinic: '',
    type: 'Outgoing',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Referral Event Triggered: Data logged in centralized registry successfully!');
    navigate('/patients/referrals');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      <div className="flex items-center gap-8 mb-8">
        <button 
          type="button"
          onClick={() => navigate('/patients/referrals')}
          className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90 shrink-0"
        >
          <FaArrowLeft size={16}/>
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Initialize Referral Node</h1>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em] opacity-80">Clinical Transfer Protocol</p>
        </div>
      </div>

      <Card className="p-6 sm:p-10 border-none shadow-premium bg-white space-y-10 group relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Patient Subject</label>
              <div className="relative group/input">
                <FaUserInjured className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="Enter patient name or ID..."
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.patientName}
                  onChange={e => setFormData({...formData, patientName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Referral Type</label>
              <select 
                className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="Outgoing">Outgoing (External Transfer)</option>
                <option value="Incoming">Incoming (Internal Reception)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Receiving/Referring Practitioner</label>
              <div className="relative group/input">
                <FaStethoscope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Dr. House..."
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.practitioner}
                  onChange={e => setFormData({...formData, practitioner: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Target Clinic/Hospital</label>
              <div className="relative group/input">
                <FaHospital className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors"/>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Princeton Plainsboro..."
                  className="w-full pl-12 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={formData.clinic}
                  onChange={e => setFormData({...formData, clinic: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Clinical Justification</label>
            <textarea 
              required
              className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all h-32 custom-scrollbar placeholder:text-slate-300 placeholder:font-medium" 
              placeholder="Detail the case requirements..."
              value={formData.reason}
              onChange={e => setFormData({...formData, reason: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-end gap-5 relative z-10 w-full">
            <Button type="button" variant="secondary" onClick={() => navigate('/patients/referrals')} className="w-full sm:w-auto px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-soft flex-1 sm:flex-none">Abort Protocol</Button>
            <Button type="submit" variant="accent" leftIcon={<FaPaperPlane />} className="w-full sm:w-auto px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-google active:scale-95 transition-all flex-1 sm:flex-none">Execute Transfer</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddReferral;
