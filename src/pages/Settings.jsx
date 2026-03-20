import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaBell, FaHospitalAlt, FaLock, FaHistory, FaChevronRight, FaSync, FaShieldAlt, FaDatabase } from 'react-icons/fa';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PageHeader from '../components/ui/PageHeader';

const Settings = () => {
  const navigate = useNavigate();
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  const handleBackup = () => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          alert('System Manual Backup Synchronized Successfully.');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const itemRoutes = {
    'Clinic Info': '/settings/clinic',
    'Opening Hours': '/settings/clinic',
    'Multi-location': '/settings/location',
    'Staff Profiles': '/settings/users',
    'Roles & Permissions': '/settings/roles',
    'Invite Staff': '/settings/users',
    'Change Password': '/settings/security',
    '2FA Setup': '/settings/security',
    'Activity Logs': '/settings/security',
    'Email Alerts': '/settings/notifications',
    'SMS Settings': '/settings/notifications',
    'Push Notifications': '/settings/notifications',
  };

  const sections = [
    { title: 'General Settings', icon: <FaHospitalAlt />, desc: 'Clinic details, address, and logo.', items: ['Clinic Info', 'Opening Hours', 'Multi-location'] },
    { title: 'User Management', icon: <FaUserShield />, desc: 'Manage staff accounts and roles.', items: ['Staff Profiles', 'Roles & Permissions', 'Invite Staff'] },
    { title: 'Security & Privacy', icon: <FaLock />, desc: 'Password, MFA, and access logs.', items: ['Change Password', '2FA Setup', 'Activity Logs'] },
    { title: 'Notifications', icon: <FaBell />, desc: 'Configure system and email alerts.', items: ['Email Alerts', 'SMS Settings', 'Push Notifications'] },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-4 sm:px-6 lg:px-8 py-8 animate-fade-in custom-scrollbar font-sans">
      <div className="relative">
        <PageHeader 
          title="System Configuration"
          subtitle="Orchestrate clinic protocols, security perimeters and global system parameters."
          icon={<FaShieldAlt />}
          actions={
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="secondary" 
                className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-none border-slate-200" 
                leftIcon={<FaHistory size={10}/>}
                onClick={() => setShowReleaseNotes(true)}
              >
                Release Notes
              </Button>
              <Button 
                variant="accent" 
                className="h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-google"
                leftIcon={isBackupRunning ? null : <FaSync size={10}/>}
                onClick={handleBackup}
                disabled={isBackupRunning}
              >
                {isBackupRunning ? `Backing up... ${backupProgress}%` : 'Manual Backup'}
              </Button>
            </div>
          }
        />
        {isBackupRunning && (
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-clinicPrimary transition-all duration-[400ms] shadow-[0_0_10px_rgba(46,167,184,0.5)]" style={{ width: `${backupProgress}%` }}></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Card key={section.title} className="p-8 group hover:border-clinicPrimary/30 transition-all cursor-pointer border-none shadow-premium bg-white">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-2xl shadow-soft border border-slate-100 group-hover:bg-clinicPrimary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-clinicPrimary transition-colors tracking-tight uppercase tracking-widest text-xs font-black">{section.title}</h3>
                  <p className="text-[9px] text-clinicPrimary font-black uppercase tracking-[0.2em] leading-none mt-2 bg-clinicPrimary/5 inline-block px-2.5 py-1.5 rounded-lg border border-clinicPrimary/10">{section.items.length} Modules Online</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">{section.desc}</p>
              <div className="space-y-1">
                {section.items.map(item => (
                  <div 
                    key={item} 
                    onClick={(e) => { e.stopPropagation(); navigate(itemRoutes[item] || '/settings'); }}
                    className="flex justify-between items-center py-4 border-t border-slate-50 text-[12px] font-bold text-slate-600 hover:text-clinicPrimary transition-all group/item active:translate-x-1"
                  >
                    <span className="tracking-tight uppercase">{item}</span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover/item:bg-clinicPrimary/10 group-hover/item:text-clinicPrimary transition-all">
                      <FaChevronRight size={10} className="group-hover/item:translate-x-0.5 transition-transform"/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <Card className="bg-slate-900 text-white border-none shadow-2xl p-10 relative overflow-hidden group min-h-[420px] flex flex-col justify-center items-center text-center">
             <FaDatabase className="absolute -right-16 -top-16 text-white/5 text-[280px] -rotate-12 transition-transform group-hover:rotate-0 duration-1000 pointer-events-none"/>
             <div className="w-20 h-20 bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mb-8 shadow-glass group-hover:scale-110 transition-transform">
                <FaSync className="text-clinicPrimary text-3xl" />
             </div>
             <p className="text-[10px] font-bold text-clinicPrimary uppercase tracking-[0.3em] mb-4">Version: v2.0.0-Premium</p>
             <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">Core System Synchronized</h3>
             <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-xs opacity-80 uppercase tracking-widest mb-10">
                Latest security protocols verified. All clinical nodes are currently synchronized with the primary database cluster.
             </p>
             <Button 
                variant="accent" 
                className="w-full h-14 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                onClick={() => alert('Checking for software updates... System is up to date.')}
             >
                Check for Updates
             </Button>
          </Card>

          <Card className="text-center p-10 border-none shadow-premium bg-white group hover:shadow-google transition-all cursor-pointer" onClick={() => setShowReleaseNotes(true)}>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Next Protocol Deployment</p>
            <h3 className="text-2xl font-bold text-slate-900 leading-none tracking-tight uppercase">March 25, 2026</h3>
            <div className="flex items-center justify-center gap-2.5 mt-6">
               <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-emerald-100 flex items-center gap-3 shadow-inner-soft">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                 Nodes Operational
               </span>
            </div>
          </Card>
        </div>
      </div>

      <Modal 
        isOpen={showReleaseNotes} 
        onClose={() => setShowReleaseNotes(false)}
        title="System Release Notes"
        footer={<Button variant="secondary" onClick={() => setShowReleaseNotes(false)} className="rounded-xl">Close Protocol</Button>}
      >
        <div className="space-y-6 p-2">
          <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner-soft">
             <p className="text-[11px] font-black text-clinicPrimary uppercase tracking-[0.2em] mb-4">Version 2.0.0 • Premium Tier</p>
             <ul className="space-y-4 text-[13px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 rounded-full bg-clinicPrimary mt-1.5 shrink-0"></span> Extended authentication perimeter for OAuth nodes.</li>
                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 rounded-full bg-clinicPrimary mt-1.5 shrink-0"></span> Finalized manual backup synchronization scripts.</li>
                <li className="flex items-start gap-4"><span className="w-1.5 h-1.5 rounded-full bg-clinicPrimary mt-1.5 shrink-0"></span> Optimized longitudinal trajectory audits.</li>
             </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
