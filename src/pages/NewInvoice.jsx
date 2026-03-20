import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaReceipt, FaFileInvoiceDollar, FaPlus, FaTrash, FaCalculator } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const NewInvoice = () => {
  const navigate = useNavigate();
  const [newInvoice, setNewInvoice] = useState({
    patient: 'James Wilson (PID-102)', 
    date: new Date().toISOString().split('T')[0],
    terms: 'Net 30',
    notes: ''
  });

  const [lineItems, setLineItems] = useState([
    { id: 1, service: 'General Consultation', rate: 85, qty: 1 }
  ]);

  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    const subtotal = lineItems.reduce((acc, item) => acc + (item.rate * item.qty), 0);
    const tax = subtotal * 0.20; // 20% Tax
    setTotals({
      subtotal,
      tax,
      total: subtotal + tax
    });
  }, [lineItems]);

  const addItem = () => {
    setLineItems([...lineItems, { id: Date.now(), service: '', rate: 0, qty: 1 }]);
  };

  const updateItem = (id, field, value) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const handleCreate = () => {
     // Simulate saving to localStorage
     const savedPayments = JSON.parse(localStorage.getItem('deephysio_payments') || '[]');
     const newRecord = {
       id: `INV-${Date.now().toString().slice(-4)}`,
       patient: newInvoice.patient.split(' (')[0],
       date: newInvoice.date,
       amount: `£${totals.total.toFixed(2)}`,
       status: 'Pending',
       method: 'N/A',
       description: lineItems.map(li => li.service).join(', '),
       items: lineItems,
       tax: totals.tax,
       subtotal: totals.subtotal
     };
     localStorage.setItem('deephysio_payments', JSON.stringify([newRecord, ...savedPayments]));
     
     alert('Invoice Created Successfully!');
     navigate('/billing');
  };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/billing')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Issue Invoice</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Revenue Documentation Protocol</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
                <div className="p-10 space-y-12">
                    {/* Invoice Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Subject</label>
                            <select 
                                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={newInvoice.patient}
                                onChange={(e) => setNewInvoice({...newInvoice, patient: e.target.value})}
                            >
                                <option>James Wilson (PID-102)</option>
                                <option>Emily Brown (PID-205)</option>
                                <option>Corporate Client: TechHub UK</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Date</label>
                            <input 
                                type="date" 
                                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all shadow-inner-soft" 
                                value={newInvoice.date}
                                onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Strategy</label>
                            <select 
                                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[12px] font-black text-slate-900 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={newInvoice.terms}
                                onChange={(e) => setNewInvoice({...newInvoice, terms: e.target.value})}
                            >
                                <option>Due on Receipt</option>
                                <option>Net 15 Days</option>
                                <option>Net 30 Days</option>
                                <option>Advanced Retainer</option>
                            </select>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-8 pt-8 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Line Items Partition</h3>
                            </div>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={addItem}
                                className="h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-50 border-slate-100 hover:bg-clinicPrimary hover:text-white hover:border-clinicPrimary transition-all shadow-sm"
                            >
                                <FaPlus className="mr-2"/> Append Node
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {lineItems.map((item, index) => (
                                <div key={item.id} className="group p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-google transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden">
                                    <div className="flex-1 min-w-0">
                                        <input 
                                            type="text" 
                                            placeholder="Service Description (e.g., Physiotherapy)"
                                            className="w-full bg-transparent border-none text-[16px] font-black text-slate-900 outline-none placeholder:text-slate-200"
                                            value={item.service}
                                            onChange={(e) => updateItem(item.id, 'service', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-400">£</span>
                                            <input 
                                                type="number" 
                                                className="w-20 bg-transparent border-none text-[16px] font-black text-slate-900 outline-none focus:text-clinicPrimary"
                                                value={item.rate}
                                                onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                                            <span className="text-[10px] font-black text-slate-400">×</span>
                                            <input 
                                                type="number" 
                                                className="w-12 bg-transparent border-none text-[16px] font-black text-slate-900 outline-none focus:text-clinicPrimary"
                                                value={item.qty}
                                                onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-200 hover:text-rose-500 hover:border-rose-100 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm active:scale-90"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-50">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Global Notes</h3>
                            </div>
                            <textarea 
                                placeholder="Include internal references or clinical notes..."
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-[13px] font-bold text-slate-600 outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all min-h-[120px] resize-none shadow-inner-soft"
                                value={newInvoice.notes}
                                onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                            ></textarea>
                        </div>

                        <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-6 shadow-premium relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <FaFileInvoiceDollar size={80}/>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center opacity-60">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Subtotal</span>
                                    <span className="text-xl font-black tracking-tighter">£{totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center opacity-60">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tax Provision (20%)</span>
                                    <span className="text-xl font-black tracking-tighter">£{totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-clinicPrimary">Final Valuation</span>
                                    <span className="text-4xl font-black tracking-tighter drop-shadow-lg">£{totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol state: CALCULATED</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white text-slate-400" 
                            onClick={() => navigate('/billing')}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleCreate}
                        >
                            Commit Invoice
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default NewInvoice;
