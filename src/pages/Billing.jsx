import React, { useState } from 'react';
import { FaPlus, FaSearch, FaDownload, FaFileInvoice, FaChevronRight, FaPrint, FaTrashAlt, FaWallet, FaChartLine, FaPercentage, FaReceipt, FaFileInvoiceDollar, FaRegClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const Billing = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [invoicesList, setInvoicesList] = useState([
    { id: 'INV-2026-001', patient: 'James Wilson', date: '15 Mar 2026', amount: '£120.00', status: 'Paid', method: 'Premium Card' },
    { id: 'INV-2026-002', patient: 'Emily Brown', date: '14 Mar 2026', amount: '£85.00', status: 'Pending', method: 'N/A' },
    { id: 'INV-2026-003', patient: 'Robert Davis', date: '13 Mar 2026', amount: '£210.00', status: 'Overdue', method: 'Insurance Direct' },
    { id: 'INV-2026-004', patient: 'Sophie Taylor', date: '12 Mar 2026', amount: '£60.00', status: 'Paid', method: 'Cash Node' },
    { id: 'INV-2026-005', patient: 'Michael Smith', date: '11 Mar 2026', amount: '£150.00', status: 'Paid', method: 'Digital Sync' },
  ]);

  const [newInvoice, setNewInvoice] = useState({
    patient: 'James Wilson (PID-102)', amount: '', date: '', description: ''
  });

  const handleAddInvoice = () => {
    if (!newInvoice.amount) return;
    const newId = `INV-2026-00${invoicesList.length + 1}`;
    const formattedDate = newInvoice.date 
      ? new Date(newInvoice.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '18 Mar 2026';
    
    setInvoicesList([...invoicesList, { 
      id: newId, 
      patient: newInvoice.patient.split(' (')[0], 
      date: formattedDate,
      amount: `£${parseFloat(newInvoice.amount).toFixed(2)}`, 
      status: 'Pending', 
      method: 'N/A' 
    }]);
    setIsInvoiceModalOpen(false);
    setNewInvoice({ patient: 'James Wilson (PID-102)', amount: '', date: '', description: '' });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/10';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10';
      case 'Overdue': return 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-500/10';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Ledger</h1>
          <p className="text-slate-500 font-medium mt-1">Acknowledge payments, generate professional invoices, and monitor clinic revenue streams.</p>
        </div>
        <div className="flex gap-4 relative z-10 w-full lg:w-auto">
           <Button variant="secondary" size="lg" className="flex-1 lg:flex-none rounded-2xl h-14 px-8 border-none shadow-premium hover:shadow-glass hover:-translate-y-1" leftIcon={<FaDownload />}>Export Statement</Button>
           <Button 
            variant="accent" 
            size="lg"
            className="flex-1 lg:flex-none rounded-2xl h-14 px-8 shadow-lg "
            onClick={() => setIsInvoiceModalOpen(true)}
            leftIcon={<FaFileInvoiceDollar className="animate-pulse" />}
          >
            Issue New Invoice
          </Button>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <Modal 
        isOpen={isInvoiceModalOpen} 
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Revenue Documentation"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="secondary" onClick={() => setIsInvoiceModalOpen(false)}>Discard Draft</Button>
            <Button variant="accent" onClick={handleAddInvoice} leftIcon={<FaReceipt />}>Finalize Invoice</Button>
          </div>
        }
      >
        <div className="space-y-8 p-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Account Subject</label>
            <select 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
              value={newInvoice.patient}
              onChange={(e) => setNewInvoice({...newInvoice, patient: e.target.value})}
            >
              <option>James Wilson (PID-102)</option>
              <option>Emily Brown (PID-205)</option>
              <option>Corporate Client: TechHub UK</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Asset Valuation (£)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">£</span>
                <input 
                  type="number" 
                  className="w-full pl-10 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" 
                  placeholder="0.00" 
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Temporal Deadline</label>
              <input 
                type="date" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all" 
                value={newInvoice.date}
                onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] ml-1">Service Breakdown</label>
            <textarea 
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl text-[13px] font-medium text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all h-28 custom-scrollbar placeholder:text-slate-300" 
              placeholder="Describe the therapeutic services..."
              value={newInvoice.description}
              onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
            ></textarea>
          </div>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Card className="bg-slate-900 border-none p-10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10">
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[.2em] mb-4 flex items-center gap-3">
                <FaWallet className="text-clinicPrimary" /> Outstanding Asset
             </p>
             <div className="flex items-baseline gap-4">
                <h3 className="text-4xl font-bold text-white tracking-tighter">£4,250.60</h3>
                <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest bg-rose-400/10 px-3 py-1 rounded-lg border border-rose-400/20 shadow-lg  transition-transform group-hover:scale-110">+12% Var</span>
             </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clinicPrimary/10 rounded-full blur-[50px] group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
        </Card>

        <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-glass transition-all">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[.2em] mb-4 flex items-center gap-3">
             <FaChartLine className="text-emerald-500" /> Monthly Yield (MTD)
          </p>
          <div className="flex items-baseline gap-4">
            <h3 className="text-4xl font-bold text-slate-900 tracking-tighter">£18,500.00</h3>
            <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 transition-transform group-hover:scale-110">+8.2%</span>
          </div>
          <div className="mt-6 flex gap-1 h-1 bg-slate-50 rounded-full overflow-hidden">
             <div className="bg-emerald-500 w-3/4 rounded-full"></div>
             <div className="bg-emerald-200 w-1/4 rounded-full"></div>
          </div>
        </Card>

        <Card className="p-10 border-none shadow-premium bg-white group hover:shadow-glass transition-all">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[.2em] mb-4 flex items-center gap-3">
             <FaPercentage className="text-blue-500" /> Efficiency Rate
          </p>
          <div className="flex items-baseline gap-4">
            <h3 className="text-4xl font-bold text-slate-900 tracking-tighter">94.8%</h3>
            <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 transition-transform group-hover:scale-110">Optimum</span>
          </div>
          <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
             <FaPercentage size={40} className="text-slate-400" />
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-premium bg-white">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between bg-white relative overflow-hidden group">
          <div>
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                <FaReceipt size={14} className="text-clinicPrimary" /> Financial Ledger
             </h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-60">Synchronized Real-time Tracking</p>
          </div>
          <div className="flex items-center gap-4 mt-6 lg:mt-0 relative z-10">
            <div className="relative group/search min-w-[300px]">
              <span className="absolute inset-y-0 left-5 flex items-center text-slate-300 group-focus-within/search:text-clinicPrimary transition-colors">
                <FaSearch size={14}/>
              </span>
              <input
                type="text"
                placeholder="Filter transactions..."
                className="block w-full pl-14 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-clinicPrimary/10 transition-all shadow-inner-soft placeholder:text-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="icon" className="h-12 w-12 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass">
              <FaDownload size={14}/>
            </Button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] pointer-events-none"></div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-10 py-6">Transaction ID</th>
                <th className="px-10 py-6">Account Subject</th>
                <th className="px-10 py-6">Temporal Node</th>
                <th className="px-10 py-6">Audit Amount</th>
                <th className="px-10 py-6">Satus Node</th>
                <th className="px-10 py-6 text-right">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoicesList.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-pointer border-l-4 border-transparent hover:border-clinicPrimary">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-premium text-clinicPrimary flex items-center justify-center border border-slate-50 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <FaFileInvoice size={20} />
                      </div>
                      <div>
                         <span className="text-[14px] font-bold text-slate-900 tracking-tight group-hover:text-clinicPrimary transition-colors">{inv.id}</span>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-60 flex items-center gap-2">
                           {inv.method}
                         </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                     <p className="text-[15px] font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">{inv.patient}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Client</p>
                  </td>
                  <td className="px-10 py-8">
                     <div className="flex items-center gap-3">
                        <FaRegClock size={12} className="text-slate-300" />
                        <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">{inv.date}</span>
                     </div>
                  </td>
                  <td className="px-10 py-8">
                     <span className="text-[18px] font-bold text-slate-900 tracking-tighter">{inv.amount}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border transition-all duration-300 shadow-sm ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Button onClick={(e) => { e.stopPropagation(); window.print(); }} variant="secondary" size="icon" className="h-11 w-11 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass transform hover:scale-110">
                        <FaPrint size={14}/>
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); setIsInvoiceModalOpen(true); }} variant="secondary" size="icon" className="h-11 w-11 rounded-xl bg-white border border-slate-50 shadow-premium hover:shadow-glass transform hover:scale-110">
                         <FaChevronRight size={14}/>
                      </Button>
                      <Button onClick={(e) => { e.stopPropagation(); if(confirm('Are you sure?')) {} }} variant="secondary" size="icon" className="h-11 w-11 rounded-xl bg-white border border-rose-50 text-rose-300 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all transform hover:scale-110">
                        <FaTrashAlt size={14}/>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-10 border-t border-slate-50 flex items-center justify-between bg-white group">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-60">Audit Archive: 840 Ledger Nodes Validated</p>
          <div className="flex gap-4">
            <Button variant="secondary" className="text-[10px] font-bold h-11 px-8 rounded-xl border-none shadow-premium hover:shadow-soft">Previous Audit</Button>
            <Button variant="accent" className="text-[10px] font-bold h-11 px-8 rounded-xl shadow-lg ">Next Audit Sequence</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Billing;
