import React from 'react';
import { FaClinicMedical, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaClock, FaSave, FaCamera, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ClinicDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Clinic Profile</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Public Identity & Clinical Branding</p>
        </div>
      </div>

      <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
        <div className="p-10 space-y-12">
          {/* Top Section: Branding & Identity */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/3 space-y-6">
              <div className="group relative w-full aspect-square rounded-[32px] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-clinicPrimary/5 hover:border-clinicPrimary/30 transition-all overflow-hidden shadow-inner-soft">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-clinicPrimary group-hover:scale-110 transition-transform">
                  <FaClinicMedical size={32} />
                </div>
                <div className="text-center px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">Master Identity</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG/JPG MAX 2MB</p>
                </div>
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Button variant="secondary" className="bg-white text-slate-900 h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest"><FaCamera className="mr-2"/> Update</Button>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-clinicPrimary rounded-full"></div>
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Core Designation</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Clinic Name</label>
                    <input type="text" defaultValue="DeePhysio Clinic" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Matrix (Phone)</label>
                  <div className="relative">
                    <FaPhoneAlt size={12} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"/>
                    <input type="text" defaultValue="+44 7123 456789" className="w-full pl-12 pr-5 py-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Node (Email)</label>
                  <div className="relative">
                    <FaEnvelope size={12} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"/>
                    <input type="email" defaultValue="hello@deephysio.com" className="w-full pl-12 pr-5 py-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-8 border-t border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Geographic Vectors</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Central Hub Address</label>
                <div className="relative">
                  <FaMapMarkerAlt size={12} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"/>
                  <input type="text" defaultValue="12 Clinical Way, Medical District" className="w-full pl-12 pr-5 py-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Metropolis</label>
                  <input type="text" defaultValue="London" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Global Zip/Post-Code</label>
                  <input type="text" defaultValue="W1G 6AQ" className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-[14px] font-bold outline-none focus:ring-4 focus:ring-clinicPrimary/5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-clinicPrimary rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--clinic-primary-rgb),0.3)]"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public profile active & synced</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button 
                variant="secondary" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                onClick={() => navigate(-1)}
            >
                Abort
            </Button>
            <Button 
                variant="accent" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                onClick={() => alert('Clinic Identity Synchronized.')}
            >
                Commit Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClinicDetails;
