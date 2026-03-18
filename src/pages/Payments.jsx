import React, { useState } from 'react';
import { FaFileInvoiceDollar, FaCheckCircle, FaClock, FaExclamationCircle, FaSearch, FaFilter, FaDownload, FaPlus, FaArrowRight } from 'react-icons/fa';
import Button, { cn } from '../components/ui/Button';
import Card from '../components/ui/Card';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [transactions, setTransactions] = useState([
    { id: 'INV-001', patient: 'Alice Johnson', date: 'Mar 16, 2026', amount: '$85.00', status: 'Paid', method: 'Visa •• 4242' },
    { id: 'INV-002', patient: 'Bob Smith', date: 'Mar 15, 2026', amount: '$120.00', status: 'Pending', method: 'Direct Deposit' },
    { id: 'INV-003', patient: 'Charlie Brown', date: 'Mar 14, 2026', amount: '$65.00', status: 'Paid', method: 'Cash' },
    { id: 'INV-004', patient: 'Diana Prince', date: 'Mar 14, 2026', amount: '$95.00', status: 'Failed', method: 'Mastercard •• 8888' },
  ]);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportXL = () => {
    const csvRows = [
      ['Invoice ID', 'Patient', 'Date', 'Amount', 'Method', 'Status'],
      ...filteredTransactions.map(t => [t.id, t.patient, t.date, t.amount, t.method, t.status])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `payment_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm';
      case 'Failed': return 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Payments & Billing</h1>
          <p className="text-slate-500 font-medium mt-1">Track clinic revenue, insurance reimbursements, and patient invoicing history.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleExportXL}
            className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-blue-600 hover:bg-blue-50 transition-all shadow-premium active:scale-95 uppercase tracking-widest"
          >
            <FaDownload size={14}/> Export CSV
          </button>
          <button 
            onClick={() => alert('Secure Payment Interface: Initializing PCI-DSS protocol...')}
            className="flex items-center gap-3 px-8 py-4 bg-clinicPrimary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-google hover:-translate-y-1 transition-all active:scale-95 shadow-lg"
          >
            <FaPlus size={14}/> Record Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-gradient-to-br from-clinicPrimary to-[#2EA7B8] text-white rounded-[32px] border-none shadow-premium relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-4">Total Outstanding</p>
            <h2 className="text-4xl font-bold leading-none tracking-tighter">$4,240.50</h2>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase bg-white/15 w-fit px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]"></span>
              12 Overdue Items
            </div>
          </div>
          <FaFileInvoiceDollar className="absolute -bottom-6 -right-6 text-white/10 text-8xl group-hover:scale-110 transition-transform duration-700" />
        </div>
        
        <div className="p-8 bg-white rounded-[32px] shadow-premium border border-slate-50 hover:-translate-y-1 transition-all">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Collected (MTD)</p>
          <h2 className="text-3xl font-bold text-slate-900 leading-none tracking-tighter">$18,850.00</h2>
          <p className="mt-6 text-[11px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            <span className="p-1 bg-emerald-50 rounded-lg">↑ 12.4%</span> vs last month
          </p>
        </div>

        <div className="p-8 bg-white rounded-[32px] shadow-premium border border-slate-50 relative overflow-hidden">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Payment Success</p>
          <h2 className="text-3xl font-bold text-slate-900 leading-none tracking-tighter">98.2%</h2>
          <div className="mt-6 w-full bg-slate-50 h-2.5 rounded-full overflow-hidden border border-slate-100 shadow-inner">
            <div className="bg-clinicPrimary h-full rounded-full shadow-[0_0_12px_rgba(46,167,184,0.4)]" style={{ width: '98%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-50">
        <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6 bg-slate-50/20">
          <div className="relative flex-1 min-w-[300px] group bg-white rounded-2xl border border-slate-100 shadow-inner-soft">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
            <input 
              type="text" 
              placeholder="Filter by patient name or protocol ID..." 
              className="w-full pl-14 pr-6 py-4 bg-transparent text-[13px] font-bold text-slate-600 outline-none placeholder:text-slate-300 transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-500 shadow-sm uppercase tracking-widest outline-none focus:ring-4 focus:ring-clinicPrimary/5 hover:text-clinicPrimary cursor-pointer transition-all active:scale-95"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending Audit</option>
            <option value="Failed">Failed/Disputed</option>
          </select>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[1000px]">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6 w-[15%]">Invoice ID</th>
                <th className="px-8 py-6 w-[25%]">Patient Subject</th>
                <th className="px-8 py-6 w-[15%] text-center">Protocol Date</th>
                <th className="px-8 py-6 w-[15%] text-center">Valuation</th>
                <th className="px-8 py-6 w-[20%] text-center">Status</th>
                <th className="px-8 py-6 w-[10%] text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.length > 0 ? filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => alert(`Reviewing Invoice: ${t.id}`)}>
                  <td className="px-8 py-6 font-black text-clinicPrimary group-hover:scale-105 origin-left transition-transform text-sm">{t.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <p className="text-[15px] font-bold text-slate-900 leading-none group-hover:text-clinicPrimary transition-colors">{t.patient}</p>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{t.method}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-[13px] font-bold text-slate-500">{t.date}</td>
                  <td className="px-8 py-6 text-center text-[15px] font-black text-slate-900 group-hover:scale-110 transition-transform">{t.amount}</td>
                  <td className="px-8 py-6">
                    <div className={`mx-auto w-fit px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(t.status)}`}>
                      {t.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 group-hover:text-clinicPrimary group-hover:border-clinicPrimary hover:shadow-google transition-all flex items-center justify-center ml-auto">
                       <FaArrowRight size={12}/>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">Zero financial entries detected for current filter</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
