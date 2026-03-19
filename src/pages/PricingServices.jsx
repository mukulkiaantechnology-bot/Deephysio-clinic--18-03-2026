import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTag, FaPlus, FaSearch, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PricingServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const INITIAL_SERVICES = [
    { id: 1, name: 'Initial Consultation', category: 'Physiotherapy', price: '$85.00', duration: '45m', status: 'Active' },
    { id: 2, name: 'Follow-up Treatment', category: 'Physiotherapy', price: '$65.00', duration: '30m', status: 'Active' },
    { id: 3, name: 'Sports Massage', category: 'Massage', price: '$90.00', duration: '60m', status: 'Active' },
    { id: 4, name: 'Diagnostic Assessment', category: 'Specialist', price: '$120.00', duration: '60m', status: 'Inactive' },
  ];

  const [services, setServices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('deephysio_services') || '[]');
    if (saved.length > 0) {
      setServices(saved);
    } else {
      setServices(INITIAL_SERVICES);
      localStorage.setItem('deephysio_services', JSON.stringify(INITIAL_SERVICES));
    }
  }, []);

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: services.length,
    avg: (services.reduce((acc, s) => acc + parseFloat(s.price.replace('$', '')), 0) / (services.length || 1)).toFixed(2)
  };

  const handleResetCatalog = () => {
    localStorage.removeItem('deephysio_services');
    setServices(INITIAL_SERVICES);
    alert('Global catalog factory reset successful.');
  };

  return (
    <div className="space-y-10 p-6 md:p-8 animate-fade-in custom-scrollbar font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight uppercase tracking-tighter">Services & Pricing</h1>
          <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[12px]">Configure your clinic's service catalog and billing rates.</p>
          <button onClick={handleResetCatalog} className="text-[9px] font-black text-clinicPrimary uppercase tracking-tighter mt-2 opacity-30 hover:opacity-100 transition-opacity">Reset Clinical Catalog</button>
        </div>
        <button 
          onClick={() => navigate('/billing/pricing/add')}
          className="flex items-center gap-3 px-8 py-4 bg-clinicDark text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-google hover:-translate-y-1 transition-all active:scale-95 shadow-lg"
        >
          <FaPlus size={12}/> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 card-clinic px-0 py-0 overflow-hidden border border-slate-50 shadow-premium bg-white rounded-[32px]">
           <div className="p-6 border-b border-slate-50 flex items-center gap-6 bg-slate-50/20">
              <div className="relative flex-1 group bg-white rounded-2xl border border-slate-100 shadow-inner-soft">
                 <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-clinicPrimary transition-colors" size={14}/>
                 <input 
                   type="text" 
                   placeholder="Search services by name or category..." 
                   className="w-full pl-14 pr-6 py-4 bg-transparent text-[13px] font-bold text-slate-600 outline-none placeholder:text-slate-300 transition-all" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left table-fixed min-w-[1000px]">
                 <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <tr>
                       <th className="px-8 py-6 w-[35%]">Service Name</th>
                       <th className="px-8 py-6 w-[20%] text-center">Category</th>
                       <th className="px-8 py-6 w-[15%] text-center">Rate</th>
                       <th className="px-8 py-6 w-[10%] text-center">Duration</th>
                       <th className="px-8 py-6 w-[10%] text-center">Status</th>
                       <th className="px-8 py-6 w-[10%] text-right"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {filteredServices.length > 0 ? filteredServices.map(service => (
                       <tr key={service.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => navigate(`/billing/pricing/edit/${service.id}`)}>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-[18px] bg-slate-50 text-slate-400 group-hover:bg-clinicPrimary group-hover:text-white transition-all flex items-center justify-center border border-slate-100 group-hover:shadow-google group-hover:-rotate-12">
                                   <FaTag size={16}/>
                                </div>
                                <div>
                                   <p className="text-[15px] font-black text-slate-900 leading-none group-hover:text-clinicPrimary transition-colors">{service.name}</p>
                                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Node ID: SRC-00{service.id}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                             <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">{service.category}</span>
                          </td>
                          <td className="px-8 py-6 text-center text-[18px] font-black text-slate-900 tracking-tighter">{service.price}</td>
                          <td className="px-8 py-6 text-center text-[13px] font-bold text-slate-400">{service.duration}</td>
                          <td className="px-8 py-6">
                             <div className={`mx-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                               service.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                             }`}>
                                {service.status === 'Active' ? <FaCheckCircle size={10}/> : <FaExclamationCircle size={10}/>}
                                {service.status}
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest border-b-2 border-transparent hover:border-clinicPrimary transition-all">Edit Price</button>
                          </td>
                       </tr>
                    )) : (
                       <tr>
                          <td colSpan="6" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">Null return for specified service query</td>
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="space-y-10">
           <div className="card-clinic p-10 bg-clinicDark text-white border-none shadow-premium rounded-[40px] relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-clinicPrimary opacity-5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-clinicPrimary mb-8 relative z-10">Global Summary</h3>
              <div className="space-y-8 relative z-10">
                 <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/5 pb-4">
                    <span className="text-slate-500">Total Services</span>
                    <span className="text-xl tracking-tighter">{stats.total}</span>
                 </div>
                 <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/5 pb-4">
                    <span className="text-slate-500">Avg Session Rate</span>
                    <span className="text-xl tracking-tighter">${stats.avg}</span>
                 </div>
                 <div className="pt-4 flex flex-col gap-2">
                    <p className="text-[9px] font-bold text-slate-500 leading-tight uppercase tracking-widest">Protocol Sync Status</p>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Synced with local ledger</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PricingServices;
