import React from 'react';
import { FaShieldAlt, FaIdCard, FaBuilding, FaCheckCircle, FaPlus, FaSearch } from 'react-icons/fa';

const Insurance = () => {
  const providers = [
    { id: 1, name: 'BUPA Global', policy: 'BP-100293-XP', type: 'Private', status: 'Verified' },
    { id: 2, name: 'AXA PPP Healthcare', policy: 'AX-9920-L', type: 'Company', status: 'Active' },
    { id: 3, name: 'Vitality Health', policy: 'VH-4482-9', type: 'Individual', status: 'Pending' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Insurance & Billing</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage patient insurance policies and provider links.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> Link Provider
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {providers.map(p => (
                <div key={p.id} className="card-clinic group hover:border-clinicPrimary transition-all cursor-pointer relative overflow-hidden border-2 border-transparent shadow-xl p-6">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-clinicPrimary/5 rounded-full -mr-8 -mt-8"></div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-clinicLight text-clinicPrimary flex items-center justify-center shadow-inner group-hover:bg-clinicPrimary group-hover:text-white transition-colors">
                         <FaBuilding size={20}/>
                      </div>
                      <div>
                         <h4 className="text-base font-black text-gray-900 leading-none">{p.name}</h4>
                         <p className="text-base font-black text-clinicPrimary mt-1.5 uppercase tracking-widest">{p.type}</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-base font-black uppercase tracking-widest text-gray-400">
                         <span>Policy Number</span>
                         <span className="text-gray-900">{p.policy}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <div className={`px-3 py-1 rounded-full text-base font-black uppercase tracking-widest ${p.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {p.status}
                         </div>
                         <button className="text-sm font-black text-gray-400 hover:text-clinicPrimary transition-colors uppercase tracking-widest">Edit Details</button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="card-clinic bg-gray-50 border-dashed border-2 border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:border-clinicPrimary/30 transition-all">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                 <FaPlus className="text-clinicPrimary" size={24}/>
              </div>
              <h3 className="text-base font-black uppercase tracking-widest text-gray-900 mb-2">Add New Policy</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Instantly verify new insurance coverage for this patient.</p>
           </div>
        </div>

        <div className="space-y-6">
           <div className="card-clinic p-6 bg-white shadow-2xl border-none">
              <h3 className="text-base font-black uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                 <FaShieldAlt className="text-clinicPrimary" size={14}/>
                 Claim Summary
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Pending Claims</span>
                    <span className="text-base font-black text-gray-900">14</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Approved</span>
                    <span className="text-base font-black text-green-600">86%</span>
                 </div>
                 <div className="pt-4 border-t border-gray-50">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total Value</span>
                       <span className="text-base font-black text-clinicSecondary">$12,450</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                       <div className="bg-clinicSecondary h-full" style={{ width: '65%' }}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="card-clinic p-6 border-none shadow-xl bg-clinicLight">
              <p className="text-base font-black text-clinicPrimary uppercase tracking-widest mb-4">Quick Fact</p>
              <p className="text-base font-bold text-gray-600 leading-relaxed uppercase tracking-tighter">92% of BUPA claims are processed within 48 hours for ACL physiotherapy treatments.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
