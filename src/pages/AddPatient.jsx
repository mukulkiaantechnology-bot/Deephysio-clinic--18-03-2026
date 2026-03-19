import React, { useState, useRef } from 'react';
import { 
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, 
  FaSave, FaIdCard, FaHistory, FaArrowLeft, FaPlus, FaCloudUploadAlt, 
  FaBriefcase, FaUserShield, FaExclamationTriangle 
} from 'react-icons/fa';
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
    preferredName: '',
    dob: '',
    gender: 'Male',
    pronouns: '',
    occupation: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('emergency.')) {
        const field = name.split('.')[1];
        setFormData(prev => ({ 
            ...prev, 
            emergencyContact: { ...prev.emergencyContact, [field]: value } 
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const setSelectedGender = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleFinalize = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert('Incomplete Protocol: Legal Name is required for registration.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const newPatient = {
        id: `PID-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `${formData.firstName} ${formData.lastName}`,
        preferredName: formData.preferredName || formData.firstName,
        age: formData.dob ? new Date().getFullYear() - new Date(formData.dob).getFullYear() : '??',
        gender: formData.gender,
        pronouns: formData.pronouns,
        occupation: formData.occupation,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active',
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        medicalHistoryCounters: {
            surgeries: 0,
            allergies: 0,
            medications: 0
        }
      };

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
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in p-6 md:p-10 font-sans custom-scrollbar">
      {/* Header Section */}
      <Card className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 border-none shadow-premium bg-white relative overflow-hidden group rounded-[40px]">
        <div className="flex items-center gap-8 relative z-10">
          <button 
            onClick={() => navigate('/patients')}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center text-slate-300 hover:text-clinicPrimary hover:shadow-google hover:-translate-x-1 transition-all active:scale-90"
          >
            <FaArrowLeft size={16}/>
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase">Clinical Enrollment</h1>
            <p className="text-[11px] font-bold text-slate-500 mt-3 uppercase tracking-[0.2em] opacity-80">ESTABLISH SECURE BIOMETRIC ARCHIVE & MEDICAL NEXUS</p>
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
          {isSaving ? 'Deploying Patient Node...' : 'Commit Enrollment'}
        </Button>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-clinicPrimary/5 rounded-full blur-[40px] group-hover:bg-clinicPrimary/10 transition-all duration-1000"></div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          {/* Section 1: Personal & Biometric Identity */}
          <Card className="p-10 border-none shadow-premium bg-white space-y-10 group rounded-[32px]">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
              <div className="w-12 h-12 rounded-2xl bg-clinicPrimary/10 flex items-center justify-center text-clinicPrimary shadow-soft group-hover:rotate-6 transition-all">
                <FaUser size={18}/>
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Personal Identity Partition</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Given Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-300" 
                  placeholder="e.g. James" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Family Name *</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all placeholder:text-slate-300" 
                  placeholder="e.g. Wilson" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Common Name</label>
                <input 
                  type="text" 
                  name="preferredName"
                  value={formData.preferredName}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  placeholder="How should we call you?" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DOB Protocol</label>
                <div className="relative group/input">
                  <FaBirthdayCake className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/input:text-clinicPrimary transition-colors" size={14}/>
                  <input 
                    type="date" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biological Identity Mapping</label>
                <div className="flex gap-2 p-1 bg-slate-50 rounded-[20px] border border-slate-100">
                  {['Male', 'Female', 'Non-Binary', 'Other'].map(g => (
                    <button 
                      key={g} 
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.gender === g ? 'bg-white text-clinicPrimary shadow-premium border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pronouns / Reference</label>
                <input 
                  type="text" 
                  name="pronouns"
                  value={formData.pronouns}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  placeholder="e.g. He/Him, They/Them" 
                />
              </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <FaBriefcase size={10} className="text-clinicPrimary" /> Professional Occupation Record
                </label>
                <input 
                  type="text" 
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                  placeholder="e.g. Software Architect, Maintenance Lead" 
                />
            </div>
          </Card>

          {/* Section 2: Contact Hub & Emergency Defense */}
          <Card className="p-10 border-none shadow-premium bg-white space-y-10 group rounded-[32px]">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-soft group-hover:scale-110 transition-all">
                <FaEnvelope size={16}/>
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Connectivity & Grid Location</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Digital Signal (Phone)</label>
                <div className="relative group/input">
                  <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={12}/>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                    placeholder="+44 7xxx xxxxxx" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Encrypted Mail Protocol</label>
                <div className="relative group/input">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={14}/>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                    placeholder="name@nexus.com" 
                  />
                </div>
              </div>
              <div className="sm:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Residential Mesh (Address)</label>
                <div className="relative group/input">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={14}/>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all" 
                    placeholder="Full residential coordinates..." 
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Sub-Partition */}
            <div className="mt-6 p-8 bg-rose-50/30 rounded-[28px] border border-rose-100 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-soft">
                    <FaUserShield size={16}/>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Emergency Tactical Override</h4>
                    <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mt-1">Secondary contact protocol for critical incidents</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Contact Name</label>
                        <input 
                            type="text" 
                            name="emergency.name"
                            value={formData.emergencyContact.name}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white border border-rose-50 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Digital Frequency</label>
                        <input 
                            type="tel" 
                            name="emergency.phone"
                            value={formData.emergencyContact.phone}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white border border-rose-50 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                            placeholder="+44 xxxx xxxxxx"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">System Relation</label>
                        <input 
                            type="text" 
                            name="emergency.relation"
                            value={formData.emergencyContact.relation}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-white border border-rose-50 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                            placeholder="e.g. Spouse, Guardian"
                        />
                    </div>
                </div>
            </div>
          </Card>
        </div>

        {/* Sidebar: Bio-Metrics & Verification */}
        <div className="lg:col-span-4 space-y-10">
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
          
          <Card className="p-0 overflow-hidden shadow-premium border-none bg-white group rounded-[32px]">
            <div className="bg-slate-900 h-56 flex flex-col items-center justify-center text-white relative overflow-hidden cursor-pointer group/upload" onClick={() => handleAttach('Bio-Avatar')}>
              <div className="absolute inset-0 bg-clinicPrimary opacity-0 group-hover/upload:opacity-10 transition-opacity duration-700"></div>
              <div className="w-20 h-20 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mb-6 shadow-glass group-hover/upload:scale-110 group-hover/upload:rotate-3 transition-transform duration-500">
                <FaCloudUploadAlt size={32} className="text-clinicPrimary" />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] leading-none mb-3">
                {formData.bioAvatar ? 'Avatar Synchronized' : 'Initialize Bio-Avatar'}
              </h4>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[80%] text-center">
                {formData.bioAvatar ? formData.bioAvatar.name : 'Target: Visual Identity Capture'}
              </p>
            </div>
            <div className="p-8 space-y-4 bg-slate-50/30">
              <div className="flex items-center gap-4 p-5 bg-white rounded-[24px] border border-slate-100 shadow-soft hover:shadow-premium transition-all cursor-pointer group/attach" onClick={() => handleAttach('Identity Node')}>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover/attach:text-clinicPrimary transition-all duration-300">
                  <FaIdCard size={18}/>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1.5">Verification Node</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate w-40">
                    {formData.identityNode ? formData.identityNode.name : 'Identity Auth Required'}
                  </p>
                </div>
                <FaPlus size={10} className="text-slate-200 group-hover/attach:text-clinicPrimary" />
              </div>
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex items-start gap-4">
                  <FaExclamationTriangle size={14} className="text-amber-500 shrink-0 mt-1" />
                  <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest leading-relaxed">Identity verification is mandatory for SOAP protocol access.</p>
              </div>
            </div>
          </Card>

          {/* Quick Logic Histroy Blocks */}
          <Card className="p-10 border-none shadow-premium bg-white group rounded-[32px]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-clinicPrimary shadow-google">
                <FaHistory size={16}/>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 leading-none">Status Pre-Sets</h3>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">Auto-Initialize Medical Partition</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Longitudinal Surgery Node', id: 'surg' },
                { label: 'Verified Chronic Allergies', id: 'allg' },
                { label: 'Active Clinical Medications', id: 'meds' }
              ].map(item => (
                <label key={item.id} className="flex items-center gap-5 cursor-pointer group/check">
                  <div className="relative">
                     <input type="checkbox" className="peer hidden" id={item.id} />
                     <div className="w-7 h-7 rounded-[12px] border-2 border-slate-100 peer-checked:bg-clinicPrimary peer-checked:border-clinicPrimary transition-all flex items-center justify-center shadow-soft">
                        <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                     </div>
                  </div>
                  <span className="text-[12px] font-black text-slate-400 group-hover/check:text-slate-900 transition-colors uppercase tracking-tight">{item.label}</span>
                </label>
              ))}
            </div>
            <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Finalizing protocol will auto-generate clinical profile v1.4</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
