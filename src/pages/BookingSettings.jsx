import React from 'react';
import { FaCog, FaBell, FaGlobe, FaLink, FaMobileAlt, FaShieldAlt, FaSave, FaCheckCircle } from 'react-icons/fa';

const BookingSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">Booking Configuration</h1>
          <p className="text-sm sm:text-base font-bold text-gray-400 mt-1 uppercase tracking-widest">Fine-tune how clients interact with your clinic online.</p>
        </div>
        <button className="w-full sm:w-auto btn-primary flex justify-center items-center gap-2 text-sm sm:text-base uppercase tracking-widest shadow-lg py-3 sm:py-2">
          <FaSave size={10}/> Update Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <div className="space-y-1">
          {[
            { name: 'Policy & Rules', icon: <FaShieldAlt />, active: true },
            { name: 'Notifications', icon: <FaBell /> },
            { name: 'Online Widget', icon: <FaGlobe /> },
            { name: 'Integrations', icon: <FaLink /> },
            { name: 'SMS Alerts', icon: <FaMobileAlt /> },
          ].map(item => (
            <button 
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${item.active ? 'bg-clinicPrimary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-base font-black uppercase tracking-widest">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-3 card-clinic space-y-8 border-none shadow-2xl bg-white p-4 sm:p-8">
          {/* Section 1 */}
          <section className="space-y-6">
            <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary border-b border-gray-50 pb-3 flex items-center justify-between">
              General Booking Rules
              <FaCheckCircle className="text-green-500" size={12}/>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-base font-black text-gray-400 uppercase tracking-widest">Notice Period</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-black text-gray-900 outline-none focus:border-clinicPrimary">
                   <option>24 Hours before</option>
                   <option>12 Hours before</option>
                   <option>2 Hours before</option>
                </select>
                <p className="text-sm font-bold text-gray-300 uppercase">Minimum time required for new bookings.</p>
              </div>
              <div className="space-y-2">
                <label className="text-base font-black text-gray-400 uppercase tracking-widest">Max Future Booking</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-base font-black text-gray-900 outline-none focus:border-clinicPrimary">
                   <option>3 Months ahead</option>
                   <option>6 Months ahead</option>
                   <option>1 Year ahead</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary border-b border-gray-50 pb-3">Cancellation Policy</h3>
            <div className="space-y-4">
               <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer group hover:bg-clinicLight transition-colors">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-gray-300 text-clinicPrimary focus:ring-clinicPrimary" />
                  <div>
                     <p className="text-base font-black text-gray-900 uppercase">Require Payment for Cancellations</p>
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter mt-1">Charge a fee if cancelled less than 24h prior.</p>
                  </div>
               </label>
               <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer group hover:bg-clinicLight transition-colors">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-clinicPrimary focus:ring-clinicPrimary" />
                  <div>
                     <p className="text-base font-black text-gray-900 uppercase">Automated Re-booking</p>
                     <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter mt-1">Suggest another time immediately after cancellation.</p>
                  </div>
               </label>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
             <h3 className="text-base font-black uppercase tracking-widest text-clinicPrimary border-b border-gray-50 pb-3">Personalization</h3>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-base font-black text-gray-400 uppercase tracking-widest">Custom Success Message</label>
                   <textarea className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-base font-semibold text-gray-700 outline-none focus:border-clinicPrimary h-24" defaultValue="Your appointment at DeePhysio is confirmed! We look forward to seeing you."></textarea>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingSettings;
