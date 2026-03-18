import React from 'react';
import { FaCloudUploadAlt, FaHistory, FaCheckCircle, FaExclamationCircle, FaDownload, FaSyncAlt, FaDatabase } from 'react-icons/fa';

const DataBackup = () => {
  const history = [
    { id: 1, date: 'Mar 17, 2026 - 04:00 AM', size: '1.2 GB', status: 'Success', type: 'Daily Full' },
    { id: 2, date: 'Mar 16, 2026 - 04:00 AM', size: '1.2 GB', status: 'Success', type: 'Daily Full' },
    { id: 3, date: 'Mar 15, 2026 - 04:00 AM', size: '1.1 GB', status: 'Failed', type: 'Daily Full' },
    { id: 4, date: 'Mar 14, 2026 - 04:00 AM', size: '1.2 GB', status: 'Success', type: 'Daily Full' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Data Backup & Recovery</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Ensure clinical continuity with automated, encrypted cloud backups.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg  p-3">
          <FaSyncAlt size={12}/> Run Manual Backup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
           <div className="card-clinic p-10 bg-white border-none shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-clinicLight rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-6 mb-10 relative z-10">
                 <div className="w-16 h-16 rounded-3xl bg-clinicPrimary text-white flex items-center justify-center shadow-lg ">
                    <FaCloudUploadAlt size={28}/>
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase mb-1">Automated Cloud Sync</h3>
                    <div className="flex items-center gap-2 text-base font-black text-green-500 uppercase tracking-widest">
                       <FaCheckCircle size={10}/> NEXT BACKUP IN 12 HOURS
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8 relative z-10">
                 <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-base font-black text-gray-400 uppercase tracking-widest mb-2">Primary Storage</p>
                    <p className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">AWS S3 (Oregon)</p>
                 </div>
                 <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-base font-black text-gray-400 uppercase tracking-widest mb-2">Redundancy</p>
                    <p className="text-lg font-black text-gray-900 uppercase tracking-tight leading-none">Google Cloud</p>
                 </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center relative z-10">
                 <p className="text-base font-bold text-gray-400 uppercase tracking-widest italic">All backups are AES-256 encrypted at rest.</p>
                 <button className="text-base font-black text-clinicPrimary uppercase tracking-widest hover:underline">Change Provider</button>
              </div>
           </div>

           <div className="card-clinic p-0 bg-white border-none shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/20">
                 <h3 className="text-base font-black uppercase tracking-widest text-gray-900">Recent Backup History</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 text-base font-black text-gray-400 uppercase tracking-widest">
                       <tr>
                          <th className="px-8 py-4">Timestamp</th>
                          <th className="px-8 py-4 text-center">Type</th>
                          <th className="px-8 py-4 text-center">Size</th>
                          <th className="px-8 py-4 text-center">Status</th>
                          <th className="px-8 py-4 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {history.map(item => (
                         <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-5 text-base font-black text-gray-900 leading-none">{item.date}</td>
                            <td className="px-8 py-5 text-center text-base font-bold text-gray-500 uppercase">{item.type}</td>
                            <td className="px-8 py-5 text-center text-base font-bold text-gray-500">{item.size}</td>
                            <td className="px-8 py-5">
                               <div className={`flex items-center justify-center gap-2 text-base font-black uppercase tracking-widest ${item.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                                  {item.status === 'Success' ? <FaCheckCircle size={10}/> : <FaExclamationCircle size={10}/>}
                                  {item.status}
                               </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <button className="p-2 text-gray-400 hover:text-clinicPrimary transition-colors"><FaDownload size={14}/></button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="card-clinic p-8 bg-clinicDark text-white border-none shadow-2xl flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-clinicPrimary/10 border border-clinicPrimary/20 flex items-center justify-center mb-8">
                 <FaDatabase className="text-clinicPrimary" size={32}/>
              </div>
              <h3 className="text-base font-black uppercase tracking-widest mb-2">Vault Retention</h3>
              <p className="text-base text-slate-400 font-bold uppercase tracking-widest mb-10 leading-relaxed">Keep clinical history for compliance and auditing purposes.</p>
              
              <div className="w-full bg-white/5 p-6 rounded-3xl border border-white/10 text-left space-y-6">
                 <div className="space-y-2">
                    <p className="text-base font-black text-slate-500 uppercase tracking-widest">Active Retention</p>
                    <p className="text-lg font-black text-white leading-none tracking-tight">7 Years</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-base font-black text-slate-500 uppercase tracking-widest">Total Vaulted Data</p>
                    <p className="text-lg font-black text-white leading-none tracking-tight">412.5 GB</p>
                 </div>
                 <button className="w-full py-3 bg-clinicPrimary text-white rounded-2xl text-base font-black uppercase tracking-widest shadow-lg ">Expand Storage</button>
              </div>
           </div>

           <div className="card-clinic p-6 bg-clinicLight border-none shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-clinicPrimary shadow-sm border border-clinicPrimary/10">
                 <FaHistory size={20}/>
              </div>
              <div>
                 <h4 className="text-base font-black uppercase tracking-tight text-gray-900 leading-none">Last Restore</h4>
                 <p className="text-base font-bold text-gray-400 uppercase tracking-widest mt-1">Jan 12, 2026 (Manual)</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DataBackup;
