import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaUserCircle, FaReceipt, FaCreditCard, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';
import Button from '../components/ui/Button';

const RecordPaymentPage = () => {
  const navigate = useNavigate();
  const [newPayment, setNewPayment] = useState({ 
    patient: '', 
    amount: '', 
    date: new Date().toISOString().split('T')[0], 
    method: 'Visa •• 4242', 
    status: 'Paid',
    description: 'General Clinic Service'
  });

  const handleCommit = () => {
    if (!newPayment.patient || !newPayment.amount) {
      alert('Please fill in all required clinical fields.');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('deephysio_payments') || '[]');
    const paymentEntry = {
      ...newPayment,
      id: `INV-${(saved.length + 1).toString().padStart(3, '0')}`,
      amount: `$${parseFloat(newPayment.amount).toFixed(2)}`,
    };

    const updated = [paymentEntry, ...saved];
    localStorage.setItem('deephysio_payments', JSON.stringify(updated));
    
    alert('Payment Node Logged Successfully.');
    navigate('/billing/payments');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/billing/payments')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Initialize Transaction</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">PCI-DSS Secure Ledger Protocol</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                 <FaUserCircle className="text-clinicPrimary" /> Patient Subject <span className="text-rose-500">*</span>
              </label>
              <input 
                 type="text" 
                 placeholder="Search or enter verified patient name..." 
                 className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300"
                 value={newPayment.patient}
                 onChange={e => setNewPayment({...newPayment, patient: e.target.value})}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaReceipt className="text-clinicPrimary" /> Valuation Amount ($) <span className="text-rose-500">*</span>
                 </label>
                 <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300"
                    value={newPayment.amount}
                    onChange={e => setNewPayment({...newPayment, amount: e.target.value})}
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaCreditCard className="text-clinicPrimary" /> Verified Method
                 </label>
                 <select 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={newPayment.method}
                    onChange={e => setNewPayment({...newPayment, method: e.target.value})}
                 >
                    <option value="Visa •• 4242">Visa Credit (•• 4242)</option>
                    <option value="Mastercard •• 8888">Mastercard Debit (•• 8888)</option>
                    <option value="Direct Deposit">BACS Direct Deposit</option>
                    <option value="Cash">Physical Currency (Cash)</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaCalendarAlt className="text-clinicPrimary" /> Deployment Date
                 </label>
                 <input 
                    type="date" 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={newPayment.date}
                    onChange={e => setNewPayment({...newPayment, date: e.target.value})}
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaCheckCircle className="text-clinicPrimary" /> Initial Status
                 </label>
                 <select 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={newPayment.status}
                    onChange={e => setNewPayment({...newPayment, status: e.target.value})}
                 >
                    <option value="Paid">Processed (Paid)</option>
                    <option value="Pending">Pending Validation</option>
                    <option value="Failed">Declined / Failed</option>
                 </select>
              </div>
           </div>

           <div className="space-y-4 border-t border-slate-50 pt-8">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                 <FaStickyNote className="text-clinicPrimary" /> Clinical Description
              </label>
              <textarea 
                 rows="3"
                 placeholder="Attach clinical reasoning or service breakdown..." 
                 className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 resize-none"
                 value={newPayment.description}
                 onChange={e => setNewPayment({...newPayment, description: e.target.value})}
              ></textarea>
           </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End-to-End Encrypted Session</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <Button variant="secondary" className="flex-1 md:px-10 py-5 rounded-2xl" onClick={() => navigate('/billing/payments')}>Abort</Button>
              <Button variant="accent" className="flex-1 md:px-10 py-5 rounded-2xl" onClick={handleCommit}>Commit Ledger Entry</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentPage;
