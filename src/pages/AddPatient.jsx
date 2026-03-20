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
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/patients')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
          <FaArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Subject Onboarding</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Initialize biometric clinical profile</p>
        </div>
      </div>

      <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden">
        <div className="p-10 space-y-12">
          {/* Biometric Identity Partition */}
          <div className="space-y-8">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <FaUser className="text-clinicPrimary" /> Biometric Identity Partition
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Given Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Johnathan"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Family Name *</label>
                <input 
                  type="text" 
                  name="lastName"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Wilson"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporal Birth Origin (DOB)</label>
                <input 
                  type="date" 
                  name="dob"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all cursor-pointer shadow-inner-soft"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biometric Identification</label>
                <div className="flex gap-2 p-1.5 bg-slate-50 border border-slate-100 rounded-3xl shadow-inner-soft">
                  {['Male', 'Female', 'Non-Binary', 'Other'].map(g => (
                    <button 
                      key={g} 
                      type="button"
                      onClick={() => setSelectedGender(g)}
                      className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.gender === g ? 'bg-white text-clinicPrimary shadow-premium scale-100' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pronouns / Reference</label>
                <input 
                  type="text" 
                  name="pronouns"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.pronouns}
                  onChange={handleChange}
                  placeholder="e.g. He/Him, They/Them"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Occupation</label>
                <input 
                  type="text" 
                  name="occupation"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="e.g. Software Architect"
                />
              </div>
            </div>
          </div>

          {/* Connectivity Grid Partition */}
          <div className="space-y-8 pt-10 border-t border-slate-50">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <FaPhone className="text-clinicPrimary" /> Connectivity Grid Location
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Phone Sequence</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 opacity-60">+44</span>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="7000 000 000"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secured Email Ledger</label>
                <input 
                  type="email" 
                  name="email"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="subject@medical-node.com"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Residential Coordinates</label>
                <input 
                  type="text" 
                  name="address"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/10 focus:border-clinicPrimary transition-all placeholder:text-slate-300 shadow-inner-soft"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full Residential Address Node"
                />
              </div>
            </div>
          </div>

          {/* Emergency Tactical Override */}
          <div className="p-10 bg-rose-50/30 rounded-[40px] border border-rose-100 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-rose-500 shadow-soft">
                <FaUserShield size={18}/>
              </div>
              <div>
                <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Emergency Tactical Override</h4>
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1">Secondary contact protocol for critical incidents</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Contact Name</label>
                <input 
                  type="text" 
                  name="emergency.name"
                  className="w-full px-6 py-4 bg-white border border-rose-50 rounded-[20px] text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Digital Frequency</label>
                <input 
                  type="tel" 
                  name="emergency.phone"
                  className="w-full px-6 py-4 bg-white border border-rose-50 rounded-[20px] text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  placeholder="+44 xxxx xxxxxx"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">System Relation</label>
                <input 
                  type="text" 
                  name="emergency.relation"
                  className="w-full px-6 py-4 bg-white border border-rose-50 rounded-[20px] text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-300 transition-all shadow-sm"
                  value={formData.emergencyContact.relation}
                  onChange={handleChange}
                  placeholder="e.g. Spouse"
                />
              </div>
            </div>
          </div>

          {/* Documentation & Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-50">
            <div className="space-y-8">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaCloudUploadAlt className="text-clinicPrimary" /> Documentation Node Provisioning
              </label>
              <div className="flex gap-4">
                <div onClick={() => handleAttach('Bio-Avatar')} className="flex-1 p-6 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] text-center cursor-pointer hover:bg-white hover:border-clinicPrimary transition-all group">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:scale-110 transition-transform">
                      <FaUser className="text-slate-300 group-hover:text-clinicPrimary transition-colors" />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formData.bioAvatar ? 'Avatar Node Active' : 'Select Avatar'}</p>
                </div>
                <div onClick={() => handleAttach('Identity Node')} className="flex-1 p-6 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] text-center cursor-pointer hover:bg-white hover:border-clinicPrimary transition-all group">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:scale-110 transition-transform">
                      <FaIdCard className="text-slate-300 group-hover:text-clinicPrimary transition-colors" />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formData.identityNode ? 'ID Node Logged' : 'Identity Node'}</p>
                </div>
              </div>
              <input type="file" ref={bioAvatarRef} className="hidden" accept="image/*" onChange={e => handleFileChange(e, 'bioAvatar')} />
              <input type="file" ref={identityNodeRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(e, 'identityNode')} />
            </div>

            <div className="space-y-6">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <FaHistory className="text-clinicPrimary" /> Medical Chronology
              </label>
              <div className="space-y-3">
                {[
                  { label: 'Longitudinal Surgery Node', id: 'surg' },
                  { label: 'Verified Chronic Allergies', id: 'allg' },
                  { label: 'Active Clinical Medications', id: 'meds' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition-all group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-clinicPrimary focus:ring-clinicPrimary/20 transition-all cursor-pointer" id={item.id} />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight group-hover:text-slate-900">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric Node Validation Active</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <Button 
                variant="secondary" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white" 
                onClick={() => navigate('/patients')}
              >
                Abort Protocol
              </Button>
              <Button 
                variant="accent" 
                className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                onClick={handleFinalize}
                disabled={isSaving}
              >
                {isSaving ? 'Synchronizing...' : 'Finalize Protocol'}
              </Button>
           </div>
        </div>
      </Card>
    </div>
  );
};

export default AddPatient;
