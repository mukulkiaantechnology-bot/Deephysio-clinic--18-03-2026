import React from 'react';
import { FaBell, FaSms, FaEnvelope, FaRobot, FaCalendarCheck, FaMoneyBillWave, FaShieldAlt, FaSave, FaSyncAlt, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotificationSettings = () => {
  const navigate = useNavigate();
  const sections = [
    { title: 'Clinic Operations', icon: <FaCalendarCheck />, items: ['New Appointment Booking', 'Waitlist Availability', 'Schedule Changes'] },
    { title: 'Patient Communication', icon: <FaEnvelope />, items: ['Incoming SMS/Emails', 'Recall Alerts', 'Post-Op Reminders'] },
    { title: 'Billing & Payments', icon: <FaMoneyBillWave />, items: ['Online Payment Success', 'Insurance Claim Updates', 'Overdue Deposit Alerts'] },
    { title: 'System & Security', icon: <FaShieldAlt />, items: ['New Login Detected', 'Data Backup Status', 'Role Change Alerts'] },
  ];

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans custom-scrollbar">
            <div className="flex items-center gap-6">
                <button onClick={() => navigate(-1)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-clinicPrimary hover:shadow-google transition-all active:scale-90 shadow-sm">
                    <FaArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Notification Node</h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1.5">Customize Clinical Communication Matrix</p>
                </div>
            </div>

            <Card className="bg-white rounded-[40px] shadow-premium border border-slate-50 overflow-hidden flex flex-col">
                <div className="p-10 space-y-12">
                    {sections.map((section, idx) => (
                        <div key={section.title} className={`space-y-6 ${idx !== 0 ? 'pt-10 border-t border-slate-50' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-1.5 h-6 rounded-full ${['bg-clinicPrimary', 'bg-amber-500', 'bg-indigo-500', 'bg-emerald-500'][idx % 4]}`}></div>
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{section.title}</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {section.items.map(item => (
                                    <div key={item} className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-white hover:shadow-google transition-all group">
                                        <div className="flex flex-col text-center md:text-left">
                                            <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1 group-hover:text-clinicPrimary transition-colors">{item}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Omni-Channel Dispatch</span>
                                        </div>
                                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                                            <div className="flex items-center gap-4 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-300">
                                                <button className="hover:text-blue-500 transition-colors"><FaEnvelope size={12}/></button>
                                                <button className="text-blue-500"><FaSms size={12}/></button>
                                                <button className="hover:text-clinicPrimary transition-colors"><FaBell size={12}/></button>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-clinicPrimary shadow-inner"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Quiet Hours Vector */}
                    <div className="p-8 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-premium">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                                <FaSyncAlt className="text-clinicPrimary animate-spin-slow" size={20}/>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Clinical Quiet Zone</h4>
                            </div>
                            <p className="text-sm font-black tracking-tighter opacity-80 uppercase tracking-widest leading-none">Automation Suppressed: 22:00 - 06:00</p>
                        </div>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-clinicPrimary hover:text-white transition-all relative z-10 shadow-lg">Configure Wave</button>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-clinicPrimary/10 rounded-full blur-3xl group-hover:bg-clinicPrimary/20 transition-all duration-1000"></div>
                    </div>
                </div>

                <div className="px-10 py-8 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication matrix synced</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button 
                            variant="secondary" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-premium hover:bg-white text-slate-400" 
                            onClick={() => navigate(-1)}
                        >
                            Abort
                        </Button>
                        <Button 
                            variant="accent" 
                            className="flex-1 md:px-10 h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-google active:scale-95 transition-all" 
                            onClick={() => alert('Notification Preferences Updated Successfully.')}
                        >
                            Commit Changes
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default NotificationSettings;
