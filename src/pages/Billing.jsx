import React, { useState } from 'react';
import { FaPlus, FaSearch, FaDownload, FaFileInvoice, FaChevronRight, FaPrint, FaTrashAlt, FaWallet, FaChartLine, FaPercentage, FaReceipt, FaFileInvoiceDollar, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Billing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [invoicesList, setInvoicesList] = useState([
    { id: 'INV-2026-001', patient: 'James Wilson', date: '15 Mar 2026', amount: '£120.00', status: 'Paid', method: 'Premium Card' },
    { id: 'INV-2026-002', patient: 'Emily Brown', date: '14 Mar 2026', amount: '£85.00', status: 'Pending', method: 'N/A' },
    { id: 'INV-2026-003', patient: 'Robert Davis', date: '13 Mar 2026', amount: '£210.00', status: 'Overdue', method: 'Insurance Direct' },
    { id: 'INV-2026-004', patient: 'Sophie Taylor', date: '12 Mar 2026', amount: '£60.00', status: 'Paid', method: 'Cash Node' },
    { id: 'INV-2026-005', patient: 'Michael Smith', date: '11 Mar 2026', amount: '£150.00', status: 'Paid', method: 'Digital Sync' },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/10';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10';
      case 'Overdue': return 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-500/10';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const filteredInvoices = invoicesList.filter(inv => 
    inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-4 md:p-6 animate-fade-in custom-scrollbar font-sans">
      <Card hover={false} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 border border-slate-100 shadow-none bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase">Financial Ledger</h1>
          <p className="text-slate-500 font-bold mt-1.5 uppercase tracking-widest text-[10px] opacity-80">Acknowledge payments, generate professional invoices, and monitor clinic revenue streams.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 relative z-10 w-full lg:w-auto mt-4 lg:mt-0">
           <Button variant="secondary" size="md" className="flex-1 lg:flex-none rounded-lg h-10 px-4 sm:px-6 shadow-none text-[10px] font-black uppercase tracking-widest bg-white text-slate-700 hover:bg-slate-50" leftIcon={<FaDownload size={10} />} onClick={() => window.print()}>Export Statement</Button>
           <Button 
            variant="accent" 
            size="md"
            className="flex-1 lg:flex-none rounded-lg h-10 px-4 sm:px-6 shadow-sm text-[10px] font-black uppercase tracking-widest"
            onClick={() => navigate('/billing/new')}
            leftIcon={<FaFileInvoiceDollar size={10} />}
          >
            Issue New Invoice
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-clinicPrimary/5 rounded-full blur-2xl group-hover:bg-clinicPrimary/10 transition-colors duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card hover={false} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 relative overflow-hidden group shadow-sm">
          <div className="relative z-10">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FaWallet className="text-clinicPrimary" size={12}/> Outstanding Asset
             </p>
             <div className="flex items-baseline gap-3">
                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter">£4,250.60</h3>
                <span className="text-rose-400 text-[9px] font-bold uppercase tracking-widest bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">+12% Var</span>
             </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-clinicPrimary/10 rounded-full blur-2xl group-hover:bg-clinicPrimary/20 transition-colors duration-1000"></div>
        </Card>

        <Card hover={false} className="p-5 sm:p-6 border border-slate-100 shadow-none bg-white">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
             <FaChartLine className="text-emerald-500" size={12}/> Monthly Yield (MTD)
          </p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">£18,500.00</h3>
            <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">+8.2%</span>
          </div>
          <div className="mt-4 flex gap-1 h-1.5 bg-slate-50 rounded-full overflow-hidden">
             <div className="bg-emerald-500 w-3/4 rounded-full"></div>
             <div className="bg-emerald-200 w-1/4 rounded-full"></div>
          </div>
        </Card>

        <Card hover={false} className="p-5 sm:p-6 border border-slate-100 shadow-none bg-white group overflow-hidden relative">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
             <FaPercentage className="text-blue-500" size={12}/> Efficiency Rate
          </p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">94.8%</h3>
            <span className="text-blue-600 text-[9px] font-bold uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Optimum</span>
          </div>
          <div className="absolute top-5 right-5 opacity-10 pointer-events-none">
             <FaPercentage size={24} className="text-slate-400" />
          </div>
        </Card>
      </div>

      <Card hover={false} className="p-0 overflow-hidden border border-slate-100 shadow-none bg-white mt-4 sm:mt-6">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between bg-slate-50/50 gap-4">
          <div>
             <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <FaReceipt size={12} className="text-clinicPrimary" /> Financial Ledger
             </h3>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60">Synchronized Real-time Tracking</p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <div className="relative group/search w-full lg:min-w-[280px]">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within/search:text-clinicPrimary transition-colors">
                <FaSearch size={12}/>
              </span>
              <input
                type="text"
                placeholder="Filter transactions..."
                className="block w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-colors placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="icon" className="h-9 w-9 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-clinicPrimary transition-colors shrink-0" onClick={() => alert('Downloading Transaction Ledger...')}>
              <FaDownload size={12}/>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-bold text-[9px] uppercase tracking-widest border-b border-slate-100">
                <th className="px-4 py-3 whitespace-nowrap">Transaction ID</th>
                <th className="px-4 py-3 whitespace-nowrap">Account Subject</th>
                <th className="px-4 py-3 whitespace-nowrap">Temporal Node</th>
                <th className="px-4 py-3 whitespace-nowrap">Audit Amount</th>
                <th className="px-4 py-3 whitespace-nowrap">Status Node</th>
                <th className="px-4 py-3 text-right whitespace-nowrap">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-clinicPrimary">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-clinicPrimary flex items-center justify-center border border-slate-100 shrink-0 transition-colors group-hover:bg-clinicPrimary group-hover:text-white">
                        <FaFileInvoice size={14} />
                      </div>
                      <div>
                         <span className="text-[12px] font-black text-slate-900 tracking-tight transition-colors group-hover:text-clinicPrimary">{inv.id}</span>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-80 flex items-center gap-1.5">
                           {inv.method}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                     <p className="text-[13px] font-black text-slate-800 tracking-tight transition-colors group-hover:text-slate-900">{inv.patient}</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified Client</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                     <div className="flex items-center gap-2">
                        <FaRegClock size={10} className="text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-600 leading-none mt-[1px]">{inv.date}</span>
                     </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                     <span className="text-[14px] font-black text-slate-900 tracking-tighter">{inv.amount}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-transparent shadow-sm ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Button onClick={(e) => { e.stopPropagation(); window.print(); }} variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary transition-colors shrink-0">
                        <FaPrint size={10}/>
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); alert(`Previewing details for ${inv.id}`); }} variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-clinicPrimary transition-colors shrink-0">
                         <FaChevronRight size={10}/>
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); if(confirm('Are you sure you want to delete this invoice?')) { setInvoicesList(prev => prev.filter(i => i.id !== inv.id)); } }} variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white border border-slate-200 text-rose-300 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-colors shrink-0">
                        <FaTrashAlt size={10}/>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-80">Audit Archive: {filteredInvoices.length} Validated</p>
          <div className="flex gap-2">
            <Button variant="secondary" className="text-[9px] font-black h-8 px-4 rounded-lg bg-white border-slate-200 shadow-sm hover:text-clinicPrimary" onClick={() => alert('No previous records.')}>Previous</Button>
            <Button variant="secondary" className="text-[9px] font-black h-8 px-4 rounded-lg bg-white border-slate-200 shadow-sm hover:text-clinicPrimary" onClick={() => alert('No more records.')}>Next Node</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Billing;
