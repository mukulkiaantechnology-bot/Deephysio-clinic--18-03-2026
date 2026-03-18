import React from 'react';
import { FaMapMarkerAlt, FaPlus, FaPhoneAlt, FaRegClock, FaGlobe, FaChevronRight, FaClinicMedical } from 'react-icons/fa';

const MultiLocation = () => {
  const locations = [
    { id: 1, name: 'Main Downtown Clinic', address: '123 Health Ave, City Center', phone: '+1 234-567-890', timezone: 'EST (GMT-5)', status: 'Primary' },
    { id: 2, name: 'North Suburban Branch', address: '456 Wellness Blvd, Northside', phone: '+1 234-987-654', timezone: 'EST (GMT-5)', status: 'Active' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase leading-none">Multi-Location Management</h1>
          <p className="text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Configure and sync clinical operations across different physical sites.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-base uppercase tracking-widest shadow-lg ">
          <FaPlus size={10}/> Add New Location
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {locations.map(loc => (
          <div key={loc.id} className="card-clinic p-10 bg-white border-none shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-clinicLight rounded-bl-full -mr-20 -mt-20 group-hover:scale-110 transition-transform"></div>
             
             <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-clinicPrimary text-white flex items-center justify-center shadow-lg ">
                   <FaClinicMedical size={28}/>
                </div>
                <div>
                   <span className="text-base font-black text-clinicPrimary uppercase tracking-widest border border-clinicPrimary/20 px-2 py-0.5 rounded-md mb-2 inline-block">
                      {loc.status} SITE
                   </span>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">{loc.name}</h3>
                </div>
             </div>

             <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                   <FaMapMarkerAlt className="text-gray-300" size={16}/>
                   <p className="text-base font-black text-gray-600 uppercase tracking-tight">{loc.address}</p>
                </div>
                <div className="flex items-center gap-4">
                   <FaPhoneAlt className="text-gray-300" size={16}/>
                   <p className="text-base font-black text-gray-600 uppercase tracking-tight">{loc.phone}</p>
                </div>
                <div className="flex items-center gap-4">
                   <FaRegClock className="text-gray-300" size={16}/>
                   <p className="text-base font-bold text-gray-400 uppercase tracking-widest">{loc.timezone}</p>
                </div>
             </div>

             <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center relative z-10">
                <button className="text-base font-black text-clinicPrimary uppercase tracking-widest hover:underline">Edit Site Settings</button>
                <div className="flex items-center gap-2 text-base font-black text-green-500 uppercase tracking-widest">
                   <FaGlobe size={10}/> SYNCED
                </div>
             </div>
          </div>
        ))}

        <div className="card-clinic p-10 bg-gray-50 border-2 border-dashed border-gray-200 shadow-none flex flex-col items-center justify-center text-center group cursor-pointer hover:border-clinicPrimary/30 transition-all">
           <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-6 group-hover:border-clinicPrimary transition-all">
              <FaPlus className="text-gray-200 group-hover:text-clinicPrimary transition-all" size={24}/>
           </div>
           <h3 className="text-base font-black text-gray-400 uppercase tracking-widest group-hover:text-clinicPrimary transition-all">Enable Branch Expansion</h3>
           <p className="text-base font-bold text-gray-300 uppercase tracking-widest mt-2 max-w-[200px]">Unlock more locations to scale your clinical network globally.</p>
        </div>
      </div>
    </div>
  );
};

export default MultiLocation;
