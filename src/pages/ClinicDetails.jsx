import React from 'react';
import { FaClinicMedical, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaClock, FaSave, FaCamera } from 'react-icons/fa';

const ClinicDetails = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Clinic Profile</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Manage your clinic's public identity and contact information.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaSave size={10}/> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="lg:col-span-1">
           <div className="card-clinic p-8 flex flex-col items-center text-center bg-white shadow-xl border-none">
              <div className="relative group cursor-pointer">
                 <div className="w-32 h-32 rounded-3xl bg-clinicLight border-2 border-dashed border-clinicPrimary/30 flex items-center justify-center text-clinicPrimary transition-all group-hover:bg-clinicPrimary/10">
                    <FaClinicMedical size={40}/>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-3xl">
                    <FaCamera className="text-white" size={24}/>
                 </div>
              </div>
              <h3 className="text-base font-black uppercase tracking-widest mt-6 text-gray-900">Clinic Logo</h3>
              <p className="text-base font-bold text-gray-400 mt-2 uppercase tracking-widest">PNG or JPG. Max 2MB.</p>
              <button className="mt-8 text-base font-black text-clinicPrimary uppercase tracking-widest hover:underline">Change Logo</button>
           </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-2 space-y-6">
           <div className="card-clinic p-8 bg-white shadow-xl border-none space-y-8">
              <section className="space-y-6">
                 <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary border-b border-gray-50 pb-3">Basic Information</h3>
                 <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                       <label className="text-base font-black text-gray-400 uppercase tracking-widest">Clinic Name</label>
                       <input type="text" defaultValue="DeePhysio Clinic" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-base font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                       <div className="relative">
                          <FaPhoneAlt size={10} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                          <input type="text" defaultValue="+44 7123 456789" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-base font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                       <div className="relative">
                          <FaEnvelope size={10} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                          <input type="email" defaultValue="hello@deephysio.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                       </div>
                    </div>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary border-b border-gray-50 pb-3">Location & Address</h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-base font-black text-gray-400 uppercase tracking-widest">Street Address</label>
                       <div className="relative">
                          <FaMapMarkerAlt size={10} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"/>
                          <input type="text" defaultValue="12 Clinical Way, Medical District" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-base font-black text-gray-400 uppercase tracking-widest">City</label>
                          <input type="text" defaultValue="London" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-base font-black text-gray-400 uppercase tracking-widest">Postcode</label>
                          <input type="text" defaultValue="W1G 6AQ" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-base font-black text-gray-900 outline-none focus:border-clinicPrimary" />
                       </div>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetails;
