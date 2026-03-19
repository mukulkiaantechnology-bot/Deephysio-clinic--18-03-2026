import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaReceipt, FaUserCircle, FaHistory, FaDownload, FaPrint, FaShareAlt, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('deephysio_payments') || '[]');
    const found = saved.find(t => t.id === id);
    if (found) {
      setInvoice(found);
    } else {
      // Logic for hardcoded ones if not in LS
      const initials = [
        { id: 'INV-001', patient: 'Alice Johnson', date: 'Mar 16, 2026', amount: '$85.00', status: 'Paid', method: 'Visa •• 4242', description: 'General Consultation & Physiotherapy Session' },
        { id: 'INV-002', patient: 'Bob Smith', date: 'Mar 15, 2026', amount: '$120.00', status: 'Pending', method: 'Direct Deposit', description: 'Advanced Neural Assessment' },
        { id: 'INV-003', patient: 'Charlie Brown', date: 'Mar 14, 2026', amount: '$65.00', status: 'Paid', method: 'Cash', description: 'Follow-up Treatment' },
        { id: 'INV-004', patient: 'Diana Prince', date: 'Mar 14, 2026', amount: '$95.00', status: 'Failed', method: 'Mastercard •• 8888', description: 'Sports Injury Therapy' },
      ];
      setInvoice(initials.find(t => t.id === id));
    }
  }, [id]);

  if (!invoice) return <div className="p-20 text-center font-black uppercase text-slate-300 tracking-[0.3em]">Locating Transaction Node...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/billing/payments')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
            <FaArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Transaction Intelligence</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Invoice Archive: {invoice.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all shadow-sm"><FaPrint size={18}/></button>
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all shadow-sm"><FaShareAlt size={18}/></button>
           <Button variant="accent" className="rounded-2xl px-8" leftIcon={<FaDownload />}>Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden relative">
              <div className="p-12 space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-2xl">
                          {invoice.patient.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.3em] mb-1">Authenticated Payer</p>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{invoice.patient}</h3>
                       </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                       invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                       invoice.status === 'Failed' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                       {invoice.status}
                    </div>
                 </div>

                 <div className="p-10 bg-slate-900 rounded-[32px] text-white flex items-center justify-between relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                       <p className="text-[10px] font-black text-clinicPrimary uppercase tracking-[0.3em] mb-4 opacity-80">Settlement Valuation</p>
                       <h2 className="text-5xl font-black tracking-tighter">{invoice.amount}</h2>
                    </div>
                    <FaReceipt className="absolute -right-6 -bottom-6 text-white/5 text-9xl" />
                    <div className="relative z-10 text-right">
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Protocol Date</p>
                       <p className="text-xl font-bold tracking-tight">{invoice.date}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                       <FaHistory className="text-clinicPrimary" /> Clinical Reasoning
                    </h4>
                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] relative">
                       <p className="text-[14px] font-bold text-slate-600 leading-relaxed italic">"{invoice.description}"</p>
                       <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Service Method</p>
                             <p className="text-[12px] font-black text-slate-900 uppercase">{invoice.method}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Security Hash</p>
                             <p className="text-[10px] font-black text-clinicPrimary uppercase tracking-tighter font-mono">X-PAY-2026-FSH-0932</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-10">
           <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 p-8 space-y-8">
              <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                 <FaShieldAlt className="text-clinicPrimary" /> Audit Logs
              </h4>
              <div className="space-y-6">
                 {[
                   { event: 'Transaction Initialized', time: '14:20 PM', status: 'Success' },
                   { event: 'PCI-DSS Validation', time: '14:21 PM', status: 'Success' },
                   { event: 'Gateway Handshake', time: '14:21 PM', status: 'Success' },
                   { event: 'Ledger Synchronization', time: '14:22 PM', status: 'Success' }
                 ].map((log, i) => (
                    <div key={i} className="flex gap-4 relative">
                       {i !== 3 && <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-100"></div>}
                       <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${log.status === 'Success' ? 'bg-clinicPrimary shadow-[0_0_8px_rgba(46,167,184,0.5)]' : 'bg-slate-300'}`}></div>
                       <div>
                          <p className="text-[12px] font-black text-slate-800 leading-tight">{log.event}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{log.time} • v2.4.0</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-clinicPrimary/5 border border-clinicPrimary/10 rounded-[40px] flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white border border-clinicPrimary/20 flex items-center justify-center text-clinicPrimary shadow-sm">
                 <FaShieldAlt size={22} />
              </div>
              <div>
                 <p className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.1em] leading-none mb-1">Internal Use Only</p>
                 <p className="text-[10px] font-bold text-slate-500 leading-tight">This node contains sensitive financial data protected by HK-LAW.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
