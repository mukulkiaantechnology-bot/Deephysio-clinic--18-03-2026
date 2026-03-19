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
    { name: 'Integrations', icon: <FaLink /> },
    { name: 'SMS Alerts', icon: <FaMobileAlt /> },
  ];

  return (
    <div className="max-w-[1300px] w-full mx-auto space-y-4 sm:space-y-6 px-4 sm:px-5 lg:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans relative">
      {/* Professional Toast Notifications */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-premium border bg-emerald-50 border-emerald-100 text-emerald-700 flex items-center gap-3 sm:gap-4 min-w-[280px] sm:min-w-[320px]"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <FaCheck size={10}/>
            </div>
            <p className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Booking Configuration</h1>
          <p className="text-[10px] sm:text-[11px] border-l-4 border-clinicPrimary pl-3 sm:pl-4 font-bold text-slate-400 mt-2 sm:mt-3 uppercase tracking-widest">Fine-tune how clients interact with your clinic online.</p>
        </div>
        <button 
          onClick={handleSave}
          className="w-full sm:w-auto bg-slate-900 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-[24px] font-black uppercase tracking-widest text-[10px] sm:text-[11px] shadow-none hover:bg-clinicPrimary active:scale-95 transition-colors flex items-center justify-center gap-2"
        >
          <FaSave size={12}/> Update Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 border-b lg:border-none border-slate-100 pb-4 lg:pb-0 mb-2 lg:mb-0">
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible custom-scrollbar pb-2 lg:pb-0">
            {tabs.map(item => (
              <button 
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex-shrink-0 w-auto lg:w-full flex items-center gap-3 px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl transition-all text-left ${
                  activeTab === item.name 
                  ? 'bg-clinicPrimary/10 text-clinicPrimary font-black shadow-none border border-clinicPrimary/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent font-bold'
                }`}
              >
                <span className={`text-[14px] sm:text-[16px] ${activeTab === item.name ? 'text-clinicPrimary' : 'text-slate-400'}`}>{item.icon}</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em]">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-[24px] shadow-sm border border-slate-100 h-fit max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Policy & Rules */}
          {activeTab === 'Policy & Rules' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <section className="space-y-3 sm:space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5 flex items-center justify-between">
                  General Booking Rules
                  <FaCheckCircle className="text-emerald-500" size={12}/>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Period</label>
                    <select 
                      className="w-full p-2.5 sm:p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
                      value={settings.noticePeriod}
                      onChange={(e) => setSettings({...settings, noticePeriod: e.target.value})}
                    >
                      <option>24 Hours before</option>
                      <option>12 Hours before</option>
                      <option>2 Hours before</option>
                    </select>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase px-1 opacity-80 mt-1">Minimum time for new bookings.</p>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Max Future Booking</label>
                    <select 
                      className="w-full p-2.5 sm:p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
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

              <section className="space-y-3 sm:space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5">Cancellation Policy</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   <label className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl cursor-pointer transition-none border ${settings.requirePayment ? 'bg-clinicPrimary/5 border-clinicPrimary/20' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'}`} onClick={() => setSettings({...settings, requirePayment: !settings.requirePayment})}>
                      <div className={`mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${settings.requirePayment ? 'bg-clinicPrimary border-clinicPrimary text-white' : 'bg-white border-slate-200'}`}>
                        {settings.requirePayment && <FaCheck size={8}/>}
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight">Require Cancel Payment</p>
                         <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-80">Charge fee if less than 24h prior.</p>
                      </div>
                   </label>
                   <label className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl cursor-pointer transition-none border ${settings.autoRebooking ? 'bg-clinicPrimary/5 border-clinicPrimary/20' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'}`} onClick={() => setSettings({...settings, autoRebooking: !settings.autoRebooking})}>
                      <div className={`mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${settings.autoRebooking ? 'bg-clinicPrimary border-clinicPrimary text-white' : 'bg-white border-slate-200'}`}>
                        {settings.autoRebooking && <FaCheck size={8}/>}
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight">Automated Re-booking</p>
                         <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 opacity-80">Suggest immediately after cancel.</p>
                      </div>
                   </label>
                </div>
              </section>

              <section className="space-y-3 sm:space-y-4">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5">Personalization</h3>
                 <div className="space-y-2 sm:space-y-3">
                    <div className="space-y-1.5 sm:space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Custom Success Message</label>
                       <textarea 
                        className="w-full mt-1 p-3 sm:p-4 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all h-20 sm:h-24 resize-none leading-relaxed custom-scrollbar"
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <section className="space-y-3 sm:space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5">Communication Nodes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {['booking', 'cancellation', 'daily'].map(type => (
                    <div key={type} className="p-3 sm:p-4 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col justify-between gap-3 transition-none hover:border-clinicPrimary/30">
                      <div>
                        <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-widest">Email {type}</p>
                        <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Automatic Dispatch</p>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, emails: {...settings.emails, [type]: !settings.emails[type]}})}
                        className={`w-9 sm:w-10 h-4 sm:h-5 rounded-full transition-colors relative self-start ${settings.emails[type] ? 'bg-clinicPrimary' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform duration-300 ${settings.emails[type] ? 'translate-x-[22px]' : 'translate-x-0.5'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'Integrations' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5">External Protocol Link</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">API Secure Key</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input type="text" readOnly value={settings.apiKey} className="flex-1 p-2.5 sm:p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-[10px] sm:text-[11px] font-bold text-slate-500 font-mono shadow-inner-soft" />
                    <button className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl hover:text-clinicPrimary hover:border-clinicPrimary/30 hover:bg-clinicPrimary/5 transition-colors text-[9px] font-black uppercase tracking-widest flex items-center justify-center">Copy Key</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* SMS Alerts Tab */}
          {activeTab === 'SMS Alerts' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-clinicPrimary border-b border-slate-50 pb-2.5">Temporal SMS Dispatch</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FaMobileAlt className="text-clinicPrimary hidden sm:block" size={14}/>
                    <div>
                      <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase">Emergency Protocol SMS</p>
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Instant sync for priority cancellations</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings({...settings, smsReminders: !settings.smsReminders})}
                    className={`w-9 sm:w-10 h-4 sm:h-5 rounded-full transition-colors relative flex-shrink-0 ${settings.smsReminders ? 'bg-clinicPrimary' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform duration-300 ${settings.smsReminders ? 'translate-x-[22px]' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Dispatch Phone Vector</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-2.5 sm:p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 outline-none focus:ring-4 focus:ring-clinicPrimary/5 focus:border-clinicPrimary shadow-inner-soft transition-all"
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
