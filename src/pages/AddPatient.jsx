import React, { useState, useRef } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaSave, FaIdCard, FaHistory, FaArrowLeft, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AddPatient = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const bioAvatarRef = useRef(null);
  const identityNodeRef = useRef(null);

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
    if (type === 'Bio-Avatar') {
      bioAvatarRef.current?.click();
    } else if (type === 'Identity Node') {
      identityNodeRef.current?.click();
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto space-y-4 sm:space-y-5 px-4 sm:px-5 lg:px-6 animate-fade-in font-sans custom-scrollbar py-4 sm:py-6">
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl relative overflow-hidden group">
        <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full lg:w-auto">
          <button 
            onClick={() => navigate('/patients')}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-clinicPrimary hover:bg-slate-50 transition-colors shrink-0"
          >
            <FaArrowLeft size={14}/>
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-none uppercase truncate">Subject Onboarding</h1>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-widest truncate">Initialize and authenticate new biometric clinical profiles.</p>
          </div>
        </div>
        <Button 
          variant="accent" 
          className="rounded-lg sm:rounded-xl h-10 sm:h-11 px-6 sm:px-8 shadow-sm transition-colors text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-widest w-full lg:w-auto relative z-10 shrink-0"
          onClick={handleFinalize}
          disabled={isSaving}
          leftIcon={isSaving ? null : <FaSave size={12}/>}
        >
          {isSaving ? 'Synchronizing...' : 'Finalize Protocol'}
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          {/* Basic Info */}
          <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl space-y-4 sm:space-y-5 group">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-3 sm:pb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary shadow-sm transition-transform">
                <FaUser size={14}/>
              </div>
              <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500">Biometric Identity Partition</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Given Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                  placeholder="e.g. Johnathan" 
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Family Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                  placeholder="e.g. Wilson" 
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Temporal Birth Origin (DOB)</label>
                <div className="relative group/input">
                  <FaBirthdayCake className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors" size={12}/>
                  <input 
                    type="date" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors uppercase" 
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Biometric Gender identification</label>
                <div className="flex gap-2 sm:gap-3 p-1 sm:p-1.5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm">
                  {['Male', 'Female', 'Non-Binary'].map(g => (
                    <button 
                      key={g} 
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors ${selectedGender === g ? 'bg-white text-clinicPrimary shadow-sm border border-slate-100' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl space-y-4 sm:space-y-5 transition-colors">
            <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-3 sm:pb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm transition-transform">
                <FaPhone size={12}/>
              </div>
              <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500">Connectivity Hub & Grid Location</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Biometric Phone Sequence</label>
                <div className="relative group/input">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-[12px] font-black text-slate-400">+44</span>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                    placeholder="7000 000 000" 
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Secured Email Ledger</label>
                <div className="relative group/input">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors" size={12}/>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                    placeholder="subject@medical-node.com" 
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Physical Residential Coordinates</label>
                <div className="relative group/input">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-clinicPrimary transition-colors" size={12}/>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-clinicPrimary/10 focus:border-clinicPrimary shadow-sm transition-colors placeholder:text-slate-400" 
                    placeholder="Street Address, Sector, Postcode" 
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4 sm:space-y-5">
          <input 
            type="file" 
            ref={bioAvatarRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'bioAvatar')}
          />
          <input 
            type="file" 
            ref={identityNodeRef} 
            className="hidden" 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, 'identityNode')}
          />
          <Card className="p-0 overflow-hidden shadow-sm border border-slate-100 bg-white rounded-xl sm:rounded-2xl group flex flex-col h-auto">
            <div className="bg-slate-900 h-32 sm:h-40 flex flex-col items-center justify-center text-white relative overflow-hidden cursor-pointer group/upload" onClick={() => handleAttach('Bio-Avatar')}>
              <div className="absolute inset-0 bg-clinicPrimary/20 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full border border-white/20 flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover/upload:scale-105 transition-transform duration-300 relative z-10">
                <FaCloudUploadAlt size={20} className="text-white group-hover/upload:text-clinicPrimary transition-colors" />
              </div>
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest leading-none mb-1 sm:mb-2 relative z-10">
                {formData.bioAvatar ? 'Avatar Selected' : 'Upload Bio-Avatar'}
              </h4>
              <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[80%] text-center relative z-10">
                {formData.bioAvatar ? formData.bioAvatar.name : 'Supports JPG, PNG Node'}
              </p>
            </div>
            <div className="p-4 sm:p-5 lg:p-6 bg-slate-50/50">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-slate-200 shadow-sm hover:border-clinicPrimary/30 transition-colors cursor-pointer group/attach" onClick={() => handleAttach('Identity Node')}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover/attach:text-clinicPrimary group-hover/attach:bg-clinicPrimary/5 transition-colors shrink-0">
                  <FaIdCard size={14}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1 truncate">Identity Verification</p>
                  <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">
                    {formData.identityNode ? formData.identityNode.name : 'Passport / ID Node'}
                  </p>
                </div>
                <FaPlus size={10} className="text-slate-300 group-hover/attach:text-clinicPrimary shrink-0" />
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-sm bg-white rounded-xl sm:rounded-2xl group transition-colors">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm">
                <FaHistory size={12}/>
              </div>
              <h3 className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 leading-none">Medical Chronology</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { label: 'Longitudinal Surgery Node', id: 'surg' },
                { label: 'Verified Chronic Allergies', id: 'allg' },
                { label: 'Active Clinical Medications', id: 'meds' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-3 sm:gap-4 cursor-pointer group/check">
                  <div className="relative flex-shrink-0">
                     <input type="checkbox" className="peer hidden" id={item.id} />
                     <div className="w-4 h-4 sm:w-5 sm:h-5 rounded sm:rounded-md border border-slate-300 bg-white peer-checked:bg-clinicPrimary peer-checked:border-clinicPrimary shadow-sm transition-colors flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 group-hover/check:text-slate-900 transition-colors uppercase tracking-tight">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-50/80 rounded-lg sm:rounded-xl border border-slate-200">
               <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">System sync will trigger an automated medical history audit once identity is finalized.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
