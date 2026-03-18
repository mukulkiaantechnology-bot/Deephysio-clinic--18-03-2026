import React from 'react';
import { FaTag, FaPlus, FaSearch, FaFilter, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PricingServices = () => {
  const services = [
    { id: 1, name: 'Initial Consultation', category: 'Physiotherapy', price: '$85.00', duration: '45m', status: 'Active' },
    { id: 2, name: 'Follow-up Treatment', category: 'Physiotherapy', price: '$65.00', duration: '30m', status: 'Active' },
    { id: 3, name: 'Sports Massage', category: 'Massage', price: '$90.00', duration: '60m', status: 'Active' },
    { id: 4, name: 'Diagnostic Assessment', category: 'Specialist', price: '$120.00', duration: '60m', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Services & Pricing</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Configure your clinic's service catalog and billing rates.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card-clinic px-0 py-0 overflow-hidden border-none shadow-xl bg-white">
           <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/20">
              <div className="relative flex-1">
                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
                 <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-lg text-base font-semibold outline-none focus:border-clinicPrimary shadow-sm" />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-base font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Service Name</th>
                       <th className="px-6 py-4">Category</th>
                       <th className="px-6 py-4">Rate</th>
                       <th className="px-6 py-4">Duration</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {services.map(service => (
                       <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-clinicLight rounded-lg text-clinicPrimary">
                                   <FaTag size={12}/>
                                </div>
                                <p className="text-base font-black text-gray-900 leading-none">{service.name}</p>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-base font-black text-gray-400 uppercase tracking-widest">{service.category}</span>
                          </td>
                          <td className="px-6 py-4 text-base font-black text-gray-900">{service.price}</td>
                          <td className="px-6 py-4 text-base font-bold text-gray-500">{service.duration}</td>
                          <td className="px-6 py-4">
                             <div className={`flex items-center gap-1.5 text-base font-black uppercase tracking-widest ${service.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                                {service.status === 'Active' ? <FaCheckCircle size={10}/> : <FaExclamationCircle size={10}/>}
                                {service.status}
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-base font-black text-clinicPrimary uppercase tracking-widest hover:underline">Edit Price</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="space-y-6">
           <div className="card-clinic p-6 bg-clinicDark text-white border-none shadow-xl">
              <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary mb-4">Summary</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-base font-black uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="text-slate-400">Total Services</span>
                    <span>12</span>
                 </div>
                 <div className="flex justify-between items-center text-base font-black uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="text-slate-400">Avg Session Rate</span>
                    <span>$78.40</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PricingServices;
