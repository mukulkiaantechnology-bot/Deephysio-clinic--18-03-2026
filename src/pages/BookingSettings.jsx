import React, { useState, useEffect } from 'react';
import { FaCog, FaBell, FaGlobe, FaLink, FaMobileAlt, FaShieldAlt, FaSave, FaCheckCircle, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const BookingSettings = () => {
  const [activeTab, setActiveTab] = useState('Policy & Rules');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('deephysio_settings');
    return saved ? JSON.parse(saved) : {
      noticePeriod: '24 Hours before',
      maxFuture: '3 Months ahead',
      requirePayment: true,
      autoRebooking: false,
      successMessage: 'Your appointment at DeePhysio is confirmed! We look forward to seeing you.',
      emails: { booking: true, cancellation: true, daily: false },
      widgetColor: '#2ea7b8',
      apiKey: 'pk_test_dee_923847293847',
      smsReminders: true,
      phone: '+44 700 000 000'
    };
  });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
  };

  const handleSave = () => {
    localStorage.setItem('deephysio_settings', JSON.stringify(settings));
    showToast('Configuration Nodes Synchronized Successfully.');
  };

  const tabs = [
    { name: 'Policy & Rules', icon: <FaShieldAlt /> },
    { name: 'Notifications', icon: <FaBell /> },
    { name: 'Online Widget', icon: <FaGlobe /> },
    { name: 'Integrations', icon: <FaLink /> },
    { name: 'SMS Alerts', icon: <FaMobileAlt /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 p-4 sm:p-6 animate-in fade-in duration-700 font-sans relative">
      {/* Professional Toast Notifications */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-premium border bg-emerald-50 border-emerald-100 text-emerald-700 flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <FaCheck size={12}/>
            </div>
            <p className="text-[13px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Booking Configuration</h1>
          <p className="text-sm border-l-4 border-clinicPrimary pl-4 font-bold text-slate-400 mt-3 uppercase tracking-widest">Fine-tune how clients interact with your clinic online.</p>
        </div>
        <button 
          onClick={handleSave}
          className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-premium hover:bg-clinicPrimary hover:shadow-google active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <FaSave size={12}/> Update Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Tabs */}
        <div className="space-y-2">
          {tabs.map(item => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[24px] transition-all text-left group ${
                activeTab === item.name 
                ? 'bg-clinicPrimary text-white shadow-google scale-[1.02]' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <span className={`text-lg ${activeTab === item.name ? 'text-white' : 'text-slate-300 group-hover:text-clinicPrimary ring-1 ring-slate-100 group-hover:ring-clinicPrimary/20 p-2 rounded-xl transition-all'}`}>{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-[0.15em]">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-50 min-h-[500px]">
          {/* Policy & Rules */}
          {activeTab === 'Policy & Rules' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 space-y-10">
              <section className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4 flex items-center justify-between">
                  General Booking Rules
                  <FaCheckCircle className="text-emerald-500" size={14}/>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Period</label>
                    <select 
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                      value={settings.noticePeriod}
                      onChange={(e) => setSettings({...settings, noticePeriod: e.target.value})}
                    >
                      <option>24 Hours before</option>
                      <option>12 Hours before</option>
                      <option>2 Hours before</option>
                    </select>
                    <p className="text-[10px] font-bold text-slate-300 uppercase px-2 opacity-60">Minimum time required for new bookings.</p>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Future Booking</label>
                    <select 
                      className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                      value={settings.maxFuture}
                      onChange={(e) => setSettings({...settings, maxFuture: e.target.value})}
                    >
                      <option>3 Months ahead</option>
                      <option>6 Months ahead</option>
                      <option>1 Year ahead</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">Cancellation Policy</h3>
                <div className="grid gap-4">
                   <label className={`flex items-start gap-6 p-6 rounded-[28px] cursor-pointer transition-all border-2 ${settings.requirePayment ? 'bg-clinicPrimary/5 border-clinicPrimary/20' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'}`} onClick={() => setSettings({...settings, requirePayment: !settings.requirePayment})}>
                      <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${settings.requirePayment ? 'bg-clinicPrimary border-clinicPrimary text-white' : 'bg-white border-slate-200'}`}>
                        {settings.requirePayment && <FaCheck size={10}/>}
                      </div>
                      <div>
                         <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Require Payment for Cancellations</p>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">Charge a fee if cancelled less than 24h prior.</p>
                      </div>
                   </label>
                   <label className={`flex items-start gap-6 p-6 rounded-[28px] cursor-pointer transition-all border-2 ${settings.autoRebooking ? 'bg-clinicPrimary/5 border-clinicPrimary/20' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'}`} onClick={() => setSettings({...settings, autoRebooking: !settings.autoRebooking})}>
                      <div className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${settings.autoRebooking ? 'bg-clinicPrimary border-clinicPrimary text-white' : 'bg-white border-slate-200'}`}>
                        {settings.autoRebooking && <FaCheck size={10}/>}
                      </div>
                      <div>
                         <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Automated Re-booking</p>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">Suggest another time immediately after cancellation.</p>
                      </div>
                   </label>
                </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">Personalization</h3>
                 <div className="space-y-4">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Custom Success Message</label>
                       <textarea 
                        className="w-full p-6 bg-slate-50/50 border border-slate-100 rounded-[28px] text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all h-32 resize-none"
                        value={settings.successMessage}
                        onChange={(e) => setSettings({...settings, successMessage: e.target.value})}
                       />
                    </div>
                 </div>
              </section>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'Notifications' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 space-y-10">
              <section className="space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">Communication Nodes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {['booking', 'cancellation', 'daily'].map(type => (
                    <div key={type} className="p-6 bg-slate-50/50 rounded-[28px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-premium transition-all">
                      <div>
                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Email {type}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Automatic Dispatch</p>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, emails: {...settings.emails, [type]: !settings.emails[type]}})}
                        className={`w-12 h-6 rounded-full transition-all relative ${settings.emails[type] ? 'bg-clinicPrimary' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emails[type] ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* Online Widget Tab */}
          {activeTab === 'Online Widget' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 space-y-10">
              <section className="space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">Widget Aesthetic</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Synchronizer</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={settings.widgetColor} 
                        onChange={(e) => setSettings({...settings, widgetColor: e.target.value})}
                        className="w-14 h-14 rounded-2xl cursor-pointer border-none bg-transparent"
                      />
                      <p className="text-[13px] font-black text-slate-700 uppercase">{settings.widgetColor}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-[28px] text-white space-y-4 shadow-xl">
                    <h4 className="text-[10px] font-black text-clinicPrimary uppercase tracking-widest">Live Preview Node</h4>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/10"></div>
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="w-1/2 h-2 bg-white/20 rounded-full"></div>
                        <div className="w-full h-2 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest" style={{backgroundColor: settings.widgetColor}}>Book Now</button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'Integrations' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">External Protocol Link</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">API Secure Key</label>
                  <div className="flex gap-4">
                    <input type="text" readOnly value={settings.apiKey} className="flex-1 p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[12px] font-bold text-slate-500 font-mono" />
                    <button className="px-6 bg-slate-50 text-slate-400 rounded-2xl hover:text-clinicPrimary transition-colors text-[10px] font-black uppercase tracking-widest">Copy</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* SMS Alerts Tab */}
          {activeTab === 'SMS Alerts' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-10 space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-4">Temporal SMS Dispatch</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[28px] border border-slate-100">
                  <div className="flex items-center gap-4">
                    <FaMobileAlt className="text-clinicPrimary" size={20}/>
                    <div>
                      <p className="text-[12px] font-black text-slate-900 uppercase">Emergency Protocol SMS</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Instant sync for priority cancellations</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings({...settings, smsReminders: !settings.smsReminders})}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings.smsReminders ? 'bg-clinicPrimary' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.smsReminders ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dispatch Phone Vector</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSettings;
