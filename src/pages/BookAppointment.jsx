import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaClock, FaUser, FaStethoscope, FaChevronRight, 
  FaSave, FaTimes, FaUserPlus, FaCheckCircle, FaInfoCircle, FaUserMd,
  FaArrowLeft, FaChevronDown
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient: '',
    service: '',
    practitioner: '',
    date: '',
    time: '',
    notes: ''
  });

  const [filteredPractitioners, setFilteredPractitioners] = useState([]);
  const mockPatients = [
    'James Wilson',
    'Alice Johnson',
    'Henry Adams',
    'Sarah Parker',
    'Emma Davis'
  ];

  const services = [
    { id: 1, name: 'Physiotherapy Consultation', duration: '45 min', price: '$85', icon: <FaStethoscope />, specialties: ['physio', 'assessment'] },
    { id: 2, name: 'Sports Massage', duration: '60 min', price: '$95', icon: <FaStethoscope />, specialties: ['sports', 'rehab'] },
    { id: 3, name: 'Initial Assessment', duration: '30 min', price: '$65', icon: <FaStethoscope />, specialties: ['assessment', 'physio'] },
    { id: 4, name: 'Rehabilitation Session', duration: '45 min', price: '$80', icon: <FaStethoscope />, specialties: ['rehab', 'sports'] },
  ];

  const practitioners = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Senior Physio', specialties: ['physio', 'assessment', 'rehab'] },
    { id: 2, name: 'Dr. Michael Chen', role: 'Sports Specialist', specialties: ['sports', 'rehab'] },
    { id: 3, name: 'Dr. John Miller', role: 'Osteopath', specialties: ['assessment', 'physio'] },
  ];

  useEffect(() => {
    if (formData.service) {
      const selectedService = services.find(s => s.id === formData.service);
      const filtered = practitioners.filter(p => 
        p.specialties.some(spec => selectedService.specialties.includes(spec))
      );
      setFilteredPractitioners(filtered);
      // Reset practitioner if not in filtered list
      if (formData.practitioner && !filtered.find(p => p.id === formData.practitioner)) {
        setFormData(prev => ({ ...prev, practitioner: '' }));
      }
    } else {
      setFilteredPractitioners(practitioners);
    }
  }, [formData.service]);

  const timeSlots = ['09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '15:15'];

  const handleSave = () => {
    if (!formData.patient || !formData.service || !formData.practitioner || !formData.date || !formData.time) {
      alert('Security Protocol: All clinical parameters must be defined before synchronization.');
      return;
    }
    alert('Appointment Node Synchronized: Record archived in the clinical ledger.');
    navigate('/appointments');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/appointments')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Book Appointment</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Initialize clinical encounter node</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-10">
          {/* Patient Selection Partition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <FaUser className="text-clinicPrimary" /> Patient Subject <span className="text-rose-500">*</span>
              </label>
              <button 
                onClick={() => navigate('/patients/add')}
                className="flex items-center gap-2 text-[10px] font-black text-clinicPrimary uppercase tracking-widest hover:brightness-90 transition-all bg-clinicPrimary/5 px-3 py-1.5 rounded-lg"
              >
                <FaUserPlus size={10}/> Create New Node
              </button>
            </div>
            <div className="relative group">
              <select 
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer shadow-inner-soft appearance-none"
                value={formData.patient}
                onChange={e => setFormData({...formData, patient: e.target.value})}
              >
                <option value="" className="text-slate-300">Select verified patient...</option>
                {mockPatients.map((p, i) => (
                  <option key={i} value={p} className="text-slate-700 font-medium">{p}</option>
                ))}
              </select>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                 <FaChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Service Matrix Partition */}
          <div className="space-y-6">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <FaStethoscope className="text-clinicPrimary" /> Clinical Service Protocol <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setFormData({...formData, service: service.id})}
                  className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all relative overflow-hidden flex items-center gap-4 ${
                    formData.service === service.id 
                    ? 'border-clinicPrimary bg-clinicPrimary/5 shadow-premium scale-[1.02]' 
                    : 'border-slate-50 hover:border-slate-100 bg-slate-50/50 hover:scale-[1.01]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    formData.service === service.id ? 'bg-clinicPrimary text-white shadow-google' : 'bg-white text-clinicPrimary'
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-black text-slate-900 leading-tight mb-1">{service.name}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service.duration}</p>
                      <span className="text-sm font-black text-clinicSecondary">{service.price}</span>
                    </div>
                  </div>
                  {formData.service === service.id && (
                    <FaCheckCircle className="absolute top-4 right-4 text-emerald-500 animate-in zoom-in duration-300" size={14}/>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specialists & Temporal Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-slate-50">
            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaUserMd className="text-clinicPrimary" /> Assigned Specialist <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar pr-2">
                {filteredPractitioners.length > 0 ? (
                  filteredPractitioners.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setFormData({...formData, practitioner: p.id})}
                      className={`p-4 rounded-[24px] border flex items-center gap-4 cursor-pointer transition-all ${
                        formData.practitioner === p.id 
                        ? 'border-clinicPrimary bg-white shadow-premium' 
                        : 'border-slate-50 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black transition-all ${
                        formData.practitioner === p.id ? 'bg-clinicPrimary text-white shadow-google' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {p.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[13px] font-black leading-none ${formData.practitioner === p.id ? 'text-slate-900' : 'text-slate-500'}`}>{p.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{p.role}</p>
                      </div>
                      {formData.practitioner === p.id && <FaCheckCircle className="text-clinicPrimary" size={14}/>}
                    </div>
                  ))
                ) : (
                  <div className="p-10 bg-slate-50 rounded-[32px] text-center border border-dashed border-slate-200">
                    <FaInfoCircle className="mx-auto text-slate-300 mb-3 animate-pulse" size={24}/>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting service selection...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                  <FaCalendarAlt className="text-clinicPrimary" /> Schedule Date <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="date" 
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer shadow-inner-soft"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                  <FaClock className="text-clinicPrimary" /> Availability Grid <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(time => (
                    <button 
                      key={time}
                      onClick={() => setFormData({...formData, time})}
                      className={`py-3 rounded-xl text-[11px] font-black transition-all border ${
                        formData.time === time 
                        ? 'bg-clinicPrimary text-white border-clinicPrimary shadow-google active:scale-95' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-clinicPrimary hover:text-clinicPrimary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Session Encryption Active</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <Button 
                variant="secondary" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                onClick={() => navigate('/appointments')}
              >
                Abort
              </Button>
              <Button 
                variant="accent" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                onClick={handleSave}
              >
                Finalize Booking
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
