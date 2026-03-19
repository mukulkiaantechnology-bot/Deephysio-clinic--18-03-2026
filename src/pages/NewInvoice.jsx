import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaReceipt, FaFileInvoiceDollar } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const NewInvoice = () => {
  const navigate = useNavigate();
  const [newInvoice, setNewInvoice] = useState({
    patient: 'James Wilson (PID-102)', amount: '', date: '', description: ''
  });

  const handleCreate = () => {
     alert('Invoice Created Successfully!');
     navigate('/billing');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      <div className="flex items-center gap-8 mb-8">
          <button 
            onClick={() => navigate('/billing')}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
          >
             <FaArrowLeft size={16}/>
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Issue New Invoice</h1>
            <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em] opacity-80">Revenue Documentation Protocol</p>
          </div>
      </div>

      <Card className="p-10 border-none shadow-premium bg-white space-y-10 group relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-clinicPrimary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
          
          <div className="flex items-center gap-4 border-b border-slate-50 pb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary shadow-soft">
              <FaFileInvoiceDollar size={18}/>
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Invoice Details Partition</h3>
          </div>

          <div className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Account Subject</label>
              <select 
                className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all cursor-pointer"
                value={newInvoice.patient}
                onChange={(e) => setNewInvoice({...newInvoice, patient: e.target.value})}
              >
                <option>James Wilson (PID-102)</option>
                <option>Emily Brown (PID-205)</option>
                <option>Corporate Client: TechHub UK</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Asset Valuation (£)</label>
                <div className="relative group/input">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[14px] font-black text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors">£</span>
                  <input 
                    type="number" 
                    className="w-full pl-10 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                    placeholder="0.00" 
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Temporal Deadline</label>
                <input 
                  type="date" 
                  className="w-full px-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  value={newInvoice.date}
                  onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Service Breakdown</label>
              <textarea 
                className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-[24px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all h-40 custom-scrollbar placeholder:text-slate-300 placeholder:font-medium" 
                placeholder="Describe the therapeutic services..."
                value={newInvoice.description}
                onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
              ></textarea>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-end gap-4 relative z-10">
            <Button variant="secondary" onClick={() => navigate('/billing')} className="px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-soft">Discard Draft</Button>
            <Button variant="accent" onClick={handleCreate} leftIcon={<FaReceipt />} className="px-10 h-14 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-google active:scale-95 transition-all">Finalize Invoice</Button>
          </div>
      </Card>
    </div>
  );
};

export default NewInvoice;
