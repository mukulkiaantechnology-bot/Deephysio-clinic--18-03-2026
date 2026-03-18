import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaSave, FaIdCard, FaHistory, FaArrowLeft, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddPatient = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setSelectedGender = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const selectedGender = formData.gender;

  const handleFinalize = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      // Create new patient object
      const newPatient = {
        id: `PID-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `${formData.firstName} ${formData.lastName}`,
        age: formData.dob ? new Date().getFullYear() - new Date(formData.dob).getFullYear() : '??',
        gender: formData.gender,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active',
        phone: formData.phone,
        email: formData.email,
        address: formData.address
      };

      // Save to localStorage
      const existingPatients = JSON.parse(localStorage.getItem('deephysio_patients') || '[]');
      localStorage.setItem('deephysio_patients', JSON.stringify([...existingPatients, newPatient]));

      setIsSaving(false);
      navigate('/patients');
    }, 1500);
  };

  const handleAttach = (type) => {
    alert(`Node Sync: Attaching ${type} file to subject identity...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group">
        <div className="flex items-center gap-8 relative z-10">
          <button 
            onClick={() => navigate('/patients')}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
          >
            <FaArrowLeft size={16}/>
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Subject Onboarding</h1>
            <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-[0.2em] opacity-80">Initialize and authenticate new biometric clinical profiles.</p>
          </div>
        </div>
        <Button 
          variant="accent" 
          size="lg"
          className="rounded-[24px] h-14 px-10 shadow-google active:scale-95 transition-all text-[11px] font-black uppercase tracking-[0.2em] w-full lg:w-auto relative z-10"
          onClick={handleFinalize}
          disabled={isSaving}
          leftIcon={isSaving ? null : <FaSave size={14}/>}
        >
          {isSaving ? 'Synchronizing Node...' : 'Finalize Protocol'}
        </Button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Basic Info */}
          <Card className="p-10 border-none shadow-premium bg-white space-y-10 group">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
              <div className="w-12 h-12 rounded-2xl bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary shadow-soft group-hover:rotate-6 transition-all">
                <FaUser size={18}/>
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Biometric Identity Partition</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Legal Given Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-300" 
                  placeholder="e.g. Johnathan" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Legal Family Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-300" 
                  placeholder="e.g. Wilson" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Temporal Birth Origin (DOB)</label>
                <div className="relative group/input">
                  <FaBirthdayCake className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                  <input 
                    type="date" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Biometric Gender identification</label>
                <div className="flex gap-4 p-1.5 bg-slate-50 rounded-[20px] border border-slate-100 shadow-inner-soft">
                  {['Male', 'Female', 'Non-Binary'].map(g => (
                    <button 
                      key={g} 
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedGender === g ? 'bg-white text-clinicPrimary shadow-premium' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-10 border-none shadow-premium bg-white space-y-10 group hover:border-clinicPrimary/10 transition-colors">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-soft group-hover:scale-110 transition-all">
                <FaPhone size={16}/>
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Connectivity Hub & Grid Location</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Biometric Phone Sequence</label>
                <div className="relative group/input">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[13px] font-black text-slate-300">+44</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-16 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" 
                    placeholder="7000 000 000" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Secured Email Ledger</label>
                <div className="relative group/input">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" 
                    placeholder="subject@medical-node.com" 
                  />
                </div>
              </div>
              <div className="sm:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none ml-1">Physical Residential Coordinates</label>
                <div className="relative group/input">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-200" 
                    placeholder="Street Address, Sector, Postcode" 
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <Card className="p-0 overflow-hidden shadow-premium border-none bg-white group">
            <div className="bg-slate-900 h-56 flex flex-col items-center justify-center text-white relative overflow-hidden cursor-pointer group/upload" onClick={() => handleAttach('Bio-Avatar')}>
              <div className="absolute inset-0 bg-clinicPrimary opacity-0 group-hover/upload:opacity-5 transition-opacity duration-700"></div>
              <div className="w-20 h-20 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mb-6 shadow-glass group-hover/upload:scale-110 group-hover/upload:rotate-3 transition-transform duration-500">
                <FaCloudUploadAlt size={32} className="text-clinicPrimary" />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] leading-none mb-3">Upload Bio-Avatar</h4>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Supports JPG, PNG Node</p>
            </div>
            <div className="p-8 space-y-4 bg-slate-50/30">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-soft hover:shadow-premium transition-all cursor-pointer group/attach" onClick={() => handleAttach('Identity Node')}>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover/attach:text-clinicPrimary transition-colors">
                  <FaIdCard size={16}/>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-tight leading-none mb-1">Identity Verification</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Passport / ID Node</p>
                </div>
                <FaPlus size={10} className="text-slate-200 group-hover/attach:text-clinicPrimary" />
              </div>
            </div>
          </Card>

          <Card className="p-10 border-none shadow-premium bg-white group">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-soft">
                <FaHistory size={16}/>
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 leading-none">Medical Chronology</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Longitudinal Surgery Node', id: 'surg' },
                { label: 'Verified Chronic Allergies', id: 'allg' },
                { label: 'Active Clinical Medications', id: 'meds' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-4 cursor-pointer group/check">
                  <div className="relative">
                     <input type="checkbox" className="peer hidden" id={item.id} />
                     <div className="w-6 h-6 rounded-lg border-2 border-slate-100 peer-checked:bg-clinicPrimary peer-checked:border-clinicPrimary transition-all flex items-center justify-center">
                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                  </div>
                  <span className="text-[12px] font-bold text-slate-500 group-hover/check:text-slate-900 transition-colors uppercase tracking-tight">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">System sync will trigger an automated medical history audit once identity is finalized.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
