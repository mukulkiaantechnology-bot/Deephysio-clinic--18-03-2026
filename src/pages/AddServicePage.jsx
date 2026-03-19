import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTag, FaPlus, FaCheckCircle, FaClock } from 'react-icons/fa';
import Button from '../components/ui/Button';

const AddServicePage = () => {
  const navigate = useNavigate();
  const [service, setService] = useState({
    name: '',
    category: 'Physiotherapy',
    price: '',
    duration: '45m',
    status: 'Active'
  });

  const handleSave = () => {
    if (!service.name || !service.price) {
      alert('Clinical Protocol Error: Name and Rate are required fields.');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('deephysio_services') || '[]');
    const newService = {
      ...service,
      id: Date.now(),
      price: `$${parseFloat(service.price).toFixed(2)}`
    };

    const updated = [newService, ...saved];
    localStorage.setItem('deephysio_services', JSON.stringify(updated));
    
    alert('New Service Node Deployed to Clinic Catalog.');
    navigate('/billing/pricing');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/billing/pricing')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Initialize New Service</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Catalog Expansion Protocol v1.4</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-8">
           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                 <FaTag className="text-clinicPrimary" /> Service Nomenclature
              </label>
              <input 
                 type="text" 
                 placeholder="Enter clinical service name..." 
                 className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300"
                 value={service.name}
                 onChange={e => setService({...service, name: e.target.value})}
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaTag className="text-clinicPrimary" /> Professional Category
                 </label>
                 <select 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={service.category}
                    onChange={e => setService({...service, category: e.target.value})}
                 >
                    <option value="Physiotherapy">Physiotherapy</option>
                    <option value="Massage">Massage Therapy</option>
                    <option value="Specialist">Specialist Consultation</option>
                    <option value="Diagnostics">Diagnostics / Rehab</option>
                 </select>
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaClock className="text-clinicPrimary" /> Standard Duration
                 </label>
                 <select 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={service.duration}
                    onChange={e => setService({...service, duration: e.target.value})}
                 >
                    <option value="15m">15 Minutes</option>
                    <option value="30m">30 Minutes</option>
                    <option value="45m">45 Minutes</option>
                    <option value="60m">60 Minutes</option>
                    <option value="90m">90 Minutes</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="p-0 border-none">Valuation ($)</Button>
                 </label>
                 <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300"
                    value={service.price}
                    onChange={e => setService({...service, price: e.target.value})}
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                    <FaCheckCircle className="text-clinicPrimary" /> Initial status
                 </label>
                 <select 
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer"
                    value={service.status}
                    onChange={e => setService({...service, status: e.target.value})}
                 >
                    <option value="Active">Active / Public</option>
                    <option value="Inactive">Inactive / Internal</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Catalog Sync active</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <Button variant="secondary" className="flex-1 md:px-10 py-5 rounded-2xl" onClick={() => navigate('/billing/pricing')}>Abort</Button>
              <Button variant="accent" className="flex-1 md:px-10 py-5 rounded-2xl" onClick={handleSave} leftIcon={<FaPlus />}>Commit Service</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;
