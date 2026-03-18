import React from 'react';
import { FaBell, FaSearch, FaFilter, FaPlus, FaCheckCircle, FaExclamationTriangle, FaClock, FaEnvelope, FaSms } from 'react-icons/fa';

const PaymentReminders = () => {
  const reminders = [
    { id: 1, patient: 'Alice Johnson', amount: '$120.00', age: '32 Days', method: 'Email', status: 'Third Warning' },
    { id: 2, patient: 'Bob Smith', amount: '$45.00', age: '14 Days', method: 'SMS', status: 'First Warning' },
    { id: 3, patient: 'Charlie Brown', amount: '$850.00', age: '45 Days', method: 'Dual', status: 'Final Notice' },
    { id: 4, patient: 'Diana Prince', amount: '$200.00', age: '7 Days', method: 'Email', status: 'Courteous Prompt' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Automated Payment Reminders</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">Automate the collection of overdue invoices with professional scheduling.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> Add Reminder Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-clinic p-6 flex flex-col justify-center border-none shadow-xl bg-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-clinicLight rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
           <p className="text-sm font-black text-gray-400 uppercase tracking-widest relative z-10">Total Overdue</p>
           <h3 className="text-2xl font-black text-gray-900 mt-2 relative z-10">$12,420</h3>
           <p className="text-base font-black text-red-500 mt-1 relative z-10 flex items-center gap-1">
              <FaExclamationTriangle size={8}/> 14 ACTIVE RECOVERY FILES
           </p>
        </div>
        <div className="card-clinic p-6 flex flex-col justify-center border-none shadow-xl bg-white">
           <p className="text-sm font-black text-gray-400 uppercase tracking-widest leading-tight">Collected (MTD)</p>
           <h3 className="text-2xl font-black text-gray-900 mt-2">$3,240</h3>
           <p className="text-base font-black text-green-500 mt-1">SUCCESSFUL AUTOMATIONS</p>
        </div>
        <div className="card-clinic p-6 flex flex-col justify-center border-none shadow-xl bg-white">
           <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Automation Rate</p>
           <h3 className="text-2xl font-black text-gray-900 mt-2">85%</h3>
           <div className="w-full h-1.5 bg-gray-50 rounded-full mt-3 overflow-hidden shadow-inner">
              <div className="bg-clinicPrimary h-full" style={{ width: '85%' }}></div>
           </div>
        </div>
        <div className="card-clinic p-6 flex flex-col justify-center border-none shadow-xl bg-clinicDark text-white">
           <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-tight">Next Batch</p>
           <h3 className="text-2xl font-black text-white mt-2">14:00 PM</h3>
           <p className="text-base font-black text-clinicPrimary mt-1 uppercase">84 RECIPIENTS QUEUED</p>
        </div>
      </div>

      <div className="card-clinic px-0 py-0 overflow-hidden border-none shadow-2xl bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/20">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14}/>
            <input type="text" placeholder="Search by patient name or invoice ID..." className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-base font-black outline-none focus:border-clinicPrimary" />
          </div>
          <button className="p-3 border border-gray-100 rounded-xl text-gray-400 hover:text-clinicPrimary transition-colors bg-white shadow-sm"><FaFilter size={14}/></button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-base font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Patient Name</th>
                <th className="px-8 py-5 text-center">Overdue Age</th>
                <th className="px-8 py-5 text-center">Outstanding Amount</th>
                <th className="px-8 py-5">Notification Stage</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reminders.map(rem => (
                <tr key={rem.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center font-black text-base border border-gray-100 shadow-inner group-hover:bg-clinicPrimary group-hover:text-white group-hover:border-clinicPrimary transition-all duration-300">
                          {rem.patient[0]}
                       </div>
                       <div className="flex flex-col">
                          <p className="text-base font-black text-gray-900 leading-none">{rem.patient}</p>
                          <div className="flex items-center gap-2 mt-1.5 opacity-60">
                             {rem.method === 'SMS' ? <FaSms size={10}/> : rem.method === 'Email' ? <FaEnvelope size={10}/> : <div className="flex gap-1"><FaSms size={8}/><FaEnvelope size={8}/></div>}
                             <span className="text-base font-black uppercase tracking-widest">{rem.method} Primary</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-base font-black text-red-500 uppercase tracking-tighter bg-red-50 px-3 py-1 rounded-full">{rem.age}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className="text-base font-black text-gray-900 tracking-tight">{rem.amount}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                       <p className={`text-base font-black uppercase tracking-widest ${rem.status === 'Final Notice' ? 'text-red-600 animate-pulse' : 'text-clinicPrimary'}`}>{rem.status}</p>
                       <div className="w-full bg-gray-50 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${rem.status === 'Final Notice' ? 'bg-red-500' : 'bg-clinicPrimary'}`} style={{ width: rem.status === 'Final Notice' ? '100%' : '40%' }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-base font-black text-clinicPrimary hover:underline uppercase tracking-widest">Pause Rules</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentReminders;
