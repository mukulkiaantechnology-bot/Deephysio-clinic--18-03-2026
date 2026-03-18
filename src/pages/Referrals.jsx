import React from 'react';
import { FaUserMd, FaPlus, FaSearch, FaFileInvoice, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Referrals = () => {
  const referrals = [
    { id: 1, doctor: 'Dr. Gregory House', clinic: 'Princeton Plainsboro', date: 'Mar 10, 2026', type: 'Incoming', status: 'Active' },
    { id: 2, doctor: 'Dr. Stephen Strange', clinic: 'Sanctum Medical', date: 'Feb 25, 2026', type: 'Outgoing', status: 'Completed' },
    { id: 3, doctor: 'Dr. Meredith Grey', clinic: 'Grey Sloan Memorial', date: 'Feb 15, 2026', type: 'Incoming', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">Referral Tracking</h1>
          <p className="text-sm sm:text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage incoming and outgoing clinical referrals.</p>
        </div>
        <button className="w-full md:w-auto btn-primary flex justify-center items-center gap-2 text-sm sm:text-base uppercase tracking-widest shadow-lg py-3 sm:py-2">
          <FaPlus size={10}/> Add Referral
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card-clinic px-0 py-0 overflow-hidden border-none shadow-xl">
           <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/30">
              <div className="relative flex-1">
                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
                 <input type="text" placeholder="Search referrals..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-lg text-base font-semibold outline-none focus:border-clinicPrimary shadow-sm" />
              </div>
           </div>
           
           <div className="overflow-x-auto w-full relative custom-scrollbar pb-4">
              <div className="min-w-[800px]">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-base font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Practitioner / Clinic</th>
                       <th className="px-6 py-4">Date</th>
                       <th className="px-6 py-4">Type</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {referrals.map(ref => (
                       <tr key={ref.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-clinicLight text-clinicPrimary flex items-center justify-center group-hover:bg-clinicPrimary group-hover:text-white transition-all shadow-sm">
                                   <FaUserMd size={18}/>
                                </div>
                                <div>
                                   <p className="text-base font-black text-gray-900 leading-none">{ref.doctor}</p>
                                   <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">{ref.clinic}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-base font-bold text-gray-500">{ref.date}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded text-base font-black uppercase tracking-widest ${ref.type === 'Incoming' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{ref.type}</span>
                          </td>
                          <td className="px-6 py-4">
                             <div className={`flex items-center gap-1.5 text-base font-black uppercase tracking-widest ${ref.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {ref.status === 'Completed' ? <FaCheckCircle size={10}/> : <FaExclamationCircle size={10}/>}
                                {ref.status}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-base font-black text-clinicPrimary uppercase tracking-widest hover:underline">View File</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="card-clinic p-6 bg-clinicDark text-white border-none shadow-2xl relative overflow-hidden text-center">
              <div className="text-clinicPrimary mb-4 flex justify-center">
                 <FaFileInvoice size={48} className="opacity-20"/>
              </div>
              <h3 className="text-base font-black uppercase tracking-widest mb-2 relative z-10">Referral Analytics</h3>
              <p className="text-base text-slate-400 font-bold uppercase tracking-widest mb-6 relative z-10">This Month</p>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-xl font-black text-white leading-none mb-1">14</p>
                    <p className="text-base font-black text-clinicPrimary uppercase">Incoming</p>
                 </div>
                 <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-xl font-black text-white leading-none mb-1">08</p>
                    <p className="text-base font-black text-clinicSecondary uppercase">Outgoing</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
