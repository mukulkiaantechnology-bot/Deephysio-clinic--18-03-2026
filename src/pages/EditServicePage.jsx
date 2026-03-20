import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaTag, FaCheckCircle, FaClock, FaRedo } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const EditServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('deephysio_services') || '[]');
    const found = saved.find(s => s.id === parseInt(id));
    if (found) {
      setService({ ...found, price: found.price.replace('$', '') });
    } else {
        const INITIAL_SERVICES = [
            { id: 1, name: 'Initial Consultation', category: 'Physiotherapy', price: '$85.00', duration: '45m', status: 'Active' },
            { id: 2, name: 'Follow-up Treatment', category: 'Physiotherapy', price: '$65.00', duration: '30m', status: 'Active' },
            { id: 3, name: 'Sports Massage', category: 'Massage', price: '$90.00', duration: '60m', status: 'Active' },
            { id: 4, name: 'Diagnostic Assessment', category: 'Specialist', price: '$120.00', duration: '60m', status: 'Inactive' },
          ];
          const hardcoded = INITIAL_SERVICES.find(s => s.id === parseInt(id));
          if (hardcoded) setService({ ...hardcoded, price: hardcoded.price.replace('$', '') });
    }
  }, [id]);

  const handleUpdate = () => {
    if (!service.name || !service.price) {
      alert('Verification Failed: Name and Rate cannot be null.');
      return;
    }

    const saved = JSON.parse(localStorage.getItem('deephysio_services') || '[]');
    const updatedService = {
      ...service,
      price: `$${parseFloat(service.price).toFixed(2)}`
    };

    const updated = saved.some(s => s.id === updatedService.id) 
        ? saved.map(s => s.id === updatedService.id ? updatedService : s)
        : [...saved, updatedService];
        
    localStorage.setItem('deephysio_services', JSON.stringify(updated));
    
    alert('Service Valuation Updated Successfully.');
    navigate('/billing/pricing');
  };

  if (!service) return <div className="p-20 text-center font-black uppercase text-slate-300 tracking-[0.3em]">Locating Service Node...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/billing/pricing')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Modify Protocol</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Adjusting: {service.name}</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
                <div className="p-10 space-y-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <FaTag className="text-clinicPrimary" /> Nomenclature
                        </label>
                        <input 
                            type="text" 
                            className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all shadow-inner-soft"
                            value={service.name}
                            onChange={e => setService({...service, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaTag className="text-clinicPrimary" /> Professional Category
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
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
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaClock className="text-clinicPrimary" /> Standard Duration
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
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
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <span className="text-clinicPrimary font-black">$</span> Target Valuation
                            </label>
                            <input 
                                type="number" 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all shadow-inner-soft"
                                value={service.price}
                                onChange={e => setService({...service, price: e.target.value})}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaCheckCircle className="text-clinicPrimary" /> Target Status
                            </label>
                            <select 
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer appearance-none shadow-inner-soft"
                                value={service.status}
                                onChange={e => setService({...service, status: e.target.value})}
                            >
                                <option value="Active">Active / Public</option>
                                <option value="Inactive">Inactive / Internal</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting valuation commit</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                            onClick={() => navigate('/billing/pricing')}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={handleUpdate} 
                            leftIcon={<FaRedo />}
                        >
                            Update Node
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EditServicePage;
