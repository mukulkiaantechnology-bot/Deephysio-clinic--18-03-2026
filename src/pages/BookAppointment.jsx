import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaStethoscope, FaChevronRight, FaSave, FaTimes } from 'react-icons/fa';

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: '',
    service: '',
    practitioner: '',
    date: '',
    time: '',
    notes: ''
  });

  const services = [
    { id: 1, name: 'Physiotherapy Consultation', duration: '45 min', price: '$85', icon: <FaStethoscope /> },
    { id: 2, name: 'Sports Massage', duration: '60 min', price: '$95', icon: <FaStethoscope /> },
    { id: 3, name: 'Initial Assessment', duration: '30 min', price: '$65', icon: <FaStethoscope /> },
    { id: 4, name: 'Rehabilitation Session', duration: '45 min', price: '$80', icon: <FaStethoscope /> },
  ];

  const practitioners = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Senior Physio' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Sports Specialist' },
    { id: 3, name: 'Dr. John Miller', role: 'Osteopath' },
  ];

  const timeSlots = ['09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '15:15'];

  return (
    <div className="max-w-[1400px] w-full mx-auto space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none">Book Appointment</h1>
          <p className="text-xs sm:text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Schedule a new session for a patient.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <button className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-black text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest">Draft</button>
          <button className="w-full sm:w-auto btn-primary flex justify-center items-center gap-2 text-xs sm:text-sm uppercase tracking-widest py-2 px-4 whitespace-nowrap"><FaSave size={10}/> Save Booking</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Step 1: Patient & Service */}
          <div className="card-clinic !p-4 sm:!p-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2 text-clinicPrimary">
              <span className="w-5 h-5 rounded-full bg-clinicPrimary/10 flex items-center justify-center text-sm font-black">1</span>
              <h3 className="text-sm border-none font-black uppercase tracking-widest m-0 leading-none">Patient & Service</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest mb-1.5">Select Patient</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={12}/>
                  <input 
                    type="text" 
                    placeholder="Search patient by name or ID..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-clinicPrimary/20 focus:border-clinicPrimary outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setFormData({...formData, service: service.id})}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all group ${formData.service === service.id ? 'border-clinicPrimary bg-clinicPrimary/5' : 'border-gray-50 hover:border-gray-100 bg-white shadow-sm'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className={`p-1.5 rounded-lg ${formData.service === service.id ? 'bg-clinicPrimary text-white' : 'bg-gray-50 text-clinicPrimary'}`}>
                        {service.icon}
                      </div>
                      <span className="text-sm font-black text-clinicSecondary">{service.price}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-gray-900 leading-tight mb-1">{service.name}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{service.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time */}
          <div className="card-clinic !p-4 sm:!p-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 mb-1 sm:mb-2 text-clinicPrimary">
              <span className="w-5 h-5 rounded-full bg-clinicPrimary/10 flex items-center justify-center text-sm font-black">2</span>
              <h3 className="text-sm font-black uppercase tracking-widest m-0 leading-none">Date & Time</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="sm:w-1/2">
                <label className="block text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest mb-1.5">Select Date</label>
                <input type="date" className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-sm sm:text-base font-semibold outline-none focus:border-clinicPrimary transition-all uppercase" />
              </div>
              <div className="sm:w-1/2 w-full">
                <label className="block text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest mb-1.5">Select Time Slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button 
                      key={time}
                      onClick={() => setFormData({...formData, time})}
                      className={`py-1.5 rounded-md text-xs sm:text-sm font-black transition-all border ${formData.time === time ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-sm' : 'bg-white text-gray-500 border-gray-100 hover:border-clinicPrimary hover:text-clinicPrimary'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          {/* Summary Sidebar */}
          <div className="card-clinic !p-4 sm:!p-5 bg-clinicDark text-white border-none shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-clinicPrimary/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-3 text-clinicPrimary relative z-10 m-0 leading-none">Booking Summary</h3>
            
            <div className="space-y-3 relative z-10 mt-2">
              <div className="pb-2.5 border-b border-white/5">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Service</p>
                <p className="text-sm font-bold text-white leading-tight">{services.find(s => s.id === formData.service)?.name || 'Not selected'}</p>
              </div>
              
              <div className="pb-2.5 border-b border-white/5">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Schedule</p>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-clinicPrimary" size={10}/>
                  <span className="text-sm font-bold text-white">Mar 18, 2026</span>
                  <FaClock className="text-clinicPrimary ml-2" size={10}/>
                  <span className="text-sm font-bold text-white">{formData.time || '--:--'}</span>
                </div>
              </div>

              <div className="pt-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Estimated Total</span>
                  <span className="text-sm sm:text-base font-black text-clinicSecondary">{services.find(s => s.id === formData.service)?.price || '$0.00'}</span>
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase">Incl. 10% tax for facilities.</p>
              </div>
            </div>
          </div>

          <div className="card-clinic !p-4 sm:!p-5 space-y-3">
            <h3 className="text-sm font-black uppercase tracking-widest mb-1 m-0 leading-none">Practitioner</h3>
            <div className="space-y-2 mt-2">
              {practitioners.map(p => (
                <div 
                  key={p.id}
                  onClick={() => setFormData({...formData, practitioner: p.id})}
                  className={`p-2 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${formData.practitioner === p.id ? 'border-clinicPrimary bg-clinicPrimary/5' : 'border-gray-50 hover:bg-gray-50'}`}
                >
                  <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-sm font-black text-gray-500">{p.name[0]}</div>
                  <div>
                    <p className="text-sm font-black text-gray-900 leading-none">{p.name}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
