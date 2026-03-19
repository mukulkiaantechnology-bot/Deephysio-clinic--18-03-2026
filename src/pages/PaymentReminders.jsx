import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaPlus, FaExclamationTriangle, FaEnvelope, FaSms } from 'react-icons/fa';

const PaymentReminders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const INITIAL_REMINDERS = [
    { id: 1, patient: 'Alice Johnson', amount: '$120.00', age: '32 Days', method: 'Email', status: 'Third Warning', isPaused: false },
    { id: 2, patient: 'Bob Smith', amount: '$45.00', age: '14 Days', method: 'SMS', status: 'First Warning', isPaused: false },
    { id: 3, patient: 'Charlie Brown', amount: '$850.00', age: '45 Days', method: 'Dual', status: 'Final Notice', isPaused: false },
    { id: 4, patient: 'Diana Prince', amount: '$200.00', age: '7 Days', method: 'Email', status: 'Courteous Prompt', isPaused: false },
  ];

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('deephysio_reminders') || '[]');
    if (saved.length > 0) {
      setReminders(saved);
    } else {
      setReminders(INITIAL_REMINDERS);
      localStorage.setItem('deephysio_reminders', JSON.stringify(INITIAL_REMINDERS));
    }
  }, []);

  const handleTogglePause = (id) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, isPaused: !r.isPaused } : r
    );
    setReminders(updated);
    localStorage.setItem('deephysio_reminders', JSON.stringify(updated));
  };

  const filteredReminders = reminders.filter(r => 
    r.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase tracking-tighter">Automated Payment Reminders</h1>
          <p className="text-slate-500 font-medium mt-1">Automate the collection of overdue invoices with professional scheduling.</p>
        </div>
        <button 
          onClick={() => navigate('/billing/reminders/add')}
          className="flex items-center gap-3 px-8 py-4 bg-clinicDark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-google hover:-translate-y-1 transition-all active:scale-95 shadow-lg"
        >
          <FaPlus size={12}/> Add Reminder Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="card-clinic p-8 flex flex-col justify-center border-none shadow-premium bg-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-clinicLight rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">Total Overdue</p>
           <h3 className="text-3xl font-black text-slate-900 mt-4 relative z-10">$12,420</h3>
           <p className="text-[10px] font-black text-red-500 mt-4 relative z-10 flex items-center gap-2 bg-red-50 w-fit px-3 py-1 rounded-lg">
              <FaExclamationTriangle size={10}/> 14 ACTIVE RECOVERY FILES
           </p>
        </div>
        <div className="card-clinic p-8 flex flex-col justify-center border-none shadow-premium bg-white">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Collected (MTD)</p>
           <h3 className="text-3xl font-black text-slate-900 mt-4">$3,240</h3>
           <p className="text-[10px] font-black text-emerald-500 mt-4 uppercase tracking-widest">Successful Automations</p>
        </div>
        <div className="card-clinic p-8 flex flex-col justify-center border-none shadow-premium bg-white">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Automation Rate</p>
           <h3 className="text-3xl font-black text-slate-900 mt-4">85%</h3>
           <div className="w-full h-2 bg-slate-50 rounded-full mt-6 overflow-hidden shadow-inner border border-slate-100">
              <div className="bg-clinicPrimary h-full rounded-full shadow-[0_0_10px_rgba(46,167,184,0.4)]" style={{ width: '85%' }}></div>
           </div>
        </div>
        <div className="card-clinic p-8 flex flex-col justify-center border-none shadow-premium bg-clinicDark text-white">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">Next Batch</p>
           <h3 className="text-3xl font-black text-white mt-4 tracking-tighter">14:00 PM</h3>
           <p className="text-[10px] font-black text-clinicPrimary mt-4 uppercase tracking-widest">84 Recipients Queued</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-premium overflow-hidden border border-slate-50">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between gap-6 bg-slate-50/20">
          <div className="relative flex-1 group bg-white rounded-2xl border border-slate-100 shadow-inner-soft">
            <input 
              type="text" 
              placeholder="Search by patient name or invoice ID..." 
              className="w-full px-8 py-4 bg-transparent text-[13px] font-bold text-slate-600 outline-none placeholder:text-slate-300 transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 border border-slate-100 rounded-xl text-slate-400 hover:text-clinicPrimary transition-all bg-white shadow-sm active:scale-90"><FaFilter size={14}/></button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed min-w-[1000px]">
            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6 w-[25%]">Patient Name</th>
                <th className="px-8 py-6 w-[15%] text-center">Overdue Age</th>
                <th className="px-8 py-6 w-[20%] text-center">Outstanding Amount</th>
                <th className="px-8 py-6 w-[25%]">Notification Stage</th>
                <th className="px-8 py-6 w-[15%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredReminders.map(rem => (
                <tr key={rem.id} className={`hover:bg-slate-50/50 transition-all group ${rem.isPaused ? 'opacity-50 grayscale' : ''}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-lg border transition-all duration-500 shadow-sm ${rem.isPaused ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-clinicPrimary group-hover:text-white group-hover:border-clinicPrimary group-hover:shadow-google group-hover:scale-110 group-hover:rotate-6'}`}>
                          {rem.patient[0]}
                       </div>
                       <div className="flex flex-col">
                          <p className="text-[15px] font-bold text-slate-900 leading-none group-hover:text-clinicPrimary transition-colors tracking-tight">{rem.patient}</p>
                          <div className="flex items-center gap-2 mt-3 opacity-60">
                             {rem.method === 'SMS' ? <FaSms size={11}/> : rem.method === 'Email' ? <FaEnvelope size={11}/> : <div className="flex gap-1"><FaSms size={9}/><FaEnvelope size={9}/></div>}
                             <span className="text-[9px] font-black uppercase tracking-[0.2em]">{rem.method} Primary</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-xl border border-rose-100">{rem.age}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className="text-xl font-black text-slate-900 tracking-tighter">{rem.amount}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-3">
                       <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${rem.status === 'Final Notice' ? 'text-rose-600 animate-pulse' : 'text-clinicPrimary'}`}>{rem.status}</p>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full opacity-80 ${rem.status === 'Final Notice' ? 'bg-rose-500' : 'bg-clinicPrimary'}`} style={{ width: rem.status === 'Final Notice' ? '100%' : '40%' }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleTogglePause(rem.id)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-all px-4 py-2 rounded-lg border active:scale-95 ${rem.isPaused ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'}`}
                    >
                      {rem.isPaused ? 'Resume Rules' : 'Pause Rules'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredReminders.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No active recovery vectors found for this query</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReminders;
